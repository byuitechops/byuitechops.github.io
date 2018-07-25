// Connect to firebase
const config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
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
            }, 1400);
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
        "Team": 'default',
        "TeamLead": false,
        "brightspace": true,
        "trello": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "canvas": true,
        "slack": true,
        "equella": true,
        "employeeDirectory": true,
        "proDev": true,
        "pathway": true,
        "screenSteps": true,
        "monthlyTraining": true,
        "firebaseConsole": true,
        "canvasStyleGuide": true,
        "totStyleGuide": true,
        "teamDynamix": false,
        "videoIndexing": true
    };
    // Set up user with inputed info
    var info = {
        "birthday": document.getElementById('signUpBirthday').value,
        "email": document.getElementById('signUpEmail').value,
        "graduation": document.getElementById('signUpGraduation').value,
        "major": document.getElementById('signUpMajor').value,
        "phoneNumber": document.getElementById('signUpPhone').value,
        "track": document.getElementById('signUpTrack').value
    }
    try {
        // Send ot firebase
        firebase.database().ref('users/' + user).update(data);
        firebase.database().ref('users/' + user).child('info').update(info);
        firebase.database().ref('dates/' + user).update({
            "birthday": document.getElementById('signUpBirthday').value
        });
        // If it worked return true
        return true;
    } catch (err) {
        // If it did not work alert user
        alert(err);
    }
}
