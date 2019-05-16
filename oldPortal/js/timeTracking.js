// loads the page providing different information if the user is an admin/lead
function loadPage() {
    //checks if the user has correct permissions first
    if (data.admin || data.lead) {
        //if it's a Monday, or day 1, selects calls for the function getWeek, which will
        //provide all the values for the whole last week until Sunday. (or Saturday, technically)
        document.getElementById('selectTeam').style.visibility = "initial";
        if (new Date().getDay() === 1) {
            getWeek();
            //if not a Monday, only displays the information for the current day
        } else {
            displayDay(new Date(), data.nameDisplay, userId);
        }
    }
}

//as the date input type is changed, sets responses to it accordingly
document.getElementById('dateInput').addEventListener('change', () => {
    document.getElementById('data').innerHTML = "";
    var team = document.getElementById('selectTeam').value;
    var date = document.getElementById('dateInput').value;
    //check to see if any team has already been selected



    
    if (team != "") {
        db.collection('users').where("team", "==", team).get()
            .then(function (querySnapshot) {
                //displays all team members' information for that day
                querySnapshot.forEach(function (doc) {
                    displayDay(new Date(`${date} 00:00:00`), doc.data().nameDisplay, doc.id);
                })
            })
    } else {
        //no team is selected, let's then display just the actual date for the actual user
        displayDay(new Date(`${date} 00:00:00`), data.nameDisplay, userId);
    }
})

//if the team input is changed, let's update the correct values for the correct teams
document.getElementById('selectTeam').addEventListener('change', () => {
    document.getElementById('data').innerHTML = "";
    var team = document.getElementById('selectTeam').value;
    var date = new Date();
    db.collection('users').where("team", "==", team).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                //display the current day's information for all team members that have any data
                displayDay(date, doc.data().nameDisplay, doc.id);
            })
        })
})

//checks for the actual day and checks to see when was the last Monday
function getPreviousMonday() {
    var date = new Date();
    var day = date.getDay();
    var prevMonday;
    if (date.getDay() == 1) {
        prevMonday = new Date().setDate(date.getDate() - 7);
    } else {
        prevMonday = new Date().setDate(date.getDate() - (day - 1));
    }
    return prevMonday;
}

//in case the date selected or the current date is a Monday, this function is called
//to get information for all days of the previous week until the monday before 
function getWeek() {
    document.getElementById('data').innerHTML = "";
    var displayMonday = new Date(getPreviousMonday());
    var week = [];
    var date = displayMonday.getDate();
    //creates a vector with days of the week, and populates it to a
    //default value of hours
    for (var i = 0; i < 6; i++) {
        var newDate = date + i;
        var day = new Date(displayMonday.setDate(newDate));
        day.setHours(00, 00, 00);
        week.push(day);
    }
    //pulls information from firebase user by user
    db.collection('users').orderBy("name").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach((doc) => {
                //creates a div with the id of the user and creates a h3 tag with the name of the user and 
                //calls the display week function.
                document.getElementById('data').insertAdjacentHTML('beforeend', `<div id="${doc.data().nameDisplay}"> <h3>${doc.data().nameDisplay}</h3></div>`);
                setTimeout(displayWeek(week, doc, doc.data().nameDisplay), 10000);
            })
        })
}

// will display the information for the week
function displayWeek(week, doc, name) {
    var timeEarned;
    var totalTimeWorked = 0;
    var dayCount = 0;
    //correctly formats each day of the previous week, which will be later displayed
    for (var i = 0; i < week.length; i++) {
        var year = week[i].getFullYear();
        var month = week[i].getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        var searchDay = week[i].getDate();
        if (searchDay < 10) {
            searchDay = `0${searchDay}`;
        }
        var inputDay = `${year}-${month}-${searchDay} 00:00`;
        db.collection('users').doc(doc.id).collection("hoursWorked").where(firebase.firestore.FieldPath.documentId(), ">", inputDay).get()
            .then(function (querySnapshot) {
                var key = 0;
                dayCount++
                if (querySnapshot.empty) {
                    totalTimeWorked = Number(totalTimeWorked) + Number(0);
                    if (week.length == dayCount) {
                        document.getElementById(name).insertAdjacentHTML('beforeend', `<p>Time Worked: ${totalTimeWorked.toFixed(2)} hours </p><p>Time Earned: ${timeEarned}</p> </br>`);
                    }
                }
                querySnapshot.forEach((doc) => {
                    key++;
                    if (doc.data().end != undefined) {
                        var start = doc.data().start.split(":");
                        var startTime = Number(start[0]) + Number(start[1] / 60);
                        var end = doc.data().end.split(":");
                        var endTime = Number(end[0]) + Number(end[1] / 60);
                        totalTimeWorked = Number(totalTimeWorked) + Number((endTime - startTime).toFixed(2));
                    }
                    if (Object.is(querySnapshot.size - 1, key) && (week.length == dayCount)) {
                        document.getElementById(name).insertAdjacentHTML('beforeend', `<p>Time Worked: ${totalTimeWorked.toFixed(2)} hours </p><p>Time Earned: ${timeEarned}</p> </br>`);
                    }
                })
            })
    }
}


var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//this function manages the display of an individual day for the user. It takes a date, a name, and a nameId
//to correctly access firebase and retrive the information
function displayDay(date, name, nameId) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    var day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    var inputDay = `${year}-${month}-${day} 00:00`;
    var finishDay = `${year}-${month}-${day} 23:59`;
    // console.log(inputDay);
    //from firebase, selects document with the current's day information
    db.collection("users").doc(nameId).collection("breaks").where(firebase.firestore.FieldPath.documentId(), ">", inputDay).where(firebase.firestore.FieldPath.documentId(), "<", finishDay).get()
        .then(function (querySnapshot) {
            var totalBreak = 0;
            //reads the snapshot of these documents and manipulate it to add a total break time
            querySnapshot.docs.forEach(element => {
                if (element.data().end != undefined) {
                    var start = element.data().start.split(":");
                    var startTime = Number(start[0] * 60) + Number(start[1]);
                    var end = element.data().end.split(":");
                    var endTime = Number(end[0] * 60) + Number(end[1]);
                    totalBreak += (endTime - startTime);
                }
            });
            db.collection("users").doc(nameId).collection("hoursWorked").where(firebase.firestore.FieldPath.documentId(), ">", inputDay).where(firebase.firestore.FieldPath.documentId(), "<", finishDay).get()
                .then(function (querySnapshot) {
                    var totalTimeWorked = 0;
                    var time = [];
                    querySnapshot.docs.forEach(element => {
                        time.push([element.data().start, element.data().end]);
                        if (element.data().end != undefined) {
                            var start = element.data().start.split(":");
                            var startTime = Number(start[0]) + Number(start[1] / 60);
                            var end = element.data().end.split(":");
                            var endTime = Number(end[0]) + Number(end[1] / 60);
                            totalTimeWorked = Number(totalTimeWorked) + Number((endTime - startTime).toFixed(2));
                        }
                    });
                    time.push(totalTimeWorked);

                    document.getElementById('data').insertAdjacentHTML('beforeend', `<h3>${name}</h3>`);
                    document.getElementById('data').insertAdjacentHTML('beforeend', `<span><b>Break Total:</b> ${totalBreak}</span> </br>`);
                    document.getElementById('data').insertAdjacentHTML('beforeend', `<span><b>Time Total:</b> ${time[time.length - 1]}</span> </br>`);

                    for (var i = 0; i < time.length - 1; i++) {
                        if (time[i][0] == undefined) {
                            time[i][0] = "Not clocked in";
                        }
                        if (time[i][1] == undefined) {
                            time[i][1] = "Not clocked out";
                        }

                        document.getElementById('data').insertAdjacentHTML('beforeend', `<p><span><b>Clocked In:</b> ${time[i][0]}</span> <span><b>Clocked Out:</b> ${time[i][1]}</span></p>`);
                        if ((i + 2) == time.length) {
                            document.getElementById('data').insertAdjacentHTML('beforeend', `</br>`);
                        }

                    }
                    if (time.length == 1) {
                        document.getElementById('data').insertAdjacentHTML('beforeend', `<p><span><b>Clocked In:</b> Not Clocked In</span> <span><b>Clocked Out:</b> Not Clocked Out</span></p></br>`);
                    }

                })
        })
}