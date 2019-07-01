getCourses();

const searchPrepPage = document.getElementById('search-view');
const doPrepPage = document.getElementById('prepare-view');
//checks if the user has actually finished a prep before starting another one + handles permission requirements
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //user is logged in
        db.collection('users').where('name', '==', user.displayName).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    userID.push(doc.id);
                    userName.push(doc.data().name);
                    userPrepares.push(doc.data().prepares);
                    if (doc.data().role == 'Copyedit') {
                        window.location.assign('home.html');
                    }
                    if (doc.data().currentAction == 'preparing' || doc.data().currentAction == 'transcribing') {
                        //user has a prep project that is unfinished
                         alert('Please, finish preparing or transcribing previous transcript before proceding');
                        if (doc.data().currentAction == 'preparing') {
                            displayPrepareModal(doc.data().actionID);
                            userAction.push(doc.data().actionID);
                            document.getElementById('storeUserID').innerText = doc.id;
                        } else {
                            window.location.replace('home.html');
                        }
                        //user doesn't have any projects, we will let him choose one
                    } else {
                        fillPrepTableStart();
                    }
                })

            })
    } else {
        //do nothing
    }
})

//This function handles the click on the prepare button for a certain transcript.

//the user selected a transcript to prepare, let's update the user's firestore to log that
// and update page;
function displayPrepareModal(transcriptID) {
    //updates the user view
    db.collection('users').doc(userID[0]).update({
            currentAction: 'preparing',
            actionID: transcriptID
        })
        //generates the table
        .then(() => {
            db.collection('accessibility').doc(transcriptID).update({
                    status: 'In Prep',
                    preparer: userName[0]
                })
                //updates the page so the user can now prepare the transcript
                .then(function () {
                    searchPrepPage.classList.add('hide');
                    doPrepPage.classList.remove('hide');
                    fillPrepTicket(transcriptID);
                })
        })
}

//Uses the id selected to update the ticket information on the right side of prep
function fillPrepTicket(transcriptID) {
    db.collection('accessibility').doc(transcriptID).get()
        .then(function (doc) {
            if (doc.data().copied) {
                document.querySelectorAll('input').forEach(doc=> { 
                    doc.setAttribute('disabled', true);
                })
                document.getElementById('radio-check1').checked = true;
            }

            if (doc.data().type != 'Video') {
                document.getElementById('getVerbitId').value = 'The transcript does not use Verbit';
                document.getElementById('hideVerbit').classList.add('hide');
                document.getElementById('embeddedCode').classList.add('hide');
                document.getElementById('getVerbitId').classList.add('hide');
            }

            if (doc.data().type == 'Alt Text' || doc.data().type == 'Slide') { 
                document.getElementById('hide-row-alt').classList.add('hide');
                document.getElementById('requestHeight').value = 0;
                document.getElementById('requestLength').value = 0;
            }

            if (doc.data().type == 'Audio') { 
                document.getElementById('requestHeight').value = 0;
                document.getElementById('requestHeight').classList.add('hide');
            }

            if (doc.data().verbit) {
                document.getElementById('check-verbit-checked').checked = true;
                document.getElementById('getVerbitId').disabled = false;
            } else {
                document.getElementById('check-verbit-checked').checked = false;
            }

            if (doc.data().verbitID != undefined) {
                document.getElementById('getVerbitId').value = doc.data().verbitID;
            }
            //updates right side of ticket

            if (doc.data().returnToPrepNote != undefined) {
                document.getElementById('fillCommentsIn').innerText = doc.data().returnToPrepNote;
                alert('This video has been transfered back to prep. Please read carefully the notes provided to update the document. If you cannot resolve the problem, contact a lead');
            } else {
                document.getElementById('fillCommentsIn').innerText = 'No return comments have been posted.'
            }

            if (doc.data().height != undefined) {
                document.getElementById('requestHeight').value = doc.data().videoHeight;
            }

            if (doc.data().length != undefined) {
                document.getElementById('requestLength').value = doc.data().videoLength;
            }

            if (doc.data().docPublishURL != undefined) {
                document.getElementById('googleDocPublish').value = doc.data().docPublishURL;
            }

            if (doc.data().docEditURL != undefined) {
                document.getElementById('googleDocEdit').value = doc.data().docEditURL;
            }

            document.getElementById('typeSide').innerText = doc.data().type;
            document.getElementById('codeSide').innerText = doc.data().backupCode;
            document.getElementById('titleSide').innerText = doc.data().title;
            document.getElementById('locationSide').setAttribute('href', doc.data().lmsURL);
            document.getElementById('mediaSide').setAttribute('href', doc.data().srcURL);
            document.getElementById('storeTranscriptID').innerText = transcriptID;
        })
        .then(function () {
            // if the element selected to fill the box is undefined, instead of showing undefined, shows only
            // a blank space
            document.querySelectorAll('input').forEach(function (element) {
                if (element.value == undefined) {
                    element.value = '';
                    console.log(element.value);
                }
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}

//handles change as the user says if the transcript has been checked for prior completion
//If verbit is checked through the user or through request 
//input from firestore, allows the  verbit IDinput to be enabled
document.getElementById('check-verbit-checked').addEventListener('change', () => {
    if (document.getElementById('check-verbit-checked').checked) {
        document.getElementById('getVerbitId').disabled = false;
    } else {
        document.getElementById('getVerbitId').disabled = true;
    }
})
//handles the user canceling the transcript preparing action
document.getElementById("requestCancelPrep").addEventListener('click', () => { 
    var transcriptID = document.getElementById('storeTranscriptID').innerText;
    db.collection('accessibility').doc(transcriptID).update({
        status: 'Ready for Prep',
        preparer: ''
    })
    .then(()=> { 
        var idUser = userID[0];
        db.collection('users').doc(idUser).update({
            currentAction: '',
            actionID: ''
        })
        .then(()=> { 
            console.log('Success');
            searchPrepPage.classList.remove('hide');
            doPrepPage.classList.add('hide');
        })
    })
})
//when the user submits prep transcript, doest all the necessary checking and takes the user back to the list of transcritps to be preped
document.getElementById('requestSubmit').addEventListener('click', () => {
    //first thing we want to check if all information required was added correctly
    //to make the code cleaner, we will add a variable name for some documents
    var docEdit = document.getElementById('googleDocEdit');
    var docPublished = document.getElementById('googleDocPublish');
    var verbit = document.getElementById('check-verbit-checked');
    var verbitID = '' ? !verbit : document.getElementById('getVerbitId');
    var height = document.getElementById('requestHeight');
    var length = document.getElementById('requestLength');

    if (!document.getElementById('radio-check1').checked && !document.getElementById('radio-check2').checked) {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
    } else if (docEdit.value == '' || docPublished.value == '') {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
    } else if (!docPublished.value.includes('/pub')) {
        message.innerHTML = 'You must add a valid publishable link before continuing';
        message.style.color = 'red';
        resetMessage();
    } else if (verbitID.value == '' && verbit.checked) {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
    } else {
        var transcriptID = document.getElementById('storeTranscriptID').innerText;
        db.collection('accessibility').doc(transcriptID).update({
                status: 'Ready for Transcription',
                docEditURL: String(docEdit.value),
                docPublishURL: String(docPublished.value),
                verbitID: String(verbitID.value),
                verbit: Boolean(verbit.checked),
                height: Number(height.value),
                length: Number(length.value),
                datePrepareFinished: new Date()
            })
            .then(() => {
                var idUser = userID[0];
                db.collection('users').doc(idUser).update({
                        currentAction: '',
                        actionID: '',
                        prepares: userPrepares[0] + 1
                    })
                    .then(() => {
                        db.collection('accessibility').doc(transcriptID).get().then(doc => {
                            var course = doc.data().backupCode;
                            searchPrepPage.classList.remove('hide');
                            doPrepPage.classList.add('hide');
                            fillPrepTable(course)
                        })
                    })
            })
    }
})
// fill the prep table with available transcripts

function fillPrepTableStart() {
    document.getElementById('prep-table').innerHTML = '';
    db.collection("accessibility").where('status', '==', 'Ready for Prep').orderBy('priority').limit(10).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var classRed = '';
                var flaggedStr = '';
                if (doc.data().returnToPrepNote != '' && doc.data().returnToPrepNote != undefined) {
                    var classRed = 'red';
                    var flaggedStr = ' (Returned)';
                }
                var p = `<p> ${doc.data().priority}</p> <p>${doc.data().backupCode}</p> <p>${doc.data().type}</p>
                    <p>${doc.data().title}</p>  <button onclick="displayPrepareModal('${doc.id}')" class="bg-primary btn-hover prepare-btn ${classRed}">
                    Prepare${flaggedStr}</button>`;
                document.getElementById('prep-table').insertAdjacentHTML('beforeend', p);
            })
        })
}

function fillPrepTable(selectedCourseCode) {
    document.getElementById('prep-table').innerHTML = '';
    db.collection("accessibility").where('status', '==', 'Ready for Prep').where("backupCode", "==", selectedCourseCode).orderBy('priority').get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id);
                if (selectedCourseCode == doc.data().backupCode) {
                    var p = `<p> ${doc.data().priority}</p> <p>${doc.data().backupCode}</p> <p>${doc.data().type}</p>
                        <p>${doc.data().title}</p>  <button onclick="displayPrepareModal('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                        Prepare</button>`;
                    document.getElementById('prep-table').insertAdjacentHTML('beforeend', p);
                } else {

                }
            })
        })
}

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = '';
        message.style.color = 'black';
    }, 3000);
}


function getModal() {
    var modal = document.getElementById('myModal3');
    var span = document.getElementsByClassName("close3")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function copyToClipboard() {
    let textarea = document.getElementById("codehtml");
    textarea.select();
    document.execCommand("copy");
}

function updateVerbitAccordingToPriorCompletion(bool) {
    if (bool) {
        document.getElementById('hideVerbit').classList.add('hide');
        document.getElementById('getVerbitId').classList.add('hide');
        document.getElementById('hideVerbit2').classList.add('hide');
    } else {
        document.getElementById('hideVerbit').classList.remove('hide');
        document.getElementById('getVerbitId').classList.remove('hide');
        document.getElementById('hideVerbit2').classList.remove('hide');
    }
}

function calculateTotal() {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var total = 0;
    hours = document.getElementById("hours0").value;
    minutes = document.getElementById("minutes0").value;
    seconds = document.getElementById("seconds0").value;
    if (hours == "" && minutes == "" && seconds == "") {
        document.getElementById("total" + i).value = "";
    }
    if (hours == "") {
        hours = 0;
    }
    if (minutes == "") {
        minutes = 0;
    }
    if (seconds == "") {
        seconds = 0;
    }
    if (hours < 0 || minutes < 0 || seconds < 0) {
        document.getElementById("total0").value = "NaN";
    }
    if (seconds >= 60 && seconds <= 1000000) {
        while (seconds >= 60) {
            minutes++;
            seconds -= 60;
        }
        document.getElementById("seconds0").value = seconds;
        document.getElementById("minutes0").value = minutes;
    }
    if (minutes >= 60 && minutes <= 1000000) {
        while (minutes >= 60) {
            hours++;
            minutes -= 60;
        }
        document.getElementById("minutes0").value = minutes;
        document.getElementById("hours0").value = hours;
    }
    total = Number(hours * 60 * 60) + Number(minutes * 60) + Number(seconds);
    if (total === 0) {
        total = "";
        document.getElementById("total0").value = total;
    }
    document.getElementById("total0").value = total;
};

function calculateSubmit() {
    var total = document.getElementById('total0').value;
    document.getElementById('requestLength').value = total;
    document.getElementById('requestLength').style.borderColor = "rgb(169, 169, 169)";
    modal.style.display = "none";
}

//Counts the ammount of transcripts in the database
function countDocs() {
    db.collection('accessibility').get()
        .then((querySnapshot) => {
            var count = 0;
            querySnapshot.forEach((doc) => {
                count += 1;
            })
            console.log(count);
        })
}

var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close2")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function revealModalCalc() {
    document.getElementById('myModal').style.display = 'block';
}

//generates the code to the user, according to the media url received
function showCodeEmbedded() {
    document.getElementById('codehtml').innerText = '';
    var transcriptID = document.getElementById('storeTranscriptID').innerText;
    db.collection('accessibility').doc(transcriptID).get()
        .then(function (doc) {
            var link, height, seconds, title, pubLink;
            link = doc.data().srcURL;
            height = Number(document.getElementById('requestHeight').value);
            seconds = Number(document.getElementById('requestLength').value);
            title = doc.data().title;
            if (document.getElementById('googleDocPublish').value != '' && document.getElementById('googleDocPublish').value.includes('/pub') && height != '' && seconds != '') {
                pubLink = document.getElementById('googleDocPublish').value;
                getModal();
            } else {
                alert("Before getting the code, make sure to add a published google doc to the transcript as well as a height a and a length for the transcript, if necessary.");
            }

             var setlink = pubLink;
            var time = secondsToHms(seconds);

             if (link.includes("youtube")) {
                var id = link.slice(link.indexOf("watch?v=") + 8, (link.indexOf("watch?v=") + 9) + 11);
                var html = `<p><iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;


             } else if (link.includes("youtu.be")) {
                var id = link.slice(link.indexOf(".be/") + 4, (link.indexOf(".be/") + 4) + 11);
                var html = `<p><iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;

             } else if (link.includes("video.byui.edu")) {
                var id = link.slice(link.indexOf("/0_") + 1, (link.indexOf("/0_") + 1) + 10);
                var html = `<p><iframe id="kaltura_player_1534785808" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" width="560" height="${height}" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0"></iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;

             } else if (link.includes("vimeo")) {
                var id = link.slice(link.indexOf("vimeo.com/") + 10, (link.indexOf("vimeo.com/") + 10) + 9);
                var html = `<p><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" width="560" height="${height}px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br>
            (${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;

             } else if (link.includes("fod.infobase.com")) {
                var id = link.slice(link.indexOf("loid=") + 5, (link.indexOf("loid=") + 5) + 5);
                var html = `<p><iframe allow='encrypted-media' height='${height}' frameborder='0' width='560' style='border: 1px solid #ddd;'  src='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' allowfullscreen >&nbsp;</iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;

             } else {
                var html = `<p><a href='${link}' target="_blank">Go to this link and get the embed code to place</a><br>Copy the rest of this and place it in with the embedded in a single p tag<br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;
            }
        })
}

function showCodeLink() {
    var transcriptID = document.getElementById('storeTranscriptID').innerText;
    document.getElementById('codehtml').innerText = '';
    db.collection('accessibility').doc(transcriptID).get()
        .then(function (doc) {
            var link, height, seconds, title, pubLink;
            link = doc.data().srcURL;
            height = Number(document.getElementById('requestHeight').value);
            seconds = Number(document.getElementById('requestLength').value);
            title = doc.data().title;
            if (document.getElementById('googleDocPublish').value != '' && document.getElementById('googleDocPublish').value.includes('/pub') && height != '' && seconds != '') {
                pubLink = document.getElementById('googleDocPublish').value;
                getModal();
            } else {
                alert("Before getting the code, make sure to add a published google doc to the transcript as well as a height a and a length for the transcript, if necessary.");
            }

            var time = secondsToHms(seconds);

            var html = `(${time} mins, <a href="${pubLink}" target="_blank">${title} Transcript</a>)</p>`;
            document.getElementById('codehtml').innerText = html;
        });
} 	

var checkIfGuest =(()=>{});
