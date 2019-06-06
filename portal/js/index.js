const signupBtn = document.getElementById("btnsignup");
const loginBtn = document.getElementById("btnlogin");
const nameBox = document.getElementById("namebox");
var signingIn = false;

function loadPage(){};

function login() {
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(login, password)
        .then(function () {
            window.location.replace('home.html');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Please, check information provided and try again.');
            // ...
        });
};

$(loginBtn).click(() =>{
    login();
});

function signup() {
    if(!signingIn) {
        nameBox.classList.remove("hide");
        loginBtn.classList.add("hide");
        signingIn = true;
    } else if (signingIn) {
        const displayName = document.getElementById('displayName').value;
        const email = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        
        console.log(displayName + " " + email + " " + password);
        if (displayName == "" || email == "" || password == "") {
            alert('Please make sure all fields are filled');
            return;
        }
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                var docData = {
                    admin: false,
                    nameDisplay: `${displayName}`,
                    name: `${displayName}`,
                    team: "default",
                    lead: false,
                    info:  {
                        "email": `${email}`,
                        "photo": "default-image.png",
                        "phoneNumber": "000-000-0000",
                        "major": "",
                        "track": "",
                        "graduation": "",
                        "speed": "",
                        "birthday": "00/00"
                    },
                    title: "Team Member",
                    viewMode: "light",
                    storeManager: false,
                    time: {
                        "break": false,
                        "check": false,
                        "breakKey":"",
                        "checkKey":"",
                        "accumulatedTime": 4
                    }
                
                }
                try {
                    // Send to firebase
                    firebase.auth().currentUser.updateProfile({
                        displayName: `${displayName}`
                    }).then(function () {
                        // Update successful.
                        window.location.replace('home.html');
                    }).catch(function (error) {
                        // An error happened.
                    });
                    console.log(docData);
                    db.collection('users').doc().set(docData).then(function () {
                        console.log("Written");
                        console.log(firebase.auth().currentUser);
                        
                        // window.replace('home.html')
                    })
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
    }
}

window.addEventListener('keyup', () => {
    event.preventDefault();
    if (event.keyCode === 13) {
        login();
    }
});

$("#recover").click(() => {
    var email = prompt("Please enter your email");
    if (email == null || email == "") {
        alert("Please, type a valid email first");
        return;
    } else {
        auth.sendPasswordResetEmail(email).then(function () {
        alert("An email has been sent. Check your email to change your password");
        }).catch(function (error) {
        // An error happened.
        alert("An error happened, please try again");
        });
    }
});