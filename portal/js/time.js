/*
 * Time tracking section
 * 
 * This section will have to do with the clock in, clock out, and break
 * functions. This code was last update on May 6th, 2019
 *
 */

// These are the main const and vars. These we will be using throughout the time
// section. If you change the IDs PLEASE change the IDs here. 
var minutes = 15;
var seconds = 00;
var timer;
const clockInB = document.getElementById('checkInBtn');
const clockOutB = document.getElementById('checkOutBtn');
const clockInOut = document.getElementById('last-checked');
const breakText = document.getElementById('last-break');
const mins = document.getElementById('mins');
const secs = document.getElementById('secs'); 
const breakB = document.getElementById("break-button");
const breakBText = document.getElementById("break-button-text");
const dateTime = document.getElementById("time");
const dateTimeAPM = document.getElementById("apm");
const dateTimeDate = document.getElementById("date");


clockInB.addEventListener('click', function () {
    var setDate = editDate(new Date());
    clockOutB.classList.remove("hiddenBtn");
    clockInB.classList.add("hiddenBtn");
    if (!data.time.check) {
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
    resetBreak();
});
clockOutB.addEventListener('click', function () {
    var setDate = editDate(new Date());
    clockOutB.classList.add("hiddenBtn");
    clockInB.classList.remove("hiddenBtn");
    if (data.time.check) {
        console.log(data.time.check);
        db.collection('users').doc(userId).update({
            "time.checkKey": setDate,
            "time.check": false,
            "time.breakAllowed": false
        });

        db.collection('users').doc(userId).collection('hoursWorked').doc(data.time.checkKey).update({
            "end": setDate.slice(-5)
        })
        window.open('https://www.myworkday.com/byuhi/d/home.htmld', '_blank');
        //alerts the user 
    } else {
        alert("You are already logged out");
    }
    resetBreak();

});
breakB.addEventListener('click', function () {
    var setDate = editDate(new Date());
    if (data.time.break) {
        breakB.classList.remove('expanded');
        breakB.classList.remove("break-warning");
        breakB.classList.remove("break-overtime");
        db.collection('users').doc(userId).update({
            "time.break": false,
            "time.breakKey": setDate
        });
        db.collection('users').doc(userId).collection('breaks').doc(data.time.breakKey).update({
            "end": setDate.slice(-5)
        })
        mins.classList.remove("over");
        secs.classList.remove("over");
        localStorage.setItem('minutes', minutes);
        localStorage.setItem('seconds', seconds);
        clearInterval(timer);
    } else {
        if (!data.time.check) {
            alert("You are logged out. No breaks are allowed");
        } else {
            // Start Break
            breakB.classList.add('expanded');
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
});
function loadTimer() {
    db.collection("users").where("name", "==", userName)
        .onSnapshot((querySnapshot) => {
            var setDate = editDate(new Date());
            data = querySnapshot.docs[0].data();
            userId = querySnapshot.docs[0].id;
            preferance = data.viewMode;
            if (localStorage.getItem('minutes') != null) {
                minutes = Number(localStorage.getItem("minutes"));
                seconds = Number(localStorage.getItem("seconds"));
            } else {
                localStorage.setItem('minutes', minutes);
                localStorage.setItem('seconds', seconds);
            }
            if (data.time.check != null) {
                if (data.time.check) {
                    clockOutB.classList.remove("hiddenBtn");
                    clockInB.classList.add("hiddenBtn");
                    clockInOut.innerHTML = "Clocked in at " + prettyTime(data.time.checkKey.slice(-5));
                } else{
                    clockInOut.innerHTML = "Clocked out at " + prettyTime(data.time.checkKey.slice(-5));
                }
                if (data.time.break) {
                    breakBText.innerHTML = "Stop Break"
                    breakText.innerHTML = "Break Started: " + prettyTime(data.time.breakKey.slice(-5));
                } else {
                    breakBText.innerHTML = "Start Break"
                    breakText.innerHTML = "Break Stopped: " + prettyTime(data.time.breakKey.slice(-5));
                }
            }
            printTimer();

        })
}
function countdown() {
    if (data.time.break) {
        if (seconds == 0) {
            minutes -= 1;
            seconds = 60;
        }
        seconds -= 1;

        if (minutes == 0) {
            localStorage.removeItem('minutes');
            localStorage.removeItem('seconds');
        }

        if (minutes <= 1 && seconds <= 30) {
            breakB.classList.add("break-warning");
            // clearInterval(timer);
        }
        if (minutes <= 0 && seconds <= 0) {
            minutes = 15;
            seconds = 00;
            breakB.classList.remove("break-warning");
            breakB.classList.add("break-overtime");
            // clearInterval(timer);
        }
        printTimer()
    }
}
function printTimer() {
    if (minutes < 10) {
        minutes = "0" + Number(minutes);
    }
    if (seconds < 10) {
        seconds = "0" + Number(seconds);
    }
    mins.innerHTML = minutes;
    secs.innerHTML = seconds;
    return true;
}
function prettyTime(time){ 
    var hour = time.split(":")[0];
    var min = time.split(":")[1];
    var mer = "am";
    if (time.split(":")[0] > 12) {
      hour = time.split(":")[0] - 12;
      mer = "pm";
    }
    return hour + ":" + min + " " + mer;
}
function resetBreak() {
    localStorage.setItem('minutes', 15);
    localStorage.setItem('seconds', 0);
  }
function startTime() {
    var time = new Date();
    var date = time.toLocaleString('en-US', {month: "long", day: "2-digit", year:"numeric"});
    var time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    var apm = time.slice(-2);
    var time = time.slice(0, -2);
    dateTime.innerHTML = time;
    dateTimeAPM.innerHTML = apm
    dateTimeDate.innerHTML = date;
    var t = setTimeout(startTime, 500);
}