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
        window.location.assign('home.html');
    } else {
        // No user is signed in.
    }
});

document.getElementById('btnLogin').addEventListener('click', function() {
    logIn();
});
document.getElementById('txtPassword').addEventListener('keyup', function (event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        logIn();
    }
})

function logIn() {
    var email = document.getElementById('txtEmail').value;
    var password = document.getElementById('txtPassword').value;

    if (email == "" || password == "") {
        document.getElementById('message').innerHTML = "All fields must be filled in.";
        message.style.color = "red";
        resetMessage();
    } else {
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
                document.getElementById('message').innerHTML = errorMessage;
                message.style.color = "red";
                resetMessage();
                document.getElementById('txtPassword').value = "";
            });

    }
}

// This funciton is run when the reset password button is clicked
document.getElementById('resetPassword').addEventListener('click', e => {
    // Get email from user
    var emailAddress = document.getElementById('txtEmail').value;
    if (emailAddress == "") {
        document.getElementById('message').innerHTML = "The email field must be filled in.";
        message.style.color = "red";
        resetMessage();
    } else {
        // Send reset password email
        firebase.auth().sendPasswordResetEmail(emailAddress)
            .then(function () {
                // If Email is sent alert the user
                document.getElementById('message').innerHTML = "An email has been sent. Please check your email.";
                message.style.color = "blue";
                resetMessage();
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                document.getElementById('message').innerHTML = errorMessage;
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