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

getCourses();
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
