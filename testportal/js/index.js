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

var submitBtn = document.getElementById("btnsignup");
submitBtn.addEventListener('click', () => {
  window.location.replace('signup.html');
});