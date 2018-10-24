function loadUser() {
  if (data.time.break) {
    // On break
    document.getElementById('breakTime').innerText = "";
    document.getElementById('breakBtn').innerText = "Return from Break";
    document.getElementById('breakBtn').style.backgroundColor = $red;
    document.getElementById('breakBtn').style.borderColor = $red;
  } else {
    // Off break
    document.getElementById('breakBtn').innerText = "Take a Break";
    document.getElementById('breakTime').innerText = `Last break finished at: ${data.time.breakKey.slice(-5)}`;
    document.getElementById('breakBtn').style.backgroundColor = $green;
    document.getElementById('breakBtn').style.borderColor = $green;
  }

  if (data.time.check) {
    // Checked In
    document.getElementById('checkTime').innerText = `Check in time: ${data.time.checkKey.slice(-5)}`;
    document.getElementById('checkBtn').innerText = "Check Out";
    document.getElementById('checkBtn').style.backgroundColor = $red;
    document.getElementById('checkBtn').style.borderColor = $red;
    // Checkout Reminder
    setInterval(() => {
      alertify.error('Reminder to check out using the portal and workday.');
    }, 3600000);
  } else {     
    // Checked Out
    document.getElementById('checkTime').innerText = "";
    document.getElementById('checkBtn').innerText = "Check In";
    document.getElementById('checkBtn').style.backgroundColor = $green;
    document.getElementById('checkBtn').style.borderColor = $green;
  }
}

document.getElementById('checkInBtn').addEventListener('click', () => {
  loadUser();
  var setDate = editDate(new Date());
  if (data.time.check) {
    db.collection('users').doc(userId).update({
      "time.check": false
    });
    db.collection('users').doc(userId).collection('hoursWorked').doc(data.time.checkKey).update({
      "end": setDate.slice(-5)
    })
  } else {
    db.collection('users').doc(userId).update({
      "time.check": true,
      "time.checkKey": setDate
    });
    db.collection('users').doc(userId).collection('hoursWorked').doc(setDate).set({
      "start": setDate.slice(-5)
    })
  }
  getUserData();
})

document.getElementById('breakBtn').addEventListener('click', () => {
  var setDate = editDate(new Date());
  // End break
  if (data.time.break) {
    db.collection('users').doc(userId).update({
      "time.break": false,
      "time.breakKey": setDate
    });
    document.getElementById('visible').style.display = "none";
    db.collection('users').doc(userId).collection('breaks').doc(data.time.breakKey).update({
      "end": setDate.slice(-5)
    })
  } else {
    // Start Break
    db.collection('users').doc(userId).update({
      "time.break": true
    });
    document.getElementById('visible').style.display = "initial";
    db.collection('users').doc(userId).collection('breaks').doc(setDate).set({
      "start": setDate.slice(-5)
    });
    timer = setInterval(countdown, 1000);
  }
  getUserData();
})
// When break finishes update break key to time

document.getElementById('messageBtn').addEventListener('click', () => {
  var message = document.getElementById('message').value;
  db.collection('users').doc(userId).collection('hoursWorked').doc(data.time.checkKey).update({
    "comment": message
  })
  document.getElementById('message').value = "Message sent";
})

function editDate(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var hour = ("0" + date.getHours()).slice(-2);
  var minute = ("0" + date.getMinutes()).slice(-2);
  var setDate = `${year}-${month}-${day} ${hour}:${minute}`;
  return setDate;
}

if (localStorage.getItem('minutes') != null) {
  var minutes = localStorage.getItem("minutes");
  var seconds = localStorage.getItem("seconds");
} else {
  var minutes = 15;
  var seconds = 01;
}
var timer;
//countdown timer
function countdown() {
  if (!data.time.break) {
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('seconds', seconds);
    clearInterval(timer);
    window.location.reload();
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

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}