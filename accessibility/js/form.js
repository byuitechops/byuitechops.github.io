// Initialize Firebase
var config = {
    apiKey: "AIzaSyA1wSzBn5dSx4LzQ03ucMFarhgwuaEy4J8",
    authDomain: "byui-accessibility.firebaseapp.com",
    databaseURL: "https://byui-accessibility.firebaseio.com",
    projectId: "byui-accessibility",
    storageBucket: "byui-accessibility.appspot.com",
    messagingSenderId: "144898821357"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Check if Logged In
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log(user);
    } else {
        // No user is signed in.
        window.location.assign('index.html');
    }
});

var message = document.getElementById('message');

document.getElementById('requestType').addEventListener('change', function () {
    if (document.getElementById('requestType').value === "Transcript") {
        document.getElementById('videoInputs').classList.remove('hide');
    } else {
        document.getElementById('videoInputs').classList.add('hide');
    }
})

document.getElementById('requestSubmit').addEventListener('click', function () {
    var requestType = document.getElementById('requestType').value;
    var title = document.getElementById('requestTitle').value;
    var priority = document.getElementById('requestPiority').value;
    var course = document.getElementById('requestCourse').value;
    var lmsURL = document.getElementById('requestLMSURL').value;
    var week = document.getElementById('requestWeek').value;
    var srcURL = document.getElementById('requestVideoURL').value;
    var videoLength = document.getElementById('requestLength').value;

    if (requestType === "Request Type" || title === "" || priority === "Priority" || course === "Course" || lmsURL === "" ||
        week === "") {
        message.innerHTML = "You must fill in all inputs";
        message.style.color = "red";
        resetMessage();
        return;
    } else if (requestType === "Transcript") {
        if (srcURL === "" || videoLength === "") {
            message.innerHTML = "You must fill in all inputs";
            message.style.color = "red";
            resetMessage();
            return;
        }
    } else {
        var user = firebase.auth().currentUser;
        // Add a new document in collection "accessibility"
        db.collection("accessibility").add({
                title: title,
                type: requestType,
                docURL: "input stuff",
                priority: priority,
                courseCode: course,
                lmsURL: lmsURL,
                week: week,
                requestor: user.displayName,
                requestDate: new Date(),
                status: "Ready for Transcript"
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                message.innerHTML = "Request has been made.";
                message.style.color = "blue";
                resetMessage();
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                message.innerHTML = "There was an error making the request. Please try again.";
                message.style.color = "red";
                resetMessage();
            });
    }
});

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = "";
        message.style.color = "black";
    }, 10000);
}