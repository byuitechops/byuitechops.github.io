
//erases message that was displayed before
function resetMessage() {
    setTimeout(() => {
        message.innerHTML = "";
        message.style.color = "black";
    }, 10000);
}

// function getData(userData) {
//     // Get Data
//     if (userData.role == "Techops" || userData.role == "Lead" || userData.role == "Admin") {

function finishItem(docId) {
    var user = firebase.auth().currentUser;
    db.collection('users').where('name', "==", user.displayName).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var userData = doc.data();
                db.collection('accessibility').doc(docId).get().then((doc) => {
                    var type = doc.data().type;
                    if (userData.role == "Techops" || userData.role == "Lead" || userData.role == "Admin") {
                        db.collection('accessibility').doc(docId).update({
                                status: "Ready for Review",
                                transcriptFinished: new Date()
                            })
                            .then(function () {
                                window.location.replace('home.html');
                                message.innerHTML = 'Request has been made.';
                                message.style.color = 'blue';
                                resetMessage();
                            })
                            .catch(function (error) {
                                console.error('Error updating document: ', error);
                                message.innerHTML = 'There was an error making the request. Please try again.';
                                message.style.color = 'red';
                                resetMessage();
                            });
                    }

                    if (userData.role == "Copyedit") {
                        if (type == "Transcript") {
                            db.collection('accessibility').doc(docId).update({
                                    status: "Finished",
                                    reviewFinished: new Date()
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
                                    status: "Finished",
                                    copyeditFinished: new Date()
                                })
                                .then(function () {
                                    window.location.replace('home.html');
                                })
                                .catch(function (error) {
                                    console.error('Error updating document: ', error);
                                    message.innerHTML = 'There was an error making the request. Please try again.';
                                    message.style.color = 'red';
                                    resetMessage();
                                });
                        }
                    }
                })
            })
        })
}



var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("btn-report");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var submitReportBtn = document.getElementById('submit-report').addEventListener('click', () => {
    var note = document.getElementById('problem-description').value;
    // db.collection('accessibility').doc(docId).update({
    //     status: "Error",
    //     errorNote: note
    // }).then(() => {
    // })
    modal.style.display = "none";
})
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


