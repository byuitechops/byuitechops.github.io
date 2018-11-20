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

function view(id){
    alert(id);
}