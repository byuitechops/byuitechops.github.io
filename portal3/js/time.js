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
var data;
var moveOn;
//This is for async functions. It will be true and then they the function will contenue

async function loadTimer() {
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);
    await tidyTime();
    data = await getData();
    document.getElementById("mins").innerHTML = minutes;
    document.getElementById("secs").innerHTML = seconds;
    console.log(data);
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