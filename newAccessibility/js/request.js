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
//it also checks if the transcript is a duplicate. if it is, brings necessary information over.
async function submitTranscriptRequest() {
    var requestType = document.getElementById('requestType').value;
    var title = document.getElementById('requestTitle').value.toUpperCase();
    var priority = document.getElementById('requestPriority').value;
    var course = document.getElementById('requestCourse').value;
    var lmsURL = document.getElementById('requestLMSURL').value;
    var srcURL = document.getElementById('requestVideoURL').value;
    // var videoLength = document.getElementById('requestLength').value;
    // var videoHeight = document.getElementById('requestHeight').value;
    // var softwareUsed = document.getElementById('requestExternalSoftware').checked;
    var comments = document.getElementById('requestComments').value;

    console.log("before");
    try {
        var parentObject = await generateParentObject(srcURL);
    } catch (err) {
        console.error(err);
    }
    console.log(parentObject);
    console.log("After");
    
    if (requestType === 'Request Type' || title === '' || priority === 'Priority' || course === 'Course' || lmsURL === '' || srcURL === '') {
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
            type: requestType,
            priority: priority,
            courseCode: course,
            lmsURL: lmsURL,
            srcURL: srcURL,
            requestor: user.displayName,
            requestDate: new Date(),
            status: 'Ready for Prep',
            requestNotes: comments + `. Comment made by: ${user.displayName}`
        }
        // Add a new document in collection "accessibility"
        var finalObject = Object.assign(docData, parentObject);
        console.log(finalObject);
        db.collection('accessibility').add(finalObject)
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
                document.getElementById('requestComments').value = '';
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
}

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

//Calculates the total of time in seconds according 
//to user's input for the transcript selected
function generateParentObject(videoURL) {
    return new Promise((resolve, reject) => {
    db.collection('accessibility').where('srcURL', '==', videoURL).where('parentTranscript', "==", true).get()
        .then(function (querySnapshot) {
            if (querySnapshot.size == 1) {
                querySnapshot.forEach(doc => {
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
                    // returns the object
                resolve(object);
                });
            } else if (querySnapshot.size == 0) {
                object = {
                    parentTranscript: true,
                    copied: false
                }
                 resolve(object);
            }
        }, err => {
            reject(err);
        });
    });
}
