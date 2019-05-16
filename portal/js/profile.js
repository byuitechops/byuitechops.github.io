/***********************************************************
 * Profile.js Table of Conttents
 * A. Team Points
 * B. Redeem Hours
 * C. Profile
 * D. Sign Out
 * E. Page Loader
 ********************************************************** */
const score = db.collection("team").doc('points');
const redeemClock = document.getElementById("clock");
const toolTipBox = document.getElementById("toolTipBox");
const submitChanges = document.getElementById("submitInfoChanges");
const redeemConfirmBtn = document.getElementById("redeemBtn2");
const okBtn = document.getElementById("close");
const editBtn = document.getElementById("editContact");
const editDiv = document.getElementById("editInfo");
const redeemBtn = document.getElementById("redeemBtn");
const cancelRedeemBtn = document.getElementById("cancelRedeemBtn");
const redeemTool = document.getElementById("usingRedeem");
const cancelBtn = document.getElementById("cancel");
const hoursRedeemed = document.getElementById("resultRedeem");
const desiredTime = document.getElementById("timeDesired");
const confirmRedeem = document.getElementById("confirmRedeem");
const info = document.getElementById('info');
const aboutMe = document.getElementById('aboutMe');
const img = document.getElementById('arrowImg');
const cancelChanges = document.getElementById("cancelInfoChanges");
const pointStart = document.getElementById("pointStart");
const yayPoints = document.getElementById("yay-points");

var results = []; //will be used as part of the results for 
var birthdayPopulate;
var sameBirthday = true;
var doneUser = false;
var user = firebase.auth().currentUser;
var whatEarnsPoints = [{
        "title": 'Contacting your lead, at least an hour before your scheduled shift, if you’re going to miss a shift or take time off',
        "points": 1
    },
    {
        "title": 'Checking in on time',
        "points": 1
    },
    {
        "title": 'Checked out with a lead',
        "points": 1
    },
    {
        "title": 'Checked with a lead for a project',
        "points": 1
    },
    {
        "title": 'Helping restock or shop for the store',
        "points": 1
    },
    {
        "title": 'Giving Devotional',
        "points": 1
    },
    {
        "title": 'First to react to a post on General or from your lead',
        "points": 1
    },
    {
        "title": 'Fridge cleaning',
        "points": 1
    },
    {
        "title": 'Coming to Thursday meetings',
        "points": 5
    },
    {
        "title": 'Winning office competitions (foosball, other activities)',
        "points": 10
    },
    {
        "title": 'Brought a treat to share with the office',
        "points": 5
    },
    {
        "title": 'Leading a PD event',
        "points": 1
    },
    {
        "title": 'Going to the FTC',
        "points": 5
    },
    {
        "title": 'Filling up one water bottle',
        "points": 2
    }
]
/***********************************************************
 * A. Team Points
 ************************************************************/
// A function to update the points. This is currently set up that the teams are working together
// There is a const written to shorten the code and make it more readable.
function updateTeamPoints(pointsToAdd, activityType, timeStamp) {
    score.get()
        .then(function (doc) {
            var newPoints = doc.data().points += pointsToAdd;
            score.update({
                points: newPoints
            }).catch(function (error) {
                alert('An error Ocurred, try updating the points again');
            });
            score.collection('logs').doc(timeStamp).set({
                    "Activity Type": activityType,
                    "Points added": pointsToAdd,
                    "Date Added": timeStamp,
                    "Added by": name
                }).then(() => {
                    $.when( $(yayPoints).fadeIn(400),
                            $(yayPoints).toggleClass('hide'),
                            $(yayPoints).delay(1200),
                            $(yayPoints).fadeOut(400)).done(() =>{
                        $(yayPoints).toggleClass('hide');
                        let activityType = document.getElementById("pointsOptions");
                        activityType.value = "start";
                }).catch((error) => {
                    console.log(error);
                });
        });
    });
}
function submitTeamPoints() {
    let activityType = document.getElementById("pointsOptions").value;
    let setDate = editDate(new Date());
    whatEarnsPoints.forEach(item => {
        if (item["title"] == activityType) {
            updateTeamPoints(item["points"], activityType, setDate);
        }
    });
}
function showResults() {
    console.log("Total = " + results[0]);
}


/***********************************************************
 * B. Redeem Hours
 ************************************************************/
$(redeemClock).click(() => {
    if ($(toolTipBox).hasClass("hide")) {
        $(toolTipBox).removeClass("hide");
    } else {
        $(toolTipBox).addClass("hide");
    }
})
//showing up the redeem tool
$(redeemBtn).click(() => {
    if ($(redeemTool).hasClass("hide")) {
        $(redeemTool).removeClass("hide");
        $(toolTipBox).addClass("hide");
    } else {
        $(redeemTool).addClass("hide");
    }
})
$(cancelRedeemBtn).click(() => {
    $(toolTipBox).toggleClass('hide');
})
//when the user presses the "cancel" button, goes back to the screen
$(cancelBtn).click(() => {
    $(redeemTool).addClass("hide");
})
// when the user clicks the "redeem" button, it shows the confirm
$(redeemConfirmBtn).click(() => {
    $(redeemTool).removeClass("hide");
    if (data.time.accumulatedTime < desiredTime.value) {
        $(redeemTool).removeClass("hide");
        alert("You don't have enough accumulated hours to redeem the time desired");
    } else {
        db.collection("users").doc(userId).update({
                "time.accumulatedTime": Number(data.time.accumulatedTime) - Math.round(Number(desiredTime.value)),
            })
            .then(function () {
                console.log("Document successfully written!");
                alert("User Updated Successfully");
                window.location.reload();
            }).catch(function (error) {
                // An error happened.
            });
        if (data.time.accumulatedTime < 10) {
            hoursRedeemed.innerHTML = "0" + desiredTime.value + ":00";
        } else {
            hoursRedeemed.innerHTML = desiredTime.value + ":00";
        }
        $(confirmRedeem).removeClass("hide");
    }
})
// When the use clicks ok close confirm
$(okBtn).click(() => {
    $(confirmRedeem).addClass("hide");
})
/***********************************************************
 * C. Profile
 ************************************************************/
//allows the user to edit his/her information
editBtn.addEventListener("click", () => {
    editDiv.classList.remove("hide");
    document.getElementById("displayBirthday").classList.remove("hide");
    document.getElementById("editBirthdayMonth").classList.add("hide");
    document.getElementById("editBirthdayDay").classList.add("hide");
    populateInfoEdit();
})
//sends to firebase info changes made by the user
// Initialize Firebase
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
        editDiv.classList.add("hide");
    }
})
cancelChanges.addEventListener("click", () => {
    editDiv.classList.add("hide");
    document.getElementById('editTrack').classList.add("hide");
    document.getElementById("displayBirthday").classList.add("hide");
    document.getElementById("editBirthdayMonth").classList.add("hide");
    document.getElementById("editBirthdayDay").classList.add("hide");
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
            document.getElementById("editTrack").classList.remove("hide");
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
            document.getElementById("editAboutMe").innerHTML = doc.data().info.aboutMe;
            document.getElementById("displayBirthday").setAttribute("value", `${doc.data().info.birthday}`);
        })
}
//handles the event listener for the birthday call
//if the birthday doesn't get changed, by the following event listener, then it will keep the same on firebase
document.getElementById("displayBirthday").addEventListener("click", () => {
    document.getElementById("displayBirthday").classList.add("hide");
    document.getElementById("editBirthdayMonth").classList.remove("hide");
    document.getElementById("editBirthdayDay").classList.remove("hide");
    sameBirthday = false;
})
/***********************************************************
 * D. Sign Out
 ************************************************************/
//handles the sign out button
document.getElementById("signOutBtn").addEventListener("click", () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
})
/***********************************************************
 * E. Page Loader
 ************************************************************/
function loadPage() {
    db.collection("users").where("name", "==", userName)
        .onSnapshot((querySnapshot) => {
            data = querySnapshot.docs[0].data();
            userId = querySnapshot.docs[0].id;
            preferance = data.viewMode;
            db.collection("users").doc(userId)
                .onSnapshot((querrySnapshot) => {
                    const myData = querrySnapshot.data();
                    document.getElementById("dbName").innerHTML = myData.nameDisplay;
                    document.getElementById("dbTitle").innerHTML = "Title: " + myData.title;
                    document.getElementById("dbTeam").innerHTML = "Team: " + myData.team;
                    document.getElementById("dbPhone").innerHTML = "T: " + myData.info.phoneNumber;
                    document.getElementById("dbEmail").innerHTML = "E-mail: " + myData.info.email;
                    document.getElementById("dbMajor").innerHTML = "Major: " + myData.info.major;
                    document.getElementById("dbTrack").innerHTML = "Track: " + myData.info.track;
                    document.getElementById("dbGradDate").innerHTML = "Graduation Date: " + myData.info.graduation;
                    //document.getElementById("dbTyping").innerHTML = "Typing Speed: " + myData.info.speed;
                    document.getElementById("dbAboutMe").innerHTML = myData.info.aboutMe;
                    document.getElementById("dbBirth").innerHTML = `Birthday: ` + myData.info.birthday;
                    birthdayPopulate = myData.info.birthday;
                    //fills in accumulated time
                    if (data.time.accumulatedTime < 10) {
                        document.getElementById("accumulated").innerHTML = "0" + myData.time.accumulatedTime + ":00";
                        document.getElementById("redeemTime").innerHTML = "0" + myData.time.accumulatedTime + ":00";
                    } else {
                        document.getElementById("accumulated").innerHTML = myData.time.accumulatedTime + ":00";
                        document.getElementById("redeemTime").innerHTML = myData.time.accumulatedTime + ":00";
                    }
                    //displays lead/admin tools only for the right people
                    if (myData.admin || myData.title == "Project Lead") {
                        $.when($("#timeAdmin").removeClass('hide')).done(() => {})
                    }
                })
        })
    db.collection("team").doc('points').get()
        .then(function (doc) {
            results.push(doc.data().points);
        })
    whatEarnsPoints.forEach(item => {
        pointStart.insertAdjacentHTML("afterend", `<option>${item["title"]}</option>`)
    });
}