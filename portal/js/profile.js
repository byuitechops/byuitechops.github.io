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
const yayText = document.getElementById("yayText");

var results = []; //will be used as part of the results for 
var birthdayPopulate;
var sameBirthday = true;
var doneUser = false;
var user = firebase.auth().currentUser;
const dbPoints = db.collection("team").doc("points").collection("pointItems");

/***********************************************************
 * A. Team Points
 ************************************************************/
// A function to update the points. This is currently set up that the teams are working together
// There is a const written to shorten the code and make it more readable.
function updateTeamPoints(data, timeStamp) {
    score.get()
        .then(function (doc) {
            var newPoints = doc.data().points += data.points;
            score.update({
                points: newPoints
            }).catch(function (error) {
                alert('An error Ocurred, try updating the points again');
            });
            score.collection('logs').doc(timeStamp).set({
                "Activity Type": data.title,
                "Points added": data.points,
                "Date Added": timeStamp,
                "Added by": name
            }).then(() => {
                $(yayText).html("" + data.congrats);
                $.when(
                    $(yayPoints).fadeIn(400),
                    $(yayPoints).toggleClass('hide'),
                    $(yayPoints).delay(1200),
                    $(yayPoints).fadeOut(400)
                ).done(() => {
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
    dbPoints.get().then((stuff) => {
        stuff.forEach(item => {
            if (item.data().title == activityType) {
                updateTeamPoints(item.data(), setDate);
            }
        });
    });
}

function showResults() {
    console.log("Total = " + results[0]);
    $('#total').html(" Points: " + results[0]);
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
                        $.when($("#timeAdmin").removeClass('hide')).done(() => {
                            $("#editPoints").removeClass('hide');
                        })
                    }

                    // if (myData.storeManager || myData.admin || myData.webMaster) {
                    //     $.when($("#storeAdmin").removeClass('hide').done(() =>{}))
                    // }
                })
        })
    db.collection("team").doc('points').get()
        .then(function (doc) {
            results.push(doc.data().points);
        })
    dbPoints.get().then((stuff) => {
        stuff.forEach(item => {
            pointStart.insertAdjacentHTML("afterend", `<option>${item.data().title}</option>`)
        });
    });
}


/*****************************************************
 * Editing Points section section
 *****************************************************/
const mainDiv = document.getElementById('main-profile');
const pointsDiv = document.getElementById('admin-tool-points');
const addPointItem = document.getElementById('add-point-criteria');
const pointTable = document.getElementById('points-generate');
const pointsAside = document.getElementById('add-points-aside');
var submitNew,
    pointCancel,
    pointItem;


function editTeamPoints() {
    showResults();
    //checks if the user has correct permissions first
    if (data.admin) {
        $(mainDiv).addClass('hide');
        $(pointsDiv).removeClass('hide');
        dbPoints.get()
            .then(function (querySnapshot) {
                let html = `<tr>  
                                <th class="criteria">Criteria</th>
                                <th class="points">Points</th>
                                <th class="message">Message</th>
                            </tr>`;
                var grayRow = "grayYes";
                querySnapshot.forEach((doc) => {
                    var docData = `<tr class="${grayRow} goal" id="${doc.id}"><td class="criteria">${doc.data().title}</td>
                                   <td class="points">${doc.data().points}</td>
                                   <td class="message">${doc.data().congrats}</td></tr>`;
                    html += `${docData}`;
                    (grayRow === "grayYes") ? (grayRow = "grayNo") : (grayRow = "grayYes");
                })
                pointTable.insertAdjacentHTML('beforeend', html);
            });

    }
}

function pointAddItem() {
    let adding = `<div id="adding-point-item" class="adding-point-item">
                    <input type="text" id="theID" class="hide">
                    <input type="text" id="newTitle" placeholder="Title">
                    <input type="text" id="newCongrat" placeholder="Congrats">
                    <input type="text" id="newPoints" placeholder="points">
                    <button type="button" id="submitNew">Add Item</button>
                    <button type="button" id="cancel">Cancel</button>
                    <button type="button" id="delete">Delete</button>
                  </div>`
    submitNew = document.getElementById('submitNew');
    pointCancel = document.getElementById('cancel');
    pointsAside.insertAdjacentHTML('afterbegin', adding);
}
$(addPointItem).click(() => {
    let noDupe = document.getElementsByClassName("adding-point-item");
    if (noDupe.length == 0) {
        pointAddItem();
    } else {
        let remove = document.getElementById('adding-point-item');
        $(remove).remove();
        pointAddItem();
    }
});
$(document).on("click", "button", (event) => {
    if (event.target.id == "submitNew") {
        let item = document.getElementById('newTitle');
        item = $(item).val();
        let id;
        ($(theID).val() == "") ? (id = item) : (id = $(theID).val());
        let newPoint = document.getElementById('newPoints');
        newPoint = $(newPoint).val();
        let newCongo = document.getElementById('newCongrat');
        newCongo = $(newCongo).val();
        if (item != "" && newPoint != "" && newCongo != "") {
            dbPoints.doc(id).get().then((doc) => {
                if (!doc.exists) {
                    dbPoints.doc(item).set({
                        points: Number(newPoint),
                        congrats: newCongo,
                        title: item
                    });
                } else {
                    if (id == item){
                        dbPoints.doc(item).set({
                            points: Number(newPoint),
                            congrats: newCongo,
                            title: item
                        });
                    } else {
                        dbPoints.doc(id).delete();
                        dbPoints.doc(item).set({
                            points: Number(newPoint),
                            congrats: newCongo,
                            title: item
                        });
                    }
                    
                }
            }).then(() => {
                let remove = document.getElementById('adding-point-item');
                $(pointTable).empty();
                $(remove).remove();
                editTeamPoints();
            });
                

        }
    } else if (event.target.id == "cancel") {
        let remove = document.getElementById('adding-point-item');
        $(remove).remove();
        $(pointTable).empty();
        editTeamPoints()

    } else if (event.target.id == "delete") {
        let item = document.getElementById('newTitle');
        item = $(item).val();
        let id;
        ($(theID).val() == "") ? (id = item) : (id = $(theID).val());
        dbPoints.doc(id).delete().then(() => {
            let remove = document.getElementById('adding-point-item');
            $(pointTable).empty();
            $(remove).remove();
            editTeamPoints();
        });
    }
});

$(document).on("click", "tr", (event) => {
    let noDupe = document.getElementsByClassName("adding-point-item");
    if (noDupe.length == 0) {
        pointAddItem();
        let id = event.target.parentElement.id;
        console.log(id)
        let item = document.getElementById('newTitle');
        let newCongo = document.getElementById('newCongrat');
        let newPoint = document.getElementById('newPoints');
        let theID = document.getElementById('theID');
        dbPoints.doc(id).get().then((doc) => {
            $(item).val(doc.data().title);
            $(newPoint).val(doc.data().points);
            $(newCongo).val(doc.data().congrats);
            $(theID).val(doc.id);
        });
    } else {
        let remove = document.getElementById('adding-point-item');
        $(remove).remove();
        pointAddItem();
        let id = event.target.parentElement.id;
        console.log(id)
        let item = document.getElementById('newTitle');
        let newCongo = document.getElementById('newCongrat');
        let newPoint = document.getElementById('newPoints');
        let theID = document.getElementById('theID');
        dbPoints.doc(id).get().then((doc) => {
            $(item).val(doc.data().title);
            $(newPoint).val(doc.data().points);
            $(newCongo).val(doc.data().congrats);
            $(theID).val(doc.id);
        });
    }
});