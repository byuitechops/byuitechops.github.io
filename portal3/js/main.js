/**********************************************
 * MAIN.JS | Quality Assurance Javascript File 
 * 
 *********************************************/
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
var userName = null;
var userId = null;
var data = null;
var theme;

db.settings({
  timestampsInSnapshots: true
});

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
      changeTheme(theme)
    })
}

let root = document.documentElement;
var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");

showSlides();

function showSlides() {

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 8000); // Change image every 10 seconds
}

function currentSlide(no) {

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex = no;
  slides[no - 1].style.display = "block";
}

function plusSlides(n) {
  var newslideIndex = slideIndex + n;
  if (newslideIndex < 4 && newslideIndex > 0) {
    currentSlide(newslideIndex);
  }
}
/******************************************************************** 
 *  This Section is for the theme changer. Instead of have multiple css files
 * and switch the files (which is complicated and just why) we are using CSS
 * variables and JS functions to change it.
 * 
*********************************************************************/

// This const sets 
const dataThemeButtons = document.querySelectorAll('[data-theme]');


function changeTheme(preferance) {
  db.collection("users").where("name", "==", userName)
    .onSnapshot(function (querySnapshot) {
      theme = querySnapshot.docs[0].data().viewMode;
      if (preferance == 0) {
        preferance = "light";
        changeViewMode(preferance);

      } else if (preferance == 1) {
        preferance = "dark";
        changeViewMode(preferance);

      } else if (preferance == 2) {
        preferance = "jedi";
        changeViewMode(preferance);

      } else if (preferance == 3) {
        preferance = "sith";
        changeViewMode(preferance);

      } else if (preferance == 4) {
        preferance = "merica";
        changeViewMode(preferance);

      }
      switch (preferance) {
        case 'light':
          setTheme({
            'first': '#0076c6',
            'second': '#6c757d',
            'third': '#7fc4fd',
            'background': '#ffffff',
            'backgroundGrade': 'none',
            'shadow': 'var(--gray)',
            'fontPrime': '#ffffff',
            'fontSecond': '#000000'
          });
          return;

        case 'dark':
          setTheme({
            'first': '#343a40',
            'second': '#0076c6',
            'third': '',
            'background': '#1c1b1b',
            'backgroundGrade': 'none',
            'shadow': 'none',
            'fontPrime': '#ffffff',
            'fontSecond': '#ffffff'
          });
          return;

        case 'jedi':
          setTheme({
            'first': '#06439F',
            'second': '#0076c6',
            'third': '',
            'background': 'none',
            'backgroundGrade': 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
            'shadow': 'var(--gray-dark)',
            'fontPrime': '#ffffff',
            'fontSecond': '#0000007'
          });
          return;

        case 'sith':
          setTheme({
            'first': 'rgba(121,9,9,1)',
            'second': '#0f0f0f',
            'third': '',
            'background': '#1c1b1b',
            'backgroundGrade': 'linear-gradient(180deg, rgba(36,0,0,1) 0%, rgba(121,9,9,1) 35%, rgba(255,0,0,1) 100%)',
            'shadow': 'none',
            'fontPrime': '#ffffff',
            'fontSecond': '#ffffff'
          });
          return;
      }
    })

}

function changeViewMode(newTheme) {
  db.collection('users').doc(userId).update({
      viewMode: newTheme
    })
    .then(function () {})
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

}

function setTheme(options){
  for (let option of Object.keys(options)) {
    const property = option;
    const value = options[option];

    setValue(property, value);
    localStorage.setItem(property, value);
  }
}
function setValue(property, value) {
  if (value) {
    document.documentElement.style.setProperty(`--${property}`, value);

    const input = document.querySelector(`#${property}`);
    if (input) {
      value = value.replace('px', '');
      input.value = value;
    }
  }
}


for (let i = 0; i < dataThemeButtons.length; i++) {
  dataThemeButtons[i].addEventListener('click', () => {
    changeTheme("" + i)
  })
}




// loads the page providing different information if the user is an admin/lead
ssCanvas2 = "https://docs.google.com/spreadsheets/d/1jUFL2Dr-_MjAE7axb6rEZy0vSfH6y_8fOHSo1b0oLDo/edit?rm=minimal";
ssCanvas1 = "https://docs.google.com/spreadsheets/d/1g53WojmX1wG7fTGU1Q1Hg93-QJ5GBadcCU7rbeyGWoc/edit?rm=minimal#gid=0";




function loadPage() {
    //gets and reads database, stores into a variable
    db.collection("users").doc(userId).get()
        .then(function (doc) {
            const myData = doc.data();
            var team = document.getElementById("teams");
            var iframe = document.getElementById("spreadsheet");
            //checks for permissions to see both teams' schedule
            if (myData.admin || myData.lead) {
                document.getElementById("admin").style.visibility = "visible";
                team.style.visibility = "visible";
                //clicked on team 1
                document.getElementById("selectTeam").addEventListener("change", () => {
                    if (document.getElementById("selectTeam").value == "canvas1") {
                        iframe.src = ssCanvas1
                        document.getElementById("newTab").href = ssCanvas1;
                    } else {
                        iframe.src = ssCanvas2
                        document.getElementById("newTab").href = ssCanvas2;
                    }
                })
            } else {
                if (myData.team == "lms") {
                    team.style.visibility = "visible";
                    iframe.src = ssCanvas1;
                    document.getElementById("newTab").href = ssCanvas1;
                } else if (myData.team == "accessibility") {
                    team.style.visibility = "visible";
                    iframe.src = ssCanvas2;
                    document.getElementById("newTab").href = ssCanvas2;

                }
            }
        })
}