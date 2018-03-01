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


document.getElementById('submitSignUp').addEventListener('click', e => {
    var user = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const pass = document.getElementById('signUpPassword').value;
    const auth = firebase.auth();

    user = String(user);

    localStorage.setItem("user", user);

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then(e => {
        var itWorked = setUser(user);
        if (itWorked) {
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
            alert('Sorry Registration did not work, try again.');
            window.location.reload();
        }

    });
    promise.catch(e => alert(e.message));
});

function setUser(user) {
    var data = {
        "Team": 'default',
        "TeamLead": false,
        "brightspace": false,
        "trello": false,
        "teamDrive": false,
        "microsoft": false,
        "workDay": true,
        "canvas": true,
        "microsoftTeams": false,
        "equella": true,
        "employeeDirectory": true,
        "proDev": true,
        "pathway": true,
        "screenSteps": true,
        "monthlyTraining": true,
        "firebaseConsole": true,
        "canvasStyleGuide": true,
        "totStyleGuide": true
    };
    try {
        firebase.database().ref('users/' + user).update(data);
        return true;
    } catch (err) {
        alert(err);
    }
}
