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
    db.collection("accessibility").orderBy('priority').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().type}`);
                if (doc.data().placed == undefined) {
                    if (doc.data().type == "Transcript") {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span><a href="${doc.data().srcURL}" target="_blank">Video URL</a></span><span><a href="${doc.data().lmsURL}" target="_blank">Canvas URL</a></span><span><a href="${doc.data().srcURL}" target="_blank">Video URL</a></span><button onclick="placeCheck('${doc.id}')">Place</button>`;
                    }
                    if (doc.data().type == "Alt Text") {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span><a href="${doc.data().srcURL}" target="_blank">Video URL</a></span><span><a href="${doc.data().lmsURL}" target="_blank">Canvas URL</a></span><span></span><button onclick="placeCheck('${doc.id}')">Place</button>`;
                    }
                    document.getElementById('text').insertAdjacentHTML('beforeend', text);
                }
            });
        });
}

function placeCheck(docId) {
    modal.style.display = "block";
    db.collection('accessibility').doc(docId).get().then((doc) => {
        var html = `<p id="intro">Has "${doc.data().title}" been correctly placed in ${doc.data().courseCode}?</p>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
        var html = `<div id="buttons"><button id="placeButton" onclick="updateDocToFB('` + docId + `')">Yes</button><button id="cancelButton" onclick="cancel()">No</button></p>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    })
}

function updateDocToFB(docId) {
    db.collection('accessibility').doc(docId).update({
            placed: true
        })
        .then(function () {
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error updating document: ', error);
            message.innerHTML = 'There was an error making the request. Please try again.';
            message.style.color = 'red';
            resetMessage();
        });
    modal.style.display = "none";
    document.getElementById('buttons').parentNode.removeChild(document.getElementById('buttons'));
    document.getElementById('intro').parentNode.removeChild(document.getElementById('intro'));
    document.getElementById('modal-message').innerHTML = "";
}

// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('buttons').parentNode.removeChild(document.getElementById('buttons'));
    document.getElementById('intro').parentNode.removeChild(document.getElementById('intro'));
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('buttons').parentNode.removeChild(document.getElementById('buttons'));
        document.getElementById('intro').parentNode.removeChild(document.getElementById('intro'));
    }
}

function cancel() {
    modal.style.display = "none";
    document.getElementById('buttons').parentNode.removeChild(document.getElementById('buttons'));
    document.getElementById('intro').parentNode.removeChild(document.getElementById('intro'));
}