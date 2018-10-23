// Colors
const $blue = "#0076C6";
const $white = "#FFFFFF";
const $orange = "#F58300";
const $green = " #82C242";
const $red = "#E42226";

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

firebase.auth().onAuthStateChanged(firebaseUser => {
  //checks if the user is already logged in to the system
  if (firebaseUser) {
    userName = firebaseUser.displayName;
    // if logged in, sends user to home page
    if (window.location.href.includes("index.html") || window.location.href.includes("signup.html") || window.location.pathname == "/") {
      window.location.replace("home.html");
    }
  } else {
    userName = null;
    if (!window.location.href.includes("index.html") && !window.location.href.includes("signup.html")) {
      window.location.replace('index.html');
    }
  }
});

// var link = document.querySelector('link[rel="import"]');

// // Clone the <template> in the import.
// var template = link.import.querySelector('template');
// var clone = document.importNode(template.content, true);

// document.querySelector('header').appendChild(clone);
