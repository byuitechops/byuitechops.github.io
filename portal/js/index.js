const signupBtn = document.getElementById("btnsignup");
const loginBtn = document.getElementById("btnlogin");
const nameBox = document.getElementById("namebox");
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
    nameBox.classList.remove("hide");
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