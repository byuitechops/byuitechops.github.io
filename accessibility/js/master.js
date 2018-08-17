// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWv05RlAPUpAts6LNXgG5-wsdhd9jXafg",
    authDomain: "byui-accessability.firebaseapp.com",
    databaseURL: "https://byui-accessability.firebaseio.com",
    projectId: "byui-accessability",
    storageBucket: "byui-accessability.appspot.com",
    messagingSenderId: "275383619900"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = { /* your settings... */
    timestampsInSnapshots: true
};
db.settings(settings);


// Check if Logged In
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        db.collection('users').where('name', "==", user.displayName).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var userData = doc.data();
                    if (userData.role != "Copyedit") {
                        document.getElementById('place').classList.remove('hide');
                    }
                    if (userData.role == "Copyedit") {
                        window.location.assign('home.html');
                        document.getElementById('master').classList.remove('hide');
                    }
                    getData();
                })
            })
    } else {
        // No user is signed in.
        window.location.assign('home.html');
    }
});

var startNumber = 1;
// db.collection("accessibility").orderBy('title').limit(1).get().then(function (documentSnapshots) {
//     // Get the last visible document
//     startNumber = documentSnapshots.docs[documentSnapshots.docs.length-1];
//     console.log("last", startNumber);
// });

// Get Data
function getData() {
    db.collection("accessibility").orderBy('title').startAfter(startNumber).limit(10).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().title}`);

            var items = ["type", "title", "docURL", "courseCode"];

            for (var i = 0; i < items.length; i++) {
                var item;
                if (doc.data()[items[i]] == undefined) {
                    item = document.createElement('span');
                    item.innerHTML = "Empty";
                    item.style.color = "red";
                } else {
                    item = document.createElement('span');
                    item.innerHTML = doc.data()[items[i]];
                }
                document.getElementById('text').insertAdjacentElement('beforeend', item);
            }
            document.getElementById('text').insertAdjacentHTML('beforeend', `<button onclick="viewItem('${doc.id}')">View</button>`);
        });
        if (querySnapshot.docs[querySnapshot.docs.length - 1] == undefined) {
            document.getElementById('load').classList.add('hide');
        } else {
            startNumber = querySnapshot.docs[querySnapshot.docs.length - 1];
        }
    });
}

// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('docData').innerHTML = "";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('docData').innerHTML = "";
    }
}

function viewItem(docId) {
    modal.style.display = "block";

    db.collection("accessibility").doc(docId).get()
        .then((doc) => {
            // console.log(doc.data());

            if (doc.data().type == "Transcript") {
                var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsLink", "priority",
                    "requestor", "srcURL", "status", "transcriber", "videoHeight", "videoLength",
                    "week", "requestDate", "transcriptClaimed", "transcriptFinished", "reviewClaimed", "reviewFinished"
                ];

                for (var i = 0; i < items.length; i++) {
                    var p = document.createElement('p');
                    var item = document.createElement('span');
                    var title = items[i].charAt(0).toUpperCase() + items[i].slice(1);

                    if (doc.data()[items[i]] == undefined) {
                        item.innerHTML = ": Empty";
                        item.style.color = "red";
                    } else if (items[i] == "requestDate" || items[i] == "transcriptClaimed" || items[i] == "transcriptFinished" ||
                        items[i] == "reviewClaimed" || items[i] == "reviewFinished") {
                        var date = doc.data()[items[i]].toDate().toString().slice(0, -34);
                        item.innerHTML = `: ${date}`;
                    } else {
                        item.innerHTML = `: ${doc.data()[items[i]]}`;
                    }
                    document.getElementById('docData').insertAdjacentElement('beforeend', p);
                    p.insertAdjacentHTML('beforeend', `${title}`);
                    p.insertAdjacentElement('beforeend', item);
                    p.insertAdjacentHTML('beforeend', `<button onclick="editItem('${doc.id}', '${items[i]}', '${doc.data()[items[i]]}')">Edit</button>`);
                }
            }

            if (doc.data().type == "Alt Text") {
                console.log("Calling");
                var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsLink", "priority",
                    "requestor", "status", "week", "requestDate", "copyeditClaimed", "copyeditFinished"
                ];

                for (var i = 0; i < items.length; i++) {
                    var p = document.createElement('p');
                    var item = document.createElement('span');
                    var title = items[i].charAt(0).toUpperCase() + items[i].slice(1);

                    if (doc.data()[items[i]] == undefined) {
                        item.innerHTML = ": Empty";
                        item.style.color = "red";
                    } else if (items[i] == "requestDate" || items[i] == "copyeditClaimed" || items[i] == "copyeditFinished") {
                        var date = doc.data()[items[i]].toDate().toString().slice(0, -34);
                        item.innerHTML = `: ${date}`;
                    } else {
                        item.innerHTML = `: ${doc.data()[items[i]]}`;
                    }
                    document.getElementById('docData').insertAdjacentElement('beforeend', p);
                    p.insertAdjacentHTML('beforeend', `${title}`);
                    p.insertAdjacentElement('beforeend', item);
                    p.insertAdjacentHTML('beforeend', `<button onclick="editItem('${doc.id}', '${items[i]}', '${doc.data()[items[i]]}')">Edit</button>`);
                }
            }
        })
}

var message = document.getElementById('message');

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = '';
        message.style.color = 'black';
    }, 10000);
}

// Get the modal
var editModal = document.getElementById('editModal');
// Get the <span> element that closes the modal
var editSpan = document.getElementsByClassName("close")[1];
// When the user clicks on <span> (x), close the modal
editSpan.onclick = function () {
    editModal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == editModal) {
        editModal.style.display = "none";
    }
}

function editItem(id, item, value) {
    editModal.style.display = "block";
    document.getElementById('newValue').value = value;
    document.getElementById('editComplete').setAttribute('onclick', `editComplete('${id}', '${item}')`);
}

function editComplete(id, item) {
    // console.log(`ID: ${id}`);
    // console.log(`Item: ${item}`);
    var newField = document.getElementById('newValue').value;

    if (newField != "") {
        var json = JSON.parse(`{"${item}": "${newField}"}`);
        db.collection('accessibility').doc(id).update(json)
            .then(function () {
                console.log("Document successfully updated!");
                modal.style.display = "none";
                editModal.style.display = "none";
                document.getElementById('docData').innerHTML = "";
                message.innerHTML = 'Document has been updated.';
                message.style.color = 'blue';
                resetMessage();
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                modal.style.display = "none";
                editModal.style.display = "none";
                document.getElementById('docData').innerHTML = "";
                message.innerHTML = 'There was an error making the update. Please try again.';
                message.style.color = 'red';
                resetMessage();
            });
    } else {
        editModal.style.display = "none";
    }
}

function search() {
    document.getElementById('searchcancel').classList.remove('hide');

    var sVal = document.getElementById('searchValue').value;
    var sType = document.getElementById('searchType').value;
    // console.log(`sval: ${sVal}, sType: ${sType}`);

    db.collection('accessibility').where(sType, "==", sVal).get()
        .then((querySnapshot) => {
            document.getElementById('text').innerHTML = "";

            querySnapshot.forEach((doc) => {
                // console.log(`${doc.data().title} => ${doc.data().srcURL}`);

                var items = ["type", "title", "docURL", "courseCode"];

                for (var i = 0; i < items.length; i++) {
                    var item;
                    if (doc.data()[items[i]] == undefined) {
                        item = document.createElement('span');
                        item.innerHTML = "Empty";
                        item.style.color = "red";
                    } else {
                        item = document.createElement('span');
                        item.innerHTML = doc.data()[items[i]];
                    }
                    document.getElementById('text').insertAdjacentElement('beforeend', item);
                }
                document.getElementById('text').insertAdjacentHTML('beforeend', `<button onclick="viewItem('${doc.id}')">View</button>`);
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

document.getElementById('searchcancel').addEventListener('click', () => {
    document.getElementById('searchcancel').classList.add('hide');
    document.getElementById('text').innerHTML = "";
    document.getElementById('searchValue').value = "";
    document.getElementById('searchType').options[0].selected = true;
    startNumber = 1;
    getData();
});