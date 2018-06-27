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

document.getElementById('submitSignUp').addEventListener('click', function () {
    var email = document.getElementById('signUpEmail').value;
    var inputName = document.getElementById('signUpName').value;
    var password = document.getElementById('signUpPassword').value;
    var inputRole = document.getElementById('signUpRole').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Update display name
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: inputName
            }).then(function () {
                // Update successful.
            }).catch(function (error) {
                // An error happened.
            });

            // Add Data
            db.collection("users").add({
                    email: email,
                    name: inputName,
                    role: inputRole
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
});