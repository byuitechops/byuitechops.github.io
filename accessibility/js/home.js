// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWv05RlAPUpAts6LNXgG5-wsdhd9jXafg",
    authDomain: "byui-accessability.firebaseapp.com",
    databaseURL: "https://byui-accessability.firebaseio.com",
    projectId: "byui-accessability",
    storageBucket: "byui-accessability.appspot.com",
    messagingSenderId: "275383619900"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = { /* your settings... */
    timestampsInSnapshots: true
};
db.settings(settings);


// Check if Logged In
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        db.collection('users').where('name', "==", user.displayName).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var userData = doc.data();
                    if (userData.role != "Copyedit") {
                        document.getElementById('place').classList.remove('hide');
                    }
                    if (userData.role == "Admin" || userData.role == "Techops" || userData.role == "Lead") {
                        document.getElementById('master').classList.remove('hide');
                    }
                    getData(userData);
                })
            })
    } else {
        // No user is signed in.
        window.location.assign('index.html');
    }
});

// Logout of firebase and website
document.getElementById('btnLogout').addEventListener('click', function () {
    firebase.auth().signOut();
});

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = "";
        message.style.color = "black";
    }, 10000);
}

function getData(userData) {
    // Get Data
    if (userData.role == "Techops" || userData.role == "Lead" || userData.role == "Admin") {
        db.collection("accessibility").where("transcriber", "==", userData.name).where("status", "==", "Transcript in Progress").orderBy('priority').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data().type}`);
                    if (doc.data().docURL == undefined) {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span><button onclick="updateDocUrl('${doc.id}')">Update Doc Link</button></span><span><a href="${doc.data().lmsURL}" target="_blank">Canvas Link</a></span><span><a href="${doc.data().srcURL}" target="_blank">Video URL</a></span><button onclick="finishItem('${doc.id}')">Finish</button><button id="sendReport" onclick="reportProblem('${doc.id}')">Report Problem</button>`;
                    } else {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span><a href="${doc.data().docURL}" target="_blank">Doc Link</a></span><span><a href="${doc.data().lmsURL}" target="_blank">Canvas Link</a></span><span><a href="${doc.data().srcURL}" target="_blank">Video URL</a></span><button onclick="finishItem('${doc.id}')">Finish</button><button id="sendReport" onclick="reportProblem('${doc.id}')">Report Problem</button>`;
                    }
                    document.getElementById('text').insertAdjacentHTML('beforeend', text);

                });
            });
    }

    if (userData.role == "Copyedit") {
        db.collection("accessibility").where("copyeditor", "==", userData.name).where("status", "==", "Review in Progress").orderBy('priority').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data().type}`);
                    if (doc.data().docURL == undefined) {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span><button onclick="updateDocUrl('${doc.id}')">Update Doc Link</button></span><span><a href="${doc.data().lmsURL}" target="_blank">Canvas Link</a></span><span><a href="${doc.data().srcURL}" target="_blank">Video URL</a></span><button onclick="finishItem('${doc.id}')">Finish</button><button id="sendReport" onclick="reportProblem('${doc.id}')">Report Problem</button>`;
                    } else {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span><a href="${doc.data().docURL}" target="_blank">Doc Link</a></span><span><a href="${doc.data().lmsURL}" target="_blank">Canvas Link</a></span><span><a href="${doc.data().srcURL}" target="_blank">Video URL</a></span><button onclick="finishItem('${doc.id}')">Finish</button><button id="sendReport" onclick="reportProblem('${doc.id}')">Report Problem</button>`;
                    }
                    document.getElementById('text').insertAdjacentHTML('beforeend', text);

                });
            });

        db.collection("accessibility").where("copyeditor", "==", userData.name).where("status", "==", "Transcript in Progress").orderBy('priority').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data().type}`);
                    if (doc.data().docURL == undefined) {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span><button onclick="updateDocUrl('${doc.id}')">Update Doc Link</button></span><span><a href="${doc.data().lmsURL}" target="_blank">Canvas Link</a></span><button onclick="finishItem('${doc.id}')">Finish</button><button id="sendReport" onclick="reportProblem('${doc.id}')">Report Problem</button>`;
                    } else {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span><a href="${doc.data().docURL}">Doc Link</a></span><span><a href="${doc.data().lmsURL}" target="_blank">Canvas Link</a></span><button onclick="finishItem('${doc.id}')">Finish</button><button id="sendReport" onclick="reportProblem('${doc.id}')">Report Problem</button>`;
                    }
                    document.getElementById('text').insertAdjacentHTML('beforeend', text);

                });
            });
    }
}

// Get the modal
var errorModal = document.getElementById('errorModal');
// Get the <span> element that closes the modal
var errorSpan = document.getElementsByClassName("close")[1];
// When the user clicks on <span> (x), close the modal
errorSpan.onclick = function () {
    errorModal.style.display = "none";
}

function reportProblem(docId) {
    document.getElementById('errorModal').style.display = "initial";
    var btn = document.getElementById('submitReport');
    btn.setAttribute('onclick', `submitReport('${docId}')`);
}

function submitReport(docId) {
    var note = document.getElementById('problem').value;
    db.collection('accessibility').doc(docId).update({
        status: "Error",
        errorNote: note
    }).then(() => {
        window.location.reload();
    })
}

function finishItem(docId) {
    var user = firebase.auth().currentUser;
    db.collection('users').where('name', "==", user.displayName).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var userData = doc.data();
                db.collection('accessibility').doc(docId).get().then((doc) => {
                    var type = doc.data().type;

                    if (userData.role == "Techops" || userData.role == "Lead" || userData.role == "Admin") {
                        db.collection('accessibility').doc(docId).update({
                                status: "Ready for Review",
                                transcriptFinished: new Date()
                            })
                            .then(function () {
                                window.location.replace('home.html');
                                // message.innerHTML = 'Request has been made.';
                                // message.style.color = 'blue';
                                // resetMessage();
                            })
                            .catch(function (error) {
                                console.error('Error updating document: ', error);
                                message.innerHTML = 'There was an error making the request. Please try again.';
                                message.style.color = 'red';
                                resetMessage();
                            });
                    }

                    if (userData.role == "Copyedit") {
                        if (type == "Transcript") {
                            db.collection('accessibility').doc(docId).update({
                                    status: "Finished",
                                    reviewFinished: new Date()
                                })
                                .then(function () {
                                    window.location.replace('home.html');
                                    // message.innerHTML = 'Request has been made.';
                                    // message.style.color = 'blue';
                                    // resetMessage();
                                })
                                .catch(function (error) {
                                    console.error('Error updating document: ', error);
                                    message.innerHTML = 'There was an error making the request. Please try again.';
                                    message.style.color = 'red';
                                    resetMessage();
                                });
                        }
                        if (type == "Alt Text") {
                            db.collection('accessibility').doc(docId).update({
                                    status: "Finished",
                                    copyeditFinished: new Date()
                                })
                                .then(function () {
                                    window.location.replace('home.html');
                                    // message.innerHTML = 'Request has been made.';
                                    // message.style.color = 'blue';
                                    // resetMessage();
                                })
                                .catch(function (error) {
                                    console.error('Error updating document: ', error);
                                    message.innerHTML = 'There was an error making the request. Please try again.';
                                    message.style.color = 'red';
                                    resetMessage();
                                });
                        }
                    }
                })
            })
        })
}

function updateDocUrl(docId) {
    modal.style.display = "block";
    var html = `<button id="updateButton" onclick="updateDocToFB('${docId}')">Update</button>`;
    document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
}

function updateDocToFB(docId) {
    var url = document.getElementById('docUrlInput').value;
    var url2 = document.getElementById('docUrlInput2').value;
    if (url != "" && url2 != "") {
        db.collection('accessibility').doc(docId).update({
                docURL: url,
                pubURL: url2           
            })
            .then(function () {
                window.location.replace('home.html');
                // message.innerHTML = 'Request has been made.';
                // message.style.color = 'blue';
                // resetMessage();
                document.getElementById('docUrlInput').value = "";
            })
            .catch(function (error) {
                console.error('Error updating document: ', error);
                message.innerHTML = 'There was an error making the request. Please try again.';
                message.style.color = 'red';
                resetMessage();
            });
        modal.style.display = "none";
        document.getElementById('updateButton').parentNode.removeChild(document.getElementById('updateButton'));
        document.getElementById('modal-message').innerHTML = "";
    } else {
        document.getElementById('modal-message').innerHTML = "Please enter both url's";
        document.getElementById('modal-message').style.color = "red";
    }
}

// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('updateButton').parentNode.removeChild(document.getElementById('updateButton'));
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('updateButton').parentNode.removeChild(document.getElementById('updateButton'));
    }

    if (event.target == errorModal) {
        errorModal.style.display = "none";
    }
}