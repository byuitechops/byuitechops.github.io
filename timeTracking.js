//------------------------------------- Connect to Firebase ----------------------------------//
var config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};
firebase.initializeApp(config);
/*------------------------------------ End of Connect to Firebase -------------------------------------*/



/*--------------------------------- Display current user's time logs ----------------------------------*/

/* Retrieves info from Firebase to display the current user's check ins and outs */
function showModal(num) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var user = firebase.auth().currentUser;
            console.log(user);
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
                        count++;
                    }
                }
                var check = false;

                for (var i = 0; i < monthDays.length; i++) {
                    if (num == monthDays[i + 1]) {
                        if (person[currentMonth[i + 1]].CommentIn == undefined) {
                            person[currentMonth[i + 1]].CommentIn = "N/A";
                        }
                        if (person[currentMonth[i + 1]].CommentOut == undefined) {
                            person[currentMonth[i + 1]].CommentOut = "N/A";
                        }
                        if (person[currentMonth[i + 1]].Out == undefined) {
                            person[currentMonth[i + 1]].Out = "N/A";
                        }
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
                if (!check) {
                    document.getElementById("modalText").innerHTML = "No time logged";
                }

                count = 0;

            });
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
                        count++;
                    }
                }
                var check = false;
                var txt = "";
                for (var i = 0; i < monthDays.length; i++) {
                    if (num < monthDays[i]) {
                        return;
                    }
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
    });
}
/*------------------------------ End of display current user's time logs ------------------------------*/



/*------------------------------ Connect personal time clock to each user -----------------------------*/

/* Describe what the function does */
function selectName(selected, num) {
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
        for (var i = 0; i < dates.length; i++) {
            if (document.getElementById("month-dropdown").value == dates[i][0]) {
                currentMonth[count] = dates[i];
                var firstDash = currentMonth[count].indexOf("-");
                var lastDash = currentMonth[count].lastIndexOf("-");
                monthDays[count] = currentMonth[count].slice(firstDash + 1, lastDash);
                count++;
            }
        }
        var check = false;
        var txt = "";
        for (var i = 0; i < monthDays.length; i++) {
            if (num < monthDays[i]) {
                return;
            }
            if (num == monthDays[i]) {
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
                break;
            }
            if (num == monthDays[i + 2]) {
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
                break;
            }
            if (num == monthDays[i + 4]) {
                if (individual[currentMonth[i + 3]].In == undefined) {
                    individual[currentMonth[i]].In = "N/A";
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
                break;
            }
            if (num == monthDays[i + 4]) {
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
}
/*-------------------------- End of Connect personal time clock to each user --------------------------*/



/*---------------------------------------- Calendar Functions ---------------------------------------- */

/* Describe what the function does */
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
    ar[1] = "January"
    ar[2] = "February"
    ar[3] = "March"
    ar[4] = "April"
    ar[5] = "May"
    ar[6] = "June"
    ar[7] = "July"
    ar[8] = "August"
    ar[9] = "September"
    ar[10] = "October"
    ar[11] = "November"
    ar[12] = "December"

    // return name of specified month (parameter)
    return ar[month]
}

/* Describe what the function does */
function setCal(sMonth) {
    // standard time attributes
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

/* Describe what the function does */
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
/*-------------------------------------- End Calendar Functions ---------------------------------------*/



/*----------------------------------- Start of Modal Boxes Function -----------------------------------*/

/* Describe what the function does */
function modalBox(number) {
    // Get the modal
    var num = number.getAttribute("value");
    var modal = document.getElementById('myModal');
    //    var selected = document.getElementById('name-dropdown');


    //    firebase.auth().onAuthStateChanged(function (user) {
    //        if (user) {
    //            firebase.database().ref('users/' + user.displayName).on('value', snapshot => {
    //                var currentUser = (snapshot.val());
    //                var i;
    //                for (i in currentUser) {
    //                    if ((i == 'TeamLead') || (i == 'Admin')) {
    //                        selectName(selected, num);
    //                    }
    //                }
    //            });
    //        }
    //    });


    showModal(num);

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
/*------------------------------------ End of Modal Boxes Function ------------------------------------*/



/*--------------------------------- Start of specific access Functions --------------------------------*/

/* Describe what the function does */
(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.database().ref('users/' + user.displayName).on('value', snapshot => {
                var currentUser = (snapshot.val());
                var i;
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

                    }
                }
            });

        } else {
            //            window.location = "index.html";
        }
    });
}());

/* Describe what the function does */
function selectTeam(selected) {
    var select = document.getElementById("name-dropdown");
    var length = select.options.length;
    for (var i = 0; i < length; i++) {
        select.options[1] = null;
    }
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
/*---------------------------------- End of specific access Functions ---------------------------------*/
