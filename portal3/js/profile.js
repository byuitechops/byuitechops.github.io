/***********************************************************
* Profile.js Table of Conttents
* A. Team Points
********************************************************** */
const score = db.collection("team").doc('points');
const toolTip = document.getElementById("clock");
const toolTipBox = document.getElementById("toolTipBox");
const submitChanges = document.getElementById("submitInfoChanges");
const redeemConfirmBtn = document.getElementById("redeembtn");
const okBtn = document.getElementById("close");
const editBtn = document.getElementById("editContact");
const editDiv = document.getElementById("editInfo");
const redeemBtn = document.getElementById("redeem");
const redeemTool = document.getElementById("usingRedeem");
const cancelBtn = document.getElementById("cancel");
const hoursRedeemed = document.getElementById("resultRedeem");
const desiredTime = document.getElementById("timeDesired");
const confirmRedeem = document.getElementById("confirmRedeem");
var results = []; //will be used as part of the results for 
var birthdayPopulate;
var sameBirthday = true;
var doneUser = false;
var user = firebase.auth().currentUser;
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
            })
            score.collection('logs').doc(timeStamp).set({
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
}
function submitTeamPoints() {
    var setDate = editDate(new Date());
    var points = 0;
    var activityType = document.getElementById("pointsOptions").value;
    if (activityType == 'Contacting your lead, at least an hour before your scheduled shift, if you’re going to miss a shift or take time off') {
        points = 1;
    } else if (activityType == 'Checking in on time') {
        points = 1;
    } else if (activityType == 'Checked with a lead for a project') {
        points = 1;
    } else if (activityType == 'Checked out with a lead') {
        points = 1;
    } else if (activityType == 'Helping restock or shop for the store') {
        points = 1;
    } else if (activityType == 'Giving Devotional') {
        points = 1;
    } else if (activityType == 'First to react to a post on General or from your lead') {
        points = 1;
    } else if (activityType == 'Fridge cleaning') {
        points = 1;
    } else if (activityType == 'Coming to Thursday meetings') {
        points = 5;
    } else if (activityType == 'Winning office competitions (foosball, other activities)') {
        points = 10;
    } else if (activityType == 'Brought a treat to share with the office') {
        points = 5;
    } else if (activityType == 'Leading a PD event') {
        points = 1;
    } else if (activityType == 'Going to the FTC'){
        points = 5;
    } else if (activityType == "Filling up one water bottle"){
        points = 2;
    }

    updateTeamPoints(points, activityType, setDate);
}
function showResults() {
    console.log("Total = " + results[0]);
}
/***********************************************************
* B. Redeem Hours
************************************************************/
toolTip.addEventListener("click", () => {
    if (toolTipBox.style.visibility == "hidden") {
        toolTipBox.style.visibility = "visible";
    } else {
        toolTipBox.style.visibility = "hidden";
    }
})

//showing up the redeem tool
redeemBtn.addEventListener("click", () => {
    if (redeemTool.style.visibility == "hidden") {
        redeemTool.style.visibility = "visible";
        toolTipBox.style.visibility = "hidden";
    } else {
        redeemTool.style.visibility = "hidden";
    }
})

//when the user presses the "cancel" button, goes back to the screen
cancelBtn.addEventListener('click', () => {
    redeemTool.style.visibility = "hidden";
})

// when the user clicks the "redeem" button, it shows the confirm
redeemConfirmBtn.addEventListener('click', () => {
    redeemTool.style.visibility = "hidden";
    if (data.time.accumulatedTime < desiredTime.value) {
        redeemTool.style.visibility = "hidden";
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
            hoursRedeemed.innerText = "0" + desiredTime.value + ":00";
        } else {
            hoursRedeemed.innerText = desiredTime.value + ":00";
        }
        confirmRedeem.style.visibility = "visible";
    }
})

// When the use clicks ok close confirm
okBtn.addEventListener('click', () => {
    confirmRedeem.style.visibility = "hidden";
})


//allows the user to edit his/her information
editBtn.addEventListener("click", () => {
    editDiv.style.visibility = "visible";
    document.getElementById("displayBirthday").style.visibility = "visible";
    document.getElementById("editBirthdayMonth").style.visibility = "hidden";
    document.getElementById("editBirthdayDay").style.visibility = "hidden";
    populateInfoEdit();
})

/***********************************************************
* C. Sign Out
************************************************************/
//handles the sign out button
document.getElementById("signOutBtn").addEventListener("click", () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
})

// dropdown toggleView funcionality 

function toggleView() {
    var info = document.getElementById('info');
    var aboutMe = document.getElementById('aboutMe');
    var img = document.getElementById('arrowImg');
    // If info is shown
    if (info.style.height == "20%") {
        info.style.height = "0%";
        aboutMe.style.height = "60%";
        aboutMe.style.overflow = "auto";
        img.style.transform = "rotate(0deg)";
    } else {
        info.style.height = "20%";
        aboutMe.style.height = "40%";
        aboutMe.style.overflow = "hidden";
        img.style.transform = "rotate(180deg)";
    }
}

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
document.getElementById("displayBirthday").addEventListener("click", () => {
    document.getElementById("displayBirthday").style.visibility = "hidden";
    document.getElementById("editBirthdayMonth").style.visibility = "visible";
    document.getElementById("editBirthdayDay").style.visibility = "visible";
    sameBirthday = false;
})
//Loads the page with all user's information
function loadPage() {
    db.collection("team").doc('points').get()
        .then(function (doc) {
            results.push(doc.data().points);
        })
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
            }
            if (myData.storeManager == true) {
            }
        })
}
