//***************************************************
// This page has the purpose of integrating code 
// in JS so all other pages can work more
// Effectively and with clean code. 
//****************************************************
'use strict';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAIcGQ94aGJRMZihtoTcmMK7j3NavnPEOs",
    authDomain: "byui-accessibility-redemption.firebaseapp.com",
    databaseURL: "https://byui-accessibility-redemption.firebaseio.com",
    projectId: "byui-accessibility-redemption",
    storageBucket: "byui-accessibility-redemption.appspot.com",
    messagingSenderId: "630332651011",
    appId: "1:630332651011:web:c8806a3115d91b70"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});


var user = firebase.auth().currentUser;
var userID = [];
var userName = [];
var checkDuplicates = [];
var userAction = [];
var userPrepares = [];


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (window.location.pathname != '/index.html') {
            if (user.isAnonymous) {
                checkIfGuest();
            }
            if (window.location.pathname == '/newAccessibility/home.html') {
                if (user.emailVerified){
                    let verifyButton = document.getElementById('verifyButton');
                    $(verifyButton).addClass('hide');
                }
            }

            // User is signed in.
            db.collection('users').where('name', "==", user.displayName).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var userData = doc.data();

                        if (userData.role == "Copyedit") {
                            document.getElementById('copyEdit').classList.remove('hide')
                            if (userData.lead) {
                                document.getElementById('copyEditCheck').classList.remove('hide');
                                document.getElementById('master').classList.remove('hide');
                            };
                        } else if (userData.lead) {
                            document.getElementById('master').classList.remove('hide');
                        };
                        if (doc.data().webMaster != null) {
                            if (doc.data().webMaster) {
                                document.getElementById('master').classList.remove('hide');
                                document.getElementById('copyEdit').classList.remove('hide');
                                document.getElementById('copyEditCheck').classList.remove('hide');
                            };
                        };
                    });
                });
        } else {
            if (window.location.pathname != '/home.html') {
                window.location.assign('home.html');
            } 
        };
    } else {
        notLoggedIn();
    };
});

//logs out the user
// Logout of firebase and website
function userLogout() {
    firebase.auth().signOut();
    window.location.reload();
}


function notLoggedIn() {
    var z = document.createElement('div');
    var data =
        `<div class="dup-content" id="continue-guest-window">
            <div class="dup-header">
                    <h2>Continue As Guest</h2>
            </div>
            <div id="btn-box">
                <button id="dupFinishedBtn" onclick="redirect()">Sign In</button>
                <button id="dupFinishedBtn" onclick="guestLogin(event)">Continue As Guest</button>
            </div>
        </div>`;
    z.innerHTML = data
    z.setAttribute('id', 'continue-guest');
    z.setAttribute('class', 'dup');
    document.body.appendChild(z);
}

function guestLogin(e) {
    console.log("Hello there")
    firebase.auth().signInAnonymously()
    .then(()=>{
        var x = document.getElementById("continue-guest");
        $(x).remove();
        location.reload(true);
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
    });

}

function redirect() {
    if (window.location.pathname != '/index.html') {
        window.location.assign('index.html');
    };
}

// Get information from the Univeristy Catalog

// getCourses();
//get courses for the dropdown through xmlh request
function getCourses(docID) {
    if (docID == undefined) {
        docID = "requestCourse";
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            var res = JSON.parse(this.responseText);
            var id = res._id;
            var newxhttp = new XMLHttpRequest();
            newxhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status === 200) {
                    var newres = JSON.parse(this.responseText);
                    for (var i = 0; i < newres.length; i++) {
                        var course = newres[i]['__catalogCourseId'];
                        document.getElementById(docID).insertAdjacentHTML('beforeend', '<option value=\'' + course + '\'>' + course + '</option>');
                    }
                }
            };
            newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
            newxhttp.send();
        }
    };
    xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
    xhttp.send();
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    if (h == 0) {
        return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    } else {
        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }
}

function verifyEmail() {
    var user = firebase.auth().currentUser;
    console.log(user.emailVerified);
    if (user.emailVerified == true) {
        document.getElementById("verifyButton").className = 'hide';
    } else {
        user.sendEmailVerification().then(function () {
            // Email sent.
            alert("Email has been sent. Please check inbox");
        }).catch(function (error) {
            // An error happened.
        });
    }

}