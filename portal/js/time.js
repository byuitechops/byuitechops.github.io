var minutes = 15;
var seconds = 00;
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
      document.getElementById('breakBtn').style.backgroundColor = $accent2;
      document.getElementById('breakBtn').style.borderColor = $accent2;
    } else {
      // Off break
      document.getElementById('breakBtn').innerText = "Start Break";
      document.getElementById('breakTime').innerText = `Last break finished at: ${data.time.breakKey.slice(-5)}`;
      document.getElementById('breakBtn').style.backgroundColor = $primary;
      document.getElementById('breakBtn').style.borderColor = $primary;
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
      .then(function(doc) {
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
    for (var i = 0; i < document.getElementsByTagName("a").length; i++){
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
      for (var i = 0; i < document.getElementsByTagName("a").length; i++){
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