//These functions read scheduled times for each team member and write those start and end times for each team member's shift to firebase
//A Trigger should be set to run this code every Friday between 6pm and 7pm (go to "Edit" -> "Current Project's Triggers" to see Trigger settings)

//function loops through all dates in the upcoming week
function getTeamHours() {
  var ss = SpreadsheetApp.openById('12WXvcWmS7S2E0NZaTnyyhLdzNsrwllD85UsavRXfpZM');
  var sheet = ss.getSheetByName('Variables');
  var date_range = sheet.getRange('C2:C16');
  var dates = date_range.getValues();
  
  
  var date = new Date();
  date.setHours(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setDate(date.getDate()+2); //this is the start date (sunday) for the upcoming week
  
  var endDate = new Date();
  endDate.setHours(0);
  endDate.setSeconds(0);
  endDate.setMinutes(0);
  endDate.setDate(endDate.getDate()+8);//this is the end date for the upcoming week
  
  //loop through each date in the upcoming week
  while (date <= endDate) { //while the date is less than the end date 
    date.setDate(date.getDate()+1); //add one day to the date
    
    //loops through each date in the "Variables" sheet to find which week number the day belongs to
    for (var i = 0; i < dates.length; i++){
      if (date > dates[i][0] && date < dates[i + 1][0]){
        var dayOfWeek = date.getDay(); //get the day of week in number form
        if (dayOfWeek == 6) { //if it is Saturday, the week is = i
          var week = i;
        }
        else {
          var week = i + 1;
        }
        getRange(ss,week,dayOfWeek,date);  //get the range representing the current date
        }
      }
    }
  }

//function finds the range that represents the current date (range should include the column containing the time slots for each date)
function getRange(ss,week,dayOfWeek,date){
  var sheet = ss.getSheetByName("Week "+week);
  switch (dayOfWeek) {
    case 1:
      var range = sheet.getRange("C3:M24");
      getScheduledHours(ss,sheet,range,date,week);
      break;
    case 2:
      var range = sheet.getRange("C35:M64");
      getScheduledHours(ss,sheet,range,date,week);
      break;
    case 3:
      var range = sheet.getRange("C67:M96");
      getScheduledHours(ss,sheet,range,date,week);
      break;
    case 4:
      var range = sheet.getRange("C99:M128");
      getScheduledHours(ss,sheet,range,date,week);
      break;
    case 5:
      var range = sheet.getRange("C131:M160");
      getScheduledHours(ss,sheet,range,date,week);
      break;
    case 6:
      var range = sheet.getRange("C163:M183");
      getScheduledHours(ss,sheet,range,date,week);
      break;
    case 0:
      break;
    default:
  }
}


//function loops through an array of team members names and compares the names to the names that have been scheduled for the current date
//if a name is the same as a sheduled name, the scheduled hour or half hour that is represented by the name will be pushed to an array
//if the array has at least one item, the array will be send to a function to check if the team member has scheduled multiple shifts for one day

function getScheduledHours(ss,sheet,range,date,week){
  var sheet = ss.getSheetByName('Variables');
  var names = getTeamMemberNames();  //get array of all the team members for both teams
  var scheduled_hours = range.getValues(); //get array with all of the names and time slot that are scheduled for the current date
  
  //loop through array of team members names
  for (var i = 0; i < names.length; i++) {
    var name = names[i].trim();
    var array = [];
    
    //loop through array of names that are scheduled for the current date
    for (var j = 0; j < scheduled_hours.length; j++) {
      for (var k = 1; k < scheduled_hours[j].length; k++) {
        
        //if a name that is scheduled is equal to the name of the team member push the time slot to an array
        if (scheduled_hours[j][k] == names[i]){
          var scheduled_date = scheduled_hours[j][0];
          array.push(scheduled_date);
        }
      }
    }
    //if there are more than one timeslots within the array, check array for multiple shifts
    if(array.length > 1) {
    checkForMultipleShifts(array,name,date,week);
    }
  }
}


//this function checks to see if a team member has scheduled multiple shifts on a single date
//function loops through an array of the team member's scheduled times for the current shift
//if items in the array are not in sequential order (going up in thirty minute increments) then multiple shifts have been scheduled
function checkForMultipleShifts(array,name,date,week) {
  var arrayItemNumber = 0;
  var multipleShifts = false;
  var newArray = [];
  
  //loop through scheduled times in array
  for (var i = 0; i < array.length - 1; i++){
    var hours= array[i].getHours();
    var mins = array[i].getMinutes();
    var plusOneHour = hours + 1;
    var nextTimeObjectHours = array[i+1].getHours();
    var nextTimeObjectMins = array[i+1].getMinutes();
    
    //if the next scheduled time slot is not the next consecuitive time slot on the schedule the team member has scheduled multiple shifts 
    if((mins == 0 && (nextTimeObjectMins != 30 || nextTimeObjectHours != hours)) || (mins == 30 && (nextTimeObjectMins != 00 || nextTimeObjectHours != plusOneHour))){
      
      //put first shift into an new array
      var start_time = array[arrayItemNumber];
      var end_time = array[i];
      newArray.push(start_time);
      newArray.push(end_time);
      arrayItemNumber = i + 1;
      multipleShifts = true; 
      
      //send first shift to firebase
      sendToFirebase(newArray,name,date,week);
      }
  }
  
  // if there are not multiple shifts, send shift to firebase
  if(!multipleShifts) {
    sendToFirebase(array,name,date,week);
  }
  
  //if there are multiple shifts send the second shift to firebase
  else {
    var start_time = array[arrayItemNumber];
    var end_time = array[i];
    newArray = [];
    newArray.push(start_time);
    newArray.push(end_time);
    arrayItemNumber = i + 1;
    sendToFirebase(newArray,name,date,week);
  }
}

//function gets the start and end time for the team member's shift, and then sends the team member's schedule information to firebase
function sendToFirebase(array,name,date,week){
  var firstArrayItem = array[0];
  var startHours24 = firstArrayItem.getHours();
  var startMinutes = firstArrayItem.getMinutes();
  var start_time  = transformStartTimeStamp(startHours24,firstArrayItem,startMinutes);
  
  var lastArrayIndex = array.length - 1;
  var lastArrayItem = array[lastArrayIndex];
  var endHours24 = lastArrayItem.getHours();
  var endMinutes = lastArrayItem.getMinutes();
  var end_time  = transformEndTimeStamp(endHours24,lastArrayItem,week,endMinutes);
  
  date = convertDate(date);
  
  Logger.log("Start: " + start_time);
  Logger.log("End: " + end_time);

  var baseUrl = "https://techopsportal.firebaseio.com/";
  var secret = "KDiwC0yNhiFeddw8LaBYYQlMak3SX5muOj2p0u6b";
  var database = FirebaseApp.getDatabaseByUrl(baseUrl, secret);
  var data = {"End":end_time,"Start":start_time};
//  database.setData("users/"+name+"/TimeClock/ScheduledTime/"+date+" "+start_time, data);
}

//this function transforms the start time of a team member's shift to the correct format
function transformStartTimeStamp(startHours24,firstArrayItem,startMinutes) {
  var hours = ("0" + startHours24).slice(-2);
  var minutes = startMinutes > 10 ? startMinutes : "0" + startMinutes;
  var time = hours + ":" + minutes + ":00 ";
  return time;
}

//this function transforms the end time of a team member's shift to the correct format
function transformEndTimeStamp(endHours24,lastArrayItem,week,endMinutes) {
    if (endMinutes == 0) {
      endMinutes = 30;
    }
    else {
      endMinutes = 0;
      endHours24 += 1;
    }
  var hours = ("0" + endHours24).slice(-2);
  var minutes = endMinutes > 10 ? endMinutes : "0" + endMinutes;
  var time = hours + ":" + minutes + ":00 ";
  return time;
}

//this function gets the names of every team member from every team schedule spreadsheet
function getTeamMemberNames() {
  var names = [];
  
  var ss = SpreadsheetApp.openById('1xZGwTxPbx9w56hC-4CUJnBxK0fPJTrMLqj-91pCFRhQ');
  var sheet = ss.getSheetByName('Variables');
  var name_range = sheet.getRange('A2:A25');
  var values = name_range.getValues();
  
  for (var i = 0; i < values.length; i++){
    if (values[i][0] != ""){
      if (values[i][0] == "Brooklyn Olson") {
          names.push("Booklyn Cook");
        } else if (values[i][0] == "Bri Spaulding") {
          names.push("Brianna Pineda");
        } else if (values[i][0] == "Desi Wilson") {
          names.push("Desiree Wheeler");
        } else if (values[i][0] == "Ian Coolabanan") {
          names.push("Ian Caloobanan");
        } else {
          names.push(values[i][0]);
        }
    }
    else {
      break;
    }
  }
  
  var ss = SpreadsheetApp.openById('12WXvcWmS7S2E0NZaTnyyhLdzNsrwllD85UsavRXfpZM');
  var sheet = ss.getSheetByName('Variables');
  var name_range = sheet.getRange('A2:A25');
  var values = name_range.getValues();
  
  for (var i = 0; i < values.length; i++){
    if (values[i][0] != ""){      
      if (values[i][0] == "Brooklyn Olson") {
          names.push("Booklyn Cook");
        } else if (values[i][0] == "Bri Spaulding") {
          names.push("Brianna Pineda");
        } else if (values[i][0] == "Desi Wilson") {
          names.push("Desiree Wheeler");
        } else {
          names.push(values[i][0]);
        }
    }
    else {
      break;
    }
  } 
  return names;
}

function convertDate(date) {
  var day = date.getDate();
  var dd = day >= 10 ? day : "0" + day;
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  date = mm + "-" + dd + "-" + yyyy;
  return date;
}