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

// This function is run when user clicks submit
document.getElementById('submitSignUp').addEventListener('click', e => {
    // Get the values from the inputs
    var user = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const pass = document.getElementById('signUpPassword').value;
    // Connect to firebase authentication
    const auth = firebase.auth();


    // Sign up in firebase with email and password
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then(e => {
        // If it worked call setUser function
        var itWorked = setUser(user);
        if (itWorked) {
            // If it worked set current users name
            var profile = firebase.auth().currentUser;
            profile.updateProfile({
                displayName: user
            }).catch(function (error) {
                console.log(error);
            });
            setTimeout(function () {
                window.location.replace("home.html");
            }, 1500);
        } else {
            // If it did not work alert user
            alert('Sorry Registration did not work, try again.');
            // Reload page
            window.location.reload();
        }

    });
    // If it did not work alert user
    promise.catch(e => alert(e.message));
});

function setUser(user) {
    // Setup user into database with default permissions
    var data = {
        "Admin": false,
        "Lead": false,
        "Profile": {
            "birthday": document.getElementById('signUpBirthday').value,
            "phoneNumber": document.getElementById('signUpPhone').value,
            "track": document.getElementById('signUpTrack').value,
            "major": document.getElementById('signUpMajor').value,
            "graduation": document.getElementById('signUpGraduation').value,
            "lastDay": document.getElementById('signUpLastDay').value,
            "personalHoursLeft": "N/A"
        }
    };
    // Set up user with inputed info
    try {
        // Send ot firebase
        firebase.database().ref('users/' + user).update(data);
        // If it worked return true
        return true;
    } catch (err) {
        // If it did not work alert user
        alert(err);
    }
}
