// loads the page providing different information if the user is an admin/lead
function loadPage() {
    //gets and reads database, stores into a variable
    db.collection("users").doc(userId).get()
        .then(function (doc) {
            const myData = doc.data();
            if (!myData.admin) {
                window.location.replace('home.html');
            }
        })
}

function displayDay(date, name) {
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
    db.collection("users").doc(userId).collection("breaks").where(firebase.firestore.FieldPath.documentId(), ">", inputDay).get()
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
            db.collection("users").doc(userId).collection("hoursWorked").where(firebase.firestore.FieldPath.documentId(), ">", inputDay).get()
                .then(function (querySnapshot) {
                    var totalTimeWorked = 0;
                    var time = [];
                    querySnapshot.docs.forEach(element => {
                        time.push([element.data().start, element.data().end]);
                        if (element.data().end != undefined) {
                            var start = element.data().start.split(":");
                            var startTime = Number(start[0] * 60) + Number(start[1]);
                            var end = element.data().end.split(":");
                            var endTime = Number(end[0] * 60) + Number(end[1]);
                            totalTimeWorked += (endTime - startTime);
                        }
                    });
                    time.push(totalTimeWorked);
                    document.getElementById('data').insertAdjacentHTML('afterbegin', name);
                    document.getElementById('data').insertAdjacentHTML('afterbegin', `Break Total ${totalBreak}`);
                })
        })
}