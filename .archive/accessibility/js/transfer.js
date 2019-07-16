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

// Logout of firebase and website
document.getElementById('btnLogout').addEventListener('click', function () {
    firebase.auth().signOut();
});
// Check if Logged In
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        db.collection('users').where('name', "==", user.displayName).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var userData = doc.data();
                })
            })
    } else {
        // No user is signed in.
        window.location.assign('index.html');
    }
});
function getCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            var res = JSON.parse(this.responseText);
            var id = res._id;
            var newxhttp = new XMLHttpRequest();
            newxhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status === 200) {
                    var newres = JSON.parse(this.responseText);
                    for (var i = 0; i < newres.length; i++) {
                        var course = newres[i]['__catalogCourseId'];
                        document.getElementById('requestCourse').insertAdjacentHTML('beforeend', '<option value=\'' + course + '\'>' + course + '</option>');
                    }
                }
            };
            newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
            newxhttp.send();
        }
    };
    xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
    xhttp.send();
}

getCourses();


// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('docData').innerHTML = "";
    document.getElementById('deleteButton').innerHTML = "";
}
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('docData').innerHTML = "";
        document.getElementById('deleteButton').innerHTML = "";
    }
})

function viewItem(docId) {
    modal.style.display = "block";
    db.collection('users').where('name', "==", firebase.auth().currentUser.displayName).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var userData = doc.data();
                db.collection("accessibility").doc(docId).get()
                    .then((doc) => {
                        // console.log(doc.data());
                        console.log(doc.data())
                        if (doc.data().type == "Transcript") {
                            var items = ["type", "title", "docURL", "pubURL","courseCode", "copyeditor", "lmsURL", "priority",
                                "requestor", "srcURL", "status", "errorNote", "transcriber", "videoHeight", "videoLength",
                                "week", "requestDate", "transcriptClaimed", "transcriptFinished", "reviewClaimed", "reviewFinished", "placed"
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
                                if (userData.role != "Techops") {
                                    p.insertAdjacentHTML('beforeend', `<button onclick="editItem('${doc.id}', '${items[i]}', '${doc.data()[items[i]]}')">Edit</button>`);
                                }
                            }
                        }

                        if (doc.data().type == "Audio") {
                            var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsURL", "priority",
                                "requestor", "status", "transcriber", "videoLength",
                                "week", "requestDate", "transcriptClaimed", "transcriptFinished", "reviewClaimed", "reviewFinished", "placed"
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
                                if (userData.role != "Techops") {
                                    p.insertAdjacentHTML('beforeend', `<button onclick="editItem('${doc.id}', '${items[i]}', '${doc.data()[items[i]]}')">Edit</button>`);
                                }
                            }
                        }

                        if (doc.data().type == "Alt Text") {
                            // console.log("Calling");
                            var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsURL", "priority",
                                "requestor", "status", "week", "requestDate", "copyeditClaimed", "copyeditFinished", "placed"
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
                                if (userData.role != "Techops") {
                                    p.insertAdjacentHTML('beforeend', `<button onclick="editItem('${doc.id}', '${items[i]}', '${doc.data()[items[i]]}')">Edit</button>`);
                                }
                            }
                        }

                        if (doc.data().type == "Slide") {
                            // console.log("Calling");
                            var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsURL", "priority",
                                "requestor", "status", "week", "requestDate", "copyeditClaimed", "copyeditFinished", "placed"
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
                                if (userData.role != "Techops") {
                                    p.insertAdjacentHTML('beforeend', `<button onclick="editItem('${doc.id}', '${items[i]}', '${doc.data()[items[i]]}')">Edit</button>`);
                                }
                            }
                        }

                        if (userData.role != "Techops") {
                            document.getElementById('deleteButton').insertAdjacentHTML('afterbegin', `<button onclick="deleteDoc('${doc.id}')">Delete</button>`);
                        }
                    })
            })
            if (querySnapshot.size == 0) {
                message.innerHTML = 'No documents found with that criteria';
                message.style.color = 'red';
                resetMessage();
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

function deleteDoc(docId) {
    var r = confirm("Are you sure you want to delete this document");
    if (r == true) {
        db.collection("accessibility").doc(docId).delete().then(function () {
            console.log("Document successfully deleted!");
            modal.style.display = "none";
            search();
        }).catch(function (error) {
            alert("Error removing document: ", error);
        });
    } else {
        // Delete Cancelled
    }
}

function fillTranscriptTable(courseCode) {
    // console.log(`sval: ${sVal}, sType: ${sType}`);

    db.collection('accessibility').where('courseCode', "==", courseCode).where('transferCompleted','==', false).get()
        .then((querySnapshot) => {
            document.getElementById('text').innerHTML = "";
            document.getElementById('text').insertAdjacentHTML('beforeend', '<h3>Type</h3><h3>Status</h3><h3>Title</h3><h3>Doc Url</h3><h3>Course Code</h3><h3></h3>');
            document.getElementById('countId').innerText = "Count Remaining: " + querySnapshot.size;
            querySnapshot.forEach((doc) => {

                // console.log(`${doc.data().title} => ${doc.data().srcURL}`);

                var items = ["type", "title", "docURL", "courseCode"];

                for (var i = 0; i < items.length; i++) {
                    var item;
                    if (doc.data()[items[i]] == undefined) {
                        item = document.createElement('span');
                        item.innerHTML = "Empty";
                        item.style.color = "red";
                    } else if (items[i] == "docURL") {
                        item = document.createElement('span');
                        item2 = document.createElement('a');
                        item2.setAttribute('target', "_blank");
                        item2.setAttribute('href', doc.data()[items[i]])
                        item2.innerHTML = "Doc URL";
                        item.insertAdjacentElement("afterbegin", item2);
                    } else {
                        item = document.createElement('span');
                        item.innerHTML = doc.data()[items[i]];
                    }
                    document.getElementById('text').insertAdjacentElement('beforeend', item);
                }
                document.getElementById('text').insertAdjacentHTML('beforeend', `<button onclick="viewItem('${doc.id}')">View</button><button onclick="finishTransfer('${doc.id}', '${courseCode}')">Transfer Completed</button>`);
            })
            if (querySnapshot.size == 0) {
                message.innerHTML = 'No documents found with that criteria';
                message.style.color = 'red';
                resetMessage();
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

function finishTransfer(transcriptID, courseCode) { 
    console.log(transcriptID);
    db.collection('accessibility').doc(transcriptID).update({transferCompleted: true})
    .then(() => { 
        fillTranscriptTable(courseCode)
    })
    .then(()=> { 
        console.log('it worked');
    })
}


// function addTransferData() { 
//     db.collection('accessibility').get()
//     .then(function(querySnapshot) { 
//        querySnapshot.forEach(function(doc) { 
//            db.collection('accessibility').doc(doc.id).update({transferCompleted: false})
//            .then(()=> { 
//                console.log('updated');
//            })
//        })
//     })
//     .then(()=> { 
//         console.log('Updated all documents');
//     })
// }

// db.collection('accessibility').where('transferCompleted', '==', false).get()
// .then(function(querySnapshot) { 
//     console.log(querySnapshot.size);
// })
// .then(()=> { 
//     console.log('Updated all documents');
// })