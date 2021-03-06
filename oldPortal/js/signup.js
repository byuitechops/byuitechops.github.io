// Initialize Firebase
var config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

//hides elements and allows them to come as the user gives input
//document.getElementById("signUpEmail").style.visibility.child="hidden";

var signupBtn = document.getElementById('submitSignUp')
signupBtn.addEventListener('click', () => {

    if (document.getElementById('signUpName').value == "" || document.getElementById("signUpEmail").value == "" || document.getElementById("signUpPassword").value == "") {
        alert('Please make sure all fields are filled');
        return;
    }

    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {

            var info = {
                "email": email,
                "photo": "default-image.png",
                "phoneNumber": "000-000-0000",
                "major": "",
                "track": "",
                "graduation": "",
                "speed": "",
                "birthday": "00/00"
            }

            var time = {
                "break": false,
                "check": false,
                "breakKey":"",
                "checkKey":"",
                "accumulatedTime": 4
            }

            try {
                // Send to firebase
                var docData = {
                    admin: false,
                    nameDisplay: document.getElementById('signUpName').value,
                    name: document.getElementById('signUpName').value,
                    team: "default",
                    lead: false,
                    info: info,
                    title: "Team Member",
                    viewMode: "light",
                    time: time,
                   
                }
                db.collection('users').doc().set(docData).then(function () {
                    console.log("Written");
                    console.log(firebase.auth().currentUser);
                    firebase.auth().currentUser.updateProfile({
                        displayName: document.getElementById('signUpName').value
                    }).then(function () {
                        // Update successful.
                        window.location.replace('home.html');
                    }).catch(function (error) {
                        // An error happened.
                    });
                    // window.replace('home.html')
                })
                // If it worked return true
                return true;
            } catch (err) {
                // If it did not work alert user
                alert(err);
            }
        })
        .catch(function (error) {
            // Handle Errors here.   
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            alert("Check the information input and try again");
        });
});

document.getElementById('cancelSignUp').addEventListener('click', () => {
    window.location.replace('index.html');
})