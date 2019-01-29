//************************************************************************************
// Purpose: Get the user logged in properly. Allow signup page acess and 
// display necessary error messages
//************************************************************************************

//This function receives the user's id and pw and makes the connection 
// with firebase to check the authentification. Handle correctly errors
function logIn() {
    var email = document.getElementById('txtEmail').value;
    var password = document.getElementById('txtPassword').value;
    var message = document.getElementById('message');
    //makes sure the user inputs something for id and pw at least
    if (email == "" || password == "") {
        message.innerHTML = "All fields must be filled in.";
        message.style.color = "red";
        resetMessage();
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                var user = firebase.auth().currentUser;
                window.location.assign('/home.html');
            })
            .catch(function (error) {
                // Handle Errors here. 
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
        resetMessage();
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
                resetMessage();
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