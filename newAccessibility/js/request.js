'use strict';
getCourses();

var dupInfoTitle = document.getElementById("dup-info-title");
var dupInfoCode = document.getElementById("dup-info-code");
var dupInfoType = document.getElementById("dup-info-type");
var dupInfoPriority = document.getElementById("dup-info-priority");
var dupInfoTranscript = document.getElementById("dup-info-transcript");
var dupInfoMedia = document.getElementById("dup-info-media");
var newInfoTitle = document.getElementById("new-info-title");
var newInfoCode = document.getElementById("new-info-code");
var newInfoType = document.getElementById("new-info-type");
var newInfoPriority = document.getElementById("new-info-priority");
var newInfoTranscript = document.getElementById("new-info-transcript");
var newInfoMedia = document.getElementById("new-info-media");
var dupField = document.getElementById("dup");
var dupBtn = document.getElementById("dupBtn");
var overrideBtn = document.getElementById("overrideBtn");
var cancelBtn = document.getElementById("cancelBtn");
var placeEmbeded = document.getElementById("place-transcript-embeded");
var placeLink = document.getElementById("place-direct-link");
var dupFinishedBtn = document.getElementById("dupFinishedBtn");
var dupLinks = document.getElementById("dupLinks");
var override = false;
var docID = [];


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
    let requestType = document.getElementById('requestType').value;
    let title = document.getElementById('requestTitle').value;
    let priority = document.getElementById('requestPriority').value;
    let course = document.getElementById('requestCourse').value;
    let lmsURL = document.getElementById('requestLMSURL').value;
    let srcURL = document.getElementById('requestVideoURL').value;
    let comments = document.getElementById('requestComments').value;
    let requestorName = document.getElementById('guestName').value;
    // var videoLength = document.getElementById('requestLength').value;
    // var videoHeight = document.getElementById('requestHeight').value;
    // var softwareUsed = document.getElementById('requestExternalSoftware').checked;
    if (course == 'Course Code' || requestType == 'Transcript Type' || requestType === 'Request Type' || title === '' || priority === 'Priority' || course === 'Course' || lmsURL === '' || srcURL === '') {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else {
        var user = firebase.auth().currentUser;
        if (user.isAnonymous) {
            var docData = {
                title: String(title),
                docPublishURL: String(''),
                docEditURL: String(''),
                type: String(requestType),
                priority: Number(priority),
                backupCode: String(course),
                courseCode: [String(course)],
                lmsURL: String(lmsURL),
                height: Number(''),
                length: Number(''),
                srcURL: String(srcURL),
                requestor: String(requestorName),
                requestDate: new Date(),
                verbit: Boolean(''),
                verbitID: String(''),
                status: String('Ready for Prep'),
                requestNotes: comments + `. Comment made by: ${requestorName}`,
                guestCreated: true
            }
        } else {
            var docData = {
                title: String(title),
                docPublishURL: String(''),
                docEditURL: String(''),
                type: String(requestType),
                priority: Number(priority),
                backupCode: String(course),
                courseCode: [String(course)],
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
                guestCreated: false
            } 
        }
        try {
            var parentObject = await generateParentObject(srcURL, docData.type);
        } catch (err) {
            console.error(err);
        }
        if (override) {
            createRecord(docData);
            override = false;
            return;
        } else if (!parentObject.parentTranscript) {
            foundDup(parentObject);
            return;
        } 
        createRecord(docData);

    }
}

function createRecord(docData) {
    // Add a new document in collection "accessibility"
    let object = {
        parentTranscript: true,
        copied: false
    }
    var finalObject = Object.assign(docData, object);
    db.collection('accessibility').add(finalObject)
        .then(() => {
            resetFields();
            //updates the side of the document
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
            message.innerHTML = 'There was an error making the request. Please try again.';
            message.style.color = 'red';
            resetMessage();
        });
}

function resetFields() {
    message.innerHTML = 'Request has been made.';
    message.style.color = 'blue';
    document.getElementById('transcript-box-info').classList.add('wobble-hor-bottom');
    resetMessage();
    document.getElementById('requestType').options[0].selected = 'selected';
    document.getElementById('requestTitle').value = '';
    document.getElementById('requestVideoURL').value = '';
    document.getElementById('requestComments').value = '';
    var elms = document.getElementsByClassName('description');
    console.log(elms);
    for (var i = 0; i < elms.length; i++) {
        elms[i].innerText = '--';
    }
}

function foundDup(dup) {
    let type = document.getElementById('requestType').value;
    let title = document.getElementById('requestTitle').value;
    let priority = document.getElementById('requestPriority').value;
    let course = document.getElementById('requestCourse').value;
    let srcURL = document.getElementById('requestVideoURL').value;
    $(dupInfoTitle).html(dup.title);
    $(dupInfoCode).html(dup.courseCode);
    $(dupInfoType).html(dup.type);
    $(dupInfoPriority).html(dup.priority);
    $(dupInfoTranscript).html(`<a href=${dup.docEditURL}>${dup.docEditURL}</a>`);
    $(dupInfoMedia).html(`<a href=${dup.srcURL}>${dup.srcURL}</a>`);
    $(newInfoTitle).html(title);
    $(newInfoCode).html(course);
    $(newInfoType).html(type);
    $(newInfoPriority).html(priority);
    $(newInfoTranscript).html("None yet");
    $(newInfoMedia).html(`<a href=${srcURL}>${srcURL}</a>`);
    $(dupField).removeClass("hide");
}

$(dupBtn).click(async () => {
    let newCode = $(newInfoCode).html();
    db.collection('accessibility').doc(docID[0]).update({
        courseCode: firebase.firestore.FieldValue.arrayUnion("" + newCode)
    });
    $(dupField).addClass("hide");
    $(dupLinks).removeClass("hide");

    code();
});

$(overrideBtn).click(async () => {
    override = true;
    submitTranscriptRequest();
    $(dupField).addClass("hide");
});

$(cancelBtn).click(async () => {
    $(dupField).addClass("hide");
});

$(dupFinishedBtn).click(() => {
    $(dupLinks).addClass("hide");
    dupLinks
    resetFields();
});

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = '';
        message.style.color = 'black';
    }, 3000);
}

//Calculates the total of time in seconds according 
//to user's input for the transcript selected
function generateParentObject(videoURL, type) {
    return new Promise((resolve, reject) => {
        db.collection('accessibility').where('srcURL', '==', videoURL).where('type', '==', type).where('parentTranscript', "==", true).get()
            .then(function (querySnapshot) {
                if (querySnapshot.size >= 1) {
                    querySnapshot.forEach(doc => {
                        docID = [];
                        docID.push(doc.id);
                        let object = {
                            title: doc.data().title,
                            courseCode: doc.data().courseCode,
                            srcURL: doc.data().srcURL,
                            type: doc.data().type,
                            docEditURL: doc.data().docEditURL,
                            docPublishURL: doc.data().docPublishURL,
                            priority: doc.data().priority,
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

                    let object = {
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


//generates the code to the user, according to the media url received
function code() {
    db.collection('accessibility').doc(docID[0]).get()
        .then((doc) => {
            let title = doc.data().title
            var setlink = doc.data().docPublishURL;
            var time = secondsToHms(Number(doc.data().length));

            var html = `(${time} mins, <a href=${setlink} target=_blank>${title} Transcript</a>)`;
            $(placeEmbeded).html(String(html));
        });
}

var checkIfGuest = (async () => {
    console.log(firebase.auth().currentUser.isAnonymous);
    var isAnonymous = await firebase.auth().currentUser.isAnonymous;
    if (isAnonymous) {
        var guestName = document.getElementById("guestName");
        $(guestName).removeClass('hide');
    }
});



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
                });
            });
    });
};