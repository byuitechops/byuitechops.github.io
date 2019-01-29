//This script notifies team members when night shift requirement has not been met
//Trigger for function set to go off every Thursday between at 6:00am and 7:00am
//Go to "Edit" then "Current Project's Triggers" to manage and set triggers

function checkForNightHours(){
  var ss = SpreadsheetApp.openById("12WXvcWmS7S2E0NZaTnyyhLdzNsrwllD85UsavRXfpZM");
  var date = new Date();
  
  //Compare the current date with the dates with in the "Variables" sheet to determine the current week
  var sheet = ss.getSheetByName("Variables");
  var range = sheet.getRange("C1:C16");
  var values = range.getValues();
  var names = [];
  for (var i=1; i<16; i++) {
    if (date > values[i][0] && date < values[i+1][0]) {
      var sheetNumber = i + 1;
      var sheetName = "Week " + sheetNumber;
      var currentSheet = ss.getSheetByName(sheetName);
      
      //loop through and count list of team members
      var csRange = currentSheet.getRange("A4:B25");
      var count = 0;
      for (var k = 1; k <= 20; k++){
        var cellValue = csRange.getCell(k,1).getValue();
        if (cellValue !== '') {
          count += 1;
        }
        else {
          break;
        }
      }
      
      //loop through the total number of hours for each team member for the current week
      for (var j = 1; j <= count; j++) {
        var background = csRange.getCell(j,2).getBackground();
        
        //check whether the cell background is not white, if it isn't white push name of team member to array and find the team member's email by looping through the variables sheet
        //after a team member's email is found, pass the team member's name, email, and the sheet number to the sendNotifationToTeamMember function
        if (background != "#ffffff"){
          var name = csRange.getCell(j,1).getValue();
          names.push(name);
          var lastRow = count + 1;
          var emailRange = sheet.getRange("A1:B"+lastRow).getValues();
          for (var k = 0; k < lastRow; k++) {
            var nameMatch = emailRange[k][0];
            if (name == nameMatch){
              var email = emailRange[k][1];
              sendNotificationToTeamMember(name, sheetNumber, email);
              break;
            }
          }
        }
      }
      
      //Send a list of students who have not met night shift requirements to the team lead and HR
       sendNotificationToLeads(names, sheetNumber);
       break;
    }
    else {
      break;
    }
  }
}

//function to send a notification email to team member
function sendNotificationToTeamMember(name, sheetNumber, email){
  var message = 'Hi ' + name + ',' + '\n\n' + 'The schedule shows that you haven\'t signed up for a night shift for week ' + sheetNumber + '. Remember that a night shift must be three consecutive hours long and that it must be between 5pm and 10pm. If you cannot work a night shift, you may work every Saturday for the month instead. Please be sure to sign up for a shift before week ' + sheetNumber + ' closes tomorrow!';
  MailApp.sendEmail(email,
                   "Week " + sheetNumber + " Scheduling Reminder",
                     message, {
                       name: 'Tech Ops Scheduling Notifications'}
                    );
}

//function to send a notification email to the team lead and HR
//only send a message if the number of team members that have not scheduled a shift is > 0
//Set message depending on the number of team members that have not scheduled a shift
function sendNotificationToLeads(names, sheetNumber){
  if (names.length > 0) {
    if (names.length < 2) {
       var message = 'This notification is to inform you that ' + names + ' hasn\'t signed up for a night shift for week ' + sheetNumber + ' in the Canvas Team Schedule.';
    }
    else if(names.length == 2) {
       var message = 'This notification is to inform you that ' + names[0] + ' and ' + names[1] + ' haven\'t signed up for a night shift for week ' + sheetNumber + ' in the Canvas Team Schedule.';
    }
    else {
      var message = 'This notification is to inform you that ';
      var lastItem = names.length - 1;
      for (var i = 0 ; i < names.length; i++) {
        var name = names[i];
        if(i == lastItem) {
          var messageNames = 'and ' + name;
          message = message.concat(messageNames);
          break;
        }
        else {
          var messageNames = name + ', ';
          message = message.concat(messageNames);
        }
    }
      var messagePartTwo = ' haven\'t signed up for a night shift for week ' + sheetNumber + ' in the Canvas Team Schedule.';
      message = message.concat(messagePartTwo);
    }
    MailApp.sendEmail("coo15018@byui.edu, hei15001@byui.edu",
                   "Week " + sheetNumber + " Scheduling Notification",
                     message, {
                       name: 'Tech Ops Scheduling Notifications'}
                      );
                 
  }
}
