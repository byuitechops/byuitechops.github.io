//************************************************************************************
// Purpose: Get the user logged in properly. Allow signup page acess and 
// display necessary error messages
//************************************************************************************

//This function receives the user's id and pw and makes the connection 
// with firebase to check the authentification. Handle correctly errors
var config = {
    apiKey: "AIzaSyAIcGQ94aGJRMZihtoTcmMK7j3NavnPEOs",
    authDomain: "byui-accessibility-redemption.firebaseapp.com",
    databaseURL: "https://byui-accessibility-redemption.firebaseio.com",
    projectId: "byui-accessibility-redemption",
    storageBucket: "byui-accessibility-redemption.appspot.com",
    messagingSenderId: "630332651011"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});


function logIn() {
    var email = document.getElementById('txtEmail').value;
    var password = document.getElementById('txtPassword').value;
    var message = document.getElementById('message');
    //makes sure the user inputs something for id and pw at least
    if (email == "" || password == "") {
        message.innerHTML = "All fields must be filled in.";
        message.style.color = "red";
        resetMessage();
        document.getElementById('txtEmail').classList.add('wobble-hor-bottom');
        document.getElementById('txtPassword').classList.add('wobble-hor-bottom');
        setTimeout(() => {
            document.getElementById('txtEmail').classList.remove('wobble-hor-bottom');
            document.getElementById('txtPassword').classList.remove('wobble-hor-bottom');
        }, 2000);
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                var user = firebase.auth().currentUser;
                window.location.assign('home.html');
            })
            .catch(function (error) {
                // Handle Errors here. 
                document.getElementById('txtEmail').classList.add('wobble-hor-bottom');
                document.getElementById('txtPassword').classList.add('wobble-hor-bottom');
                setTimeout(() => {
                    document.getElementById('txtEmail').classList.remove('wobble-hor-bottom');
                    document.getElementById('txtPassword').classList.remove('wobble-hor-bottom');
                }, 2000);
                message.innerHTML = error.message;
                message.style.color = "red";
                resetMessage();
                document.getElementById('txtPassword').value = "";
            });
    }
}

//ressets the error message
function resetMessage() {
    setTimeout(() => {
        message.innerHTML = "";
        message.style.color = "black";
    }, 4000);
}

// This funciton is run when the reset password button is clicked
function resetPassword() {
    var emailAddress = document.getElementById('txtEmail').value;
    if (emailAddress == "") {
        message.innerHTML = "The email field must be filled in.";
        message.style.color = "red";
        
        document.getElementById('txtEmail').classList.add('wobble-hor-bottom');
        setTimeout(() => {
            document.getElementById('txtEmail').classList.remove('wobble-hor-bottom');
            resetMessage();
        }, 2000);
    } else {
        // Send reset password email
        firebase.auth().sendPasswordResetEmail(emailAddress)
            .then(function () {
                // If Email is sent alert the user
                message.innerHTML = "An email has been sent. Please check your email.";
                message.style.color = "blue";
                resetMessage();
            }).catch(function (error) {
                // Handle Errors here
                message.innerHTML = error.message;
                message.style.color = "red";
                document.getElementById('txtEmail').classList.add('wobble-hor-bottom');
                setTimeout(() => {
                    document.getElementById('txtEmail').classList.remove('wobble-hor-bottom');
                    resetMessage();
                }, 2000);
            });
    }
}
//handles the login enter ports.
document.getElementById('txtPassword').addEventListener('keyup', function (event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        logIn();
    }
})

function signUp() {
    document.getElementById('signup').classList.remove('hide');
    document.getElementById('signin').classList.add('hide');
}

function submitSignUp() {
    var email = document.getElementById('txtEmailSP').value;
    var inputName = document.getElementById('nameSP').value;
    var password = document.getElementById('txtPasswordSP').value;
    var confirmPw = document.getElementById('txtPasswordConfirmSP').value;
    var inputRole = document.getElementById('signUpRole').value;
    var message = document.getElementById('message');
    if (email == "" || inputName == "" || password == "" || inputRole == "Select Who You Are") {
        message.innerHTML = "You must fill in all inputs";
        message.style.color = "red";
        resetMessage();
    } else if (password != confirmPw) {
        message.innerHTML = "Confirm Password and try again";
        message.style.color = "red";
        resetMessage();
    } else if (!email.includes('@byui.edu')) {
        message.innerHTML = "Enter a byui email and try again";
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
                    // Add Data to database
                    db.collection("users").add({
                            email: email,
                            name: inputName,
                            role: inputRole,
                            lead: Boolean(false),
                            actionID: '',
                            currentAction: ''
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
}