/*----------------------------- Connect to Firebase ----------------------------*/
var config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};
firebase.initializeApp(config);
/*------------------------- End of Connect to Firebase -------------------------*/



/*--------------------- Display current user's time logs -----------------------*/

/* Retrieves info from Firebase to display the current user's check ins and outs */
function showModal(num, selected) {
    firebase.auth().onAuthStateChanged(function (user) {
        // if a name is selected and the selection isn't blank, show the data for the person selected
        if (selected != user.displayName && selected != "") {
            selectName(selected, num);
            return
        } else {
            if (user) {
                var user = firebase.auth().currentUser;
                var ppl = firebase.database().ref('users/' + user.displayName + '/TimeClock/HoursWorked').once('value');
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
                            var txt = "Clocked in at: " + person[currentMonth[i + 1]].In + "<br />";
                            txt += "CommentIn: " + person[currentMonth[i + 1]].CommentIn + "<br />";
                            txt += "Clock out at: " + person[currentMonth[i + 1]].Out + "<br />";
                            txt += "CommentOut: " + person[currentMonth[i + 1]].CommentOut + "<br />";
                            document.getElementById("modalText").innerHTML = txt;
                            check = true;
                        } else if (num == monthDays[i]) {
                            if (person[currentMonth[i]].CommentIn == undefined) {
                                person[currentMonth[i]].CommentIn = "N/A";
                            }
                            if (person[currentMonth[i]].CommentOut == undefined) {
                                person[currentMonth[i]].CommentOut = "N/A";
                            }
                            if (person[currentMonth[i]].Out == undefined) {
                                person[currentMonth[i]].Out = "N/A";
                            }
                            var txt = "Clocked in at: " + person[currentMonth[i]].In + "<br />";
                            txt += "CommentIn: " + person[currentMonth[i]].CommentIn + "<br />";
                            txt += "Clock out at: " + person[currentMonth[i]].Out + "<br />";
                            txt += "CommentOut: " + person[currentMonth[i]].CommentOut + "<br />";
                            document.getElementById("modalText").innerHTML = txt;
                            document.getElementById("secondShift").innerHTML = "No time logged";
                            check = true;
                            break;
                        } else {
                            document.getElementById("secondShift").innerHTML = "No time logged";
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
                            var txt = "Clocked in at: " + person[currentMonth[i]].In + "<br />";
                            txt += "CommentIn: " + person[currentMonth[i]].CommentIn + "<br />";
                            txt += "Clock out at: " + person[currentMonth[i]].Out + "<br />";
                            txt += "CommentOut: " + person[currentMonth[i]].CommentOut + "<br />";
                            document.getElementById("secondShift").innerHTML = txt;
                            check = true;
                            break;
                        }

                    }
                    // if none of the above are true, just display 'No time logged'
                    if (!check) {
                        document.getElementById("modalText").innerHTML = "No time logged";
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
                var breaks = firebase.database().ref('users/' + user.displayName + '/TimeClock/Breaks').once('value');
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

                        document.getElementById("breakText1").innerHTML = "";
                        document.getElementById("breakText2").innerHTML = "";
                        document.getElementById("breakText3").innerHTML = "";
                        document.getElementById("breakText4").innerHTML = "";
                        document.getElementById("breakText5").innerHTML = "";
                        if (num == monthDays[i]) {
                            if (person[currentMonth[i]].In == undefined) {
                                person[currentMonth[i]].In = "N/A";
                            }
                            if (person[currentMonth[i]].Out == undefined) {
                                person[currentMonth[i]].Out = "N/A";
                            }
                            var txt = "Break Out: " + person[currentMonth[i]].Out;
                            txt += "<br />Break In: " + person[currentMonth[i]].In + "<br />";
                            document.getElementById("breakText1").innerHTML = txt;
                            check = true;
                        } else {
                            document.getElementById("breakText1").innerHTML = "No breaks logged";
                            document.getElementById("breakText2").innerHTML = "";
                            document.getElementById("breakText3").innerHTML = "";
                            document.getElementById("breakText4").innerHTML = "";
                            document.getElementById("breakText5").innerHTML = "";
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
                            txt += "<br />Break In: " + person[currentMonth[i + 2]].In + "<br />";
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
                            txt += "<br />Break In: " + person[currentMonth[i + 3]].In + "<br />";
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
                            txt += "<br />Break In: " + person[currentMonth[i + 4]].In + "<br />";
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
            } else {}
        }
    });
}
/*------------------ End of display current user's time logs -------------------*/




/*------------------- Connect personal time clock to each user -----------------*/
/* Does the same thing as the above function, for users other than the one logged in */
function selectName(selected, num) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var name = firebase.database().ref('users/' + selected + '/TimeClock/HoursWorked').once('value');
            name.then(function (snapshot) {

                var individual = (snapshot.val());
                var dates = Object.keys(individual);
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

                for (var i = 0; i < monthDays.length; i++) {
                    if (num == monthDays[i + 1]) {
                        if (individual[currentMonth[i + 1]].CommentIn == undefined) {
                            individual[currentMonth[i + 1]].CommentIn = "N/A";
                        }
                        if (individual[currentMonth[i + 1]].CommentOut == undefined) {
                            individual[currentMonth[i + 1]].CommentOut = "N/A";
                        }
                        if (individual[currentMonth[i + 1]].Out == undefined) {
                            individual[currentMonth[i + 1]].Out = "N/A";
                        }
                        var txt = "Clocked in at: " + individual[currentMonth[i + 1]].In + "<br />";
                        txt += "CommentIn: " + individual[currentMonth[i + 1]].CommentIn + "<br />";
                        txt += "Clock out at: " + individual[currentMonth[i + 1]].Out + "<br />";
                        txt += "CommentOut: " + individual[currentMonth[i + 1]].CommentOut + "<br />";
                        document.getElementById("modalText").innerHTML = txt;
                        check = true;
                    } else if (num == monthDays[i]) {
                        if (individual[currentMonth[i]].CommentIn == undefined) {
                            individual[currentMonth[i]].CommentIn = "N/A";
                        }
                        if (individual[currentMonth[i]].CommentOut == undefined) {
                            individual[currentMonth[i]].CommentOut = "N/A";
                        }
                        if (individual[currentMonth[i]].Out == undefined) {
                            individual[currentMonth[i]].Out = "N/A";
                        }
                        var txt = "Clocked in at: " + individual[currentMonth[i]].In + "<br />";
                        txt += "CommentIn: " + individual[currentMonth[i]].CommentIn + "<br />";
                        txt += "Clock out at: " + individual[currentMonth[i]].Out + "<br />";
                        txt += "CommentOut: " + individual[currentMonth[i]].CommentOut + "<br />";
                        document.getElementById("modalText").innerHTML = txt;
                        document.getElementById("secondShift").innerHTML = "No time logged";
                        check = true;
                        break;
                    } else {
                        document.getElementById("secondShift").innerHTML = "No time logged";
                    }
                    if (num == monthDays[i]) {
                        if (individual[currentMonth[i]].CommentIn == undefined) {
                            individual[currentMonth[i]].CommentIn = "N/A";
                        }
                        if (individual[currentMonth[i]].CommentOut == undefined) {
                            individual[currentMonth[i]].CommentOut = "N/A";
                        }
                        if (individual[currentMonth[i]].Out == undefined) {
                            individual[currentMonth[i]].Out = "N/A";
                        }
                        var txt = "Clocked in at: " + individual[currentMonth[i]].In + "<br />";
                        txt += "CommentIn: " + individual[currentMonth[i]].CommentIn + "<br />";
                        txt += "Clock out at: " + individual[currentMonth[i]].Out + "<br />";
                        txt += "CommentOut: " + individual[currentMonth[i]].CommentOut + "<br />";
                        document.getElementById("secondShift").innerHTML = txt;
                        check = true;
                        break;
                    }

                }
                if (!check) {
                    document.getElementById("modalText").innerHTML = "No time logged";
                }

                count = 0;

            });
            name.catch(function (error) {
                alert(error);
                return;
            });

            var breaks = firebase.database().ref('users/' + selected + '/TimeClock/Breaks').once('value');
            breaks.then(function (snapshot) {
                var individual = (snapshot.val());

                var dates = Object.keys(individual);
                var monthDays = [];
                var currentMonth = [];
                var count = 0;
                //                console.log(dates);
                for (var i = 0; i < dates.length; i++) {
                    if (document.getElementById("month-dropdown").value == dates[i][0]) {
                        //                        console.log(dates[i]);
                        currentMonth[count] = dates[i];
                        var firstDash = currentMonth[count].indexOf("-");
                        var lastDash = currentMonth[count].lastIndexOf("-");
                        monthDays[count] = currentMonth[count].slice(firstDash + 1, lastDash);
                        if (monthDays[count][0] == 0) {
                            monthDays[count] = monthDays[count].slice(1);
                        }
                        //                        console.log(monthDays[count]);
                        count++;
                    }
                }
                var check = false;
                var txt = "";
                for (var i = 0; i < monthDays.length; i++) {

                    if (num == monthDays[i]) {
                        //                        console.log(num);
                        if (individual[currentMonth[i]].In == undefined) {
                            individual[currentMonth[i]].In = "N/A";
                        }
                        if (individual[currentMonth[i]].Out == undefined) {
                            individual[currentMonth[i]].Out = "N/A";
                        }
                        var txt = "Break Out: " + individual[currentMonth[i]].Out;
                        txt += "<br />Break In: " + individual[currentMonth[i]].In + "<br />";
                        document.getElementById("breakText1").innerHTML = txt;
                        check = true;
                    } else {
                        document.getElementById("breakText1").innerHTML = "No breaks logged";
                        document.getElementById("breakText2").innerHTML = "";
                        document.getElementById("breakText3").innerHTML = "";
                        document.getElementById("breakText4").innerHTML = "";
                        document.getElementById("breakText5").innerHTML = "";
                        continue;
                    }
                    if (num == monthDays[i + 1]) {
                        //                        console.log(num + " 2");
                        if (individual[currentMonth[i + 1]].In == undefined) {
                            individual[currentMonth[i + 1]].In = "N/A";
                        }
                        if (individual[currentMonth[i + 1]].Out == undefined) {
                            individual[currentMonth[i + 1]].Out = "N/A";
                        }
                        var txt = "Break Out: " + individual[currentMonth[i + 1]].Out;
                        txt += "<br />Break In: " + individual[currentMonth[i + 1]].In + "<br />";
                        document.getElementById("breakText2").innerHTML = txt;
                        check = true;
                    } else {
                        document.getElementById("breakText2").innerHTML = "No more breaks";
                        document.getElementById("breakText3").innerHTML = "";
                        document.getElementById("breakText4").innerHTML = "";
                        document.getElementById("breakText5").innerHTML = "";
                        break;
                    }
                    if (num == monthDays[i + 2]) {
                        //                        console.log(num + " 3");
                        if (individual[currentMonth[i + 2]].In == undefined) {
                            individual[currentMonth[i + 2]].In = "N/A";
                        }
                        if (individual[currentMonth[i + 2]].Out == undefined) {
                            individual[currentMonth[i + 2]].Out = "N/A";
                        }
                        var txt = "Break Out: " + individual[currentMonth[i + 2]].Out;
                        txt += "<br />Break In: " + individual[currentMonth[i + 2]].In + "<br />";
                        document.getElementById("breakText3").innerHTML = txt;
                        check = true;
                    } else {
                        document.getElementById("breakText3").innerHTML = "No more breaks";
                        document.getElementById("breakText4").innerHTML = "";
                        document.getElementById("breakText5").innerHTML = "";
                        break;
                    }
                    if (num == monthDays[i + 3]) {
                        //                        console.log(num + " 4");
                        if (individual[currentMonth[i + 3]].In == undefined) {
                            individual[currentMonth[i + 3]].In = "N/A";
                        }
                        if (individual[currentMonth[i + 3]].Out == undefined) {
                            individual[currentMonth[i + 3]].Out = "N/A";
                        }
                        var txt = "Break Out: " + individual[currentMonth[i + 3]].Out;
                        txt += "<br />Break In: " + individual[currentMonth[i + 3]].In + "<br />";
                        document.getElementById("breakText4").innerHTML = txt;
                        check = true;
                    } else {
                        document.getElementById("breakText4").innerHTML = "No more breaks";
                        document.getElementById("breakText5").innerHTML = "";
                        break;
                    }
                    if (num == monthDays[i + 4]) {
                        //                        console.log(num + " 5");
                        if (individual[currentMonth[i + 4]].In == undefined) {
                            individual[currentMonth[i + 4]].In = "N/A";
                        }
                        if (individual[currentMonth[i + 4]].Out == undefined) {
                            individual[currentMonth[i + 4]].Out = "N/A";
                        }
                        var txt = "Break Out: " + individual[currentMonth[i + 4]].Out;
                        txt += "<br />Break In: " + individual[currentMonth[i + 4]].In + "<br />";
                        document.getElementById("breakText5").innerHTML = txt;
                        check = true;
                    } else {
                        document.getElementById("breakText5").innerHTML = "No more breaks";
                        break;
                    }
                }
                if (!check) {
                    document.getElementById("breakText1").innerHTML = "No breaks logged";
                    document.getElementById("breakText2").innerHTML = "";
                    document.getElementById("breakText3").innerHTML = "";
                    document.getElementById("breakText4").innerHTML = "";
                    document.getElementById("breakText5").innerHTML = "";
                }
            });
            count = 0;
            breaks.catch(function (error) {
                alert(error);
                return;
            });
        }
    });
}
/*--------------- End of Connect personal time clock to each user --------------*/



/*----------------------------- Calendar Functions ---------------------------- */

/* Determines if the year is a leap year */
function leapYear(year) {
    if (year % 4 == 0) // basic rule
        return true // is leap year
    /* else */ // else not needed when statement is "return"
    return false // is not leap year
}

/* Describe what the function does */
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

/* Describe what the function does */
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
    // standard time attributes
    calcTotals();
    clearCal();
    var now = new Date()
    var cMonth = now.getMonth();
    sMonth = Number(sMonth);
    sMonth -= 1;
    var year = now.getYear();
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
/*---------------------------- End Calendar Functions --------------------------*/



/*----------------------- Start of Modal Boxes Function ------------------------*/


/* Causes modal box to open when clicked on */
function modalBox(number) {
    // Get the modal
    var num = number.getAttribute("value");
    console.log(num);
    var modal = document.getElementById('myModal');
    var selected = document.getElementById('name-dropdown').value;

    document.getElementById("breakText1").innerHTML = "hey";
    document.getElementById("breakText2").innerHTML = "";
    document.getElementById("breakText3").innerHTML = "";
    document.getElementById("breakText4").innerHTML = "";
    document.getElementById("breakText5").innerHTML = "";

    showModal(num, selected);
    showSchedule(num, selected);
    firebase.auth().onAuthStateChanged(function (user) {
        if (selected != user.displayName && selected != "") {
            selectedTotals(selected);
        } else {
            calcTotals(selected);
        }
    });

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
}
/*------------------------ End of Modal Boxes Function -------------------------*/



/*--------------------- Start of specific access Functions ---------------------*/

function setMonth() {
    var now = new Date()
    var cMonth = now.getMonth() + 1;
    var selected = document.getElementById("month-dropdown").options;
    selected.selectedIndex = cMonth;

    setCal(cMonth);


}

/* Allows use for name dropdowns for team leads and admin, as well as team dropdown for admin */
(function () {


    calcTotals();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.database().ref('users/' + user.displayName).on('value', snapshot => {
                var currentUser = (snapshot.val());
                var i;
                // iterates through each user to check for a TeamLead or Admin category
                for (i in currentUser) {
                    if (i == 'TeamLead') {
                        var team = currentUser[i];
                        document.getElementById('name-dropdown').classList.remove("hide");

                        firebase.database().ref('users').on('value', snapshot => {
                            var list = snapshot.val();
                            var user;
                            for (user in list) {
                                var userData = list[user];
                                var j;
                                for (j in userData) {
                                    if (j == 'Team') {
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
                    if (i == 'Admin') {
                        document.getElementById('team-dropdown').classList.remove("hide");
                        document.getElementById('name-dropdown').classList.remove("hide");
                        //Load Admin Link
                        var ul = document.getElementById('sidenav');
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        a.setAttribute('href', 'admin.html');
                        var t = document.createTextNode('Admin');
                        a.appendChild(t);
                        li.appendChild(a);
                        var ref = ul.lastChild;
                        ref.parentNode.insertBefore(li, ref.nextSibling);
                    }
                }
            });

        } else {
            //            window.location = "index.html";
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
/*---------------------- End of specific access Functions ----------------------*/



/*-------------------------- Start of Totals Function --------------------------*/
/* Describe what this function does */

function calcTotals(selected) {
    //    var selected = document.getElementById("name-dropdown").value;
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            var user = firebase.auth().currentUser;
            var ppl = firebase.database().ref('users/' + user.displayName + '/TimeClock/HoursWorked').once('value');
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

                var thisDay = new Date();
                today = thisDay.toString();
                day = today.substring(8, 10);

                var count = 0;



                // Code for row one
                var rowone = document.getElementById("rowone").cells;
                var weekOne = 0;

                for (var x = 0; x < rowone.length - 1; x++) {

                    if (rowone[x].innerHTML != "") {
                        if (rowone[x].innerHTML != monthDays[count]) {
                            continue;
                            One
                        }
                        //                        var add1 = 0;
                        //                        var add2 = 0;
                        //                        var ic = person[currentMonth[count]].In;
                        //                        var oc = person[currentMonth[count]].Out;
                        //                        var ic1 = person[currentMonth[count + 1]].In;
                        //                        var oc1 = person[currentMonth[count + 1]].Out;
                        //                        if (ic.search("am") != -1 && oc.search("pm") != -1) {
                        //                            add1 = 43200;
                        //                        } else {
                        //                            add1 = 0;
                        //                        }
                        //                        if (ic1.search("am") != -1 && oc1 != undefined && oc1.search("pm") != -1) {
                        //                            add2 = 43200;
                        //                        } else {
                        //                            add2 = 0;
                        //                        }


                        var b = "";
                        b = person[currentMonth[count + 1]].In.slice(0, 8);
                        b = b.split(":");
                        var bHours = b[0] * 3600;
                        var bMinutes = b[1] * 60;
                        var bSeconds = b[2] * 1;
                        var bTotal = bHours + bMinutes + bSeconds;

                        var a = "";
                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
                        a = a.split(":");
                        var aHours = a[0] * 3600;
                        var aMinutes = a[1] * 60;
                        var aSeconds = a[2] * 1;
                        var aTotal = aHours + aMinutes + aSeconds;

                        var d = "";
                        d = person[currentMonth[count]].In.slice(0, 8);
                        d = d.split(":");
                        var dHours = d[0] * 3600;
                        var dMinutes = d[1] * 60;
                        var dSeconds = d[2] * 1;
                        var dTotal = dHours + dMinutes + dSeconds;

                        if (currentMonth[count].Out != undefined) {

                            var c = "";
                            c = person[currentMonth[count]].Out.slice(0, 8);
                            c = c.split(":");
                            var cHours = c[0] * 3600;
                            var cMinutes = c[1] * 60;
                            var cSeconds = c[2] * 1;
                            var cTotal = cHours + cMinutes + cSeconds;
                        } else {
                            cTotal = 0;
                            dTotal = 0;
                        }

                        var total1 = 0;
                        var total2 = 0;
                        if (aTotal < bTotal) {
                            total1 = bTotal - aTotal;
                        } else {
                            total1 = aTotal - bTotal;
                        }
                        if (cTotal < dTotal) {
                            total2 = dTotal - cTotal;
                        } else {
                            total2 = cTotal - dTotal;
                        }

                        count += 2;
                        var grandTotal = total1 + total2;
                        weekOne += grandTotal;

                    }
                }
                weekOne /= 3600;
                weekOne = weekOne.toFixed(1);
                document.getElementById("weekOne").innerHTML = weekOne;


                // Code for row two
                var rowtwo = document.getElementById("rowtwo").cells;
                var weekTwo = 0;

                for (var x = 0; x < rowtwo.length - 1; x++) {
                    //                    console.log();

                    if (rowtwo[x].innerHTML != "") {
                        if (rowtwo[x].innerHTML != monthDays[count]) {
                            continue;
                        }

                        var b = "";
                        b = person[currentMonth[count + 1]].In.slice(0, 8);
                        b = b.split(":");
                        var bHours = b[0] * 3600;
                        var bMinutes = b[1] * 60;
                        var bSeconds = b[2] * 1;
                        var bTotal = bHours + bMinutes + bSeconds;

                        var a = "";
                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
                        a = a.split(":");
                        var aHours = a[0] * 3600;
                        var aMinutes = a[1] * 60;
                        var aSeconds = a[2] * 1;
                        var aTotal = aHours + aMinutes + aSeconds;

                        var d = "";
                        d = person[currentMonth[count]].In.slice(0, 8);
                        d = d.split(":");
                        var dHours = d[0] * 3600;
                        var dMinutes = d[1] * 60;
                        var dSeconds = d[2] * 1;
                        var dTotal = dHours + dMinutes + dSeconds;

                        if (currentMonth[count].Out != undefined) {

                            var c = "";
                            c = person[currentMonth[count]].Out.slice(0, 8);
                            c = c.split(":");
                            var cHours = c[0] * 3600;
                            var cMinutes = c[1] * 60;
                            var cSeconds = c[2] * 1;
                            var cTotal = cHours + cMinutes + cSeconds;
                        } else {
                            cTotal = 0;
                            dTotal = 0;
                        }

                        var total1 = 0;
                        var total2 = 0;
                        if (aTotal < bTotal) {
                            total1 = bTotal - aTotal;
                        } else {
                            total1 = aTotal - bTotal;
                        }
                        if (cTotal < dTotal) {
                            total2 = dTotal - cTotal;
                        } else {
                            total2 = cTotal - dTotal;
                        }


                        count += 2;
                        var grandTotal = total1 + total2;
                        weekTwo += grandTotal;

                    }
                }
                weekTwo /= 3600;
                weekTwo = weekTwo.toFixed(1);
                document.getElementById("weekTwo").innerHTML = weekTwo;


                // Code for row three
                var rowthree = document.getElementById("rowthree").cells;
                var weekThree = 0;

                for (var x = 0; x < rowthree.length - 1; x++) {
                    if (monthDays[count + 1] == undefined) {
                        continue;
                    }
                    if (rowthree[x].innerHTML != "") {
                        if (rowthree[x].innerHTML != monthDays[count]) {
                            continue;
                        }
                        var add1 = 0;
                        var add2 = 0;

                        var b = "";
                        b = person[currentMonth[count + 1]].In.slice(0, 8);
                        b = b.split(":");
                        var bHours = b[0] * 3600;
                        var bMinutes = b[1] * 60;
                        var bSeconds = b[2] * 1;
                        var bTotal = bHours + bMinutes + bSeconds;


                        if (person[currentMonth[count + 1]].Out != undefined) {
                            var a = "";
                            a = person[currentMonth[count + 1]].Out.slice(0, 8);
                            a = a.split(":");
                            var aHours = a[0] * 3600;
                            var aMinutes = a[1] * 60;
                            var aSeconds = a[2] * 1;
                            var aTotal = aHours + aMinutes + aSeconds;
                        } else {
                            aTotal = 0;
                            bTotal = 0;
                        }

                        var d = "";
                        d = person[currentMonth[count]].In.slice(0, 8);
                        d = d.split(":");
                        var dHours = d[0] * 3600;
                        var dMinutes = d[1] * 60;
                        var dSeconds = d[2] * 1;
                        var dTotal = dHours + dMinutes + dSeconds;


                        if (person[currentMonth[count]].Out != undefined) {

                            var c = "";
                            c = person[currentMonth[count]].Out.slice(0, 8);
                            c = c.split(":");
                            var cHours = c[0] * 3600;
                            var cMinutes = c[1] * 60;
                            var cSeconds = c[2] * 1;
                            var cTotal = cHours + cMinutes + cSeconds;
                        } else {
                            cTotal = 0;
                            dTotal = 0;
                        }


                        var total1 = 0;
                        var total2 = 0;
                        if (aTotal < bTotal) {
                            total1 = bTotal - aTotal;
                        } else {
                            total1 = aTotal - bTotal;
                        }
                        if (cTotal < dTotal) {
                            total2 = dTotal - cTotal;
                        } else {
                            total2 = cTotal - dTotal;
                        }
                        count += 2;
                        var grandTotal = total1 + total2;
                        weekThree += grandTotal;

                    }
                }
                weekThree /= 3600;
                weekThree = weekThree.toFixed(1);
                document.getElementById("weekThree").innerHTML = weekThree;


                // Code for row four
                var rowfour = document.getElementById("rowfour").cells;
                var weekFour = 0;
                for (var x = 0; x < rowfour.length - 1; x++) {


                    if (rowfour[x].innerHTML != "") {
                        if (rowfour[x].innerHTML != monthDays[count]) {
                            continue;
                        }

                        var b = "";
                        b = person[currentMonth[count + 1]].In.slice(0, 8);
                        b = b.split(":");
                        var bHours = b[0] * 3600;
                        var bMinutes = b[1] * 60;
                        var bSeconds = b[2] * 1;
                        var bTotal = bHours + bMinutes + bSeconds;



                        var a = "";
                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
                        a = a.split(":");
                        var aHours = a[0] * 3600;
                        var aMinutes = a[1] * 60;
                        var aSeconds = a[2] * 1;
                        var aTotal = aHours + aMinutes + aSeconds;



                        var d = "";
                        d = person[currentMonth[count]].In.slice(0, 8);
                        d = d.split(":");
                        var dHours = d[0] * 3600;
                        var dMinutes = d[1] * 60;
                        var dSeconds = d[2] * 1;
                        var dTotal = dHours + dMinutes + dSeconds;


                        var c = "";
                        c = person[currentMonth[count]].Out.slice(0, 8);
                        c = c.split(":");
                        var cHours = c[0] * 3600;
                        var cMinutes = c[1] * 60;
                        var cSeconds = c[2] * 1;
                        var cTotal = cHours + cMinutes + cSeconds;


                        var total1 = 0;
                        var total2 = 0;
                        if (aTotal < bTotal) {
                            total1 = bTotal - aTotal;
                        } else {
                            total1 = aTotal - bTotal;
                        }
                        if (cTotal < dTotal) {
                            total2 = dTotal - cTotal;
                        } else {
                            total2 = cTotal - dTotal;
                        }


                        var total1 = 0;
                        var total2 = 0;
                        if (aTotal < bTotal) {
                            total1 = bTotal - aTotal;
                        } else {
                            total1 = aTotal - bTotal;
                        }
                        if (cTotal < dTotal) {
                            total2 = dTotal - cTotal;
                        } else {
                            total2 = cTotal - dTotal;
                        }

                        count += 2;
                        var grandTotal = total1 + total2;
                        weekFour += grandTotal;

                    }

                }
                weekFour /= 3600;
                weekFour = weekFour.toFixed(1);
                document.getElementById("weekFour").innerHTML = weekFour;


                // Code for row five
                var rowfive = document.getElementById("rowfive").cells;
                var weekFive = 0;
                for (var x = 0; x < rowfive.length - 1; x++) {



                    if (rowfive[x].innerHTML != "") {
                        if (rowfive[x].innerHTML != monthDays[count]) {
                            continue;
                        }

                        var b = "";
                        b = person[currentMonth[count + 1]].In.slice(0, 8);
                        b = b.split(":");
                        var bHours = b[0] * 3600;
                        var bMinutes = b[1] * 60;
                        var bSeconds = b[2] * 1;
                        var bTotal = bHours + bMinutes + bSeconds;


                        var a = "";
                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
                        a = a.split(":");
                        var aHours = a[0] * 3600;
                        var aMinutes = a[1] * 60;
                        var aSeconds = a[2] * 1;
                        var aTotal = aHours + aMinutes + aSeconds;


                        var d = "";
                        d = person[currentMonth[count]].In.slice(0, 8);
                        d = d.split(":");
                        var dHours = d[0] * 3600;
                        var dMinutes = d[1] * 60;
                        var dSeconds = d[2] * 1;
                        var dTotal = dHours + dMinutes + dSeconds;


                        var c = "";
                        c = person[currentMonth[count]].Out.slice(0, 8);
                        c = c.split(":");
                        var cHours = c[0] * 3600;
                        var cMinutes = c[1] * 60;
                        var cSeconds = c[2] * 1;
                        var cTotal = cHours + cMinutes + cSeconds;


                        var total1 = 0;
                        var total2 = 0;
                        if (aTotal < bTotal) {
                            total1 = bTotal - aTotal;
                        } else {
                            total1 = aTotal - bTotal;
                        }
                        if (cTotal < dTotal) {
                            total2 = dTotal - cTotal;
                        } else {
                            total2 = cTotal - dTotal;
                        }

                        count += 2;
                        var grandTotal = total1 + total2;
                        weekFive += grandTotal;

                    }

                }
                weekFive /= 3600;
                weekFive = weekFive.toFixed(1);
                document.getElementById("weekFive").innerHTML = weekFive;


                // Code for row six
                var rowsix = document.getElementById("rowsix").cells;
                var weekSix = 0;
                for (var x = 0; x < rowsix.length - 1; x++) {

                    if (rowsix[x].innerHTML != "") {
                        if (rowsix[x].innerHTML != monthDays[count]) {
                            continue;
                        }

                        var b = "";
                        b = person[currentMonth[count + 1]].In.slice(0, 8);
                        b = b.split(":");
                        var bHours = b[0] * 3600;
                        var bMinutes = b[1] * 60;
                        var bSeconds = b[2] * 1;
                        var bTotal = bHours + bMinutes + bSeconds;


                        var a = "";
                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
                        a = a.split(":");
                        var aHours = a[0] * 3600;
                        var aMinutes = a[1] * 60;
                        var aSeconds = a[2] * 1;
                        var aTotal = aHours + aMinutes + aSeconds;


                        var d = "";
                        d = person[currentMonth[count]].In.slice(0, 8);
                        d = d.split(":");
                        var dHours = d[0] * 3600;
                        var dMinutes = d[1] * 60;
                        var dSeconds = d[2] * 1;
                        var dTotal = dHours + dMinutes + dSeconds;


                        var c = "";
                        c = person[currentMonth[count]].Out.slice(0, 8);
                        c = c.split(":");
                        var cHours = c[0] * 3600;
                        var cMinutes = c[1] * 60;
                        var cSeconds = c[2] * 1;
                        var cTotal = cHours + cMinutes + cSeconds;


                        var total1 = 0;
                        var total2 = 0;
                        if (aTotal < bTotal) {
                            total1 = bTotal - aTotal;
                        } else {
                            total1 = aTotal - bTotal;
                        }
                        if (cTotal < dTotal) {
                            total2 = dTotal - cTotal;
                        } else {
                            total2 = cTotal - dTotal;
                        }

                        count += 2;
                        var grandTotal = total1 + total2;
                        weekSix += grandTotal;

                    }

                }
                weekSix /= 3600;
                weekSix = weekSix.toFixed(1);
                document.getElementById("weekSix").innerHTML = weekSix;


                monthlyTotal = weekOne * 1 + weekTwo * 1 + weekThree * 1 + weekFour * 1 + weekFive * 1 + weekSix * 1;
                document.getElementById("grandTotal").innerHTML = monthlyTotal;
            });
        }
    })
}

/*--------------------------- End of Totals Function ---------------------------*/



//    firebase.auth().onAuthStateChanged(function (user) {
//        var ppl = firebase.database().ref('users/' + selected + '/TimeClock/HoursWorked').once('value');
//        ppl.then(function (snapshot) {

function selectedTotals(selected) {
    //    //    var selected = document.getElementById("name-dropdown").value;
    //    firebase.auth().onAuthStateChanged(function (user) {
    //
    //        if (user) {
    //            var ppl = firebase.database().ref('users/' + selected + '/TimeClock/HoursWorked').once('value');
    //            ppl.then(function (snapshot) {
    //
    //                var person = (snapshot.val());
    //                var dates = Object.keys(person);
    //                var monthDays = [];
    //                var currentMonth = [];
    //
    //                var count = 0;
    //                for (var i = 0; i < dates.length; i++) {
    //                    if (document.getElementById("month-dropdown").value == dates[i][0]) {
    //                        currentMonth[count] = dates[i];
    //
    //                        var firstDash = currentMonth[count].indexOf("-");
    //                        var lastDash = currentMonth[count].lastIndexOf("-");
    //                        monthDays[count] = currentMonth[count].slice(firstDash + 1, lastDash);
    //                        if (monthDays[count][0] == 0) {
    //                            monthDays[count] = monthDays[count].slice(1);
    //                        }
    //
    //                        count++;
    //                    }
    //                }
    //
    //                var thisDay = new Date();
    //                today = thisDay.toString();
    //                day = today.substring(8, 10);
    //
    //                var count = 0;
    //
    //
    //                // Code for row one
    //                var rowone = document.getElementById("rowone").cells;
    //                var weekOne = 0;
    //
    //                for (var x = 0; x < rowone.length - 1; x++) {
    //
    //                    if (rowone[x].innerHTML != "") {
    //                        if (rowone[x].innerHTML != monthDays[count]) {
    //                            continue;
    //
    //                        }
    //                        //                        var add1 = 0;
    //                        //                        var add2 = 0;
    //                        //                        var ic = person[currentMonth[count]].In;
    //                        //                        var oc = person[currentMonth[count]].Out;
    //                        //                        var ic1 = person[currentMonth[count + 1]].In;
    //                        //                        var oc1 = person[currentMonth[count + 1]].Out;
    //                        //                        if (ic.search("am") != -1 && oc.search("pm") != -1) {
    //                        //                            add1 = 43200;
    //                        //                        } else {
    //                        //                            add1 = 0;
    //                        //                        }
    //                        //                        if (ic1.search("am") != -1 && oc1 != undefined && oc1.search("pm") != -1) {
    //                        //                            add2 = 43200;
    //                        //                        } else {
    //                        //                            add2 = 0;
    //                        //                        }
    //
    //
    //                        var b = "";
    //                        b = person[currentMonth[count + 1]].In.slice(0, 8);
    //                        b = b.split(":");
    //                        var bHours = b[0] * 3600;
    //                        var bMinutes = b[1] * 60;
    //                        var bSeconds = b[2] * 1;
    //                        var bTotal = bHours + bMinutes + bSeconds;
    //
    //                        var a = "";
    //                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
    //                        a = a.split(":");
    //                        var aHours = a[0] * 3600;
    //                        var aMinutes = a[1] * 60;
    //                        var aSeconds = a[2] * 1;
    //                        var aTotal = aHours + aMinutes + aSeconds;
    //
    //                        var d = "";
    //                        d = person[currentMonth[count]].In.slice(0, 8);
    //                        d = d.split(":");
    //                        var dHours = d[0] * 3600;
    //                        var dMinutes = d[1] * 60;
    //                        var dSeconds = d[2] * 1;
    //                        var dTotal = dHours + dMinutes + dSeconds;
    //
    //                        if (currentMonth[count].Out != undefined) {
    //
    //                            var c = "";
    //                            c = person[currentMonth[count]].Out.slice(0, 8);
    //                            c = c.split(":");
    //                            var cHours = c[0] * 3600;
    //                            var cMinutes = c[1] * 60;
    //                            var cSeconds = c[2] * 1;
    //                            var cTotal = cHours + cMinutes + cSeconds;
    //                        } else {
    //                            cTotal = 0;
    //                            dTotal = 0;
    //                        }
    //
    //                        var total1 = 0;
    //                        var total2 = 0;
    //                        if (aTotal < bTotal) {
    //                            total1 = bTotal - aTotal;
    //                        } else {
    //                            total1 = aTotal - bTotal;
    //                        }
    //                        if (cTotal < dTotal) {
    //                            total2 = dTotal - cTotal;
    //                        } else {
    //                            total2 = cTotal - dTotal;
    //                        }
    //
    //                        count += 2;
    //                        var grandTotal = total1 + total2;
    //                        weekOne += grandTotal;
    //
    //                    }
    //                }
    //                weekOne /= 3600;
    //                weekOne = weekOne.toFixed(1);
    //                document.getElementById("weekOne").innerHTML = weekOne;
    //
    //
    //                // Code for row two
    //                var rowtwo = document.getElementById("rowtwo").cells;
    //                var weekTwo = 0;
    //
    //                for (var x = 0; x < rowtwo.length - 1; x++) {
    //
    //
    //                    if (rowtwo[x].innerHTML != "") {
    //                        if (rowtwo[x].innerHTML != monthDays[count]) {
    //                            continue;
    //                        }
    //
    //                        var b = "";
    //                        b = person[currentMonth[count + 1]].In.slice(0, 8);
    //                        b = b.split(":");
    //                        var bHours = b[0] * 3600;
    //                        var bMinutes = b[1] * 60;
    //                        var bSeconds = b[2] * 1;
    //                        var bTotal = bHours + bMinutes + bSeconds;
    //
    //                        var a = "";
    //                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
    //                        a = a.split(":");
    //                        var aHours = a[0] * 3600;
    //                        var aMinutes = a[1] * 60;
    //                        var aSeconds = a[2] * 1;
    //                        var aTotal = aHours + aMinutes + aSeconds;
    //
    //                        var d = "";
    //                        d = person[currentMonth[count]].In.slice(0, 8);
    //                        d = d.split(":");
    //                        var dHours = d[0] * 3600;
    //                        var dMinutes = d[1] * 60;
    //                        var dSeconds = d[2] * 1;
    //                        var dTotal = dHours + dMinutes + dSeconds;
    //
    //                        if (currentMonth[count].Out != undefined) {
    //
    //                            var c = "";
    //                            c = person[currentMonth[count]].Out.slice(0, 8);
    //                            c = c.split(":");
    //                            var cHours = c[0] * 3600;
    //                            var cMinutes = c[1] * 60;
    //                            var cSeconds = c[2] * 1;
    //                            var cTotal = cHours + cMinutes + cSeconds;
    //                        } else {
    //                            cTotal = 0;
    //                            dTotal = 0;
    //                        }
    //
    //                        var total1 = 0;
    //                        var total2 = 0;
    //                        if (aTotal < bTotal) {
    //                            total1 = bTotal - aTotal;
    //                        } else {
    //                            total1 = aTotal - bTotal;
    //                        }
    //                        if (cTotal < dTotal) {
    //                            total2 = dTotal - cTotal;
    //                        } else {
    //                            total2 = cTotal - dTotal;
    //                        }
    //
    //                        count += 2;
    //                        var grandTotal = total1 + total2;
    //                        weekTwo += grandTotal;
    //
    //                    }
    //                }
    //                weekTwo /= 3600;
    //                weekTwo = weekTwo.toFixed(1);
    //                document.getElementById("weekTwo").innerHTML = weekTwo;
    //
    //
    //                // Code for row three
    //                var rowthree = document.getElementById("rowthree").cells;
    //                var weekThree = 0;
    //
    //                for (var x = 0; x < rowthree.length - 1; x++) {
    //
    //                    if (rowthree[x].innerHTML != "") {
    //                        if (rowthree[x].innerHTML != monthDays[count]) {
    //                            continue;
    //                        }
    //
    //                        var b = "";
    //                        b = person[currentMonth[count + 1]].In.slice(0, 8);
    //                        b = b.split(":");
    //                        var bHours = b[0] * 3600;
    //                        var bMinutes = b[1] * 60;
    //                        var bSeconds = b[2] * 1;
    //                        var bTotal = bHours + bMinutes + bSeconds;
    //
    //                        if (person[currentMonth[count + 1]].Out != undefined) {
    //                            var a = "";
    //                            a = person[currentMonth[count + 1]].Out.slice(0, 8);
    //                            a = a.split(":");
    //                            var aHours = a[0] * 3600;
    //                            var aMinutes = a[1] * 60;
    //                            var aSeconds = a[2] * 1;
    //                            var aTotal = aHours + aMinutes + aSeconds;
    //                        } else {
    //                            aTotal = 0;
    //                            bTotal = 0;
    //                        }
    //
    //                        var d = "";
    //                        d = person[currentMonth[count]].In.slice(0, 8);
    //                        d = d.split(":");
    //                        var dHours = d[0] * 3600;
    //                        var dMinutes = d[1] * 60;
    //                        var dSeconds = d[2] * 1;
    //                        var dTotal = dHours + dMinutes + dSeconds;
    //
    //
    //                        if (person[currentMonth[count]].Out != undefined) {
    //
    //                            var c = "";
    //                            c = person[currentMonth[count]].Out.slice(0, 8);
    //                            c = c.split(":");
    //                            var cHours = c[0] * 3600;
    //                            var cMinutes = c[1] * 60;
    //                            var cSeconds = c[2] * 1;
    //                            var cTotal = cHours + cMinutes + cSeconds;
    //                        } else {
    //                            cTotal = 0;
    //                            dTotal = 0;
    //                        }
    //
    //
    //                        var total1 = 0;
    //                        var total2 = 0;
    //                        if (aTotal < bTotal) {
    //                            total1 = bTotal - aTotal;
    //                        } else {
    //                            total1 = aTotal - bTotal;
    //                        }
    //                        if (cTotal < dTotal) {
    //                            total2 = dTotal - cTotal;
    //                        } else {
    //                            total2 = cTotal - dTotal;
    //                        }
    //                        count += 2;
    //                        var grandTotal = total1 + total2;
    //                        weekThree += grandTotal;
    //
    //                    }
    //                }
    //                weekThree /= 3600;
    //                weekThree = weekThree.toFixed(1);
    //                document.getElementById("weekThree").innerHTML = weekThree;
    //
    //
    //                // Code for row four
    //                var rowfour = document.getElementById("rowfour").cells;
    //                var weekFour = 0;
    //                for (var x = 0; x < rowfour.length - 1; x++) {
    //
    //
    //                    if (rowfour[x].innerHTML != "") {
    //                        if (rowfour[x].innerHTML != monthDays[count]) {
    //                            continue;
    //                        }
    //
    //                        var b = "";
    //                        b = person[currentMonth[count + 1]].In.slice(0, 8);
    //                        b = b.split(":");
    //                        var bHours = b[0] * 3600;
    //                        var bMinutes = b[1] * 60;
    //                        var bSeconds = b[2] * 1;
    //                        var bTotal = bHours + bMinutes + bSeconds;
    //
    //
    //                        if (person[currentMonth[count + 1]].Out != undefined) {
    //                            var a = "";
    //                            a = person[currentMonth[count + 1]].Out.slice(0, 8);
    //                            a = a.split(":");
    //                            var aHours = a[0] * 3600;
    //                            var aMinutes = a[1] * 60;
    //                            var aSeconds = a[2] * 1;
    //                            var aTotal = aHours + aMinutes + aSeconds;
    //                        } else {
    //                            aTotal = 0;
    //                            bTotal = 0;
    //                        }
    //
    //
    //                        var d = "";
    //                        d = person[currentMonth[count]].In.slice(0, 8);
    //                        d = d.split(":");
    //                        var dHours = d[0] * 3600;
    //                        var dMinutes = d[1] * 60;
    //                        var dSeconds = d[2] * 1;
    //                        var dTotal = dHours + dMinutes + dSeconds;
    //
    //                        var c = "";
    //                        c = person[currentMonth[count]].Out.slice(0, 8);
    //                        c = c.split(":");
    //                        var cHours = c[0] * 3600;
    //                        var cMinutes = c[1] * 60;
    //                        var cSeconds = c[2] * 1;
    //                        var cTotal = cHours + cMinutes + cSeconds;
    //
    //
    //                        var total1 = 0;
    //                        var total2 = 0;
    //                        if (aTotal < bTotal) {
    //                            total1 = bTotal - aTotal;
    //                        } else {
    //                            total1 = aTotal - bTotal;
    //                        }
    //                        if (cTotal < dTotal) {
    //                            total2 = dTotal - cTotal;
    //                        } else {
    //                            total2 = cTotal - dTotal;
    //                        }
    //
    //                        count += 2;
    //                        var grandTotal = total1 + total2;
    //                        weekFour += grandTotal;
    //
    //                    }
    //
    //                }
    //                weekFour /= 3600;
    //                weekFour = weekFour.toFixed(1);
    //                document.getElementById("weekFour").innerHTML = weekFour;
    //
    //
    //                // Code for row five
    //                var rowfive = document.getElementById("rowfive").cells;
    //                var weekFive = 0;
    //                for (var x = 0; x < rowfive.length - 1; x++) {
    //                    if (rowfive[x].innerHTML != "") {
    //                        if (rowfive[x].innerHTML != monthDays[count]) {
    //                            continue;
    //                        }
    //
    //                        var b = "";
    //                        b = person[currentMonth[count + 1]].In.slice(0, 8);
    //                        b = b.split(":");
    //                        var bHours = b[0] * 3600;
    //                        var bMinutes = b[1] * 60;
    //                        var bSeconds = b[2] * 1;
    //                        var bTotal = bHours + bMinutes + bSeconds;
    //
    //
    //                        var a = "";
    //                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
    //                        a = a.split(":");
    //                        var aHours = a[0] * 3600;
    //                        var aMinutes = a[1] * 60;
    //                        var aSeconds = a[2] * 1;
    //                        var aTotal = aHours + aMinutes + aSeconds;
    //
    //
    //                        var d = "";
    //                        d = person[currentMonth[count]].In.slice(0, 8);
    //                        d = d.split(":");
    //                        var dHours = d[0] * 3600;
    //                        var dMinutes = d[1] * 60;
    //                        var dSeconds = d[2] * 1;
    //                        var dTotal = dHours + dMinutes + dSeconds;
    //
    //
    //                        var c = "";
    //                        c = person[currentMonth[count]].Out.slice(0, 8);
    //                        c = c.split(":");
    //                        var cHours = c[0] * 3600;
    //                        var cMinutes = c[1] * 60;
    //                        var cSeconds = c[2] * 1;
    //                        var cTotal = cHours + cMinutes + cSeconds;
    //
    //
    //                        var total1 = 0;
    //                        var total2 = 0;
    //                        if (aTotal < bTotal) {
    //                            total1 = bTotal - aTotal;
    //                        } else {
    //                            total1 = aTotal - bTotal;
    //                        }
    //                        if (cTotal < dTotal) {
    //                            total2 = dTotal - cTotal;
    //                        } else {
    //                            total2 = cTotal - dTotal;
    //                        }
    //
    //                        count += 2;
    //                        var grandTotal = total1 + total2;
    //                        weekFive += grandTotal;
    //
    //                    }
    //
    //                }
    //                weekFive /= 3600;
    //                weekFive = weekFive.toFixed(1);
    //                document.getElementById("weekFive").innerHTML = weekFive;
    //
    //
    //                // Code for row six
    //                var rowsix = document.getElementById("rowsix").cells;
    //                var weekSix = 0;
    //                for (var x = 0; x < rowsix.length - 1; x++) {
    //
    //                    if (rowsix[x].innerHTML != "") {
    //                        if (rowsix[x].innerHTML != monthDays[count]) {
    //                            continue;
    //                        }
    //
    //                        var b = "";
    //                        b = person[currentMonth[count + 1]].In.slice(0, 8);
    //                        b = b.split(":");
    //                        var bHours = b[0] * 3600;
    //                        var bMinutes = b[1] * 60;
    //                        var bSeconds = b[2] * 1;
    //                        var bTotal = bHours + bMinutes + bSeconds;
    //
    //
    //                        var a = "";
    //                        a = person[currentMonth[count + 1]].Out.slice(0, 8);
    //                        a = a.split(":");
    //                        var aHours = a[0] * 3600;
    //                        var aMinutes = a[1] * 60;
    //                        var aSeconds = a[2] * 1;
    //                        var aTotal = aHours + aMinutes + aSeconds;
    //
    //
    //                        var d = "";
    //                        d = person[currentMonth[count]].In.slice(0, 8);
    //                        d = d.split(":");
    //                        var dHours = d[0] * 3600;
    //                        var dMinutes = d[1] * 60;
    //                        var dSeconds = d[2] * 1;
    //                        var dTotal = dHours + dMinutes + dSeconds;
    //
    //
    //                        var c = "";
    //                        c = person[currentMonth[count]].Out.slice(0, 8);
    //                        c = c.split(":");
    //                        var cHours = c[0] * 3600;
    //                        var cMinutes = c[1] * 60;
    //                        var cSeconds = c[2] * 1;
    //                        var cTotal = cHours + cMinutes + cSeconds;
    //
    //
    //                        var total1 = 0;
    //                        var total2 = 0;
    //                        if (aTotal < bTotal) {
    //                            total1 = bTotal - aTotal;
    //                        } else {
    //                            total1 = aTotal - bTotal;
    //                        }
    //                        if (cTotal < dTotal) {
    //                            total2 = dTotal - cTotal;
    //                        } else {
    //                            total2 = cTotal - dTotal;
    //                        }
    //
    //                        count += 2;
    //                        var grandTotal = total1 + total2;
    //                        weekSix += grandTotal;
    //                    }
    //                }
    //                weekSix /= 3600;
    //                weekSix = weekSix.toFixed(1);
    //                document.getElementById("weekSix").innerHTML = weekSix;
    //
    //
    //                monthlyTotal = weekOne * 1 + weekTwo * 1 + weekThree * 1 + weekFour * 1 + weekFive * 1 + weekSix * 1;
    //                document.getElementById("grandTotal").innerHTML = monthlyTotal;
    //            });
    //        }
    //    })
}


/*--------------------------- Display current user's schedule ---------------------------*/

function showSchedule(num, selected) {
    firebase.auth().onAuthStateChanged(function (user) {
        // if a name is selected and the selection isn't blank, show the data for the person selected
        if (selected != user.displayName && selected != "") {
            selectSchedule(selected, num);
            return
        } else {
            if (user) {
                var user = firebase.auth().currentUser;
                var ppl = firebase.database().ref('users/' + user.displayName + '/TimeClock/ScheduledTime').once('value');
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

            } else {}
        }
    });
}
/*------------------ End of display current user's schedule -------------------*/




/*------------------- Connect personal schedule to each user -----------------*/
/* Does the same thing as the above function, for users other than the one logged in */
function selectSchedule(selected, num) {
    var name = firebase.database().ref('users/' + selected + '/TimeClock/ScheduledTime').once('value');
    name.then(function (snapshot) {

        var individual = (snapshot.val());

        var dates = Object.keys(individual);
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

        for (var i = 0; i < monthDays.length; i++) {
            if (num == monthDays[i + 1]) {
                var txt = individual[currentMonth[i + 1]].Start + "-" + individual[currentMonth[i + 1]].End + "<br />";
                document.getElementById("schedule1").innerHTML = txt;
                check = true;
            } else if (num == monthDays[i]) {
                var txt = individual[currentMonth[i]].Start + "-" + individual[currentMonth[i]].End + "<br />";
                document.getElementById("schedule1").innerHTML = txt;
                document.getElementById("schedule2").innerHTML = "";
                check = true;
                break;
            } else {
                document.getElementById("schedule2").innerHTML = "";
            }
            if (num == monthDays[i]) {
                var txt = individual[currentMonth[i]].Start + "-" + individual[currentMonth[i]].End + "<br />";
                document.getElementById("schedule2").innerHTML = txt;
                check = true;
                break;
            }

        }
        if (!check) {
            document.getElementById("schedule1").innerHTML = "No time scheduled";
        }

        count = 0;

    });
    name.catch(function (error) {
        alert(error);
        return;
    });

    count = 0;
}
/*--------------- End of Connect personal schedule to each user --------------*/