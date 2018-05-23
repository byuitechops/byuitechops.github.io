// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4QPzcqjwXlZokv3IUuBUSQFF2VMg4xjQ",
    authDomain: "review-team.firebaseapp.com",
    databaseURL: "https://review-team.firebaseio.com",
    projectId: "review-team",
    storageBucket: "review-team.appspot.com",
    messagingSenderId: "1021047023591"
};
firebase.initializeApp(config);

var user;
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // If user is logged in
        window.location.replace("home.html");

    } else {
        // Load Page
        var user;
        // Get all the input elements and buttons
        const txtEmail = document.getElementById('txtEmail');
        const txtPassword = document.getElementById('txtPassword');
        const btnLogin = document.getElementById('btnLogin');
        const btnSignup = document.getElementById('btnSignUp');
        const btnLogout = document.getElementById('btnLogout');

        // If enter is pressed while in the password input box run the login function
        document.getElementById('txtPassword').addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                btnLogin.click();
            }
        });


        // This function is run when the login button is clicked
        btnLogin.addEventListener('click', e => {
            // Get the values from email input and password input
            const email = txtEmail.value;
            const pass = txtPassword.value;
            // Get the authentication for firebase
            const auth = firebase.auth();

            // Login with email and password
            const promise = auth.signInWithEmailAndPassword(email, pass);
            // If it worked
            promise.then(e => {
                // Go to the home page
                window.location.replace("home.html");
            });
            promise.catch(e => {
                // If it didn't work alert the user
                window.alert(e);
                //                document.getElementById('txtEmail').value = "";
                document.getElementById('txtPassword').value = "";
            });
        });

        // This function is run when the sign up button is clicked
        btnSignup.addEventListener('click', e => {
            // Send user to the signup page
            window.location.replace('signup.html');
        });

        // This funciton is run when the reset password button is clicked
        document.getElementById('resetPassword').addEventListener('click', e => {
            // Get email from user
            var emailAddress = prompt('Input Email Address');
            // Send reset password email
            firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
                // If Email is sent alert the user
                alert("An email has been sent. Please check your email.");
            }).catch(function (error) {
                // If it doesn't work alert the user
                alert(error);
            });
        });
    }
});
