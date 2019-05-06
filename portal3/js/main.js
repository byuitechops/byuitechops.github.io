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

// This const sets a var for all the buttons to change themes
const dataThemeButtons = document.querySelectorAll('[data-theme]');

// This is the main function for theme swapping
// If you want to add a new theme(s) just copy one of the switches
// and else if statements and edit away. Then you will need to add a new
// button somewhere. There is NO NEED to copy and paste new css files.
// Please and thank you
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

        case 'sithA':
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
        case 'sith':
          setTheme({
            'first': '#0076c6',
            'second': '#6c757d',
            'third': '#7fc4fd',
            'background': '#ffffff',
            'backgroundGrade': 'linear-gradient(9deg, rgba(255,0,0,1) 0%, rgba(221,59,59,1) 16%, rgba(235,208,208,1) 32%, rgba(255,255,255,1) 39%, rgba(191,230,241,1) 45%, rgba(69,163,190,1) 64%, rgba(51,83,185,1) 80%)',
            'shadow': 'var(--gray)',
            'fontPrime': '#ffffff',
            'fontSecond': '#000000'
          });
          return;
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


for (let i = 0; i < dataThemeButtons.length; i++) {
  dataThemeButtons[i].addEventListener('click', () => {
    changeTheme("" + i)
  })
}




/*
 * Time tracking section
 * 
 * This section will have to do with the clock in, clock out, and break
 * functions. This code was last update on May 6th, 2019
 *
 */

// starting default
var minutes = 15;
var seconds = 00;

function resetBreak() {
  localStorage.setItem('minutes', 15);
  localStorage.setItem('seconds', 0);
}

if (localStorage.getItem('minutes') != null) {
  minutes = Number(localStorage.getItem("minutes"));
  seconds = Number(localStorage.getItem("seconds"));
}

function loadPage() {

  if (minutes < 10) {
    minutes = "0" + Number(minutes);
  }
  if (seconds < 10) {
    seconds = "0" + Number(seconds);
  }
  localStorage.setItem("minutes", minutes);
  localStorage.setItem("seconds", seconds);
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
  loadUser();
}

function loadUser() {
  if (data.time.breakKey != "") {
    if (data.time.break) {
      // On break
      document.getElementById('breakTime').innerText = "";
      document.getElementById('breakBtn').innerText = "Return from Break";
    } else {
      // Off break
      document.getElementById('breakBtn').innerText = "Start Break";
      document.getElementById('breakTime').innerText = `Last break finished at: ${data.time.breakKey.slice(-5)}`;
    }
  }

  if (data.time.checkKey != "") {
    if (data.time.check) {
      // Checked In
      var checkinTime = data.time.checkKey.slice(-5);
      var hour = checkinTime.split(":")[0];
      var min = checkinTime.split(":")[1];
      var mer = "am";
      if (checkinTime.split(":")[0] > 12) {
        hour = checkinTime.split(":")[0] - 12;
        mer = "pm";
      }
      document.getElementById('checkTime').innerText = `Check in time: ${hour}:${min} ${mer}`;
      document.getElementById('checkInBtn').style.backgroundColor = $accent2;
      document.getElementById('checkInBtn').style.borderColor = $accent2;
      document.getElementById('checkOutBtn').style.backgroundColor = $primary;
      document.getElementById('checkOutBtn').style.borderColor = $primary;
      // Checkout Reminder
      setInterval(() => {
        alertify.error('Reminder to check out using the portal and workday.');
      }, 3600000);
    } else {
      // Checked Out
      db.collection('users').doc(userId).collection('hoursWorked').doc(data.time.checkKey).get()
        .then(function (doc) {
          var checkoutTime = doc.data().end;
          var hour = checkoutTime.split(":")[0];
          var min = checkoutTime.split(":")[1];
          var mer = "am";
          if (checkoutTime.split(":")[0] > 12) {
            hour = checkoutTime.split(":")[0] - 12;
            mer = "pm";
          }
          document.getElementById('checkTime').innerText = `Check out time: ${hour}:${min} ${mer}`;
          document.getElementById('checkInBtn').style.backgroundColor = $primary;
          document.getElementById('checkInBtn').style.borderColor = $primary;
          document.getElementById('checkOutBtn').style.backgroundColor = $accent2;
          document.getElementById('checkOutBtn').style.borderColor = $accent2;
        })
    }
  }
}

//sequence of events as the user checks in
document.getElementById('checkInBtn').addEventListener('click', () => {
  localStorage.removeItem('minutes');
  localStorage.removeItem('seconds');
  loadUser();
  localStorage.clear();
  minutes = 15;
  seconds = 00;
  var setDate = editDate(new Date());
  //verify if the user is actually logged out
  if (!data.time.check) {
    //if the user is logged out, update firebase so now it is logged in
    db.collection('users').doc(userId).update({
      "time.checkKey": setDate,
      "time.check": true,
      "time.breakAllowed": false
    });
    db.collection('users').doc(userId).collection('hoursWorked').doc(setDate).set({
      "start": setDate.slice(-5)
    })
    window.open('https://www.myworkday.com/byuhi/d/home.htmld', '_blank');
    window.open('https://chat.google.com/room/AAAAGWGIzV4', '_blank');
  } else {
    alert("You are already logged in");
  }
  getUser();
})

//sequence of events when the user clocks out
document.getElementById('checkOutBtn').addEventListener('click', () => {
  var setDate = editDate(new Date());
  //verifies if the user is actually logged in
  if (data.time.check) {
    //if the user is then clocking out, updates that on firebase and updates the end time on hours worked

    db.collection('users').doc(userId).update({
      "time.check": false,

    });
    if (data.time.break) {
      db.collection('users').doc(userId).update({
        "time.break": false,
        "time.breakKey": setDate,
        "time.breakAllowed": false
      });
    }
    db.collection('users').doc(userId).collection('hoursWorked').doc(data.time.checkKey).update({
      "end": setDate.slice(-5)
    })
    loadUser();
    window.open('https://www.myworkday.com/byuhi/d/home.htmld', '_blank');
    //alerts the user 
  } else {
    alert("You are already logged out");
  }
  localStorage.removeItem('minutes');
  localStorage.removeItem('seconds');
  getUser();
})

//if user starts or end break, call necessary events
document.getElementById('breakBtn').addEventListener('click', () => {
  var setDate = editDate(new Date());
  // End break
  if (data.time.break) {
    for (var i = 0; i < document.getElementsByTagName("a").length; i++) {
      document.getElementsByTagName("a")[i].setAttribute("target", "_self");
    }
    document.getElementById("minutes").style.color = "grey";
    document.getElementById("seconds").style.color = "grey";
    db.collection('users').doc(userId).update({
      "time.break": false,
      "time.breakKey": setDate
    });
    db.collection('users').doc(userId).collection('breaks').doc(data.time.breakKey).update({
      "end": setDate.slice(-5)
    })
  } else {
    if (!data.time.check) {
      alert("You are logged out. No breaks are allowed");
    } else {
      // Start Break
      for (var i = 0; i < document.getElementsByTagName("a").length; i++) {
        document.getElementsByTagName("a")[i].setAttribute("target", "_blank");
      }


      db.collection('users').doc(userId).update({
        "time.break": true,
        "time.breakKey": setDate
      });
      db.collection('users').doc(userId).collection('breaks').doc(setDate).set({
        "start": setDate.slice(-5)
      });
      //runs this variable every second
      timer = setInterval(countdown, 1000);
    }
  }
  getUser();
})

function editDate(date) {
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var year = date.getFullYear();
  var hour = ("0" + date.getHours()).slice(-2);
  var minute = ("0" + date.getMinutes()).slice(-2);
  var setDate = `${year}-${month}-${day} ${hour}:${minute}`;
  return setDate;
}

var timer;
//countdown timer
function countdown() {
  if (!data.time.break) {
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('seconds', seconds);
    clearInterval(timer);
  }
  if (seconds == 0) {
    minutes -= 1;
    seconds = 60;
  }
  seconds -= 1;

  if (minutes == 0) {
    localStorage.removeItem('minutes');
    localStorage.removeItem('seconds');
  }


  if (minutes <= 0 && seconds <= 0) {
    minutes = 15;
    seconds = 00;
    document.getElementById("minutes").style.color = "red";
    document.getElementById("seconds").style.color = "red";
    // clearInterval(timer);
  }

  if (minutes < 10) {
    minutes = "0" + Number(minutes);
  }
  if (seconds < 10) {
    seconds = "0" + Number(seconds);
  }

  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

//calculator
var modal = document.getElementById('myModal');
var calculator = document.getElementById("calculator");
var span = document.getElementsByClassName("close")[0];
calculator.addEventListener('click', () => {
  modal.style.display = "block";
});
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//calculates clock-out time and time left according to user's inputs

document.getElementById("submitBtn").addEventListener('click', () => {
  var hoursWorked = document.getElementById("hoursWorked").value;
  var totalHours = document.getElementById("totalHours").value;
  var clockInTime = document.getElementById("clockInTime").value;
  var hoursLeft = (totalHours - hoursWorked).toFixed(2);
  document.getElementById('timeLeft').innerText = hoursLeft;

  var orgHour = Number(clockInTime.slice(0, 2));
  var orgMin = Number(clockInTime.slice(-2));

  var diffHour = Number(hoursLeft.toString().split(".")[0]);
  var diffMin = (Number("." + hoursLeft.toString().split(".")[1]) * 60);

  var ansHour = orgHour + diffHour;
  var mer = ansHour > 12 ? "PM" : "AM";
  ansHour = ansHour > 12 ? ansHour - 12 : ansHour;
  var ansMin = ("0" + (orgMin + diffMin)).slice(-2);


  document.getElementById('clockOutTime').innerText = `${ansHour}:${ansMin} ${mer}`;
})



//attempt to implement regulated and timed breaks
// function loadPage() {
//   totalMinWorked = getMinWorked();
//   allowBreak(totalMinWorked);
//   if (localStorage.getItem('minutes') != null && data.time.breakAllowed) {
//     var minutes = Number(localStorage.getItem("minutes")) + Number(5);
//     //var minutes = Number(localStorage.getItem("minutes")) + Number(15);
//     var seconds = localStorage.getItem("seconds");
//     localStorage.setItem('minutes', minutes);
//     localStorage.setItem('seconds', seconds);
//   } else {
//     var minutes = 00;
//     var seconds = 00;
//     localStorage.setItem('minutes', minutes);
//     localStorage.setItem('seconds', seconds);
//   }

// function allowBreak(totalMinWorked) {
//   if (totalMinWorked > 20 && totalMinWorked < 40) {
//     db.collection('users').doc(userId).update({
//       "time.breakAllowed": true
//     });
//   }
// }

// function getMinWorked() {
//   var newTime = editDate(new Date()).slice(-5);
//   //checks if the user is logged in
//   var newTimeTotalMin = Number(newTime.slice(0, 2)) * 60 + Number(newTime.slice(3, 5));
//   console.log(data.time.checkKey);
//   var checkTimeTotalMin = Number(data.time.checkKey.slice(-5).slice(0, 2)) * 60 + Number(data.time.checkKey.slice(-5).slice(3, 5));
//   var totalMinWorked = Number(newTimeTotalMin - checkTimeTotalMin);
//   console.log(totalMinWorked);
//   return totalMinWorked;
// }





/**
 * Birthday Surprise
 */

 //  reads from firestore and searches for a matching date.
var today = new Date().toString();
var editToday = today.slice(4, 10);
db.collection("users").where("info.birthday", "==", editToday).get()
    .then(function (querySnapshot) {
        if (querySnapshot.empty) {
            modal.style.visibility = "visible";
            modal.style.display = "block";
            console.log(querySnapshot);
            console.log(querySnapshot.docs[0].data().nameDisplay);
            html = `Today is ${querySnapshot.docs[0].data().nameDisplay}'s birthday!! </br> Happy birthday, ${querySnapshot.docs[0].data().nameDisplay.split(" ")[0]}! `;
            document.getElementById("birthdayText").innerHTML = html;
        }
    })

//handles the modal box for the event
var modal = document.getElementById('myModal');
modal.style.display = "block";
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

modal.style.display = "block";


//fireworks 

// helper functions
const PI2 = Math.PI * 2
const random = (min, max) => Math.random() * (max - min + 1) + min | 0
const timestamp = _ => new Date().getTime()

// container
class Birthday {
    constructor() {
        this.resize()

        // create a lovely place to store the firework
        this.fireworks = []
        this.counter = 0

    }

    resize() {
        this.width = canvas.width = window.innerWidth
        let center = this.width / 2 | 0
        this.spawnA = center - center / 4 | 0
        this.spawnB = center + center / 4 | 0

        this.height = canvas.height = window.innerHeight
        this.spawnC = this.height * .1
        this.spawnD = this.height * .5

    }

    onClick(evt) {
        let x = evt.clientX || evt.touches && evt.touches[0].pageX
        let y = evt.clientY || evt.touches && evt.touches[0].pageY

        let count = random(3, 5)
        for (let i = 0; i < count; i++) this.fireworks.push(new Firework(
            random(this.spawnA, this.spawnB),
            this.height,
            x,
            y,
            random(0, 260),
            random(30, 110)))

        this.counter = -1

    }

    update(delta) {
        ctx.globalCompositeOperation = 'hard-light'
        ctx.fillStyle = `rgba(20,20,20,${ 2 * delta })`
        ctx.fillRect(0, 0, this.width, this.height)

        ctx.globalCompositeOperation = 'lighter'
        for (let firework of this.fireworks) firework.update(delta)

        // if enough time passed... create new new firework
        this.counter += delta * 3 // each second
        if (this.counter >= 1) {
            this.fireworks.push(new Firework(
                random(this.spawnA, this.spawnB),
                this.height,
                random(0, this.width),
                random(this.spawnC, this.spawnD),
                random(0, 360),
                random(30, 110)))
            this.counter = 0
        }

        // remove the dead fireworks
        if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

    }
}

class Firework {
    constructor(x, y, targetX, targetY, shade, offsprings) {
        this.dead = false
        this.offsprings = offsprings

        this.x = x
        this.y = y
        this.targetX = targetX
        this.targetY = targetY

        this.shade = shade
        this.history = []
    }
    update(delta) {
        if (this.dead) return

        let xDiff = this.targetX - this.x
        let yDiff = this.targetY - this.y
        if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
            this.x += xDiff * 2 * delta
            this.y += yDiff * 2 * delta

            this.history.push({
                x: this.x,
                y: this.y
            })

            if (this.history.length > 20) this.history.shift()

        } else {
            if (this.offsprings && !this.madeChilds) {

                let babies = this.offsprings / 2
                for (let i = 0; i < babies; i++) {
                    let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
                    let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

                    birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

                }

            }
            this.madeChilds = true
            this.history.shift()
        }

        if (this.history.length === 0) this.dead = true
        else if (this.offsprings) {
            for (let i = 0; this.history.length > i; i++) {
                let point = this.history[i]
                ctx.beginPath()
                ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
                ctx.arc(point.x, point.y, 1, 0, PI2, false)
                ctx.fill()
            }
        } else {
            ctx.beginPath()
            ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
            ctx.arc(this.x, this.y, 1, 0, PI2, false)
            ctx.fill()
        }

    }
}

let canvas = document.getElementById('birthday')
let ctx = canvas.getContext('2d')

let then = timestamp()

let birthday = new Birthday
window.onresize = () => birthday.resize()
document.onclick = evt => birthday.onClick(evt)
document.ontouchstart = evt => birthday.onClick(evt);
(function loop() {
    requestAnimationFrame(loop)

    let now = timestamp()
    let delta = now - then

    then = now
    birthday.update(delta / 1000)
})()