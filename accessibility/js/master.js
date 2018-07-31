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
                    if (userData.role != "Admin") {
                        window.location.assign('home.html');
                        document.getElementById('master').classList.add('hide');
                    }
                    getData(userData);
                })
            })
    } else {
        // No user is signed in.
        window.location.assign('home.html');
    }
});

// Get Data
function getData(userData) {
    db.collection("accessibility").orderBy('title').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().title}`);
            var text = `<span>${doc.data().type}</span>
                        <span>${doc.data().title}</span>
                        <span>${doc.data().docURL}</span>
                        <span>${doc.data().courseCode}</span>
                        <button onclick="viewItem('${doc.id}')">View</button>`;
            document.getElementById('text').insertAdjacentHTML('beforeend', text);
        });
    });
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

function viewItem(docId) {
    modal.style.display = "block";

    db.collection("accessibility").doc(docId).get()
        .then((doc) => {
            console.log(doc.data());
            var html;
            if (doc.data().type == "Transcript") {
                html = `<p>Type: ${doc.data().type}</p>
                        <p>Title: ${doc.data().title}</p>
                        <p>Doc URl: ${doc.data().docURL}</p>
                        <p>Course Code: ${doc.data().courseCode}</p>
                        <p>Copyeditor: ${doc.data().copyeditor}</p>
                        <p>Canvas URl: ${doc.data().lmsLink}</p>
                        <p>Prority: ${doc.data().priority}</p>
                        <p>Request Date: ${doc.data().requestDate.toDate()}</p>
                        <p>Requestor: ${doc.data().requestor}</p>
                        <p>Review Finished: ${doc.data().reviewFinished.toDate()}</p>
                        <p>Source URL: ${doc.data().srcURL}</p>
                        <p>Status: ${doc.data().status}</p>
                        <p>Transcriber: ${doc.data().transcriber}</p>
                        <p>Transcript Claimed: ${doc.data().transcriptClaimed}</p>
                        <p>Transcript Finished: ${doc.data().transcriptFinished}</p>
                        <p>Video Height: ${doc.data().videoHeight}</p>
                        <p>Video Length: ${doc.data().videoLength}</p>
                        <p>Review Claimed: ${doc.data().videoLength}</p>
                        <p>Week: ${doc.data().week}</p>`;
            }

            if (doc.data().type == "Alt Text") {
                html = `<p>Type: ${doc.data().type}</p>
                <p>Title: ${doc.data().title}</p>
                <p>Doc URl: ${doc.data().docURL}</p>
                <p>Course Code: ${doc.data().courseCode}</p>
                <p>Copyeditor: ${doc.data().copyeditor}</p>
                <p>Canvas URL: ${doc.data().lmsLink}</p>
                <p>Prority: ${doc.data().priority}</p>
                <p>Request Date: ${doc.data().requestDate.toDate()}</p>
                <p>Requestor: ${doc.data().requestor}</p>
                <p>Status: ${doc.data().status}</p>
                <p>Copyedit Claimed: ${doc.data().copyeditClaimed.toDate()}</p>
                <p>Copyedit Finished: ${doc.data().copyeditFinished.toDate()}</p>
                <p>Week: ${doc.data().week}</p>`;
            }

            document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
        })
}