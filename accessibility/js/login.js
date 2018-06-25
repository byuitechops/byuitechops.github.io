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
        window.location.assign('home.html');
    } else {
        // No user is signed in.
    }
});

document.getElementById('btnLogin').addEventListener('click', function () {
    var email = document.getElementById('txtEmail').value;
    var password = document.getElementById('txtPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            var user = firebase.auth().currentUser;
            console.log(user);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
});

// Get Data
// db.collection("users").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
// });