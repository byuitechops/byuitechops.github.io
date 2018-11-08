function getUserData() {
  if (userName != null) {
    db.collection('users').where("name", "==", userName)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          console.log("No User with the name: " + userName);
        } else {
          querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            data = doc.data();
            userId = doc.id;
            loadUser();
          });
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  } else {
    window.setTimeout("getUserData()", 100);
  }
}
getUserData();


function loadUser() {
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

  if (data.time.check) {
    // Checked In
    document.getElementById('checkTime').innerText = `Check in time: ${data.time.checkKey.slice(-5)}`;
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
    document.getElementById('checkTime').innerText = `Check out time: ${data.time.checkKey.slice(-5)}`;
    document.getElementById('checkInBtn').style.backgroundColor = $primary;
    document.getElementById('checkInBtn').style.borderColor = $primary;
    document.getElementById('checkOutBtn').style.backgroundColor = $accent2;
    document.getElementById('checkOutBtn').style.borderColor = $accent2;
  }
}

//sequence of events as the user checks in
document.getElementById('checkInBtn').addEventListener('click', () => {
  loadUser();
  var setDate = editDate(new Date());
  //verify if the user is actually logged out
  if (!data.time.check) {
    //if the user is logged out, update firebase so now it is logged in
    db.collection('users').doc(userId).update({
      "time.check": true
    });
    db.collection('users').doc(userId).collection('hoursWorked').doc(setDate).set({
      "start": setDate.slice(-5)
    })
  } else {
    alert("You are already logged in");
  }
  getUserData();
})

//sequence of events when the user clocks out
document.getElementById('checkOutBtn').addEventListener('click', () => {
  var setDate = editDate(new Date());
  //verifies if the user is actually logged in
  if (data.time.check) {
    //if the user is then logging out, updates that on firebase and updates the end time on hours worked
   
    db.collection('users').doc(userId).update({
      "time.checkKey": setDate, 
      "time.check": false
    });
    db.collection('users').doc(userId).collection('hoursWorked').doc(data.time.checkKey).update({
      "end": data.time.checkKey.slice(-5)
    })
    loadUser();
    //alerts the user 
  } else {
    alert("You are already logged out");
  }
  getUserData();
})

 //if user starts or end break, call necessary events
document.getElementById('breakBtn').addEventListener('click', () => {
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
    // Start Break
    db.collection('users').doc(userId).update({
      "time.break": true
    });
    db.collection('users').doc(userId).collection('breaks').doc(setDate).set({
      "start": setDate.slice(-5)
    });
    //runs this variable every second
    timer = setInterval(countdown, 1000);
  }
  getUserData();
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
document.getElementById("minutes").textContent = minutes;
document.getElementById("seconds").textContent = seconds;

//calculator
var modal = document.getElementById('myModal');
var calculator = document.getElementById("calculator");
var span = document.getElementsByClassName("close")[0];
calculator.addEventListener('click', () =>{
  modal.style.display = "block";
});
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}
//calculates clock-out time and time left according to user's inputs

document.getElementById("submitBtn").addEventListener('click',() =>{
  var hoursWorked = document.getElementById("hoursWorked").value;
  var totalHours = document.getElementById("totalHours").value;
  var clockInTime = document.getElementById("clockInTime").value; 
  var hoursLeft = (totalHours - hoursWorked).toFixed(2);
  document.getElementById('timeLeft').innerText = hoursLeft;

  var orgHour = Number(clockInTime.slice(0,2));
  var orgMin = Number(clockInTime.slice(-2));

  var diffHour = Number(hoursLeft.toString().split(".")[0]);
  var diffMin = (Number("." + hoursLeft.toString().split(".")[1])*60);
  
  var ansHour = orgHour + diffHour;
  var mer = ansHour > 12 ? "PM" : "AM";
  ansHour = ansHour > 12 ? ansHour - 12 : ansHour;
  var ansMin = ("0" + (orgMin + diffMin)).slice(-2);
  

  document.getElementById('clockOutTime').innerText = `${ansHour}:${ansMin} ${mer}`;
})