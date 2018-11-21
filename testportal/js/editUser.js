function loadPage() {
    getAllUsers();
}

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
            }).catch(function (error) {
                return error;
            })
        });
    });

}

//If the admin clicks on the edit button, gets the 
function view(id) {
    document.getElementById("editInfo").style.visibility = "visible";
    populateInfoEdit();
}

//populates the editor box
function populateInfoEdit() {
    db.collection("users").doc(userId).get()
        .then(function (doc) {
            document.getElementById("nameForEdit").innerText = doc.data().nameDisplay + "'s Information";
            document.getElementById("editName").setAttribute("value", `${doc.data().nameDisplay}`);
            document.getElementById("editPhone").setAttribute("value", `${doc.data().info.phoneNumber}`);
            document.getElementById("editMajor").setAttribute("value", `${doc.data().info.major}`);
            var idTrack = doc.data().info.track;
            console.log(idTrack);
            document.getElementById(idTrack).setAttribute("selected", "selected");
            document.getElementById("editGradDate").setAttribute("value", `${doc.data().info.graduation}`);
            document.getElementById("editTeam").setAttribute("value", `${doc.data().team}`);
            document.getElementById("editEmail").setAttribute("value", `${doc.data().info.email}`);
            document.getElementById("editJobTitle").setAttribute("value", `${doc.data().title}`);
            document.getElementById("editSpeed").setAttribute("value", `${doc.data().info.speed}`);
        })
}

//Cancel the the edit button changes
var cancelChanges = document.getElementById("cancelInfoChanges");
cancelChanges.addEventListener("click", () => {
    document.getElementById("editInfo").style.visibility = "hidden";
})

//connects to firebase and submits changes made by the admin
var user = firebase.auth().currentUser;
var submitChanges = document.getElementById("submitInfoChanges");
submitChanges.addEventListener("click", () => {

    db.collection("users").doc(userId).update({
            "nameDisplay": document.getElementById("editName").value,
            "info.phoneNumber": document.getElementById("editPhone").value,
            "info.major": document.getElementById("editMajor").value,
            "info.track": document.getElementById("editTrack").value,
            "info.graduation": document.getElementById("editGradDate").value,
            "team": document.getElementById("editTeam").value,
            "info.email": document.getElementById("editEmail").value,
            "job.title": document.getElementById("editJobTitle").value,
            "info.speed": document.getElementById("editSpeed").value
        })
        .then(function () {
            console.log("Document successfully written!");
                window.location.reload();
              }).catch(function(error) {
                // An error happened.
              });
              editDiv.style.visibility = "hidden";
        })
       
   