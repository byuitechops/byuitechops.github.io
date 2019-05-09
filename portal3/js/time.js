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
const mins = document.getElementById('mins');
const secs = document.getElementById('secs');
const breakB = document.getElementById("break-button");


// Event listeners for the timer
clockInB.addEventListener('click', function () {
    var setDate = editDate(new Date());
    clockOutB.classList.remove("hiddenBtn");
    clockInB.classList.add("hiddenBtn");
    if (!data.time.check) {
        console.log(data.time.check);
        console.log(userId);
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
        db.collection('users').doc(userId).update({
            "time.break": false,
            "time.breakKey": setDate
        });
        db.collection('users').doc(userId).collection('breaks').doc(data.time.breakKey).update({
            "end": setDate.slice(-5)
        })
        stopCount();
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
})


function loadTimer() {
    db.collection("users").where("name", "==", userName)
        .onSnapshot((querySnapshot) => {
            data = querySnapshot.docs[0].data();
            userId = querySnapshot.docs[0].id;
            preferance = data.viewMode;
            console.log(data.time.break);
            console.log(preferance);
            if (localStorage.getItem('minutes') != null) {
                minutes = Number(localStorage.getItem("minutes"));
                seconds = Number(localStorage.getItem("seconds"));
            }
            localStorage.setItem("minutes", minutes);
            localStorage.setItem("seconds", seconds);
            if (data.time.check != null) {
                if (data.time.check) {
                    clockOutB.classList.remove("hiddenBtn");
                    clockInB.classList.add("hiddenBtn");
                }
            }
            printTime();

        })
}

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
        mins.classList.add("over");
        secs.classList.add("over");
        // clearInterval(timer);
    }
    printTime()
}


function stopCount() {
    mins.classList.remove("over");
    secs.classList.remove("over");
}

function tidyTime() {
    if (minutes < 10) {
        minutes = "0" + Number(minutes);
    }
    if (seconds < 10) {
        seconds = "0" + Number(seconds);
    }
    return true;
}

function printTime() {
    tidyTime();
    mins.innerHTML = minutes;
    secs.innerHTML = seconds;
}

function resetBreak() {
    localStorage.setItem('minutes', 15);
    localStorage.setItem('seconds', 0);
}