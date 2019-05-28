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
        }
        try {
            var parentObject = await generateParentObject(srcURL);
        } catch (err) {
            console.error(err);
        }
        if (override) {
            createRecord(parentObject, docData);
            override = false;
        } else if (parentObject.parentTranscript) {
            createRecord(parentObject, docData);
        } else {
            if (docData.type === parentObject.type) {
                foundDup(parentObject);

            }
        }
    }
}

function createRecord(parentObject, docData) {
    // Add a new document in collection "accessibility"
    var finalObject = Object.assign(docData, parentObject);
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

    showCodeEmbedded();
    showCodeLink();
});

$(overrideBtn).click(async () => {
    override = true;
    // submitTranscriptRequest();
    $(dupField).addClass("hide");
    console.log("Hello There");
    docID = [];
});

$(dupFinishedBtn).click(() => {
    $(dupLinks).addClass("hide");
    dupLinks
    resetFields();
    docID = [];
});

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


//generates the code to the user, according to the media url received
function showCodeEmbedded() {
    db.collection('accessibility').doc(docID[0]).get()
        .then(function (doc) {
            
            var link, height, seconds, title, title;
            title = doc.data().title
            link = doc.data().srcURL;
            height = 315;
            seconds = Number(doc.data().length);
            

            var setlink = doc.data().docPublishURL;
            var time = secondsToHms(seconds);

            if (link.includes("youtube")) {
                var id = link.slice(link.indexOf("watch?v=") + 8, (link.indexOf("watch?v=") + 9) + 11);
                var html = `<iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)`;
                $(placeEmbeded).html(String(html));


            } else if (link.includes("youtu.be")) {
                var id = link.slice(link.indexOf(".be/") + 4, (link.indexOf(".be/") + 4) + 11);
                var html = `<iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)`;
                $(placeEmbeded).html(String(html));

            } else if (link.includes("video.byui.edu")) {
                var id = link.slice(link.indexOf("/0_") + 1, (link.indexOf("/0_") + 1) + 10);
                var html = `<iframe id="kaltura_player_1534785808" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" width="560" height="${height}" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0"></iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)`;
                $(placeEmbeded).html(String(html));

            } else if (link.includes("vimeo")) {
                var id = link.slice(link.indexOf("vimeo.com/") + 10, (link.indexOf("vimeo.com/") + 10) + 9);
                var html = `<iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" width="560" height="${height}px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br>
            (${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)`;
                $(placeEmbeded).html(String(html));

            } else if (link.includes("fod.infobase.com")) {
                var id = link.slice(link.indexOf("loid=") + 5, (link.indexOf("loid=") + 5) + 5);
                var html = `<iframe allow='encrypted-media' height='${height}' frameborder='0' width='560' style='border: 1px solid #ddd;'  src='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' allowfullscreen >&nbsp;</iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)`;
                $(placeEmbeded).html(String(html));

            } else {
                var html = `<a href='${link}' target=_blank>Go to this link and get the embed code to place</a><br>Copy the rest of this and place it in with the embedded in a single p tag<br>(${time} mins, <a href=${setlink} target=_blank>${title} Transcript</a>)`;
                $(placeEmbeded).html(String(html));
            }
        });
}

function showCodeLink() {
    db.collection('accessibility').doc(docID[0]).get()
        .then(function (doc) {
           
            var link, seconds, title, title;
            title = doc.data().title
            link = doc.data().srcURL;
            seconds = Number(doc.data().length);
            

            var setlink = doc.data().docPublishURL;
            var time = secondsToHms(seconds);

            if (link.includes("youtube")) {
                var id = link.slice(link.indexOf("watch?v=") + 8, (link.indexOf("watch?v=") + 9) + 11);
                var html = `<p><a href="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                $(placeLink).html(String(html));
            } else if (link.includes("youtu.be")) {
                var id = link.slice(link.indexOf(".be/") + 4, (link.indexOf(".be/") + 4) + 11);
                var html = `<p><a href="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                $(placeLink).html(String(html));
            } else if (link.includes("video.byui.edu")) {
                var id = link.slice(link.indexOf("/0_") + 1, (link.indexOf("/0_") + 1) + 10);
                var html = `<p><a href="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                $(placeLink).html(String(html));
            } else if (link.includes("vimeo")) {
                var id = link.slice(link.indexOf("vimeo.com/") + 10, (link.indexOf("vimeo.com/") + 10) + 9);
                var html = `<p><a href="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0 target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                $(placeLink).html(String(html));
            } else if (link.includes("fod.infobase.com")) {
                var id = link.slice(link.indexOf("loid=") + 5, (link.indexOf("loid=") + 5) + 5);
                var html = `<p><a href='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                $(placeLink).html(String(html));
            } else {
                var html = `<p><a href='${link}' target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                $(placeLink).html(String(html));
            }
        })
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