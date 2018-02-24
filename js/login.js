const config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};
firebase.initializeApp(config);


if (firebase.auth().currentUser != null) {
    window.location.replace("home.html");
}

var user;
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

document.getElementById('txtPassword').addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        btnLogin.click();
    }
});

btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then(e => {
        var profile = firebase.auth().currentUser;
        profile.providerData.forEach(function (prof) {
            if (prof.displayName == null) {
                var getName = prompt('Enter your first and last name. Example: Zoe Miner');
                if (getName != null) {
                    profile.updateProfile({
                        displayName: getName
                    });
                };
            };
            user = prof.displayName;
            console.log(user);
            localStorage.setItem('user', user);
            window.location.replace("home.html");
        });
    });
    promise.catch(e => {
        window.alert(e);
        document.getElementById('txtEmail').value = "";
        document.getElementById('txtPassword').value = "";
    });
});


btnSignup.addEventListener('click', e => {
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Get the modal
    var modal = document.getElementById('myModal');

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

var user = null;

document.getElementById('signUpPassword').addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('submitSignUp').click();
    }
});

document.getElementById('submitSignUp').addEventListener('click', e => {
    var user = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const pass = document.getElementById('signUpPassword').value;
    const auth = firebase.auth();

    user = String(user);

    localStorage.setItem("user", user);

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then(e => {
        setUser();
        var profile = firebase.auth().currentUser;

        profile.updateProfile({
            displayName: user
        }).catch(function (error) {
            console.log(error);
        });
        document.getElementById('myModal').style.display = "none";
        setTimeout(function () {
            
        window.location.replace("home.html");
        }, 1400);
    });
    promise.catch(e => alert(e.message));
});

document.getElementById('resetPassword').addEventListener('click', e => {
    var emailAddress = prompt('Input Email Address');
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        alert("An email has been sent. Please check your email.");
    }).catch(function (error) {
        // An error happened.
        alert(error);
    });
});

function setUser() {
    var data = {
        "Team": 'default',
        "TeamLead": false,
        "brightspace": false,
        "trello": false,
        "teamDrive": false,
        "microsoft": false,
        "workDay": false,
        "canvas": false,
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
        firebase.database().ref('users/' + document.getElementById("signUpName").value).update(data);
        return true;
    } catch (err) {
        alert(err);
    }
}