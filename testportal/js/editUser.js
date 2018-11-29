function loadPage() {
    getAllUsers();
    if (!data.admin) {
        window.location.replace('profile.html')
    }
}


var done = false;

var populate = document.getElementById("zoe");
//reads all users from firestore
function getAllUsers() {
    // return output =
    // [START get_all_users]
    db.collection("users").orderBy("nameDisplay").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data().nameDisplay);
            var html = `<p><img id="${(doc.data().nameDisplay).replace(/ /g, "")}pic"><span>${doc.data().nameDisplay}</span><button onclick="view('${doc.id}')">View</button> <button onclick="deleteUser('${doc.id}', '${doc.data().nameDisplay}')">Delete</button></p>`;
            populate.insertAdjacentHTML("beforeend", html);
            populateDiv(doc.data().info.photo, (doc.data().nameDisplay).replace(/ /g, ""));
        });
    });
}

function populateDiv(photo, name) {
    firebase.storage().ref().child(`profile/${photo}`).getDownloadURL().then(function (url) {
        document.getElementById(`${name}pic`).setAttribute('src', url);
        //return;
    }).catch(function (error) {
        return error;
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
        window.location.reload();
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

function deleteUser(id, name){
    var txt;
    if (confirm("Are you sure you want to delete the user " + name)) {
        var path = JSON.stringify(db.collection('users').doc(id));
        deleteAthPath(path);
    } else {
    }
}

/**
 * Call the 'recursiveDelete' callable function with a path to initiate
 * a server-side delete.
 */
function deleteAtPath(path) {
    var deleteFn = firebase.functions().httpsCallable('recursiveDelete');
    deleteFn({ path: path })
        .then(function(result) {
            console.log('Delete success: ' + JSON.stringify(result));
            window.replace.reload();
        })
        .catch(function(err) {
            console.log('Delete failed, see console,');
            console.warn(err);
        });
       
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