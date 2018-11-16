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


    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.   
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Check the information input and try again");
    });

    var info = {
        "birthday": document.getElementById('signUpBirthday').value,
        "email": document.getElementById('signUpEmail').value,
        "graduation": document.getElementById('signUpGraduation').value,
        "major": document.getElementById('signUpMajor').value,
        "phoneNumber": document.getElementById('signUpPhone').value,
        "track": document.getElementById('signUpTrack').value
    }

    try {
        // Send to firebase
        var docData = {
            admin: false,
            name: document.getElementById('signUpName').value,
            team: "default",
            teamLead: false,
            info: info
        }
        db.collection('users').doc().set(docData).then(function() {
            console.log("Written");
            // window.replace('home.html')
        })
        // firebase.database().ref('users/' + user).update(data);
        // firebase.database().ref('users/' + user).child('info').update(info);
        // firebase.database().ref('dates/' + user).update({
        //     "birthday": document.getElementById('signUpBirthday').value
        // });
        // If it worked return true
        return true;
    } catch (err) {
        // If it did not work alert user
        alert(err);
    }
});
