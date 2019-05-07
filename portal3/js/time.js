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
const breakTime = document.getElementById("last-break");
var moveOn;
//This is for async functions. It will be true and then they the function will contenue






// Initial startup.
// If the local storage is empty, then we will give them the basic 15 minutes
// else this statement will bring back the old time
async function loadTimer() {
    var snapshot = await getData();
    if (localStorage.getItem('minutes') != null) {
        minutes = Number(localStorage.getItem("minutes"));
        seconds = Number(localStorage.getItem("seconds"));
    }
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);
    moveOn = await tidyTime();
    if (moveOn) {
        mins.innerHTML = minutes;
        secs.innerHTML = seconds;
    }
    if (snapshot.time.check) {
        console.log("Hello There")
        clockInB.classList.add('hiddenBtn');
        clockOutB.classList.remove('hiddenBtn');

    } else if (!snapshot.time.check) {
        clockInB.classList.remove('hiddenBtn');
        clockOutB.classList.add('hiddenBtn');

    }
    loadUser();
}


async function loadUser() {
    if (moveOn) {
        if (!data.time.break) {
            breakTime.innerHTML = "On Break";
            document.getElementById('breakButtonText').innerHTML = "Return from Break";
        } else {
            document.getElementById('breakButtonText').innerHTML = "Start Break";
            breakTime.innerHTML = `Last break finished at: ${data.time.breakKey.slice(-5)}`;
        }
        if (data.time.check) {
            db.collection('users').doc(userId).collection('hoursWorked').doc(data.time.checkKey).get()
                .then(async function (doc) {
                    var checkinTime = doc.checkKey.slice(-5);
                    var hour = checkinTime.split(":")[0];
                    var min = checkinTime.split(":")[1];
                    var mer = "am";
                    if (checkinTime.split(":")[0] > 12) {
                        hour = checkinTime.split(":")[0] - 12;
                        mer = "pm";
                    }
                    moveOn = await tidyTime();
                    if (moveOn) {
                        clockInB.classList.add('hiddenBtn');
                        clockOutB.classList.remove('hiddenBtn');
                        clockInOut.innerHTML = `Check in time: ` + hour + ":" + min + " " + mer;
                    }

                })
        } else {
            // Checked Out
            db.collection('users').doc(userId).collection('hoursWorked').doc(data.time.checkKey).get()
                .then(async function (doc) {
                    var checkoutTime = doc.data().end;
                    var hour = checkoutTime.split(":")[0];
                    var min = checkoutTime.split(":")[1];
                    var mer = "am";
                    if (checkoutTime.split(":")[0] > 12) {
                        hour = checkoutTime.split(":")[0] - 12;
                        mer = "pm";
                    }
                    moveOn = await tidyTime();
                    if (moveOn) {
                        clockInB.classList.remove('hiddenBtn');
                        clockOutB.classList.add('hiddenBtn');
                        clockInOut.innerHTML = `Check out time: ` + hour + ":" + min + " " + mer;
                    }
                })
        }
    }
}


function tidyTime() {
    if (minutes < 10) {
        minutes = "0" + Number(minutes);
    }
    if (seconds < 10) {
        seconds = "0" + Number(seconds);
    }
}



// Sequence of events as the user checks in. First we hide the clock in button
// and show the clock out. Then we clear the local storage, and reset the timer.
// We then change the innerHTML.
document.getElementById('checkInBtn').addEventListener('click', clockIn);

function clockIn() {
    clockInB.classList.add('hiddenBtn');
    clockOutB.classList.remove('hiddenBtn');
    localStorage.clear();
    mins.innerHTML = 15;
    secs.innerHTML = 00;
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
}


// Sequence of events as the user checks out. First we show the clock in button
// and hide the clock out. Then we check if the timer is running.
// We then change the innerHTML.
document.getElementById('checkOutBtn').addEventListener('click', clockOut);

function clockOut() {
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
        clockInB.classList.remove('hiddenBtn');
        clockOutB.classList.add('hiddenBtn');
        db.collection('users').doc(userId).collection('hoursWorked').doc(data.time.checkKey).update({
            "end": setDate.slice(-5)
        })
        window.open('https://www.myworkday.com/byuhi/d/home.htmld', '_blank');
    } else {
        alert("You are already logged out");
    }
}


//if user starts or end break, call necessary events
breakB.addEventListener('click', () => {
    loadUser();
    var setDate = editDate(new Date());
    // End break
    if (data.time.break) {
        db.collection('users').doc(userId).update({
            "time.break": false,
            "time.breakKey": setDate
        });
        db.collection('users').doc(userId).collection('breaks').doc(data.time.breakKey).update({
            "end": setDate.slice(-5)
        })
    } else {
        if (!data.time.check) {
            alert("You are logged out. Please clock in to take a break from work");
        } else {
            // Start Break

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

    mins.innerHTML = minutes;
    secs.innerHTML = seconds;
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



function resetBreak() {
    localStorage.setItem('minutes', 15);
    localStorage.setItem('seconds', 0);
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