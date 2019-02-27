var userID = [];
var userName = [];
//checks if the user has actually finished a prep before starting another one + handles permission requirements
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //user is logged in
        db.collection('users').where('name', '==', user.displayName).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    userID.push(doc.id);
                    userName.push(doc.data().name);
                    if (doc.data().currentAction == 'preparing' || doc.data().currentAction == 'transcribing') {
                        //user has a prep project that is unfinished
                        // alert('Please, finish preparing or transcribing previous transcript before proceding');
                        if (doc.data().currentAction == 'preparing') {
                            displayPrepareModal(doc.data().actionID);
                        } else {
                            window.location.replace('home.html');
                        }

                    } else { //user doesn't have any projects, we will let him choose one
                        fillPrepTableStart();
                    }
                })

            })
    } else {
        //do nothing
    }
})

//This function handles the click on the prepare button for a certain transcript.
var searchPrepPage = document.getElementById('search-view');
var doPrepPage = document.getElementById('prepare-view');

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
                    console.log('User retrived this prep project');
                    searchPrepPage.classList.add('hide');
                    doPrepPage.classList.remove('hide');
                    fillPrepTicket(transcriptID);
                    console.log(userID);
                })
        })
}

//Uses the id selected to update the ticket information on the right side of prep
function fillPrepTicket(transcriptID) {
    console.log(transcriptID);
    db.collection('accessibility').doc(transcriptID).get()
        .then(function (doc) {
            //updates left side as far as if verbit is being used and prior completion
            if (doc.data().verbit) {
                document.getElementById('check-verbit-checked').checked = true;
                document.getElementById('getVerbitId').disabled = false;

            } else {
                document.getElementById('check-verbit-checked').checked = false;
            }
            //updates right side of ticket
            document.getElementById('typeSide').innerText = 'Transcript Type: ' + doc.data().type;
            document.getElementById('codeSide').innerText = 'Course Code: ' + doc.data().courseCode;
            document.getElementById('titleSide').innerText = 'Transcript Title: ' + doc.data().title;
            document.getElementById('prioritySide').innerText = 'Transcript Priority: ' + doc.data().priority;
            document.getElementById('locationSide').innerText = 'Location in Course: ' + doc.data().lmsURL;
            document.getElementById('mediaSide').innerText = 'Media URL: ' + doc.data().srcURL;
            var priorCompletion = document.getElementById('priorCompletionBox').checked ? 'Transcript Previously Done' : 'New Transcript'
            document.getElementById('priorCompletionSide').innerText = 'Prior Completion: ' + priorCompletion;
            // document.getElementById('verbitUsed').innerText = 'Verbit ID: ' + 
            document.getElementById('storeTranscriptID').innerText = transcriptID;
            document.getElementById('storeUserID').innerText = userID;
            document.getElementsByClassName('code');
            if (doc.data().type != 'Transcript') {
                document.getElementById('embeddedCode').classList.add('hide');
                document.getElementById('hideVerbit').classList.add('hide');
                document.getElementById('getVerbitId').classList.add('hide');
            } else { 

            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

//handles change as the user says if the transcript has been checked for prior completion
function updateCompletionRight() {
    var priorCompletion = document.getElementById('priorCompletionBox').checked ? 'Transcript Previously Done' : 'New Transcript'
    document.getElementById('priorCompletionSide').innerText = 'Prior Completion: ' + priorCompletion;
}
//If verbit is checked through the user or through request 
//input from firestore, allows the  verbit IDinput to be enabled
document.getElementById('check-verbit-checked').addEventListener('change', () => {
    if (document.getElementById('check-verbit-checked').checked) {
        document.getElementById('getVerbitId').disabled = false;
    } else {
        document.getElementById('getVerbitId').disabled = true;
    }
})

//when the user submits prep transcript, doest all the necessary checking and takes the user back to the list of transcritps to be preped
document.getElementById('requestSubmit').addEventListener('click', () => {
    //first thing we want to check if all information required was added correctly
    //to make the code cleaner, we will add a variable name for some documents
    var docEdit = document.getElementById('googleDocEdit');
    var docPublished = document.getElementById('googleDocPublish');
    var verbit = document.getElementById('check-verbit-checked');
    var verbitID = document.getElementById('getVerbitId');
    var placed = document.getElementById('placeHolderCheckbox');
    if (docEdit.value == '' || docPublished.value == '' || !placed.checked) {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
    } else {
        var id = document.getElementById('storeTranscriptID').innerText;
        db.collection('accessibility').doc(id).update({
                status: 'Ready for Transcription',
                docEditURL: docEdit.value,
                docPublishURL: docPublished.value,
                verbitID: verbitID.value,
                verbit: verbit.checked
            })
            .then(() => {
                var idUser = document.getElementById('storeUserID').innerText;
                db.collection('users').doc(idUser).update({
                        currentAction: '',
                        actionID: ''
                    })
                    .then(() => {
                        searchPrepPage.classList.remove('hide');
                        doPrepPage.classList.add('hide');
                        fillPrepTableStart();
                    })

            })

    }


})
// fill the prep table with available transcripts

function fillPrepTableStart() {
    db.collection("accessibility").where('status', '==', 'Ready for Prep').orderBy('priority').get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var p = `<p> ${doc.data().priority}</p> <p>${doc.data().courseCode}</p> <p>${doc.data().type}</p>
                    <p>${doc.data().title}</p>  <button onclick="displayPrepareModal('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                    Prepare</button>`;
                document.getElementById('prep-table').insertAdjacentHTML('beforeend', p);
            })
        })
}

function fillPrepTable(selectedCourseCode) {
    document.getElementById('prep-table').innerHTML = '';
    db.collection("accessibility").where('status', '==', 'Ready for Prep').orderBy('priority').get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (selectedCourseCode == doc.data().courseCode) {
                    var p = `<p> ${doc.data().priority}</p> <p>${doc.data().courseCode}</p> <p>${doc.data().type}</p>
                        <p>${doc.data().title}</p>  <button onclick="displayPrepareModal('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                        Prepare</button>`;
                    document.getElementById('prep-table').insertAdjacentHTML('beforeend', p);
                } else {

                }
            })
        })
}


//get courses for the drop down menu
getCourses();

function getCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            var res = JSON.parse(this.responseText);
            var id = res._id;
            var newxhttp = new XMLHttpRequest();
            newxhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status === 200) {
                    var newres = JSON.parse(this.responseText);
                    for (var i = 0; i < newres.length; i++) {
                        var course = newres[i]['__catalogCourseId'];
                        document.getElementById('requestCourse').insertAdjacentHTML('beforeend', '<option value=\'' + course + '\'>' + course + '</option>');
                    }
                }
            };
            newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
            newxhttp.send();
        }
    };
    xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
    xhttp.send();
}

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = '';
        message.style.color = 'black';
    }, 3000);
}

function secondsToHms(d) {
    d = Number(d);

    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    if (h == 0) {
        return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    } else {
        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }
}

//generates the code to the user, according to the media url received
function showCodeEmbedded() {
    var transcriptID = document.getElementById('storeTranscriptID').innerText;
    getModal();
    db.collection('accessibility').doc(transcriptID).get()
    .then(function(doc) {
        var link, height, seconds, title, pubLink;
        link = doc.data().srcURL;
        height = doc.data().videoHeight;
        seconds = doc.data().videoLenght;
        title = doc.data().title;
        pubLink = doc.data().docPublishURL;
        var setlink = pubLink;
        var time = secondsToHms(seconds);
        if (link.includes("youtube")) {
            var id = link.slice(link.indexOf("watch?v=") + 8, (link.indexOf("watch?v=") + 9) + 11);
            // console.log(id);
            var html = `<p><iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>
                        (${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
            document.getElementById('codehtml').innerText = html;
    
            var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
            document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
        } else if (link.includes("youtu.be")) {
            var id = link.slice(link.indexOf(".be/") + 4, (link.indexOf(".be/") + 4) + 11);
            // console.log(id);
            var html = `<p><iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>
                        (${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
            document.getElementById('codehtml').innerText = html;
    
            var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
            document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
        } else if (link.includes("video.byui.edu")) {
            var id = link.slice(link.indexOf("/0_") + 1, (link.indexOf("/0_") + 1) + 10);
            // console.log(id);
            var html = `<p><iframe id="kaltura_player_1534785808" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" width="560" height="${height}" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0"></iframe><br>
                         (${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
            document.getElementById('codehtml').innerText = html;
    
            var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
            document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
        } else if (link.includes("vimeo")) {
            var id = link.slice(link.indexOf("vimeo.com/") + 10, (link.indexOf("vimeo.com/") + 10) + 9);
            // console.log(id);
            var html = `<p><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" width="560" height="${height}px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br>
            (${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
            document.getElementById('codehtml').innerText = html;
    
            var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
            document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
        } else if (link.includes("fod.infobase.com")) {
            var id = link.slice(link.indexOf("loid=") + 5, (link.indexOf("loid=") + 5) + 5);
            // console.log(id);
            var html = `<p><iframe allow='encrypted-media' height='${height}' frameborder='0' width='560' style='border: 1px solid #ddd;'  src='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' allowfullscreen >&nbsp;</iframe><br>
                         (${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
            document.getElementById('codehtml').innerText = html;
    
            var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
            document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
        } else {
            var html = `<p><a href='${link}' target="_blank">Go to this link and get the embed code to place</a><br>
            Copy the rest of this and place it in with the embed in a single p tag<br>
            (${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
            document.getElementById('codehtml').innerText = html;
        }
    })
}

function showCodeLink() {
    var transcriptID = document.getElementById('storeTranscriptID').innerText;
    console.log(transcriptID);
    getModal();
  

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