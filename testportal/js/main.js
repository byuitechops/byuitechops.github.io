// Colors
const $blue = "#0076C6";
const $white = "#FFFFFF";
const $orange = "#F58300";
const $green = " #82C242";
const $red = "#E42226";
// Colors
const $primary = "#0076c6";
const $secondary = "#f1f8fe";
const $third = "#7fc4fd";
const $accent1 = "#ffffff";
const $accent2 = "#727272";
const $background = "#ffffff";
const $TimeBackgrounds = "#5592d7";

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

var userName = null;
var userId = null;
var data = null;
var theme = "light";

firebase.auth().onAuthStateChanged(firebaseUser => {
  //checks if the user is already logged in to the system
  if (firebaseUser) {
    userName = firebaseUser.displayName;
    // if logged in, sends user to home page
    if (window.location.href.includes("index.html") || window.location.href.includes("signup.html") || window.location.pathname == "/") {
      window.location.replace("home.html");
    }

    getUser();
    //if user isn't logged in, sends back to sign in page
  } else {
    userName = null;
    if (!window.location.href.includes("index.html") && !window.location.href.includes("signup.html") && !window.location.href.includes("store.html")) {
      window.location.replace('index.html');
    }
  }
});

function getUser() {
  db.collection("users").where("name", "==", userName)
    .onSnapshot(function (querySnapshot) {
      userId = querySnapshot.docs[0].id;
      data = querySnapshot.docs[0].data();
      theme = querySnapshot.docs[0].data().viewMode;
      loadPage();
      setTheme();
    })
}

function setTheme() {
  var link = document.createElement('link');
  var url = window.location.pathname;
  var pageName = url.slice(url.lastIndexOf('/')+1, -5);
 
  link.setAttribute('rel', "stylesheet");
  link.setAttribute('type', "text/css");
  link.setAttribute('href', `css/${pageName}_${theme}.css`);
  document.getElementsByTagName('head')[0].insertAdjacentElement('beforeend', link);
}