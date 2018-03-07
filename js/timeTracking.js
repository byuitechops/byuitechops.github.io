/*--------------------------------- Connect to Firebase -------------------------------*/
var config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};
firebase.initializeApp(config);
/*---------------------------- End of Connect to Firebase -----------------------------*/


/*--------------------------------- Global Variables ----------------------------------*/

var times; // all dates and times in/out of a user
var month; // current month
var year; // current year
var isAdmin = false; // for dropdown menu functions
var isTeamLead = false; // for dropdown menu functions
var selectedNumber; // whatever day of the month that is clicked on
var l; // for editing calendar functions
var m; // for editing calendar functions
var n; // for editing calendar functions
var o; // for editing calendar functions
var w; // for editing calendar functions
var x; // for editing calendar functions
var y; // for editing calendar functions
var z; // for editing calendar functions
var deleteDb; // for editing calendar functions
/*----------------------------- End of Global Variables -------------------------------*/



/*--------------------------- Display time in/out and breaks --------------------------*/

/* Retrieves info from Firebase to display the current user's check ins and outs */
function showModal(num, selected) {
    firebase.auth().onAuthStateChanged(function (user) {
        // if a name is selected and the selection isn't blank, show the data for the person selected. Else, show the data for the user currently logged in
        var user;
        if (selected != user.displayName && selected != "") {
            user = selected;
        } else {
            user = firebase.auth().currentUser.displayName;
        }
        var ppl = firebase.database().ref('users/' + user + '/TimeClock/HoursWorked').once('value');
        ppl.then(function (snapshot) {
            var person = (snapshot.val());
            var dates = Object.keys(person);
            times = dates;
            var monthDays = [];
            var currentMonth = [];
            var count = 0;
            // Finds the day of the month by taking the value between the two dashes
            // For example, the date 2-14-2017 would turn into 14
            for (var i = 0; i < dates.length; i++) {
                if (document.getElementById("month-dropdown").value == dates[i][0]) {
                    currentMonth[count] = dates[i];
                    var firstDash = currentMonth[count].indexOf("-");
                    var lastDash = currentMonth[count].lastIndexOf("-");
                    monthDays[count] = currentMonth[count].slice(firstDash + 1, lastDash);
                    if (monthDays[count][0] == 0) {
                        monthDays[count] = monthDays[count].slice(1);
                    }
                    count++;
                }
            }
            var check = false;

            // loops through each in/out and comment and sets it equal to the HTML to display
            for (var i = 0; i < monthDays.length; i++) {
                // gets the first instance of clock in/out if there are two
                if (num == monthDays[i + 1]) {
                    // if there isn't an instance of this, it sets the text to 'N/A'
                    if (person[currentMonth[i + 1]].CommentIn == undefined) {
                        person[currentMonth[i + 1]].CommentIn = "N/A";
                    }
                    if (person[currentMonth[i + 1]].CommentOut == undefined) {
                        person[currentMonth[i + 1]].CommentOut = "N/A";
                    }
                    if (person[currentMonth[i + 1]].Out == undefined) {
                        person[currentMonth[i + 1]].Out = "N/A";
                    }
                    // code for displaying info in modal boxes
                    var txtIn = "Clocked in at: " + person[currentMonth[i + 1]].In;
                    var txtComIn = "CommentIn: " + person[currentMonth[i + 1]].CommentIn;
                    var txtOut = "Clocked out at: " + person[currentMonth[i + 1]].Out;
                    var txtComOut = "CommentOut: " + person[currentMonth[i + 1]].CommentOut;
                    document.getElementById("modalTextIn").innerHTML = txtIn;
                    document.getElementById("modalTextOut").innerHTML = txtOut;
                    document.getElementById("modalTextCommentIn").innerHTML = txtComIn;
                    document.getElementById("modalTextCommentOut").innerHTML = txtComOut;
                    check = true;
                } // gets the first instance of clock in/out if there is only one
                else if (num == monthDays[i]) {;
                    if (person[currentMonth[i]].CommentIn == undefined) {
                        person[currentMonth[i]].CommentIn = "N/A";
                    }
                    if (person[currentMonth[i]].CommentOut == undefined) {
                        person[currentMonth[i]].CommentOut = "N/A";
                    }
                    if (person[currentMonth[i]].Out == undefined) {
                        person[currentMonth[i]].Out = "N/A";
                    }
                    var txtIn = "Clocked in at: " + person[currentMonth[i]].In;
                    var txtComIn = "CommentIn: " + person[currentMonth[i]].CommentIn;
                    var txtOut = "Clocked out at: " + person[currentMonth[i]].Out;
                    var txtComOut = "CommentOut: " + person[currentMonth[i]].CommentOut;
                    document.getElementById("modalTextIn").innerHTML = txtIn;
                    document.getElementById("modalTextOut").innerHTML = txtOut;
                    document.getElementById("modalTextCommentIn").innerHTML = txtComIn;
                    document.getElementById("modalTextCommentOut").innerHTML = txtComOut;
                    document.getElementById("secondShiftIn").innerHTML = "No time logged";
                    document.getElementById("secondShiftOut").innerHTML = "";
                    document.getElementById("secondShiftCommentIn").innerHTML = ""
                    document.getElementById("secondShiftCommentOut").innerHTML = "";
                    check = true;
                    break;
                } else {
                    document.getElementById("secondShiftIn").innerHTML = "No time logged";
                    document.getElementById("secondShiftOut").innerHTML = "";
                    document.getElementById("secondShiftCommentIn").innerHTML = ""
                    document.getElementById("secondShiftCommentOut").innerHTML = "";
                }
                // gets the second instance of clock in/out if there are two instances
                if (num == monthDays[i]) {
                    if (person[currentMonth[i]].CommentIn == undefined) {
                        person[currentMonth[i]].CommentIn = "N/A";
                    }
                    if (person[currentMonth[i]].CommentOut == undefined) {
                        person[currentMonth[i]].CommentOut = "N/A";
                    }
                    if (person[currentMonth[i]].Out == undefined) {
                        person[currentMonth[i]].Out = "N/A";
                    }
                    var txtIn = "Clocked in at: " + person[currentMonth[i]].In;
                    var txtComIn = "CommentIn: " + person[currentMonth[i]].CommentIn;
                    var txtOut = "Clocked out at: " + person[currentMonth[i]].Out;
                    var txtComOut = "CommentOut: " + person[currentMonth[i]].CommentOut;
                    document.getElementById("secondShiftIn").innerHTML = txtIn;
                    document.getElementById("secondShiftOut").innerHTML = txtOut;
                    document.getElementById("secondShiftCommentIn").innerHTML = txtComIn;
                    document.getElementById("secondShiftCommentOut").innerHTML = txtComOut;
                    check = true;
                    break;
                }
            }
            // if none of the above are true, just display 'No time logged'
            if (!check) {
                document.getElementById("modalTextIn").innerHTML = "No time logged";
            }
            // resets the loop
            count = 0;
        });
        // if there is an error, return
        ppl.catch(function (error) {
            alert(error);
            return;
        });

        // Does the same thing as part of function above, with more if/else statements since there are typically more breaks than checkin/outs
        var breaks = firebase.database().ref('users/' + user + '/TimeClock/Breaks').once('value');
        breaks.then(function (snapshot) {
            var person = (snapshot.val());
            var dates = Object.keys(person);
            var monthDays = [];
            var currentMonth = [];
            var count = 0;
            for (var i = 0; i < dates.length; i++) {
                if (document.getElementById("month-dropdown").value == dates[i][0]) {
                    currentMonth[count] = dates[i];
                    var firstDash = currentMonth[count].indexOf("-");
                    var lastDash = currentMonth[count].lastIndexOf("-");
                    monthDays[count] = currentMonth[count].slice(firstDash + 1, lastDash);
                    if (monthDays[count][0] == 0) {
                        monthDays[count] = monthDays[count].slice(1);
                    }
                    count++;
                }
            }
            var check = false;
            var txt = "";
            for (var i = 0; i < monthDays.length; i++) {
                if (num == monthDays[i]) {
                    if (person[currentMonth[i]].In == undefined) {
                        person[currentMonth[i]].In = "N/A";
                    }
                    if (person[currentMonth[i]].Out == undefined) {
                        person[currentMonth[i]].Out = "N/A";
                    }
                    var txt = "Break Out: " + person[currentMonth[i]].Out;
                    txt += "<br />Break In:  " + person[currentMonth[i]].In + "<br />";
                    document.getElementById("breakText1").innerHTML = txt;
                    check = true;
                } else {
                    continue;
                }
                if (num == monthDays[i + 1]) {
                    if (person[currentMonth[i + 1]].In == undefined) {
                        person[currentMonth[i + 1]].In = "N/A";
                    }
                    if (person[currentMonth[i + 1]].Out == undefined) {
                        person[currentMonth[i + 1]].Out = "N/A";
                    }
                    var txt = "Break Out: " + person[currentMonth[i + 1]].Out;
                    txt += "<br />Break In: " + person[currentMonth[i + 1]].In + "<br />";
                    document.getElementById("breakText2").innerHTML = txt;
                    check = true;
                } else {
                    document.getElementById("breakText2").innerHTML = "No more breaks";
                    break;
                }
                if (num == monthDays[i + 2]) {
                    if (person[currentMonth[i + 2]].In == undefined) {
                        person[currentMonth[i + 2]].In = "N/A";
                    }
                    if (person[currentMonth[i + 2]].Out == undefined) {
                        person[currentMonth[i + 2]].Out = "N/A";
                    }
                    var txt = "Break Out: " + person[currentMonth[i + 2]].Out;
                    txt += "<br />Break In:  " + person[currentMonth[i + 2]].In + "<br />";
                    document.getElementById("breakText3").innerHTML = txt;
                    check = true;
                } else {
                    document.getElementById("breakText3").innerHTML = "No more breaks";
                    break;
                }
                if (num == monthDays[i + 4]) {
                    if (person[currentMonth[i + 3]].In == undefined) {
                        person[currentMonth[i]].In = "N/A";
                    }
                    if (person[currentMonth[i + 3]].Out == undefined) {
                        person[currentMonth[i + 3]].Out = "N/A";
                    }
                    var txt = "Break Out: " + person[currentMonth[i + 3]].Out;
                    txt += "<br />Break In:  " + person[currentMonth[i + 3]].In + "<br />";
                    document.getElementById("breakText4").innerHTML = txt;
                    check = true;
                } else {
                    document.getElementById("breakText4").innerHTML = "No more breaks";
                    break;
                }
                if (num == monthDays[i + 4]) {
                    if (person[currentMonth[i + 4]].In == undefined) {
                        person[currentMonth[i + 4]].In = "N/A";
                    }
                    if (person[currentMonth[i + 4]].Out == undefined) {
                        person[currentMonth[i + 4]].Out = "N/A";
                    }
                    var txt = "Break Out: " + person[currentMonth[i + 4]].Out;
                    txt += "<br />Break In:  " + person[currentMonth[i + 4]].In + "<br />";
                    document.getElementById("breakText5").innerHTML = txt;
                    check = true;
                } else {
                    document.getElementById("breakText").innerHTML = "No more breaks";
                    break;
                }
            }
            if (!check) {
                document.getElementById("breakText1").innerHTML = "No breaks logged";
            }
        });
        count = 0;
        breaks.catch(function (error) {
            alert(error);
            return;
        });
    });
}
/*----------------------- End of Display time in/out and breaks -----------------------*/



/*-------------------------------- Calendar Functions -------------------------------- */

/* Determines if the year is a leap year */
function leapYear(year) {
    if (year % 4 == 0) // basic rule
        return true // is leap year
    /* else */ // else not needed when statement is "return"
    return false // is not leap year
}

/* Sets the number of days in each month */
function getDays(month, year) {
    // create array to hold number of days in each month
    var ar = new Array(11)
    ar[1] = 31 // January
    ar[2] = (leapYear(year)) ? 29 : 28 // February
    ar[3] = 31 // March
    ar[4] = 30 // April
    ar[5] = 31 // May
    ar[6] = 30 // June
    ar[7] = 31 // July
    ar[8] = 31 // August
    ar[9] = 30 // September
    ar[10] = 31 // October
    ar[11] = 30 // November
    ar[12] = 31 // December

    // return number of days in the specified month (parameter)
    return ar[month]
}

/* Sets each month name to the number of that month */
function getMonthName(month) {
    // create array to hold name of each month
    var ar = new Array(12)
    ar[1] = "January  &#9731;"
    ar[2] = "February &#9825"
    ar[3] = "March &#9752"
    ar[4] = "April &#9730"
    ar[5] = "May &#10048"
    ar[6] = "June &#9928"
    ar[7] = "July &#9728"
    ar[8] = "August &#9969"
    ar[9] = "September &#9998"
    ar[10] = "October &#9760"
    ar[11] = "November 🍽️"
    ar[12] = "December &#10053"

    // return name of specified month (parameter)
    return ar[month]
}

/* Populates calendar with the days in the month */
function setCal(sMonth) {
    month = sMonth;
    // standard time attributes
    var selected = document.getElementById('name-dropdown').value;
    calcTotals(selected);
    clearCal();
    var now = new Date()
    var cMonth = now.getMonth();
    sMonth = Number(sMonth);
    sMonth -= 1;
    year = now.getYear();
    if (year < 1000) {
        year += 1900
    }
    if ((cMonth - sMonth) >= 0) {
        //year is the same
    } else {
        year = (year - 1);
    }
    var monthName = getMonthName(sMonth + 1)
    var date = now.getDate()
    now = null

    // create instance of first day of month, and extract the day on which it occurs
    var firstDayInstance = new Date(year, sMonth, 1)
    var firstDay = firstDayInstance.getDay()
    if (firstDay > 0) {
        firstDay -= 1;
    } else if (firstDay == 0) {
        firstDay = 6;
    }
    firstDayInstance = null;

    // number of days in current month
    var days = getDays(sMonth + 1, year)

    // Add Extra Row if neccesary
    if ((firstDay == 5 && days == 31) || (firstDay == 6 && days >= 30)) {
        document.getElementById('rowsix').classList.remove('hide');
        document.getElementById('week6').classList.remove('hide');
    } else {
        document.getElementById('rowsix').classList.add('hide');
        document.getElementById('week6').classList.add('hide');
    }

    var t1 = document.getElementById("t1");
    var table = document.getElementById("t1");

    var d = 1;
    var j = firstDay;
    for (var i = 2, row; row = t1.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        for (var col, j; col = row.cells[j]; j++) {
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop
            if (d <= days) {
                col.innerHTML = d;
                col.setAttribute('id', d);
                col.setAttribute('value', d);
                d++;
            }
            if (j >= 6) {
                j = 0;
                break;
            }
        }
    }
    document.getElementById("title").innerHTML = monthName + " " + year;
}

/* Clears/resets the calendar days before it is set with another month */
function clearCal() {
    for (var i = 2, row; row = t1.rows[i]; i++) {
        var table = document.getElementById('t1');
        for (var i = 2, row; row = table.rows[i]; i++) {

            //iterate through rows
            //rows would be accessed using the "row" variable assigned in the for loop
            for (var j = 0, col; col = row.cells[j]; j++) {
                //iterate through columns
                //columns would be accessed using the "col" variable assigned in the for loop
                col.innerHTML = "";
            }
        }
    }
}

/* Opens calendar to current month when page is loaded */
function setMonth() {
    var now = new Date()
    var cMonth = now.getMonth() + 1;
    var selected = document.getElementById("month-dropdown").options;
    selected.selectedIndex = cMonth;
    setCal(cMonth);
}
/*-------------------------------- End Calendar Functions -----------------------------*/



/*--------------------------------- Dropdown Functions --------------------------------*/

/* Allows use for name dropdowns for team leads and admin, as well as team dropdown for admin */
(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.database().ref('users/' + user.displayName).on('value', snapshot => {
                var currentUser = (snapshot.val());
                var i;
                // iterates through each user to check for a TeamLead or Admin category
                for (i in currentUser) {
                    if (i == 'TeamLead') {
                        // If the TeamLead category is true, show the name dropdown
                        if (currentUser[i] == true) {
                            isTeamLead = true;
                            document.getElementById('name-dropdown').classList.remove("hide");
                            firebase.database().ref('users').on('value', snapshot => {
                                var list = snapshot.val();
                                var user;
                                for (user in list) {
                                    var userData = list[user];
                                    var j;
                                    for (j in userData) {
                                        var team = currentUser[j];
                                        if (j == 'Team') {
                                            // if the a user's team matches the current TeamLead's team, add their name to the dropdown
                                            if (userData[j] == team) {
                                                var opt = document.createElement("option");
                                                opt.value = user;
                                                opt.innerHTML = user;
                                                document.getElementById('name-dropdown').appendChild(opt);
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                    if (i == 'Admin') {
                        // If the Admin category is true, show the team and name dropdowns
                        if (currentUser[i] == true) {
                            isAdmin = true;
                            document.getElementById('team-dropdown').classList.remove("hide");
                            document.getElementById('name-dropdown').classList.remove("hide");
                            // Load Admin Link
                            document.getElementById('adminlink').classList.remove('hide');
                        }
                    }
                }
            });
        }
    });
}());

/* Inserts the names of each member of the team based on which team is selected in the dropdown */
function selectTeam(selected) {
    var select = document.getElementById("name-dropdown");
    var length = select.options.length;
    for (var i = 0; i < length; i++) {
        select.options[1] = null;
    }
    // iterates through each user and adds their name to the current dropdown if their team matches the team that was selected in the previous dropdown
    firebase.database().ref('users').on('value', snapshot => {
        var names = snapshot.val();
        var name;
        for (name in names) {
            var teams = names[name]
            var j;
            for (j in teams) {
                if (j == 'Team') {
                    if (teams[j] == selected) {
                        var opt = document.createElement("option");
                        opt.value = name;
                        opt.innerHTML = name;
                        document.getElementById('name-dropdown').appendChild(opt);
                    }
                }
            }
        }
    })
}
/*------------------------------ End of Dropdown Functions ----------------------------*/



/*-------------------------------- Modal Boxes Function -------------------------------*/



/* Causes modal box to open when clicked on */
function modalBox(number) {
    // Get the modal
    selectedNumber = number;
    var num = number.getAttribute("value"); // day that is being clicked on
    var modal = document.getElementById('myModal');
    var selected = document.getElementById('name-dropdown').value; // selected name

    // Resets the text in the modal box so data doesn't carry over from one day to another
    document.getElementById("breakText1").innerHTML = "No breaks logged";
    document.getElementById("breakText2").innerHTML = "";
    document.getElementById("breakText3").innerHTML = "";
    document.getElementById("breakText4").innerHTML = "";
    document.getElementById("breakText5").innerHTML = "";

    document.getElementById("secondShiftIn").innerHTML = "No time logged";
    document.getElementById("secondShiftOut").innerHTML = "";
    document.getElementById("secondShiftCommentIn").innerHTML = ""
    document.getElementById("secondShiftCommentOut").innerHTML = "";

    document.getElementById("modalTextIn").innerHTML = "No time logged";
    document.getElementById("modalTextOut").innerHTML = "";
    document.getElementById("modalTextCommentIn").innerHTML = ""
    document.getElementById("modalTextCommentOut").innerHTML = "";

    // Calls the functions that display check-ins/outs and scheduled time
    showModal(num, selected);
    showSchedule(num, selected);

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Displays the modal 
    modal.style.display = "block";

    // When the x is clicked, the box closes
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // If the user is Admin or TeamLead, display the option to edit/save and call those functions
    if (isAdmin || isTeamLead) {
        document.getElementById('edit').classList.remove("hide");
        var edit = document.getElementById("edit");
        edit.onclick = function () {
            editCalendar();
            document.getElementById('save').classList.remove("hide");

            var save = document.getElementById("save");
            save.onclick = function () {
                editFirebase();
            }
        }
    }
}
/*---------------------------- End of Modal Boxes Function ----------------------------*/



/*--------------------------------- Totals Functions ----------------------------------*/

/* Refreshes the totals after the name dropdown is changed */
function setTotals() {
    var selected = document.getElementById('name-dropdown').value;
    calcTotals(selected);
}

/* Totals all the shifts from each week and displays the hours in a chart */
function calcTotals(selected) {
    firebase.auth().onAuthStateChanged(function (user) {
        var user;
        if (selected != user.displayName && selected != "") {
            user = selected;
        } else {
            user = firebase.auth().currentUser.displayName;
        }
        var ppl = firebase.database().ref('users/' + user + '/TimeClock/HoursWorked').once('value');
        ppl.then(function (snapshot) {
            var person = (snapshot.val());
            var dates = Object.keys(person);
            var monthDays = [];
            var currentMonth = [];
            var count = 0;
            for (var i = 0; i < dates.length; i++) {
                if (document.getElementById("month-dropdown").value == dates[i][0]) {
                    currentMonth[count] = dates[i];
                    var firstDash = currentMonth[count].indexOf("-");
                    var lastDash = currentMonth[count].lastIndexOf("-");
                    monthDays[count] = currentMonth[count].slice(firstDash + 1, lastDash);
                    if (monthDays[count][0] == 0) {
                        monthDays[count] = monthDays[count].slice(1);
                    }
                    count++;
                }
            }
            var count = 0;

            /* All weeks (1-6) follow the same pattern as week one, so all comments apply */

            // Row One: loops through each day in row one and adds up all the hours
            var rowone = document.getElementById("rowone").cells;
            var weekOne = 0;
            var stop = document.getElementById("rowtwo").cells[0].id;

            for (var x = 0; x < rowone.length - 1; x++) {

                if (person[currentMonth[count]].Out == "") {
                    person[currentMonth[count]].Out = 0;
                }


                if (rowone[x].innerHTML != "") {
                    // If the current day doesn't equal a day with a time clocked, continue
                    if (rowone[x].innerHTML != monthDays[count]) {
                        continue;
                    }
                    var add1 = 0;
                    var add2 = 0;
                    var add3 = 0;
                    var add4 = 0;
                    var ic = person[currentMonth[count]].In;
                    var oc = person[currentMonth[count]].Out;
                    // Adds 12 hours to times with 'pm' to make it a 24 hour clock
                    if (ic != undefined && ic.search("pm") != -1) {
                        add1 = 43200;
                    } else {
                        add1 = 0;
                    }
                    if (oc != undefined && oc.search("pm") != -1) {
                        add3 = 43200;
                    } else {
                        add3 = 0;
                    }

                    // Grabs the times from each shift, converts to seconds, and adds to a total (repeated 4 times for shift in, shift out, second shift in, and second shift out(a,b,c,d))
                    if (person[currentMonth[count]].In != undefined) {
                        var d = "";
                        d = person[currentMonth[count]].In.slice(0, 8);
                        d = d.split(":");
                        var dHours;
                        if (d[0] == 12) {
                            dHours = d[0] * 3600 - 43200;
                        } else {
                            dHours = d[0] * 3600;
                        }
                        var dMinutes = d[1] * 60;
                        var dSeconds = d[2] * 1;
                        var dTotal = dHours + dMinutes + dSeconds + add1;
                    } else {
                        dTotal = 0;
                    }

                    if (person[currentMonth[count]].Out != undefined) {
                        var c = "";
                        c = person[currentMonth[count]].Out.slice(0, 8);
                        c = c.split(":");
                        var cHours;
                        if (c[0] == 12) {
                            cHours = c[0] * 3600 - 43200;
                        } else {
                            cHours = c[0] * 3600;
                        }
                        var cMinutes = c[1] * 60;
                        var cSeconds = c[2] * 1;
                        var cTotal = cHours + cMinutes + cSeconds + add3;
                    } else {
                        cTotal = 0;
                        dTotal = 0;
                    }
                    var total2 = cTotal - dTotal; // Subtracts the in time from the out time to get total seconds of shift
                    var total1 = 0;

                    if (person[currentMonth[count + 1]] != undefined) {
                        var ic1 = person[currentMonth[count + 1]].In;
                        var oc1 = person[currentMonth[count + 1]].Out;

                        if (ic1 != undefined && ic1.search("pm") != -1) {
                            add2 = 43200;
                        } else {
                            add2 = 0;
                        }
                        if (oc1 != undefined && oc1.search("pm") != -1) {
                            add4 = 43200;
                        } else {
                            add4 = 0;
                        }
                        // Makes sure time is only taken into account from the current week
                        if (monthDays[count + 1] < stop) {
                            var b = "";
                            b = person[currentMonth[count + 1]].In.slice(0, 8);
                            b = b.split(":");
                            var bHours;
                            if (b[0] == 12) {
                                bHours = b[0] * 3600 - 43200;
                            } else {
                                bHours = b[0] * 3600;
                            }
                            var bMinutes = b[1] * 60;
                            var bSeconds = b[2] * 1;
                            var bTotal = bHours + bMinutes + bSeconds + add2;

                            if (person[currentMonth[count + 1]].Out != undefined) {
                                var a = "";
                                a = person[currentMonth[count + 1]].Out.slice(0, 8);
                                a = a.split(":");
                                var aHours;
                                if (a[0] == 12) {
                                    aHours = a[0] * 3600 - 43200;
                                } else {
                                    aHours = a[0] * 3600;
                                }
                                var aMinutes = a[1] * 60;
                                var aSeconds = a[2] * 1;
                                var aTotal = aHours + aMinutes + aSeconds + add4;
                            } else {
                                aTotal = 0;
                                bTotal = 0;
                            }
                            total1 = aTotal - bTotal; // Subtracts the in time from the out time to get total seconds of shift
                            count++;
                        }
                    }
                    count++;
                    var grandTotal = total1 + total2; // Adds up all seconds from each day
                    weekOne += grandTotal; // Adds up all seconds from the whole week
                }
            }
            weekOne /= 3600; // converts seconds to hours
            weekOne = weekOne.toFixed(1); // Displays one digit after the decimal point
            document.getElementById("weekOne").innerHTML = weekOne; // displays the total hours in the chart


            // Row Two: loops through each day in row two and adds up all the hours
            var rowtwo = document.getElementById("rowtwo").cells;
            var weekTwo = 0;
            var stop2 = document.getElementById("rowthree").cells[0].id;
            for (var x = 0; x < rowtwo.length - 1; x++) {

                if (rowtwo[x].innerHTML != "") {
                    if (rowtwo[x].innerHTML != monthDays[count]) {
                        continue;
                    }

                    console.log(person[currentMonth[count + 1]]);
                    console.log(person[currentMonth[count]]);

                    var add1 = 0;
                    var add2 = 0;
                    var add3 = 0;
                    var add4 = 0;
                    var ic = person[currentMonth[count]].In;
                    var oc = person[currentMonth[count]].Out;
                    if (ic != undefined && ic.search("pm") != -1) {
                        add1 = 43200;
                    } else {
                        add1 = 0;
                    }
                    if (oc != undefined && oc.search("pm") != -1) {
                        add3 = 43200;
                    } else {
                        add3 = 0;
                    }

                    if (person[currentMonth[count]].In != undefined) {
                        var d = "";
                        d = person[currentMonth[count]].In.slice(0, 8);
                        d = d.split(":");
                        var dHours;
                        if (d[0] == 12) {
                            dHours = d[0] * 3600 - 43200;
                        } else {
                            dHours = d[0] * 3600;
                        }
                        var dMinutes = d[1] * 60;
                        var dSeconds = d[2] * 1;
                        var dTotal = dHours + dMinutes + dSeconds + add1;
                    } else {
                        dTotal = 0;
                    }

                    if (person[currentMonth[count]].Out != undefined) {
                        var c = "";
                        c = person[currentMonth[count]].Out.slice(0, 8);
                        c = c.split(":");
                        var cHours;
                        if (c[0] == 12) {
                            cHours = c[0] * 3600 - 43200;
                        } else {
                            cHours = c[0] * 3600;
                        }
                        var cMinutes = c[1] * 60;
                        var cSeconds = c[2] * 1;
                        var cTotal = cHours + cMinutes + cSeconds + add3;
                    } else {
                        cTotal = 0;
                        dTotal = 0;
                    }
                    console.log(cTotal);
                    console.log(dTotal);
                    var total2 = cTotal - dTotal;
                    //                    console.log(total2);
                    var total1 = 0;

                    // New part
                    if (person[currentMonth[count + 1]] != undefined) {

                        var ic1 = person[currentMonth[count + 1]].In;
                        var oc1 = person[currentMonth[count + 1]].Out;

                        if (ic1 != undefined && ic1.search("pm") != -1) {
                            add2 = 43200;
                        } else {
                            add2 = 0;
                        }
                        if (oc1 != undefined && oc1.search("pm") != -1) {
                            add4 = 43200;
                        } else {
                            add4 = 0;
                        }

                        if (monthDays[count + 1] < stop2) {
                            console.log("hello");
                            var b = "";
                            b = person[currentMonth[count + 1]].In.slice(0, 8);
                            b = b.split(":");
                            var bHours;
                            if (b[0] == 12) {
                                bHours = b[0] * 3600 - 43200;
                            } else {
                                bHours = b[0] * 3600;
                            }
                            var bMinutes = b[1] * 60;
                            var bSeconds = b[2] * 1;
                            var bTotal = bHours + bMinutes + bSeconds + add2;

                            if (person[currentMonth[count + 1]].Out != undefined) {
                                var a = "";
                                a = person[currentMonth[count + 1]].Out.slice(0, 8);
                                a = a.split(":");
                                var aHours;
                                if (a[0] == 12) {
                                    aHours = a[0] * 3600 - 43200;
                                } else {
                                    aHours = a[0] * 3600;
                                }
                                var aMinutes = a[1] * 60;
                                var aSeconds = a[2] * 1;
                                var aTotal = aHours + aMinutes + aSeconds + add4;
                            } else {
                                aTotal = 0;
                                bTotal = 0;
                            }
                            console.log(aTotal);
                            console.log(bTotal);
                            total1 = aTotal - bTotal;
                            //                            console.log(total1);
                            count++;
                        }
                    }
                    count++;
                    var grandTotal = total1 + total2;
                    weekTwo += grandTotal;
                }
            }
            weekTwo;
            weekTwo /= 3600;
            weekTwo = weekTwo.toFixed(1);
            document.getElementById("weekTwo").innerHTML = weekTwo;


            // Row Three: loops through each day in row three and adds up all the hours
            var rowthree = document.getElementById("rowthree").cells;
            var weekThree = 0;
            var stop3 = document.getElementById("rowfour").cells[0].id;


            for (var x = 0; x < rowthree.length - 1; x++) {

                if (rowthree[x].innerHTML != "") {
                    if (rowthree[x].innerHTML != monthDays[count]) {
                        continue;
                    }
                    var total1 = 0;
                    var total2 = 0;
                    var add1 = 0;
                    var add3 = 0;
                    var add2 = 0;
                    var add4 = 0;
                    var ic = person[currentMonth[count]].In;
                    var oc = person[currentMonth[count]].Out;
                    if (ic != undefined && ic.search("pm") != -1) {
                        add1 = 43200;
                    } else {
                        add1 = 0;
                    }
                    if (oc != undefined && oc.search("pm") != -1) {
                        add3 = 43200;
                    } else {
                        add3 = 0;
                    }
                    var d = "";
                    d = person[currentMonth[count]].In.slice(0, 8);
                    d = d.split(":");
                    var dHours;
                    if (d[0] == 12) {
                        dHours = d[0] * 3600 - 43200;
                    } else {
                        dHours = d[0] * 3600;
                    }
                    var dMinutes = d[1] * 60;
                    var dSeconds = d[2] * 1;
                    var dTotal = dHours + dMinutes + dSeconds + add1;

                    if (person[currentMonth[count]].Out != undefined) {

                        var c = "";
                        c = person[currentMonth[count]].Out.slice(0, 8);
                        c = c.split(":");
                        var cHours;
                        if (c[0] == 12) {
                            cHours = c[0] * 3600 - 43200;
                        } else {
                            cHours = c[0] * 3600;
                        }
                        var cMinutes = c[1] * 60;
                        var cSeconds = c[2] * 1;
                        var cTotal = cHours + cMinutes + cSeconds + add3;
                    } else {
                        cTotal = 0;
                        dTotal = 0;
                    }
                    total2 = cTotal - dTotal;

                    if (person[currentMonth[count + 1]] != undefined) {
                        var ic1 = person[currentMonth[count + 1]].In;
                        var oc1 = person[currentMonth[count + 1]].Out;

                        if (ic1 != undefined && ic1.search("pm") != -1) {
                            add2 = 43200;
                        } else {
                            add2 = 0;
                        }
                        if (oc1 != undefined && oc1.search("pm") != -1) {
                            add4 = 43200;
                        } else {
                            add4 = 0;
                        }

                        if (monthDays[count + 1] < stop3) {
                            var b = "";
                            b = person[currentMonth[count + 1]].In.slice(0, 8);
                            b = b.split(":");
                            var bHours;
                            if (b[0] == 12) {
                                bHours = b[0] * 3600 - 43200;
                            } else {
                                bHours = b[0] * 3600;
                            }
                            var bMinutes = b[1] * 60;
                            var bSeconds = b[2] * 1;
                            var bTotal = bHours + bMinutes + bSeconds + add2;

                            if (person[currentMonth[count + 1]].Out != undefined) {
                                var a = "";
                                a = person[currentMonth[count + 1]].Out.slice(0, 8);
                                a = a.split(":");
                                var aHours;
                                if (a[0] == 12) {
                                    aHours = a[0] * 3600 - 43200;
                                } else {
                                    aHours = a[0] * 3600;
                                }
                                var aMinutes = a[1] * 60;
                                var aSeconds = a[2] * 1;
                                var aTotal = aHours + aMinutes + aSeconds + add4;
                            } else {
                                aTotal = 0;
                                bTotal = 0;
                            }
                            total1 = aTotal - bTotal;
                            count++;
                        }
                    }
                    count++;
                    var grandTotal = total1 + total2;

                    weekThree += grandTotal;
                }
            }
            weekThree /= 3600;
            weekThree = weekThree.toFixed(1);
            document.getElementById("weekThree").innerHTML = weekThree;


            // Row Four: loops through each day in row four and adds up all the hours
            var rowfour = document.getElementById("rowfour").cells;
            var weekFour = 0;
            var stop4 = document.getElementById("rowfive").cells[0].id;
            for (var x = 0; x < rowfour.length - 1; x++) {
                if (rowfour[x].innerHTML != "") {
                    if (rowfour[x].innerHTML != monthDays[count]) {
                        continue;
                    }
                    var total1 = 0;
                    var total2 = 0;
                    var add1 = 0;
                    var add3 = 0;
                    var add2 = 0;
                    var add4 = 0;
                    var ic = person[currentMonth[count]].In;
                    var oc = person[currentMonth[count]].Out;
                    if (ic != undefined && ic.search("pm") != -1) {
                        add1 = 43200;
                    } else {
                        add1 = 0;
                    }
                    if (oc != undefined && oc.search("pm") != -1) {
                        add3 = 43200;
                    } else {
                        add3 = 0;
                    }
                    var d = "";
                    d = person[currentMonth[count]].In.slice(0, 8);
                    d = d.split(":");
                    var dHours;
                    if (d[0] == 12) {
                        dHours = d[0] * 3600 - 43200;
                    } else {
                        dHours = d[0] * 3600;
                    }
                    var dMinutes = d[1] * 60;
                    var dSeconds = d[2] * 1;
                    var dTotal = dHours + dMinutes + dSeconds + add1;

                    if (person[currentMonth[count]].Out != undefined) {
                        var c = "";
                        c = person[currentMonth[count]].Out.slice(0, 8);
                        c = c.split(":");
                        var cHours;
                        if (c[0] == 12) {
                            cHours = c[0] * 3600 - 43200;
                        } else {
                            cHours = c[0] * 3600;
                        }
                        var cMinutes = c[1] * 60;
                        var cSeconds = c[2] * 1;
                        var cTotal = cHours + cMinutes + cSeconds + add3;
                    } else {
                        cTotal = 0;
                        dTotal = 0;
                    }
                    total2 = cTotal - dTotal;

                    if (person[currentMonth[count + 1]] != undefined) {
                        if (monthDays[count + 1] < stop4) {
                            var ic1 = person[currentMonth[count + 1]].In;
                            var oc1 = person[currentMonth[count + 1]].Out;

                            if (ic1 != undefined && ic1.search("pm") != -1) {
                                add2 = 43200;
                            } else {
                                add2 = 0;
                            }
                            if (oc1 != undefined && oc1.search("pm") != -1) {
                                add4 = 43200;
                            } else {
                                add4 = 0;
                            }

                            var b = "";
                            b = person[currentMonth[count + 1]].In.slice(0, 8);
                            b = b.split(":");
                            var bHours;
                            if (b[0] == 12) {
                                bHours = b[0] * 3600 - 43200;
                            } else {
                                bHours = b[0] * 3600;
                            }
                            var bMinutes = b[1] * 60;
                            var bSeconds = b[2] * 1;
                            var bTotal = bHours + bMinutes + bSeconds + add2;

                            if (person[currentMonth[count + 1]].Out != undefined) {
                                var a = "";
                                a = person[currentMonth[count + 1]].Out.slice(0, 8);
                                a = a.split(":");
                                var aHours;
                                if (a[0] == 12) {
                                    aHours = a[0] * 3600 - 43200;
                                } else {
                                    aHours = a[0] * 3600;
                                }
                                var aMinutes = a[1] * 60;
                                var aSeconds = a[2] * 1;
                                var aTotal = aHours + aMinutes + aSeconds + add4;
                            } else {
                                aTotal = 0;
                                bTotal = 0;
                            }

                            total1 = aTotal - bTotal;
                            count++;
                        }
                    }
                    count++;
                    var grandTotal = total1 + total2;

                    weekFour += grandTotal;
                }
            }
            weekFour /= 3600;
            weekFour = weekFour.toFixed(1);
            document.getElementById("weekFour").innerHTML = weekFour;

            // Row Five: loops through each day in row five and adds up all the hours
            var rowfive = document.getElementById("rowfive").cells;
            var weekFive = 0;
            var stop5 = 32;
            if (document.getElementById("rowsix").cells[0].id != "") {
                stop5 = document.getElementById("rowsix").cells[0].id;
            }
            for (var x = 0; x < rowfive.length - 1; x++) {

                if (rowfive[x].innerHTML != "") {
                    if (rowfive[x].innerHTML != monthDays[count]) {
                        continue;
                    }
                    var add1 = 0;
                    var add2 = 0;
                    var add3 = 0;
                    var add4 = 0;
                    var ic = person[currentMonth[count]].In;
                    var oc = person[currentMonth[count]].Out;
                    if (ic != undefined && ic.search("pm") != -1) {
                        add1 = 43200;
                    } else {
                        add1 = 0;
                    }
                    if (oc != undefined && oc.search("pm") != -1) {
                        add3 = 43200;
                    } else {
                        add3 = 0;
                    }

                    if (person[currentMonth[count]].In != undefined) {
                        var d = "";
                        d = person[currentMonth[count]].In.slice(0, 8);
                        d = d.split(":");
                        var dHours;
                        if (d[0] == 12) {
                            dHours = d[0] * 3600 - 43200;
                        } else {
                            dHours = d[0] * 3600;
                        }
                        var dMinutes = d[1] * 60;
                        var dSeconds = d[2] * 1;
                        var dTotal = dHours + dMinutes + dSeconds + add1;
                    } else {
                        dTotal = 0;
                    }

                    if (person[currentMonth[count]].Out != undefined) {
                        var c = "";
                        c = person[currentMonth[count]].Out.slice(0, 8);
                        c = c.split(":");
                        var cHours;
                        if (c[0] == 12) {
                            cHours = c[0] * 3600 - 43200;
                        } else {
                            cHours = c[0] * 3600;
                        }
                        var cMinutes = c[1] * 60;
                        var cSeconds = c[2] * 1;
                        var cTotal = cHours + cMinutes + cSeconds + add3;
                    } else {
                        cTotal = 0;
                        dTotal = 0;
                    }
                    var total2 = cTotal - dTotal;
                    var total1 = 0;

                    // New part
                    if (person[currentMonth[count + 1]] != undefined) {
                        var ic1 = person[currentMonth[count + 1]].In;
                        var oc1 = person[currentMonth[count + 1]].Out;

                        if (ic1 != undefined && ic1.search("pm") != -1) {
                            add2 = 43200;
                        } else {
                            add2 = 0;
                        }
                        if (oc1 != undefined && oc1.search("pm") != -1) {
                            add4 = 43200;
                        } else {
                            add4 = 0;
                        }
                        if (monthDays[count + 1] < stop5) {
                            var b = "";
                            b = person[currentMonth[count + 1]].In.slice(0, 8);
                            b = b.split(":");
                            var bHours;
                            if (b[0] == 12) {
                                bHours = b[0] * 3600 - 43200;
                            } else {
                                bHours = b[0] * 3600;
                            }
                            var bMinutes = b[1] * 60;
                            var bSeconds = b[2] * 1;
                            var bTotal = bHours + bMinutes + bSeconds + add2;

                            if (person[currentMonth[count + 1]].Out != undefined) {
                                var a = "";
                                a = person[currentMonth[count + 1]].Out.slice(0, 8);
                                a = a.split(":");
                                var aHours;
                                if (a[0] == 12) {
                                    aHours = a[0] * 3600 - 43200;
                                } else {
                                    aHours = a[0] * 3600;
                                }
                                var aMinutes = a[1] * 60;
                                var aSeconds = a[2] * 1;
                                var aTotal = aHours + aMinutes + aSeconds + add4;
                            } else {
                                aTotal = 0;
                                bTotal = 0;
                            }
                            total1 = aTotal - bTotal;
                            count++;
                        }
                    }
                    count++;
                    var grandTotal = total1 + total2;
                    weekFive += grandTotal;
                }
            }
            weekFive /= 3600;
            weekFive = weekFive.toFixed(1);
            document.getElementById("weekFive").innerHTML = weekFive;


            // Row Six: loops through each day in row six and adds up all the hours
            var rowsix = document.getElementById("rowsix").cells;
            var weekSix = 0;
            for (var x = 0; x < rowsix.length - 1; x++) {
                if (rowsix[x].innerHTML != "") {
                    if (rowsix[x].innerHTML != monthDays[count]) {
                        continue;
                    }
                    var add1 = 0;
                    var add2 = 0;
                    var add3 = 0;
                    var add4 = 0;
                    var ic = person[currentMonth[count]].In;
                    var oc = person[currentMonth[count]].Out;
                    var ic1 = person[currentMonth[count + 1]].In;
                    var oc1 = person[currentMonth[count + 1]].Out;
                    if (ic.search("pm") != -1) {
                        add1 = 43200;
                    } else {
                        add1 = 0;
                    }
                    if (oc.search("pm") != -1) {
                        add3 = 43200;
                    } else {
                        add3 = 0;
                    }
                    if (ic1.search("pm") != -1) {
                        add2 = 43200;
                    } else {
                        add2 = 0;
                    }
                    if (oc1 != undefined && oc1.search("pm") != -1) {
                        add4 = 43200;
                    } else {
                        add4 = 0;
                    }

                    var b = "";
                    b = person[currentMonth[count + 1]].In.slice(0, 8);
                    b = b.split(":");
                    var bHours;
                    if (b[0] == 12) {
                        bHours = b[0] * 3600 - 43200;
                    } else {
                        bHours = b[0] * 3600;
                    }
                    var bMinutes = b[1] * 60;
                    var bSeconds = b[2] * 1;
                    var bTotal = bHours + bMinutes + bSeconds + add2;

                    if (person[currentMonth[count + 1]].Out != undefined) {
                        var a = "";
                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
                        a = a.split(":");
                        var aHours;
                        if (a[0] == 12) {
                            aHours = a[0] * 3600 - 43200;
                        } else {
                            aHours = a[0] * 3600;
                        }
                        var aMinutes = a[1] * 60;
                        var aSeconds = a[2] * 1;
                        var aTotal = aHours + aMinutes + aSeconds + add4;
                    } else {
                        aTotal = 0;
                        bTotal = 0;
                    }

                    var d = "";
                    d = person[currentMonth[count]].In.slice(0, 8);
                    d = d.split(":");
                    var dHours;
                    if (d[0] == 12) {
                        dHours = d[0] * 3600 - 43200;
                    } else {
                        dHours = d[0] * 3600;
                    }
                    var dMinutes = d[1] * 60;
                    var dSeconds = d[2] * 1;
                    var dTotal = dHours + dMinutes + dSeconds + add1;

                    if (person[currentMonth[count]].Out != undefined) {
                        var c = "";
                        c = person[currentMonth[count]].Out.slice(0, 8);
                        c = c.split(":");
                        var cHours;
                        if (c[0] == 12) {
                            cHours = c[0] * 3600 - 43200;
                        } else {
                            cHours = c[0] * 3600;
                        }
                        var cMinutes = c[1] * 60;
                        var cSeconds = c[2] * 1;
                        var cTotal = cHours + cMinutes + cSeconds + add3;
                    } else {
                        cTotal = 0;
                        dTotal = 0;
                    }
                    var total1 = aTotal - bTotal;
                    var total2 = cTotal - dTotal;

                    count += 2;
                    var grandTotal = total1 + total2;
                    weekSix += grandTotal;
                }
            }
            weekSix /= 3600;
            weekSix = weekSix.toFixed(1);
            document.getElementById("weekSix").innerHTML = weekSix;

            monthlyTotal = weekOne * 1 + weekTwo * 1 + weekThree * 1 + weekFour * 1 + weekFive * 1 + weekSix * 1;
            monthlyTotal = monthlyTotal.toFixed(1);
            document.getElementById("grandTotal").innerHTML = monthlyTotal;
        });
    })
}

/*----------------------------- End of Totals Functions -------------------------------*/



/*------------------------------ Display Scheduled Time -------------------------------*/

/* Displays the scheduled time of each user in the modal box on the calendar */
// Almost identical function to showModal(), without the breaks
function showSchedule(num, selected) {
    firebase.auth().onAuthStateChanged(function (user) {
        var user;
        if (selected != user.displayName && selected != "") {
            user = selected;
        } else {
            user = firebase.auth().currentUser.displayName;
        }
        var ppl = firebase.database().ref('users/' + user + '/TimeClock/ScheduledTime').once('value');
        ppl.then(function (snapshot) {

            var person = (snapshot.val());
            var dates = Object.keys(person);
            var monthDays = [];
            var currentMonth = [];
            var count = 0;
            // Finds the day of the month by taking the value between the two dashes
            // For example, the date 2-14-2017 would turn into 14
            for (var i = 0; i < dates.length; i++) {
                if (document.getElementById("month-dropdown").value == dates[i][0]) {
                    currentMonth[count] = dates[i];
                    var firstDash = currentMonth[count].indexOf("-");
                    var lastDash = currentMonth[count].lastIndexOf("-");
                    monthDays[count] = currentMonth[count].slice(firstDash + 1, lastDash);
                    if (monthDays[count][0] == 0) {
                        monthDays[count] = monthDays[count].slice(1);
                    }
                    count++;
                }
            }
            var check = false;

            // loops through each in/out and comment and sets it equal to the HTML to display
            for (var i = 0; i < monthDays.length; i++) {
                // gets the first instance of clock in/out
                if (num == monthDays[i + 1]) {
                    // code for displaying info in modal boxes
                    var txt = person[currentMonth[i + 1]].Start + "-" + person[currentMonth[i + 1]].End + "<br />";
                    document.getElementById("schedule1").innerHTML = txt;
                    check = true;
                } else if (num == monthDays[i]) {
                    var txt = person[currentMonth[i]].Start + "-" + person[currentMonth[i]].End + "<br />";
                    document.getElementById("schedule1").innerHTML = txt;
                    document.getElementById("schedule2").innerHTML = "";
                    check = true;
                    break;
                } else {
                    document.getElementById("schedule2").innerHTML = "";
                }
                // gets the second instance of clock in/out if there are two instances
                if (num == monthDays[i]) {
                    var txt = person[currentMonth[i]].Start + "-" + person[currentMonth[i]].End + "<br />";
                    document.getElementById("schedule2").innerHTML = txt;
                    check = true;
                    break;
                }
            }
            // if none of the above are true, just display 'No time scheduled'
            if (!check) {
                document.getElementById("schedule1").innerHTML = "No time scheduled";
            }
            // resets the loop
            count = 0;
        });
        // if there is an error, return
        ppl.catch(function (error) {
            alert(error);
            return;
        });
    });
}
/*--------------------------- End of Display Scheduled Time ---------------------------*/



/*------------------------------ Edit Calendar Functions ------------------------------*/

/* Allows calendar to be edited */
function editCalendar(selected) {

    x = document.createElement("INPUT"); // Creates input boxes in calendar
    x.setAttribute('type', 'text'); // Sets the type to text
    var mIn = document.getElementById('modalTextIn');
    x.setAttribute('value', mIn.innerHTML.slice(15)); // sets the value of input boxes to the inner HTML ofthe text, which is the time that already appears there in the modal box before edited
    mIn.innerHTML = "Clocked in at: ";
    mIn.appendChild(x); // adds the input to the modal box

    w = document.createElement("INPUT");
    w.setAttribute('type', 'text');
    var mOut = document.getElementById('modalTextOut');
    w.setAttribute('value', mOut.innerHTML.slice(16));
    mOut.innerHTML = "Clocked out at: ";
    mOut.appendChild(w);

    y = document.createElement("INPUT");
    y.setAttribute('type', 'text');
    var mComIn = document.getElementById('modalTextCommentIn');
    y.setAttribute('value', mComIn.innerHTML.slice(11));
    mComIn.innerHTML = "CommentIn: ";
    mComIn.appendChild(y);

    z = document.createElement("INPUT");
    z.setAttribute('type', 'text');
    var mComOut = document.getElementById('modalTextCommentOut');
    z.setAttribute('value', mComOut.innerHTML.slice(11));
    mComOut.innerHTML = "CommentOut: ";
    mComOut.appendChild(z);

    l = document.createElement("INPUT");
    l.setAttribute('type', 'text');
    var sIn = document.getElementById('secondShiftIn');
    l.setAttribute('value', sIn.innerHTML.slice(15));
    sIn.innerHTML = "Clocked in at: ";
    sIn.appendChild(l);

    m = document.createElement("INPUT");
    m.setAttribute('type', 'text');
    var sOut = document.getElementById('secondShiftOut');
    m.setAttribute('value', sOut.innerHTML.slice(16));
    sOut.innerHTML = "Clocked out at: ";
    sOut.appendChild(m);

    n = document.createElement("INPUT");
    n.setAttribute('type', 'text');
    var sComIn = document.getElementById('secondShiftCommentIn');
    n.setAttribute('value', sComIn.innerHTML.slice(10));
    sComIn.innerHTML = "CommentIn: ";
    sComIn.appendChild(n);

    o = document.createElement("INPUT");
    o.setAttribute('type', 'text');
    var sComOut = document.getElementById('secondShiftCommentOut');
    o.setAttribute('value', sComOut.innerHTML.slice(11));
    sComOut.innerHTML = "CommentOut: ";
    sComOut.appendChild(o);
}

/* Save changes to input boxes to firebase as well as to the calendar */
function editFirebase() {
    var selected = document.getElementById('name-dropdown').value;
    var num = selectedNumber.getAttribute("value");
    num = ('0' + num).slice(-2); // gets the day clicked on in a 2-digit format (e.g. 10, 02)

    // gets the date and time in proper format from the inner HTML that already exists from previous functions
    var thirdQuoteSIn = document.getElementById("secondShiftIn").innerHTML.indexOf("\"", 40);
    var lastQuoteSIn = document.getElementById("secondShiftIn").innerHTML.lastIndexOf("\"");
    var realDateSIn = document.getElementById("secondShiftIn").innerHTML.slice(thirdQuoteSIn + 1, lastQuoteSIn);
    var dateKeyS = month + "-" + num + "-" + year + " " + realDateSIn; // creates a key to access firebase

    // gets the date and time in proper format from the inner HTML that already exists from previous functions
    var thirdQuoteSOut = document.getElementById("secondShiftOut").innerHTML.indexOf("\"", 40);
    var lastQuoteSOut = document.getElementById("secondShiftOut").innerHTML.lastIndexOf("\"");
    var realDateSOut = document.getElementById("secondShiftOut").innerHTML.slice(thirdQuoteSOut + 1, lastQuoteSOut);

    // gets the date and time in proper format from the inner HTML that already exists from previous functions
    var thirdQuoteIn = document.getElementById("modalTextIn").innerHTML.indexOf("\"", 40);
    var lastQuoteIn = document.getElementById("modalTextIn").innerHTML.lastIndexOf("\"");
    var realDateIn = document.getElementById("modalTextIn").innerHTML.slice(thirdQuoteIn + 1, lastQuoteIn);
    var dateKey = month + "-" + num + "-" + year + " " + realDateIn; // creates a key to access firebase

    // gets the date and time in proper format from the inner HTML that already exists from previous functions
    var thirdQuoteOut = document.getElementById("modalTextOut").innerHTML.indexOf("\"", 40);
    var lastQuoteOut = document.getElementById("modalTextOut").innerHTML.lastIndexOf("\"");
    var realDateOut = document.getElementById("modalTextOut").innerHTML.slice(thirdQuoteOut + 1, lastQuoteOut);


    firebase.auth().onAuthStateChanged(function (user) {
        var user;
        if (selected != user.displayName && selected != "") {
            user = selected;
        } else {
            user = firebase.auth().currentUser.displayName;
        }

        for (var i = 0; i < times.length; i++) {
            // creates a key to delete to be replaced with a new key with updated info
            if (times[i].indexOf(month + "-" + num + "-" + year) != -1) {
                deleteDb = firebase.database().ref('users/' + user + '/TimeClock/HoursWorked/' + times[i]);
            }
        }

        var addOn = "";

        // if a key doesn't exist, this provides a date for the new key
        if (deleteDb == undefined) {
            addOn = " " + x.value
        }

        var dbS = firebase.database().ref('users/' + user + '/TimeClock/HoursWorked/' + dateKeyS + addOn);
        var db = firebase.database().ref('users/' + user + '/TimeClock/HoursWorked/' + dateKey + addOn);

        // sets the text of the modal box to the new values
        document.getElementById("secondShiftIn").innerHTML = "Clocked in at: " + l.value;
        document.getElementById("secondShiftOut").innerHTML = "Clocked out at: " + m.value;
        document.getElementById('secondShiftCommentIn').innerHTML = "CommentIn: " + n.value;
        document.getElementById('secondShiftCommentOut').innerHTML = "CommentOut: " + o.value;
        document.getElementById("modalTextIn").innerHTML = "Clocked in at: " + x.value;
        document.getElementById("modalTextOut").innerHTML = "Clocked out at: " + w.value;
        document.getElementById('modalTextCommentIn').innerHTML = "CommentIn: " + y.value;
        document.getElementById('modalTextCommentOut').innerHTML = "CommentOut: " + z.value;

        // deletes existing key with old information to make room for new key
        if (deleteDb != undefined) {
            deleteDb.remove();
        }

        // updates firebase with the new values entered by the user (first shift)
        if (x.value != 0) {
            if (w.value != 0) {
                db.update({
                    "In": x.value,
                    "CommentIn": y.value,
                    "Out": w.value,
                    "CommentOut": z.value
                });
            } else {
                db.update({
                    "In": x.value,
                    "CommentIn": y.value,
                    "Out": null,
                    "CommentOut": z.value
                });
            }
        }

        // updates firebase with the new values entered by the user (second shift)
        if (l.value != 0) {
            if (m.value != 0) {
                dbS.update({
                    "In": l.value,
                    "CommentIn": n.value,
                    "Out": m.value,
                    "CommentOut": o.value
                });
            } else {
                dbS.update({
                    "In": l.value,
                    "CommentIn": n.value,
                    "Out": null,
                    "CommentOut": o.value
                });
            }
        }

        calcTotals(selected); // Refreshes totals chart when new info is updated
        var modal = document.getElementById('myModal');
        document.getElementById('save').classList.add("hide"); // hides save button until another edit is made
        modal.style.display = "none"; // closes the modal box once it's edited
    })
}
/*--------------------------- End of Edit Calendar Functions --------------------------*/
