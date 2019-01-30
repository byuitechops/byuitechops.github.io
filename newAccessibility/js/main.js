//***************************************************
// This page has the purpose of integrating code 
// in Js so all other pages can work more
// Effectively and with clean code. 
//****************************************************
// Initialize Firebase
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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (window.location.pathname != '/index.html') {
            // User is signed in.
            db.collection('users').where('name', "==", user.displayName).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var userData = doc.data();
                        if (userData.role != "Copyedit") {
                            // document.getElementById('place').classList.remove('hide');
                        }
                        if (userData.role == "Admin" || userData.role == "Techops" || userData.role == "Lead") {
                            // document.getElementById('master').classList.remove('hide');
                        }
                    })
                })
        } else {
            if (window.location.pathname != '/home.html') {
                window.location.assign('home.html');
            } else {
                
            }
        }
    } else {
        // window.location.assign('home.html');
    }
});

//logs out the user
// Logout of firebase and website
function userLogout() {
    console.log("It's working");
    // firebase.auth().signOut();
}

// Initialize Firebase