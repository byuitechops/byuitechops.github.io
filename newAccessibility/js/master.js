
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

                        if (doc.data().type == "Transcript") {
                            var items = ["type", "title", "docURL", "pubURL","courseCode", "copyeditor", "lmsLink", "priority",
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
                            var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsLink", "priority",
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
                            var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsLink", "priority",
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
                            var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsLink", "priority",
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

function search() {
    document.getElementById('searchcancel').classList.remove('hide');

    var sVal = document.getElementById('searchValue').value;
    var sType = document.getElementById('searchType').value;
    // console.log(`sval: ${sVal}, sType: ${sType}`);

    db.collection('accessibility').where(sType, "==", sVal).get()
        .then((querySnapshot) => {
            document.getElementById('text').innerHTML = "";
            document.getElementById('text').insertAdjacentHTML('beforeend', '<h3>Type</h3><h3>Status</h3><h3>Title</h3><h3>Doc Url</h3><h3>Course Code</h3><h3></h3>');

            querySnapshot.forEach((doc) => {
                // console.log(`${doc.data().title} => ${doc.data().srcURL}`);

                var items = ["type", "status", "title", "docURL", "courseCode"];

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
                document.getElementById('text').insertAdjacentHTML('beforeend', `<button onclick="viewItem('${doc.id}')">View</button>`);
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

document.getElementById('searchValue').addEventListener("keyup", function () {
    event.preventDefault();
    if (event.keyCode === 13) {
        search();
    }
});



document.getElementById('searchcancel').addEventListener('click', () => {
    document.getElementById('searchcancel').classList.add('hide');
    document.getElementById('text').innerHTML = "";
    document.getElementById('text').insertAdjacentHTML('beforeend', '<h3>Type</h3><h3>Status</h3><h3>Title</h3><h3>Doc Url</h3><h3>Course Code</h3><h3></h3>');
    document.getElementById('searchValue').value = "";
    document.getElementById('searchType').options[0].selected = true;
});