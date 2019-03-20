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
                    if (doc.data().role == 'Copyedit') {
                        window.location.assign('home.html');
                    }
                    if (doc.data().currentAction == 'preparing' || doc.data().currentAction == 'transcribing') {
                        //user has a prep project that is unfinished
                        alert('Please, finish preparing or transcribing transcript before claiming another one for transcription');
                        if (doc.data().currentAction == 'preparing') {
                            window.location.replace('prepare.html')
                        } else {
                            window.location.replace('home.html');
                        }
                    } else { //user doesn't have any projects, we will let him choose one
                        fillTranscribeTableStart();
                    }
                })

            })
    } else {
        //do nothing
    }
})

//fill the transcript table according to its status on firestore
function fillTranscribeTableStart() {
    db.collection("accessibility").where('status', '==', 'Ready for Transcription').orderBy('priority').get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var p = `<p> ${doc.data().priority}</p> <p>${doc.data().courseCode}</p> <p>${doc.data().type}</p>
                    <p>${doc.data().title}</p>  <button onclick="claimTranscription('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                    Transcribe</button>`;
                document.getElementById('transcripts-table').insertAdjacentHTML('beforeend', p);
            })
        })
}


function fillTranscribeTable(selectedCourseCode) {
    document.getElementById('transcripts-table').innerHTML = '';
    db.collection("accessibility").where('status', '==', 'Ready for Transcription').orderBy('priority').get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (selectedCourseCode == doc.data().courseCode) {
                    var p = `<p> ${doc.data().priority}</p> <p>${doc.data().courseCode}</p> <p>${doc.data().type}</p>
                        <p>${doc.data().title}</p>  <button onclick="claimTranscription('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                        Transcribe</button>`;
                    document.getElementById('transcripts-table').insertAdjacentHTML('beforeend', p);
                } else {

                }
            })
        })
}


//handles event onclick of user requesting video to transcribe
function claimTranscription(transcriptID) {
    db.collection('users').doc(userID[0]).update({
            currentAction: 'transcribing',
            actionID: transcriptID
        })
        //generates the table
        .then(() => {
            db.collection('accessibility').doc(transcriptID).update({
                    status: 'In Transcription',
                    transcriber: userName[0]
                })
                //updates the page so the user can now prepare the transcript
                .then(function () {
                    console.log('User retrived this project for transcription');
                    window.location.replace('home.html');
                })
        })
}

getCourses();
//get courses for the dropdown through xmlh request
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