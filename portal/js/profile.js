// dropdown toggleView funcionality 

function toggleView() {
    var info = document.getElementById('info');
    var aboutMe = document.getElementById('aboutMe');
    var img = document.getElementById('arrowImg');
    // If info is shown
    if (info.style.height == "20%") {
        info.style.height = "0%";
        aboutMe.style.height = "64%";
        aboutMe.style.overflow = "auto";
        img.style.transform = "rotate(0deg)";
    } else {
        info.style.height = "20%";
        aboutMe.style.height = "44%";
        aboutMe.style.overflow = "hidden";
        img.style.transform = "rotate(180deg)";
    }
}

//tool tip on click

var toolTip = document.getElementById("clock");
var toolTipBox = document.getElementById("toolTipBox");
toolTip.addEventListener("click", () => {

    if (toolTipBox.style.visibility == "hidden") {
        toolTipBox.style.visibility = "visible";
    } else {
        toolTipBox.style.visibility = "hidden";
    }

})

//showing up the redeem tool
var redeemBtn = document.getElementById("redeem");
var redeemTool = document.getElementById("usingRedeem");
redeemBtn.addEventListener("click", () => {

    if (redeemTool.style.visibility == "hidden") {
        redeemTool.style.visibility = "visible";
        toolTipBox.style.visibility = "hidden";
    } else {
        redeemTool.style.visibility = "hidden";
    }
})

//when the user presses the "cancel" button, goes back to the screen
var cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener('click', () => {
    redeemTool.style.visibility = "hidden";
})

// when the user clicks the "redeem" button, it shows the confirm
var redeemConfirmBtn = document.getElementById("redeembtn");
redeemConfirmBtn.addEventListener('click', () => {
    redeemTool.style.visibility = "hidden";
    var hoursRedeemed = document.getElementById("resultRedeem");


    if (data.time.accumulatedTime < document.getElementById("timeDesired").value) {
        redeemTool.style.visibility = "hidden";
        alert("You don't have enough accumulated hours to redeem the time desired");


    } else {

        db.collection("users").doc(userId).update({
                "time.accumulatedTime": Number(data.time.accumulatedTime) - Number(document.getElementById("timeDesired").value),
            })
            .then(function () {
                console.log("Document successfully written!");
                alert("User Updated Successfully");
                window.location.reload();
            }).catch(function (error) {
                // An error happened.
            });
        if (data.time.accumulatedTime < 10) {
            hoursRedeemed.innerText = "0" + document.getElementById("timeDesired").value + ":00";
        } else {
            hoursRedeemed.innerText = document.getElementById("timeDesired").value + ":00";
        }
        document.getElementById("confirmRedeem").style.visibility = "visible";

    }
})

// When the use clicks ok close confirm
var okBtn = document.getElementById("close");
okBtn.addEventListener('click', () => {
    document.getElementById("confirmRedeem").style.visibility = "hidden";
})


//allows the user to edit his/her information
var editBtn = document.getElementById("editContact");
var editDiv = document.getElementById("editInfo");
editBtn.addEventListener("click", () => {
    editDiv.style.visibility = "visible";
    document.getElementById("displayBirthday").style.visibility = "visible";
    document.getElementById("editBirthdayMonth").style.visibility = "hidden";
    document.getElementById("editBirthdayDay").style.visibility = "hidden";
    populateInfoEdit();
})

//sends to firebase info changes made by the user
// Initialize Firebase
var doneUser = false;
var user = firebase.auth().currentUser;
var submitChanges = document.getElementById("submitInfoChanges");
submitChanges.addEventListener("click", () => {
    if (!doneUser) {

        doneUser = true;
        if (!sameBirthday) {
            var birthday = `${document.getElementById("editBirthdayMonth").value} ${document.getElementById("editBirthdayDay").value}`;
        } else {
            var birthday = birthdayPopulate;
        }

        db.collection("users").doc(userId).update({
                "nameDisplay": document.getElementById("editName").value,
                "info.phoneNumber": document.getElementById("editPhone").value,
                "info.major": document.getElementById("editMajor").value,
                "info.track": document.getElementById("editTrack").value,
                "info.graduation": document.getElementById("editGradDate").value,
                "info.aboutMe": document.getElementById("editAboutMe").value,
                "info.birthday": birthday
            })
            .then(function () {
                console.log("Document successfully written!");
                alert("User Updated Successfully");
                window.location.reload();
            }).catch(function (error) {
                // An error happened.
            });
        editDiv.style.visibility = "hidden";
    }
})


var cancelChanges = document.getElementById("cancelInfoChanges");
cancelChanges.addEventListener("click", () => {
    editDiv.style.visibility = "hidden";
    document.getElementById('editTrack').style.visibility = "hidden";
    document.getElementById("displayBirthday").style.visibility = "hidden";
    document.getElementById("editBirthdayMonth").style.visibility = "hidden";
    document.getElementById("editBirthdayDay").style.visibility = "hidden";
})

//populates de input boxes with what we already have from the user
function populateInfoEdit() {
    db.collection("users").doc(userId).get()
        .then(function (doc) {
            var idTrack = doc.data().info.track;
            var selectTrack = document.getElementById("editTrack").selectedIndex;
            document.getElementById("editName").setAttribute("value", `${doc.data().nameDisplay}`);
            document.getElementById("editPhone").setAttribute("value", `${doc.data().info.phoneNumber}`);
            document.getElementById("editMajor").setAttribute("value", `${doc.data().info.major}`);
            //document.getElementById(idTrack).setAttribute("selected", "selected");
            document.getElementById("editTrack").style.visibility = "visible";
            if (idTrack == 'Winter/Spring') {
                document.getElementById("editTrack").selectedIndex = 0;
            } else if (idTrack == 'Spring/Fall') {
                document.getElementById("editTrack").selectedIndex = 1;
            } else if (idTrack == 'Fall/Winter') {
                document.getElementById("editTrack").selectedIndex = 2;
            } else if (idTrack == 'Year Round') {
                document.getElementById("editTrack").selectedIndex = 3;
            } else {
                document.getElementById("editTrack").selectedIndex = 0;
            }

            // document.getElementById("editTrack").setAttribute("value", `${doc.data().info.track}`);
            document.getElementById("editGradDate").setAttribute("value", `${doc.data().info.graduation}`);
            document.getElementById("editAboutMe").innerText = doc.data().info.aboutMe;
            document.getElementById("displayBirthday").setAttribute("value", `${doc.data().info.birthday}`);
        })
}

//handles the event listener for the birthday call
//if the birthday doesn't get changed, by the following event listener, then it will keep the same on firebase
var sameBirthday = true;

document.getElementById("displayBirthday").addEventListener("click", () => {
    document.getElementById("displayBirthday").style.visibility = "hidden";
    document.getElementById("editBirthdayMonth").style.visibility = "visible";
    document.getElementById("editBirthdayDay").style.visibility = "visible";
    sameBirthday = false;
})
//Loads the page with all user's information
var birthdayPopulate;
var results = []; //will be used as part of the results for 
function loadPage() {

    db.collection("teams").doc('canvas1').get()
        .then(function (doc) {
            results.push(doc.data().points);
            console.log(results);
        })


    db.collection("teams").doc('canvas2').get()
        .then(function (doc) {
            results.push(doc.data().points);
            console.log(results);
        })

    document.getElementById(theme).setAttribute('checked', true);
    var photo = data.info.photo;
    firebase.storage().ref().child(`profile/${photo}`).getDownloadURL().then(function (url) {
        document.getElementById(`profilePic`).setAttribute('src', url);
        //return;
    }).catch(function (error) {
        return error;
    });
    db.collection("users").doc(userId).get()
        .then(function (doc) {
            const myData = doc.data();
            document.getElementById("dbName").innerText = myData.nameDisplay;
            document.getElementById("dbTitle").innerText = "Title: " + myData.title;
            document.getElementById("dbTeam").innerText = "Team: " + myData.team;
            document.getElementById("dbPhone").innerText = "T: " + myData.info.phoneNumber;
            document.getElementById("dbEmail").innerText = "E-mail: " + myData.info.email;
            document.getElementById("dbMajor").innerText = "Major: " + myData.info.major;
            document.getElementById("dbTrack").innerText = "Track: " + myData.info.track;
            document.getElementById("dbGradDate").innerText = "Graduation Date: " + myData.info.graduation;
            //document.getElementById("dbTyping").innerText = "Typing Speed: " + myData.info.speed;
            document.getElementById("dbAboutMe").innerText = myData.info.aboutMe;
            document.getElementById("dbBirth").innerText = `Birthday: ` + myData.info.birthday;
            birthdayPopulate = myData.info.birthday;
            //fills in accumulated time
            if (data.time.accumulatedTime < 10) {
                document.getElementById("accumulated").innerText = "0" + myData.time.accumulatedTime + ":00";
                document.getElementById("redeemTime").innerText = "0" + myData.time.accumulatedTime + ":00";
            } else {
                document.getElementById("accumulated").innerText = myData.time.accumulatedTime + ":00";
                document.getElementById("redeemTime").innerText = myData.time.accumulatedTime + ":00";
            }


            //displays lead/admin tools only for the right people
            if (myData.admin || myData.title == "Project Lead") {
                document.getElementById("leadAdmin").style.visibility = "visible";
            }
        })
}

var doneEdit = false;

function changeViewMode(newTheme) {
    if (!doneEdit) {
        db.collection('users').doc(userId).update({
                viewMode: newTheme
            })
            .then(function () {
                console.log("Document successfully updated!");
                alert("User Updated Successfully");
                window.location.reload();
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}

//handles the sign out button
document.getElementById("signOutBtn").addEventListener("click", () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
})

function updateTeamPoints(pointsToAdd, activityType, timeStamp) {
    db.collection("users").doc(userId).get()
        .then(function (doc) {
            var team = doc.data().team.replace(" ", '').toLowerCase();
            var name = doc.data().nameDisplay;
            db.collection("teams").doc(team).get()
                .then(function (doc) {
                    var newPoints = doc.data().points += pointsToAdd;
                    db.collection("teams").doc(team).update({
                        points: newPoints
                    }).catch(function (error) {
                        alert('An error Ocurred, try updating the points again');
                    })
                    db.collection("teams").doc(team).collection('logs').doc(timeStamp).set({
                            "Activity Type": activityType,
                            "Points added": pointsToAdd,
                            "Date Added": timeStamp,
                            "Added by": name
                        })
                        .then(function () {
                            console.log("Document successfully written!");
                            alert("User Updated Successfully");
                            window.location.reload();
                        }).catch(function (error) {
                            // An error happened.
                        });
                })
        })
}


document.getElementById("completeTeamActivities").addEventListener('click', () => {
    document.getElementById("pointsOptions").setAttribute("class", "visible");
    document.getElementById("submitPoints").setAttribute("class", "visible");
})

function submitTeamPoints() {
    var setDate = editDate(new Date());
    var points = 0;
    var activityType = document.getElementById("pointsOptions").value;
    if (activityType == 'Checked in on time(sharp)') {
        points = 1;
    } else if (activityType == 'Checked with lead for a project') {
        points = 1;
    } else if (activityType == 'Helped restock/organize store') {
        points = 1;
    } else if (activityType == 'Giving Devotional') {
        points = 1;
    } else if (activityType == 'First to react to Posts on General') {
        points = 1;
    } else if (activityType == 'Cleaned the fridge') {
        points = 5;
    } else if (activityType == 'Came to Thursday meeting') {
        points = 5;
    } else if (activityType == 'Moved Trello cards on prep into dev. transition') {
        points = 1;
    } else if (activityType == 'Won an office competition') {
        points = 10;
    } else if (activityType == 'Beat Lucas on foosball (x100)') {
        points = 50;
    } else if (activityType == 'Brought a treat to share with the office') {
        points = 5;
    } else if (activityType == 'Checked out with lead concerning your project') {
        points = 1;
    }
        else if (activityType == 'Went to the FTC for Thursday Mtg') {
        points = 2;
    }

    updateTeamPoints(points, activityType, setDate);
}

function editDate(date) {
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var year = date.getFullYear();
    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var setDate = `${year}-${month}-${day} ${hour}:${minute}`;
    return setDate;
}

//this function gets each team's points and addes it to the html file previously created
function showResults() {
    document.getElementById("results").innerText = `Canvas 1 (Marvel) = ${results[0]} x Canvas 2 (DC) = ${results[1]} `
}