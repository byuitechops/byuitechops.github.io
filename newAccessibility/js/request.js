getCourses();

//the following functions are triggered on a onchange basis, to update the right side of the screen
// with the ticket information
function updateTitle(newTitle) {
    document.getElementById('titleSide').innerText = newTitle;
}

function updatePriority(newPriority) {
    document.getElementById('prioritySide').innerText = newPriority;
}

function updateType(newType) {
    document.getElementById('typeSide').innerText = newType;
}

function updateCode(newCode) {
    document.getElementById('codeSide').innerText = newCode;
}

function updateLocation(newLocation) {
    document.getElementById('locationSide').innerText = newLocation;
}

//according to the request type, displays or hide specific input boxes 
document.getElementById('requestType').addEventListener('change', function () {
    if (document.getElementById('requestType').value === 'Transcript') {
        document.getElementById('time-calculator').classList.remove('soft-hide');
        document.getElementById('requestLength').classList.remove('soft-hide');
        document.getElementById('verbit').classList.remove('soft-hide');
        document.getElementById('requestHeight').classList.remove('hide');
    } else if (document.getElementById('requestType').value === 'Audio') {
        document.getElementById('time-calculator').classList.remove('soft-hide');
        document.getElementById('verbit').classList.remove('soft-hide');
    } else {
        document.getElementById('time-calculator').classList.add('soft-hide');
        document.getElementById('verbit').classList.add('soft-hide');
        document.getElementById('requestHeight').classList.add('hide');
    }
});
//once the user requests a transcript, this makes sure that the transcript is filled out correctly and thoroughly
document.getElementById('requestSubmit').addEventListener('click', function () {
    var requestType = document.getElementById('requestType').value;
    var title = document.getElementById('requestTitle').value.toUpperCase();
    var priority = document.getElementById('requestPriority').value;
    var course = document.getElementById('requestCourse').value;
    var lmsURL = document.getElementById('requestLMSURL').value;
    var srcURL = document.getElementById('requestVideoURL').value;
    var videoLength = document.getElementById('requestLength').value;
    var videoHeight = document.getElementById('requestHeight').value;
    var softwareUsed = document.getElementById('requestExternalSoftware').checked;
    var comments = document.getElementById('requestComments').value;

    if (requestType === 'Request Type' || title === '' || priority === 'Priority' || course === 'Course' || lmsURL === '' || srcURL === '') {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else if (requestType === 'Transcript' && (videoLength === '' || videoHeight === '')) {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else if (requestType === 'Audio' && videoLength === '') {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else {
        var user = firebase.auth().currentUser;

        var docData = {
            title: title,
            docPublishURL: '',
            docEditURL: '',
            verbit: softwareUsed,
            verbitID: '',
            type: requestType,
            priority: priority,
            courseCode: course,
            lmsURL: lmsURL,
            srcURL: srcURL,
            requestor: user.displayName,
            requestDate: new Date(),
            status: 'Ready for Prep',
            copied: false,
            requestNotes: comments + `. Comment made by: ${user.displayName}`
        }

        if (requestType == "Transcript") {
            var extraInfo = {
                srcURL: srcURL,
                videoLength: videoLength,
                videoHeight: videoHeight,
            }
            var requestTranscript = Object.assign(extraInfo, docData)
        }


        if (requestType == "Audio") {
            var extraInfo = {
                videoLength: videoLength
            }
            var requestTranscript = Object.assign(extraInfo, docData)
        }

        if (requestType == "Alt Text" || requestType == "Slide") {
            var requestTranscript = Object.assign({}, docData)
        }

        // Add a new document in collection "accessibility"
        db.collection('accessibility').add(requestTranscript)
            .then(function (doc) {
                console.log('Document written with ID: ', doc.id);
                message.innerHTML = 'Request has been made.';
                message.style.color = 'blue';
                resetMessage();

                document.getElementById('requestType').options[0].selected = 'selected';
                document.getElementById('requestCourse').options[0].selected = 'selected';
                document.getElementById('requestTitle').value = '';
                document.getElementById('requestPriority').options[0].selected = 'selected';
                document.getElementById('requestLMSURL').value = '';
                document.getElementById('requestVideoURL').value = '';
                document.getElementById('requestLength').value = '';
                document.getElementById('requestHeight').value = '';
                document.getElementById('requestComments').value = '';
                document.getElementById('requestHeight').classList.add('hide');
                document.getElementById('time-calculator').classList.add('soft-hide');
                document.getElementById('verbit').classList.add('soft-hide');
                var elms = document.getElementsByClassName('description');
                console.log(elms);
                for (var i = 0; i < elms.length; i++) { 
                    elms[i].innerText = '--';
                }
                //updates the side of the document

            })
            .catch(function (error) {
                console.error('Error adding document: ', error);
                message.innerHTML = 'There was an error making the request. Please try again.';
                message.style.color = 'red';
                resetMessage();
            });
    }
});

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = '';
        message.style.color = 'black';
    }, 3000);
}

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

// Get the modal
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


//Calculates the total of time in seconds according 
//to user's input for the transcript selected
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
    total = (hours * 60 * 60) + (minutes * 60) + (seconds * 1);
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

function revealModalCalc() {
    document.getElementById('myModal').style.display = 'block';
}

function checkForDuplicates(videoURL) {
    //first let's receive into a variable the link used in this media
    db.collection('accessibility').where('srcURL', '==', videoURL).where('parentTranscript', "==", true).get()
        .then(function (querySnapshot) {
            if (querySnapshot.size == 1 && !copied[0]) {
                querySnapshot.forEach(function (doc) {
                    object = {
                        title: doc.data().title,
                        type: doc.data().type,
                        docEditURL: doc.data().docEditURL,
                        docPublishURL: doc.data().docPublishURL,
                        videoHeight: doc.data().videoHeight,
                        videoLength: doc.data().videoLength,
                        verbit: doc.data().verbit,
                        parentTranscript: false,
                        copied: true,
                        copiedFrom: doc.id
                    }
                    //lets assign object to a empty object as a push, so it saves whatever we set it to
                    Object.assign(object, copyObject);
                    console.log(object);
                    return true;
                })
            } else {
                return false;
            }
            //{ parentTranscript: true, copied: false }
        })
}






function update() {
    let promise = new Promise(function (resolve, reject) {

        resolve(
            db.collection('accessibility').doc('7nlnHstuffaFSvcuyHwX').get()
            .then(function (doc) {
                console.log(doc);
            }))

    })
    promise.then(
        result => console.log('yaya'),
        error => console.log('didnt work'));
}
