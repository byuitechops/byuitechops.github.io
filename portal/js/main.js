/**********************************************
 * MAIN.JS | Quality Assurance Javascript File 
 * 
 *********************************************/
'use strict';
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
db.settings({
    timestampsInSnapshots: true
});

var userName;
var userId;
var data;
var preferance = "light";
let root = document.documentElement;
var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");
var timeOutHandler;
var auth = firebase.auth();


auth.onAuthStateChanged((firebaseUser) => {
    //checks if the user is already logged in to the system
    if (firebaseUser) {
        userName = firebaseUser.displayName;
        changeTheme();
        getData();
        if (window.location.href.includes("index.html") || window.location.href.includes("signup.html") || window.location.pathname == "/") {
        // window.location.replace("home.html");
        }
    } else {
        userName = null;
        if (!window.location.href.includes("index.html") && !window.location.href.includes("signup.html") && !window.location.href.includes("store.html")) {
        window.location.replace('index.html');
        }
    }
    if (window.location.href.includes("home.html")) {
        loadTimer();
        startTime();
        plusSlides(1);
    } else{
        loadPage();
    }
});


function getData() {
    db.collection("users").where("name", "==", userName)
        .onSnapshot((querySnapshot) => {
            data = querySnapshot.docs[0].data();
            userId = querySnapshot.docs[0].id;
            preferance = data.viewMode;
        })
}

function editDate(date) {
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var year = date.getFullYear();
    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var setDate = `${year}-${month}-${day} ${hour}:${minute}`;
    return setDate;
}

function searchArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name == item) {
            return i;
        }
    }
    return false;
}


/*******************************************************
 * This section is for the slideshow on the home page
 *******************************************************/
var slidesIndex = 0;        // Index of which slide is currently active
var myTimer;                // Automatic timer for the slideshow
const slideTimer = 8000;    // Each slide appears for 8 seconds.

function plusSlides(n = 1) {
    clearTimeout(myTimer);
    changeSlide(slidesIndex += n);
    myTimer = setTimeout(plusSlides, slideTimer);
}
function currentSlide(n) {
    changeSlide(slidesIndex = n);
}

function changeSlide(n) {
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slidesIndex = 1;
    }
    if (n < 1) {
        slidesIndex = slides.length;
    }

    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slidesIndex - 1].style.display = "block";
    dots[slidesIndex - 1].className += " active";
}


/********************************************************************
 *  This Section is for the theme changer. Instead of have multiple css files
 * and switch the files (which is complicated and just why) we are using CSS
 * variables and JS functions to change it.
 * 
 *********************************************************************/

const navbarImage = document.getElementById("nav-img");

// This const sets a var for all the buttons to change themes
const dataThemeButtons = document.querySelectorAll('[data-theme]');
for (let i = 0; i < dataThemeButtons.length; i++) {
    dataThemeButtons[i].addEventListener('click', () => {
        changeTheme(i);
    })
}

// This is the main function for theme swapping
// If you want to add a new theme(s) just copy one of the switches
// and else if statements and edit away. Then you will need to add a new
// button somewhere. There is NO NEED to copy and paste new css files.
// Please and thank you
function changeTheme(preferance) {
    if (preferance == 0) {
        preferance = "light";
        changeViewMode(preferance);
    } else if (preferance == 1) {
        preferance = "dark-blue";
        changeViewMode(preferance);
    } else if (preferance == 2) {
        preferance = "dark";
        changeViewMode(preferance);
    }
  
    db.collection("users").where("name", "==", userName)
        .onSnapshot((querySnapshot) => {
            preferance = querySnapshot.docs[0].data().viewMode;
            switch (preferance) {
                case 'light':
                    setTheme({
                        'first': '#0076c6',
                        'second': '#6c757d',
                        'third': '#343a40',
                        'background': '#ffffff',
                        'backgroundSecondary': '#ffffff',
                        'backgroundGrade': 'none',
                        'shadow': 'var(--gray)',
                        'fontPrime': '#000000'
                    });
                    navbarImage.src="";
                    break;
                case 'dark-blue':
                    setTheme({
                        'first': '#000121',
                        'second': '#000121',
                        'third': '#000121',
                        'background': '#087096',
                        'backgroundSecondary': '#087096',
                        'backgroundGrade': 'none',
                        'shadow': 'none',
                        'fontPrime': '#ffffff'
                    });
                    navbarImage.src="";
                    break;
                case 'dark':
                    setTheme({
                        'first': '#343a40',
                        'second': '#06439F',
                        'third': '#06439F',
                        'background': '#1c1b1b',
                        'backgroundSecondary': '#777777',
                        'backgroundGrade': 'none',
                        'shadow': 'none',
                        'fontPrime': '#ffffff'
                    });
                    navbarImage.src="";
                    break;
                case 'falllight':
                    setTheme({
                        'first': '#eb8a00',
                        'second': '#c79763',
                        'third': '#c79763',
                        'background': 'none',
                        'backgroundSecondary': '#ffffff',
                        'backgroundGrade': 'linear-gradient(0deg, rgba(241,90,41,1) 0%, rgba(241,90,41,1) 100%)',
                        'shadow': 'var(--gray-dark)',
                        'fontPrime': '#000000'
                    });
                    navbarImage.src="./assets/logos/leavesColored.png";
                    break;
                case 'falldark':
                    setTheme({
                        'first': '#f57600',
                        'second': '#890000',
                        'third': '#890000',
                        'background': '#1c1b1b',
                        'backgroundSecondary': '#777777',
                        'backgroundGrade': 'linear-gradient(180deg, rgba(245,118,0,1) 0%, rgba(137,0,0,1) 100%)',
                        'shadow': 'none',
                        'fontPrime': '#ffffff'
                    });
                    navbarImage.src="./assets/logos/turkeys.png";
                    break;
                case 'christmaslight':
                    setTheme({
                        'first': '#054d00',
                        'second': '#054d00', 
                        'third': '#054d00',
                        'background': '#eeffed',
                        'backgroundSecondary': '#eeffed',
                        'backgroundGrade': 'linear-gradient(0deg, rgba(133,0,0,1) 0%, rgba(191,0,0,1) 100%)',
                        'shadow': 'none',
                        'fontPrime': '#000000'
                    });
                    navbarImage.src="./assets/logos/treelight.png";
                    break;
                case 'christmasdark':
                    setTheme({
                        'first': '#9c0000',
                        'second': '#9c0000', 
                        'third': '#9c0000',
                        'background': '#032e00',
                        'backgroundSecondary': '#032e00',
                        'backgroundGrade': 'linear-gradient(0deg, rgba(133,0,0,1) 0%, rgba(191,0,0,1) 100%)',
                        'shadow': 'none',
                        'fontPrime': '#ffffff'
                    });
                    navbarImage.src="./assets/logos/treedark.png";
                    break;
            }
        })

}

// This function draws from and saves to the database.
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


// setTheme and setValue are interconnected. setTheme goes through the JSON
// we created in the main function and passes each one to setValue. Then setValue
// will replace the CSS var with a new value. Pretty nifty and got help thanks to 
// Ashley and the internet. AN AVACADO, THANKS!

function setTheme(options) {
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