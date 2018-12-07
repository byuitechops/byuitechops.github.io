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
            querySnapshot.forEach(function(doc) {
                displayDay(new Date(`${date} 00:00:00`), doc.data().nameDisplay, doc.id);
            })
        })
    } else {
        console.log(`${date} 00:00:00`);
        console.log(new Date(`${date} 00:00:00`));
        displayDay(new Date(`${date} 00:00:00`), data.nameDisplay, userId);
    }

})

document.getElementById('selectTeam').addEventListener('change', () => {
    document.getElementById('data').innerHTML = "";
    var team = document.getElementById('selectTeam').value;
    var date = new Date();
    db.collection('users').where("team", "==", team).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                displayDay(date, doc.data().nameDisplay, doc.id);
            })
        })
})

function displayDay(date, name, nameId) {
    console.log(date);
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
    console.log(inputDay);

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