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


//once the user requests a transcript, this makes sure that the transcript is filled out correctly and thoroughly
//it also checks if the transcript is a duplicate. if it is, brings necessary information over.
async function submitTranscriptRequest() {
    var requestType = document.getElementById('requestType').value;
    var title = document.getElementById('requestTitle').value;
    var priority = document.getElementById('requestPriority').value;
    var course = document.getElementById('requestCourse').value;
    var lmsURL = document.getElementById('requestLMSURL').value;
    var srcURL = document.getElementById('requestVideoURL').value;
    var comments = document.getElementById('requestComments').value;
    // var videoLength = document.getElementById('requestLength').value;
    // var videoHeight = document.getElementById('requestHeight').value;
    // var softwareUsed = document.getElementById('requestExternalSoftware').checked;
    console.log("before");
    try {
        var parentObject = await generateParentObject(srcURL);
    } catch (err) {
        console.error(err);
    }
    console.log(parentObject);
    console.log(userObject);
    console.log("After");

    if (course == 'Course Code' || requestType == 'Transcript Type' || requestType === 'Request Type' || title === '' || priority === 'Priority' || course === 'Course' || lmsURL === '' || srcURL === '') { 
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else {
        var user = firebase.auth().currentUser;

        var docData = {
            title: String(title),
            docPublishURL: String(''),
            docEditURL: String(''),
            type: String(requestType),
            priority: Number(priority),
            courseCode: String(course),
            lmsURL: String(lmsURL),
            height: Number(''),
            length: Number(''),
            srcURL: String(srcURL),
            requestor: String(user.displayName),
            requestDate: new Date(),
            verbit: Boolean(''),
            verbitID: String(''),
            status: String('Ready for Prep'),
            requestNotes: comments + `. Comment made by: ${user.displayName}`,
        }
        // Add a new document in collection "accessibility"
        var finalObject = Object.assign(docData, parentObject);
        console.log(finalObject);
        db.collection('accessibility').add(finalObject)
            .then(function (doc) {
                console.log('Document written with ID: ', doc.id);
                message.innerHTML = 'Request has been made.';
                message.style.color = 'blue';
                document.getElementById('transcript-box-info').classList.add('wobble-hor-bottom');
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
                            height: doc.data().height,
                            length: doc.data().length,
                            verbit: doc.data().verbit,
                            verbitID: doc.data().verbitID,
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



// Future Projects
function getRequestsNumber() {
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
        db.collection('users').where('name', "==", user.displayName).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    resolve({
                        requests: doc.data().requests,
                        userID: doc.id
                    });
                })
            })
    })
}