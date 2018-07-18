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
    } else {
        // No user is signed in.
        window.location.assign('index.html');
    }
});

var message = document.getElementById('message');

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = '';
        message.style.color = 'black';
    }, 10000);
}

// Get Data
db.collection("accessibility").orderBy('priority').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().title}`);
        if (doc.data().transcriber == null || doc.data().transcriber == undefined) {
            if (doc.data().type == "Transcript") {
                var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().videoLength}</span><button onclick="claimItem('${doc.id}')">Claim</button>`;
            } else {
                var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span></span><button onclick="claimItem('${doc.id}')">Claim</button>`;
            }
            document.getElementById('text').insertAdjacentHTML('beforeend', text);
        }
    });
});

function claimItem(docId) {
    var user = firebase.auth().currentUser;
    db.collection('accessibility').doc(docId).update({
            transcriber: user.displayName
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