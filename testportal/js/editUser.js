function loadPage() {
    getAllUsers();
}

var done = false;

var populate = document.getElementById("zoe");
//reads all users from firestore
function getAllUsers() {
    // return output =
    // [START get_all_users]
    db.collection("users").orderBy("nameDisplay").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(doc.data().nameDisplay);
            firebase.storage().ref().child(`images/${doc.data().info.photo}`).getDownloadURL().then(function (url) {
                var html = `<p><img src=${url}"><span>${doc.data().nameDisplay}</span><button onclick="view('${doc.id}')">View</button> <button>Delete</button></p>`;
                populate.insertAdjacentHTML("beforeend", html);
                //return;
            }).catch(function (error) {
                return error;
            })
        });
    });

}

//If the admin clicks on the edit button, gets the 
var editInfo = document.getElementById("editInfo");

function view(userId) {

    console.log(userId);
    editInfo.style.visibility = "visible";
    populateInfoEdit(userId);

    //Cancel the the edit button changes
    var cancelChanges = document.getElementById("cancelInfoChanges");
    cancelChanges.addEventListener("click", () => {
        document.getElementById("editInfo").style.visibility = "hidden";
    })
    if (!done) {
        var submitChanges = document.getElementById("submitInfoChanges");
        submitChanges.addEventListener("click", () => {
            console.log("submitted");
            submitInfoChanges(userId);
            done = true;

        })

    }

}


//connects to firebase and submits changes made by the admin
function submitInfoChanges(userId) {

    db.collection("users").doc(userId).update({
            "nameDisplay": document.getElementById("editName").value,
            "info.phoneNumber": document.getElementById("editPhone").value,
            "info.major": document.getElementById("editMajor").value,
            "info.track": document.getElementById("editTrack").value,
            "info.graduation": document.getElementById("editGradDate").value,
            "team": document.getElementById("editTeam").value,
            "info.email": document.getElementById("editEmail").value,
            "title": document.getElementById("editJobTitle").value,
            "info.speed": document.getElementById("editSpeed").value
        })
        .then(function () {
            console.log("Document successfully written!");
            window.location.reload();
        }).catch(function (error) {
            // An error happened.
        });
    editInfo.style.visibility = "hidden";
}

//populates the editor box
function populateInfoEdit(doc) {
    db.collection("users").doc(doc).get()
        .then(function (doc) {
            document.getElementById("nameForEdit").innerText = doc.data().nameDisplay + "'s Information";
            document.getElementById("editName").setAttribute("value", `${doc.data().nameDisplay}`);
            document.getElementById("editPhone").setAttribute("value", `${doc.data().info.phoneNumber}`);
            document.getElementById("editMajor").setAttribute("value", `${doc.data().info.major}`);
            var idTrack = doc.data().info.track;
            console.log(idTrack);
            document.getElementById(idTrack).setAttribute("selected", "selected");
            document.getElementById("editGradDate").setAttribute("value", `${doc.data().info.graduation}`);
            var idTeam = doc.data().team;
            console.log(idTeam);
            document.getElementById(idTeam).setAttribute("selected", "selected");
            document.getElementById("editEmail").setAttribute("value", `${doc.data().info.email}`);
            var idTitle = doc.data().title;
            console.log(idTitle);
            document.getElementById(idTitle).setAttribute("selected", "selected");
            document.getElementById("editSpeed").setAttribute("value", `${doc.data().info.speed}`);
        })
}