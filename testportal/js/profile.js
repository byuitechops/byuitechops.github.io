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
                window.location.reload();
            }).catch(function (error) {
                // An error happened.
            });
            if (data.time.accumulatedTime < 10){
                hoursRedeemed.innerText = "0" + document.getElementById("timeDesired").value + ":00";
            }
            else{
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
    populateInfoEdit();
})

//sends to firebase info changes made by the user
// Initialize Firebase

var user = firebase.auth().currentUser;
var submitChanges = document.getElementById("submitInfoChanges");
submitChanges.addEventListener("click", () => {

    db.collection("users").doc(userId).update({
            "nameDisplay": document.getElementById("editName").value,
            "info.phoneNumber": document.getElementById("editPhone").value,
            "info.major": document.getElementById("editMajor").value,
            "info.track": document.getElementById("editTrack").value,
            "info.graduation": document.getElementById("editGradDate").value,
            "info.aboutMe": document.getElementById("editAboutMe").value

        })
        .then(function () {
            console.log("Document successfully written!");
            window.location.reload();
        }).catch(function (error) {
            // An error happened.
        });
    editDiv.style.visibility = "hidden";
})


var cancelChanges = document.getElementById("cancelInfoChanges");
cancelChanges.addEventListener("click", () => {
    editDiv.style.visibility = "hidden";
})

//populates de input boxes with what we already have from the user
function populateInfoEdit() {
    db.collection("users").doc(userId).get()
        .then(function (doc) {
            document.getElementById("editName").setAttribute("value", `${doc.data().nameDisplay}`);
            document.getElementById("editPhone").setAttribute("value", `${doc.data().info.phoneNumber}`);
            document.getElementById("editMajor").setAttribute("value", `${doc.data().info.major}`);
            document.getElementById("editTrack").setAttribute("value", `${doc.data().info.track}`);
            document.getElementById("editGradDate").setAttribute("value", `${doc.data().info.graduation}`);
            document.getElementById("editAboutMe").innerText = doc.data().info.aboutMe;
        })
}

//Loads the page with all user's information
function loadPage() {
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
            document.getElementById("dbTyping").innerText = "Typing Speed: " + myData.info.speed;
            document.getElementById("dbAboutMe").innerText = myData.info.aboutMe;
            //fills in accumulated time
            if (data.time.accumulatedTime < 10){
                document.getElementById("accumulated").innerText = "0" + myData.time.accumulatedTime + ":00";
                document.getElementById("redeemTime").innerText = "0" + myData.time.accumulatedTime + ":00";
            }
            else{
                document.getElementById("accumulated").innerText = myData.time.accumulatedTime + ":00";
                document.getElementById("redeemTime").innerText =  myData.time.accumulatedTime + ":00";
            }
            

            //displays lead/admin tools only for the right people
            if (myData.admin) {
                document.getElementById("leadAdmin").style.visibility = "visible";
            }
        })
}

function changeViewMode(newTheme) {
    db.collection('users').doc(userId).update({
            viewMode: newTheme
        })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

}

//handles the sign out button
document.getElementById("signOutBtn").addEventListener("click", () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
})