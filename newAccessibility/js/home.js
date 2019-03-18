var userID = [];
var userName = [];
//checks if the user has actually finished a prep before starting another one + handles permission requirements
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //user is logged in
        db.collection('users').where('name', '==', user.displayName).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    userID.push(doc.id);
                    userName.push(doc.data().name);
                    if (doc.data().currentAction == 'transcribing') {
                        //user has a prep project that is unfinished
                        fillTranscriptBox(doc.data().actionID);
                        document.getElementById('transcript-not-found').classList.add('hide');
                    }
                    else if (doc.data().currentAction == 'reviewing') {
                        fillTranscriptBox(doc.data().actionID);
                        document.getElementById('btn-finish').innerText = 'Review Finished';
                        document.getElementById('verbitID-display').classList.add('hide');
                        document.getElementById('verbitLabel').classList.add('hide');
                    }
                })

            })
    }
})

function fillTranscriptBox(transcriptID) {
    document.getElementById('transcript-not-found').classList.add('hide');
    document.getElementById('transcript-found').classList.remove('hide');
    db.collection('accessibility').doc(transcriptID).get()
        .then(function (doc) {
            document.getElementById('updateTitle').innerText = doc.data().title;
            document.getElementById('updateCode').innerText = doc.data().courseCode;
            document.getElementById('updateTitle').innerText = doc.data().title;
            document.getElementById('updateDocLink').href = doc.data().docEditURL;
            document.getElementById('updateMediaLink').href = doc.data().srcURL;
            document.getElementById('btn-finish').value = transcriptID;
            document.getElementById('submit-report').value = transcriptID;
            document.getElementById('verbitID-display').innerText = doc.data().verbitID;
            // document.getElementById('addRequestNotes').innerText = `Request Notes: ${doc.data().requestNotes}`
        })

}


//handles the user click on the button finishing the transcript
function finalizeTranscript(transcriptID) {
    if (confirm("Are you sure you finished transcribing this project?")) {
        db.collection('users').doc(userID[0]).get()
        .then(function(doc) { 
            if (doc.data().currentAction == 'transcribing') {
                db.collection('users').doc(userID[0]).update({
                    currentAction: '',
                    actionID: ''
                })
                .then(() => {
                    db.collection('accessibility').doc(transcriptID).update({
                            status: 'Ready for Review',
                            dateTranscriptionFinished: new Date()
                        })
                        .then(() => {
                            window.location.reload();
                        })
    
                })
            }
            else if ((doc.data().currentAction == 'reviewing')) { 
                db.collection('users').doc(userID[0]).update({
                    currentAction: '',
                    actionID: ''
                })
                .then(() => {
                    db.collection('accessibility').doc(transcriptID).update({
                            status: 'Review Completed',
                            dateReviewFinished: new Date()
                        })
                        .then(() => {
                            window.location.reload();
                        })
                })
            }
        })
        

    } else {

    }
}

//handles the submission back to prep of a transcript
function sendBackPrep(transcriptID) {
    if (document.getElementById('problem-description').value == '') {
        alert('You must submit a reason why you are sending the course back to prep before proceding');
    } else {
        db.collection('users').doc(userID[0]).update({
                currentAction: '',
                actionID: ''
            })
            .then(function () {
                db.collection('accessibility').doc(transcriptID).update({
                    status: 'Ready for Prep',
                    returnToPrepNote: document.getElementById('problem-description').value + ".  Note Submitted by: " + userName[0]
                })
            })
            .then(() => {
                    window.location.reload()
                }

            )
    }
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
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//erases message that was displayed before
function resetMessage() {
    setTimeout(() => {
        message.innerHTML = "";
        message.style.color = "black";
    }, 10000);
}

