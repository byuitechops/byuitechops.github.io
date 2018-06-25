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
    } else {
        // No user is signed in.
        window.location.assign('index.html');
    }
});

// Logout of firebase and website
document.getElementById('btnLogout').addEventListener('click', function () {
    firebase.auth().signOut();
});