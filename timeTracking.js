//------------------ Connect to Firebase -----------------------//
var config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};
firebase.initializeApp(config);


function showModal(num) {
    var ppl = firebase.database().ref('users/Cal Wilson/TimeClock/HoursWorked').once('value');
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
                count++;
            }
        }
        var check = false;
        for (var i = 0; i < monthDays.length; i++) {
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
                document.getElementById("modalText").innerHTML = txt;
                check = true;
                break;
            }
        }
        if (!check) {
            document.getElementById("modalText").innerHTML = "No time logged";
        }

        count = 0;
        //        for (var i = 1; i < 31 i++) {
        //            if (document.getElementById(i).value = currentMonth[count])
        //        }

    });
    ppl.catch(function (error) {
        alert(error);
        return;
    });

}

//("users/" + names + "/TimeClock/HoursWorked")
//base.getData
//---------------- End of Connect to Firebase ------------------//

//------------------ Calendar Functions ----------------------- //
function leapYear(year) {
    if (year % 4 == 0) // basic rule
        return true // is leap year
    /* else */ // else not needed when statement is "return"
    return false // is not leap year
}

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
//----------------- End Calendar Functions ----------------// 



function modalBox(number) {
    // Get the modal
    var num = number.getAttribute("value");
    var modal = document.getElementById('myModal');

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
