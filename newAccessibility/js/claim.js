// Initialize Firebase
var message = document.getElementById('message');

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = '';
        message.style.color = 'black';
    }, 10000);
}

function claimItem(docId) {
    var user = firebase.auth().currentUser;
    db.collection('users').where('name', "==", user.displayName).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var userData = doc.data();

                if (userData.role == "Techops" || userData.role == "Lead" || userData.role == "Admin") {
                    db.collection('accessibility').doc(docId).update({
                            transcriber: user.displayName,
                            status: "Transcript in Progress",
                            transcriptClaimed: new Date()
                        })
                        .then(function () {
                            window.location.replace('home.html');
                            // message.innerHTML = 'Request has been made.';
                            // message.style.color = 'blue';
                            // resetMessage();
                        })
                        .catch(function (error) {
                            console.error('Error updating document: ', error);
                            message.innerHTML = 'There was an error making the request. Please try again.';
                            message.style.color = 'red';
                            resetMessage();
                        });
                }

                if (userData.role == "Copyedit") {
                    db.collection('accessibility').doc(docId).get().then((doc) => {
                        var type = doc.data().type;

                        if (type == "Transcript" || type == "Slide" || type == "Audio") {
                            db.collection('accessibility').doc(docId).update({
                                    copyeditor: user.displayName,
                                    status: "Review in Progress",
                                    reviewClaimed: new Date()
                                })
                                .then(function () {
                                    window.location.replace('home.html');
                                    // message.innerHTML = 'Request has been made.';
                                    // message.style.color = 'blue';
                                    // resetMessage();
                                })
                                .catch(function (error) {
                                    console.error('Error updating document: ', error);
                                    message.innerHTML = 'There was an error making the request. Please try again.';
                                    message.style.color = 'red';
                                    resetMessage();
                                });
                        }

                        if (type == "Alt Text") {
                            db.collection('accessibility').doc(docId).update({
                                    copyeditor: user.displayName,
                                    status: "Transcript in Progress",
                                    copyeditClaimed: new Date()
                                })
                                .then(function () {
                                    window.location.replace('home.html');
                                    // message.innerHTML = 'Request has been made.';
                                    // message.style.color = 'blue';
                                    // resetMessage();
                                })
                                .catch(function (error) {
                                    console.error('Error updating document: ', error);
                                    message.innerHTML = 'There was an error making the request. Please try again.';
                                    message.style.color = 'red';
                                    resetMessage();
                                });
                        }
                    })
                }

            })
        })
}

function search() {
    document.getElementById('searchcancel').classList.remove('hide');
    var sVal = document.getElementById('searchValue').value; 
    var sType = document.getElementById('searchType').value;
    // when the user is looking for a transcript by the course code, brings whatever query inputed into capital letters, so it provides more accurate results, since the
    // course code for the transcripts are stored in capital letters. Ex: AUTO155 == AuTo155
    if (sType == 'courseCode') {
        sVal = sVal.toUpperCase();
    }

    document.getElementById('text').innerHTML = "";
    var adminQuery = 0;
    var copyQuery = 0;
    var techQuery = 0;

    db.collection('users').where('name', "==", firebase.auth().currentUser.displayName).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var userData = doc.data();
                if (userData.role == "Techops" || userData.role == "Lead") {
                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Transcript").where("type", "==", "Transcript").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().videoLength}</span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        techQuery += querySnapshot.size;
                    });

                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Transcript").where("type", "==", "Audio").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().videoLength}</span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        techQuery += querySnapshot.size;
                    });

                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Transcript").where("type", "==", "Slide").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span></span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        techQuery += querySnapshot.size;

                        if (techQuery == 0) {
                            message.innerHTML = 'No documents were found with that criteria';
                            message.style.color = 'red';
                            resetMessage();
                        }
                    });
                }

                if (userData.role == "Copyedit") {
                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Review").where("type", "==", "Transcript").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().videoLength}</span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        copyQuery += querySnapshot.size;
                    });

                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Review").where("type", "==", "Audio").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().videoLength}</span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        copyQuery += querySnapshot.size;
                    });

                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Review").where("type", "==", "Slide").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span></span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        copyQuery += querySnapshot.size;
                    });


                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Transcript").where("type", "==", "Alt Text").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span></span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        copyQuery += querySnapshot.size;

                        if (copyQuery == 0) {
                            message.innerHTML = 'No documents were found with that criteria';
                            message.style.color = 'red';
                            resetMessage();
                        }
                    });
                }

                if (userData.role == "Admin") {
                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Transcript").where("type", "==", "Transcript").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().videoLength}</span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        adminQuery += querySnapshot.size;
                    });

                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Transcript").where("type", "==", "Audio").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().videoLength}</span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        adminQuery += querySnapshot.size;
                    });

                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Review").where("type", "==", "Transcript").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().videoLength}</span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        adminQuery += querySnapshot.size;
                    });

                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Review").where("type", "==", "Audio").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span>${doc.data().videoLength}</span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        adminQuery += querySnapshot.size;
                    });

                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Transcript").where("type", "==", "Alt Text").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span></span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        adminQuery += querySnapshot.size;
                    });

                    db.collection("accessibility").where(sType, "==", sVal).where("status", "==", "Ready for Transcript").where("type", "==", "Slide").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(`${doc.id} => ${doc.data().title}`);
                            var text = `<span>${doc.data().courseCode}</span><span>${doc.data().priority}</span><span>${doc.data().status}</span><span>${doc.data().type}</span><span>${doc.data().title}</span><span></span><button onclick="claimItem('${doc.id}')">Claim</button>`;
                            document.getElementById('text').insertAdjacentHTML('beforeend', text);
                        });
                        adminQuery += querySnapshot.size;

                        if (adminQuery == 0) {
                            message.innerHTML = 'No documents were found with that criteria';
                            message.style.color = 'red';
                            resetMessage();
                        }
                    });
                }
            })
        });
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
    document.getElementById('searchValue').value = "";
    document.getElementById('searchType').options[0].selected = true;
});