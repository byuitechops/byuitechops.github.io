// Initialize Firebase
var config = {
    apiKey: 'AIzaSyBWv05RlAPUpAts6LNXgG5-wsdhd9jXafg',
    authDomain: 'byui-accessability.firebaseapp.com',
    databaseURL: 'https://byui-accessability.firebaseio.com',
    projectId: 'byui-accessability',
    storageBucket: 'byui-accessability.appspot.com',
    messagingSenderId: '275383619900'
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
                    if (userData.role == "Admin") {
                        document.getElementById('master').classList.remove('hide');
                    }
                })
            })
    } else {
        // No user is signed in.
        window.location.assign('index.html');
    }
});

getCourses();

var message = document.getElementById('message');

document.getElementById('requestType').addEventListener('change', function () {
    if (document.getElementById('requestType').value === 'Transcript') {
        document.getElementById('requestVideoURLLabel').classList.remove('hide');
        document.getElementById('requestVideoURL').classList.remove('hide');
        document.getElementById('requestLengthLabel').classList.remove('hide');
        document.getElementById('requestLength').classList.remove('hide');
        document.getElementById('requestHeightLabel').classList.remove('hide');
        document.getElementById('requestHeight').classList.remove('hide');
        document.getElementById('timeCalc').classList.remove('hide');
    } else {
        document.getElementById('requestVideoURLLabel').classList.add('hide');
        document.getElementById('requestVideoURL').classList.add('hide');
        document.getElementById('requestLengthLabel').classList.add('hide');
        document.getElementById('requestLength').classList.add('hide');
        document.getElementById('requestHeightLabel').classList.add('hide');
        document.getElementById('requestHeight').classList.add('hide');
        document.getElementById('timeCalc').classList.add('hide');
    }
});

document.getElementById('requestSubmit').addEventListener('click', function () {
    var requestType = document.getElementById('requestType').value;
    var title = document.getElementById('requestTitle').value;
    var priority = document.getElementById('requestPriority').value;
    var course = document.getElementById('requestCourse').value;
    var lmsURL = document.getElementById('requestLMSURL').value;
    var week = document.getElementById('requestWeek').value;
    var srcURL = document.getElementById('requestVideoURL').value;
    var videoLength = document.getElementById('requestLength').value;
    var videoHeight = document.getElementById('requestHeight').value;

    if (requestType === 'Request Type' || title === '' || priority === 'Priority' || course === 'Course' || lmsURL === '' ||
        week === 'Week') {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else if (requestType === 'Transcript' && (srcURL === '' || videoLength === '' || videoHeight === '')) {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else {
        var user = firebase.auth().currentUser;

        if (requestType == "Transcript") {
            var docData = {
                title: title,
                type: requestType,
                priority: priority,
                courseCode: course,
                lmsURL: lmsURL,
                week: week,
                requestor: user.displayName,
                requestDate: new Date(),
                status: 'Ready for Transcript',
                srcURL: srcURL,
                videoLength: videoLength,
                videoHeight: videoHeight
            }
        }

        if (requestType == "Alt Text") {
            var docData = {
                title: title,
                type: requestType,
                priority: priority,
                courseCode: course,
                lmsURL: lmsURL,
                week: week,
                requestor: user.displayName,
                requestDate: new Date(),
                status: 'Ready for Transcript'
            }
        }

        // Add a new document in collection "accessibility"
        db.collection('accessibility').add(docData)
            .then(function (docRef) {
                console.log('Document written with ID: ', docRef.id);
                message.innerHTML = 'Request has been made.';
                message.style.color = 'blue';
                resetMessage();

                var elems = document.getElementsByClassName('prev');

                for (var i = 0; i < elems.length; i++) {
                    elems[i].classList.replace('row-13', 'hide');
                    elems[i].classList.replace('row-12', 'row-13');
                    elems[i].classList.replace('row-11', 'row-12');
                    elems[i].classList.replace('row-10', 'row-11');
                    elems[i].classList.replace('row-9', 'row-10');
                    elems[i].classList.replace('row-8', 'row-9');
                    elems[i].classList.replace('row-7', 'row-8');
                    elems[i].classList.replace('row-6', 'row-7');
                }

                // var prev = [requestType, course, title, priority, lmsURL, week, srcURL, videoLength];
                var prev = [videoHeight, videoLength, srcURL, week, lmsURL, priority, title, course, requestType];

                for (var i = 0; i < 9; i++) {
                   var elem = document.createElement('input');
                   elem.value = prev[i];
                   elem.classList.add('row-6');
                   elem.classList.add('prev');
                   document.getElementById('prevRequest').insertAdjacentElement('afterend', elem);
                }
                
                document.getElementById('requestType').options[0].selected = 'selected';
                document.getElementById('requestCourse').options[0].selected = 'selected';
                document.getElementById('requestTitle').value = '';
                document.getElementById('requestPriority').options[0].selected = 'selected';
                document.getElementById('requestLMSURL').value = '';
                document.getElementById('requestWeek').options[0].selected = 'selected';
                document.getElementById('requestVideoURL').value = '';
                document.getElementById('requestLength').value = '';
                document.getElementById('requestHeight').value = '';
                document.getElementById('requestVideoURLLabel').classList.add('hide');
                document.getElementById('requestVideoURL').classList.add('hide');
                document.getElementById('requestLengthLabel').classList.add('hide');
                document.getElementById('requestLength').classList.add('hide');
                document.getElementById('requestHeightLabel').classList.add('hide');
                document.getElementById('requestHeight').classList.add('hide');
                document.getElementById('timeCalc').classList.add('hide');
            })
            .catch(function (error) {
                console.error('Error adding document: ', error);
                message.innerHTML = 'There was an error making the request. Please try again.';
                message.style.color = 'red';
                resetMessage();
            });
    }
});

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = '';
        message.style.color = 'black';
    }, 10000);
}

// Logout of firebase and website
document.getElementById('btnLogout').addEventListener('click', function () {
    firebase.auth().signOut();
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

// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
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

document.getElementById('timeCalc').addEventListener('click', function() {
    modal.style.display = "block";
});

function calculateTotal() {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var total = 0;
    var data = document.getElementsByName("cb");
    for (var i = 0; i < 5; i++) {
        hours = document.getElementById("hours" + i).value;
        minutes = document.getElementById("minutes" + i).value;
        seconds = document.getElementById("seconds" + i).value;
        if (hours == "" && minutes == "" && seconds == "") {
            document.getElementById("total" + i).value = "";
            continue;
        }
        if (hours == "") {
            hours = 0;
        }
        if (minutes == "") {
            minutes = 0;
        }
        if (seconds == "") {
            seconds = 0;
        }
        if (hours < 0 || minutes < 0 || seconds < 0) {
            document.getElementById("total" + i).value = "NaN";
            continue;
        }
        if (seconds >= 60 && seconds <= 1000000) {
            while (seconds >= 60) {
                minutes++;
                seconds -= 60;
            }
            document.getElementById("seconds" + i).value = seconds;
            document.getElementById("minutes" + i).value = minutes;
        }
        if (minutes >= 60 && minutes <= 1000000) {
            while (minutes >= 60) {
                hours++;
                minutes -= 60;
            }
            document.getElementById("minutes" + i).value = minutes;
            document.getElementById("hours" + i).value = hours;
        }
        total = (hours * 60 * 60) + (minutes * 60) + (seconds * 1);
        if (total === 0) {
            total = "";
            document.getElementById("total" + i).value = total;
            continue;
        }
        document.getElementById("total" + i).value = total;
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].checked) {
            calculateCheckBoxTotal();
        }
    }
};

function calculateCheckBoxTotal() {
    var totalHours = 0;
    var totalMinutes = 0;
    var totalSeconds = 0;
    var granTotal = 0;
    var test = true;
    var data = document.getElementsByName("cb");
    for (var i = 0; i < data.length; i++) {
        if (data[i].checked) {
            totalHours += document.getElementById("hours" + i).value * 1;
            totalMinutes += document.getElementById("minutes" + i).value * 1;
            totalSeconds += document.getElementById("seconds" + i).value * 1;
            test = false;
        }
    }
    if (test) {
        document.getElementById("totalSeconds").value = "";
        document.getElementById("totalMinutes").value = "";
        document.getElementById("totalHours").value = "";
        document.getElementById("granTotal").value = "";
        return;
    }
    if (totalHours < 0 || totalMinutes < 0 || totalSeconds < 0) {
        document.getElementById("granTotal").value = "NaN";
        return;
    }
    if (totalHours == "" && totalMinutes == "" && totalSeconds == "") {
        return;
    }
    document.getElementById("totalSeconds").value = totalSeconds * 1;
    document.getElementById("totalMinutes").value = totalMinutes * 1;
    document.getElementById("totalHours").value = totalHours * 1;
    granTotal = (totalHours * 60 * 60) + (totalMinutes * 60) + (totalSeconds * 1);
    if (granTotal === 0) {
        granTotal = "";
        document.getElementById("granTotal").value = granTotal;
        document.getElementById("totalSeconds").value = "";
        document.getElementById("totalMinutes").value = "";
        document.getElementById("totalHours").value = "";
        return;
    }
    document.getElementById("granTotal").value = granTotal;
};