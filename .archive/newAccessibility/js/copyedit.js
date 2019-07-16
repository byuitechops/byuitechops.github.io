getCourses();

var userID = [];
var userName = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //user is logged in
        db.collection('users').where('name', '==', user.displayName).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    userID.push(doc.id);
                    userName.push(doc.data().name);
                    if (doc.data().role == 'Copyedit' || doc.data().name == 'Lucas Wargha' || doc.data().name == 'Calvin Smoot') {
                        fillReviewStart();
                    } else {
                        window.location.assign('home.html');
                    }
                })
            })
    } else {
        //do nothing
    }
})

//fill the transcript table according to its status on firestore
function fillReviewStart() {

    db.collection("accessibility").where('status', '==', 'Ready for Review').orderBy('priority').limit(10).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var length;
                if (doc.data().length != undefined) { 
                    length = doc.data().length;
                } else { 
                    length = 'Not Applicable'
                }
                var p = `<p> ${doc.data().priority}</p> <p>${doc.data().backupCode}</p> <p>${doc.data().type}</p>
                    <p>${doc.data().title}</p>  <p>${length}</p> <button onclick="claimReview('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                    Review</button>`;
                document.getElementById('transcripts-table').insertAdjacentHTML('beforeend', p);
            })
        })
}


function fillTranscribeTable(selectedCourseCode) {
    document.getElementById('transcripts-table').innerHTML = '';
    db.collection("accessibility").where('status', '==', 'Ready for Review').where("backupCode", "==", selectedCourseCode).orderBy('priority').limit(10).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var length;
                if (doc.data().length != undefined) { 
                    length = doc.data().length;
                } else { 
                    length = 'Not Applicable'
                }
                if (selectedCourseCode == doc.data().backupCode) {
                    var p = `<p> ${doc.data().priority}</p> <p>${doc.data().backupCode}</p> <p>${doc.data().type}</p>
                        <p>${doc.data().title}</p> <p>${length}</p>  <button onclick="claimReview('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                        Prepare</button>`;
                    document.getElementById('transcripts-table').insertAdjacentHTML('beforeend', p);
                } else {

                }
            })
        })
}


//handles event onclick of user requesting video to transcribe
function claimReview(transcriptID) {
    db.collection('users').doc(userID[0]).update({
            currentAction: 'reviewing',
            actionID: transcriptID
        })
        //generates the table
        .then(() => {
            db.collection('accessibility').doc(transcriptID).update({
                    status: 'In Review',
                    reviewer: userName[0]
                })
                //updates the page so the user can now prepare the transcript
                .then(function () {
                    console.log('User retrived this project for reviewing');
                    window.location.replace('home.html');
                })
        })
}