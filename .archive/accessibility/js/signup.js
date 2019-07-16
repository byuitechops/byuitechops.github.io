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

document.getElementById('submitSignUp').addEventListener('click', function () {
    var email = document.getElementById('signUpEmail').value;
    var inputName = document.getElementById('signUpName').value;
    var password = document.getElementById('signUpPassword').value;
    var inputRole = document.getElementById('signUpRole').value;

    if (email == "" || inputName == "" || password == "" || inputRole == "Select Who You Are") {
        message.innerHTML = "You must fill in all inputs";
        message.style.color = "red";
        resetMessage();
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {
                // Update display name
                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: inputName
                }).then(function () {
                    // Update successful.
                    // Add Data
                    db.collection("users").add({
                            email: email,
                            name: inputName,
                            role: inputRole
                        })
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            // User is signed in.
                            window.location.assign('home.html');
                        })
                        .catch(function (error) {
                            console.error("Error adding document: ", error);
                            message.innerHTML = error.message;
                            message.style.color = "red";
                            resetMessage();
                        });
                }).catch(function (error) {
                    // An error happened.
                    console.error("Error adding document: ", error);
                    message.innerHTML = error.message;
                    message.style.color = "red";
                    resetMessage();
                });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.error("Error adding document: ", error);
                message.innerHTML = error.errorMessage;
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