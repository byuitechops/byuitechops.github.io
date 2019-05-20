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
                    if (doc.data().role == 'Copyedit' && doc.data().lead || doc.data().name == 'Lucas Wargha' || doc.data().name == 'Calvin Smoot') {
                        fillReviewStart();
                    } else  {
                        window.location.assign('home.html')
                    }
                        
                })
            })
    } else {
        //do nothing
    }
})

//fill the transcript table according to its status on firestore
function fillReviewStart() {
    document.getElementById('transcripts-table').innerHTML = '';
    db.collection("accessibility").where('status', '==', 'Review Completed').orderBy('priority').limit(10).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var p = `<p>${doc.data().courseCode}</p> 
                    <p>${doc.data().title}</p><p> <a href="${doc.data().srcURL}"target="_blank" >Media </a></p>   <p><a href="${doc.data().docEditURL}" target="_blank">Google Doc </a></p>  <p> ${doc.data().reviewer}</p> <button onclick="concludeTranscript('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                    Approve Review</button>`;
                document.getElementById('transcripts-table').insertAdjacentHTML('beforeend', p);
            })
        })
}


function fillTranscribeTable(selectedCourseCode) {
    document.getElementById('transcripts-table').innerHTML = '';
    db.collection("accessibility").where('status', '==', 'Review Completed').orderBy('priority').get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (selectedCourseCode == doc.data().courseCode) {
                    var p = ` <p>${doc.data().courseCode}</p> 
                        <p>${doc.data().title}</p><p> <a href="${doc.data().srcURL}"target="_blank" >Media </a></p> <p> <a href="${doc.data().docEditURL}"target="_blank" >Click Here </a></p> <p> ${doc.data().reviewer}</p>  <button onclick="concludeTranscript('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                        Approve Review</button>`;
                    document.getElementById('transcripts-table').insertAdjacentHTML('beforeend', p);
                } else {

                }
            })
        })
}


//handles event onclick of user requesting video to transcribe
function concludeTranscript(transcriptID) {
    db.collection('users').doc(userID[0]).update({
            currentAction: '',
            actionID: ''
        })
        //generates the table
        .then(() => {
            db.collection('accessibility').doc(transcriptID).update({
                    status: 'Finished',
                    reviewer: userName[0]
                })
                //updates the page so the user can now prepare the transcript
                .then(function () {
                    fillReviewStart();
                })
        })
}