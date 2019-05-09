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
var timerIsRunning = false;
const clockInB = document.getElementById('checkInBtn');
const clockOutB = document.getElementById('checkOutBtn');
const clockInOut = document.getElementById('last-checked');
const mins = document.getElementById('mins');
const secs = document.getElementById('secs');
const breakB = document.getElementById("break-button");
const breakTime = document.getElementById("last-break");

// Event listeners for the timer
clockInB.addEventListener('click', function(){
  clock('in');
  clockOutB.classList.remove("hiddenBtn");
  clockInB.classList.add("hiddenBtn");
});
clockOutB.addEventListener('click', function(){
  clock('out');
  clockOutB.classList.add("hiddenBtn");
  clockInB.classList.remove("hiddenBtn");
});
breakB.addEventListener('click', timerBreak);


function loadTimer() {
  localStorage.setItem("minutes", minutes);
  localStorage.setItem("seconds", seconds);
  tidyTime();
  mins.innerHTML = minutes;
  secs.innerHTML = seconds;
  if (data.time.check != null){
    console.log("Hello there!");
  }
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

function timerBreak() {
}

function clock(status) {

}
