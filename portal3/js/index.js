var submitBtn = document.getElementById("btnsignup");
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
window.addEventListener('keyup', () => {
  event.preventDefault();
  if (event.keyCode === 13) {
    login();
  }
})
submitBtn.addEventListener('click', () => {
  window.location.replace('signup.html');
});

//handles recover password
document.getElementById("recover").addEventListener("click", () => {
  var email = prompt("Please enter your email");
  if (email == null || email == "") {
    alert("Please, type a valid email first");
    return;
  } else {
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(email).then(function () {
      alert("An email has been sent. Check your email to change your password");
    }).catch(function (error) {
      // An error happened.
      alert("An error happened, please try again");
    });
  }
})