// loads the page providing different information if the user is an admin/lead
function loadPage() {
    //gets and reads database, stores into a variable

    if (data.admin || data.lead) {
        document.getElementById('selectTeam').style.visibility = "initial";
        displayDay(new Date(), data.nameDisplay, userId);
    }
}

document.getElementById('dateInput').addEventListener('change', () => {
    document.getElementById('data').innerHTML = "";
    var team = document.getElementById('selectTeam').value;
    var date = document.getElementById('dateInput').value;
    if (team != "") {
        db.collection('users').where("team", "==", team).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    displayDay(new Date(`${date} 00:00:00`), doc.data().nameDisplay, doc.id);
                })
            })
    } else {
        // console.log(`${date} 00:00:00`);
        // console.log(new Date(`${date} 00:00:00`));
        displayDay(new Date(`${date} 00:00:00`), data.nameDisplay, userId);
    }

})

document.getElementById('selectTeam').addEventListener('change', () => {
    document.getElementById('data').innerHTML = "";
    var team = document.getElementById('selectTeam').value;
    var date = new Date();
    db.collection('users').where("team", "==", team).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                displayDay(date, doc.data().nameDisplay, doc.id);
            })
        })
})

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

function getWeek() {
    // if (new Date().getDay() != 1) {
    //     return;
    // }
    document.getElementById('data').innerHTML = "";
    var displayMonday = new Date(getPreviousMonday());
    var week = [];
    var date = displayMonday.getDate();
    for (var i = 0; i < 6; i++) {
        var newDate = date + i;
        var day = new Date(displayMonday.setDate(newDate));
        day.setHours(00, 00, 00);
        week.push(day);
    }

    db.collection('users').orderBy("name").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach((doc) => {
                document.getElementById('data').insertAdjacentHTML('beforeend', `<div id="${doc.data().nameDisplay}"> <h3>${doc.data().nameDisplay}</h3></div>`);
                for (var i = 0; i < week.length; i++) {
                    var dayNumber = new Date(week[i]).getDay();
                    document.getElementById(doc.data().nameDisplay).insertAdjacentHTML('beforeend', `<p>Day: ${days[dayNumber]}</p>`);
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
                    displayWeek(inputDay, week[i], doc);
                }
            })
        })
}

function displayWeek(inputDay, day, doc) {
    var timeEarned;
    var totalTimeWorked = 0;
    db.collection('users').doc(doc.id).collection("hoursWorked").where(firebase.firestore.FieldPath.documentId(), ">", inputDay).get()
    .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            if (doc.data().end != undefined) {
                var start = doc.data().start.split(":");
                var startTime = Number(start[0]) + Number(start[1] / 60);
                var end = doc.data().end.split(":");
                var endTime = Number(end[0]) + Number(end[1] / 60);
                totalTimeWorked = Number(totalTimeWorked) + Number((endTime - startTime).toFixed(2));

                console.log(day);
                console.log(Number((endTime - startTime).toFixed(2)));
            }
        })
        document.getElementById(doc.data().nameDisplay).insertAdjacentHTML('beforeend', `<p>Time Worked: ${totalTimeWorked}</p><p>Time Earned: ${timeEarned}</p>`);
    })
}

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function displayDay(date, name, nameId) {
    // console.log(date);
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
    // console.log(inputDay);

    db.collection("users").doc(nameId).collection("breaks").where(firebase.firestore.FieldPath.documentId(), ">", inputDay).get()
        .then(function (querySnapshot) {
            var totalBreak = 0;
            querySnapshot.docs.forEach(element => {
                if (element.data().end != undefined) {
                    var start = element.data().start.split(":");
                    var startTime = Number(start[0] * 60) + Number(start[1]);
                    var end = element.data().end.split(":");
                    var endTime = Number(end[0] * 60) + Number(end[1]);
                    totalBreak += (endTime - startTime);
                }
            });
            db.collection("users").doc(nameId).collection("hoursWorked").where(firebase.firestore.FieldPath.documentId(), ">", inputDay).get()
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
                    document.getElementById('data').insertAdjacentHTML('beforeend', `<span><b>Break Total:</b> ${totalBreak}</span>`);
                    document.getElementById('data').insertAdjacentHTML('beforeend', `<span><b>Time Total:</b> ${time[time.length - 1]}</span>`);

                    for (var i = 0; i < time.length - 1; i++) {
                        if (time[i][0] == undefined) {
                            time[i][0] = "Not clocked in";
                        }
                        if (time[i][1] == undefined) {
                            time[i][1] = "Not clocked out";
                        }

                        document.getElementById('data').insertAdjacentHTML('beforeend', `<p><span><b>Clocked In:</b> ${time[i][0]}</span><span><b>Clocked Out:</b> ${time[i][1]}</span></p>`);
                    }

                })
        })
}