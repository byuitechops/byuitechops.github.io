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
                        if (userData.lead) {
                            document.getElementById('master').classList.remove('hide');
                        }
                        if (userData.role == "Copyedit") {
                            document.getElementById('copyEdit').classList.remove('hide');
                            document.getElementById('prepare').classList.add('hide');
                            document.getElementById('transcribe').classList.add('hide');
                            if (userData.lead) {
                                document.getElementById('copyEditCheck').classList.remove('hide');
                            }
                        }
                        if (userData.role == "Quality Assurance") {
                            document.getElementById('copyEdit').classList.add('hide');
                            document.getElementById('copyEditCheck').classList.add('hide');
                        }
                        if(doc.data().name ='Lucas Wargha') { 
                            document.getElementById('master').classList.remove('hide');
                            document.getElementById('copyEdit').classList.remove('hide');
                            document.getElementById('copyEditCheck').classList.remove('hide');
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
        if (window.location.pathname != '/index.html') {
            window.location.assign('index.html');
        } else {

        }

    }
});

//logs out the user
// Logout of firebase and website
function userLogout() {
    console.log("It's working");
    firebase.auth().signOut();
    window.location.reload();
}