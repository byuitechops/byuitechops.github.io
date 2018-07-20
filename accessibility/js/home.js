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
        getTheData(user);
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

function getTheData(user) {
    // Get Data
    var data = db.collection("accessibility").where("transcriber", "==", user.displayName).where("status", "==", "Transcript in Progress").orderBy('priority').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data().type}`);
                if (doc.data().transcriber != null || doc.data().transcriber != undefined) {
                    if (doc.data().docURL == undefined) {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span><button onclick="updateDocUrl('${doc.id}')">Update Doc Link</button></span><button onclick="finishItem('${doc.id}')">Finish</button>`;
                    } else {
                        var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().docURL}</span><button onclick="finishItem('${doc.id}')">Finish</button>`;
                    }
                    document.getElementById('text').insertAdjacentHTML('beforeend', text);
                }
            });
        });
}

function finishItem(docId) {
    var user = firebase.auth().currentUser;
    db.collection('accessibility').doc(docId).update({
            status: "Ready for Review"
        })
        .then(function () {
            window.location.replace('home.html');
        })
        .catch(function (error) {
            console.error('Error updating document: ', error);
            message.innerHTML = 'There was an error making the request. Please try again.';
            message.style.color = 'red';
            resetMessage();
        });
}

function updateDocUrl(docId) {
    modal.style.display = "block";
    var html = `<button id="updateButton" onclick="updateDocToFB('` + docId + `')">Update</button>`;
    document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
}

function updateDocToFB(docId) {
    var url = document.getElementById('docUrlInput').value;
    if (url != "") {
        db.collection('accessibility').doc(docId).update({
                docURL: url
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
        document.getElementById('modal-message').innerHTML = "Please enter the url";
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
}