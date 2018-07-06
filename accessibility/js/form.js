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


// Check if Logged In
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log(user);
    } else {
        // No user is signed in.
        window.location.assign('index.html');
    }
});

getCourses();

var message = document.getElementById('message');

document.getElementById('requestType').addEventListener('change', function () {
    if (document.getElementById('requestType').value === "Transcript") {
        document.getElementById('requestVideoURLLabel').classList.remove('hide');
        document.getElementById('requestVideoURL').classList.remove('hide');
        document.getElementById('requestLengthLabel').classList.remove('hide');
        document.getElementById('requestLength').classList.remove('hide');
        document.getElementById('timeCalc').classList.remove('hide');
    } else {
        document.getElementById('requestVideoURLLabel').classList.add('hide');
        document.getElementById('requestVideoURL').classList.add('hide');
        document.getElementById('requestLengthLabel').classList.add('hide');
        document.getElementById('requestLength').classList.add('hide');
        document.getElementById('timeCalc').classList.add('hide');
    }
})

document.getElementById('requestSubmit').addEventListener('click', function () {
    var requestType = document.getElementById('requestType').value;
    var title = document.getElementById('requestTitle').value;
    var priority = document.getElementById('requestPriority').value;
    var course = document.getElementById('requestCourse').value;
    var lmsURL = document.getElementById('requestLMSURL').value;
    var week = document.getElementById('requestWeek').value;
    var srcURL = document.getElementById('requestVideoURL').value;
    var videoLength = document.getElementById('requestLength').value;

    if (requestType === "Request Type" || title === "" || priority === "Priority" || course === "Course" || lmsURL === "" ||
        week === "") {
        message.innerHTML = "You must fill in all inputs";
        message.style.color = "red";
        resetMessage();
        return;
    } else if (requestType === "Transcript" && (srcURL === "" || videoLength === "")) {
        message.innerHTML = "You must fill in all inputs";
        message.style.color = "red";
        resetMessage();
        return;
    } else {
        var user = firebase.auth().currentUser;
        // Add a new document in collection "accessibility"
        db.collection("accessibility").add({
                title: title,
                type: requestType,
                docURL: "input stuff",
                priority: priority,
                courseCode: course,
                lmsURL: lmsURL,
                week: week,
                requestor: user.displayName,
                requestDate: new Date(),
                status: "Ready for Transcript"
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                message.innerHTML = "Request has been made.";
                message.style.color = "blue";
                resetMessage();
                document.getElementById('requestType').options[0].selected = "selected";
                document.getElementById('requestCourse').options[0].selected = "selected";
                document.getElementById('requestTitle').value = "";
                document.getElementById('requestPriority').options[0].selected = "selected";
                document.getElementById('requestLMSURL').value = "";
                document.getElementById('requestWeek').value = "";
                document.getElementById('requestVideoURL').value = "";
                document.getElementById('requestLength').value = "";
                document.getElementById('requestVideoURLLabel').classList.add('hide');
                document.getElementById('requestVideoURL').classList.add('hide');
                document.getElementById('requestLengthLabel').classList.add('hide');
                document.getElementById('requestLength').classList.add('hide');
                document.getElementById('timeCalc').classList.add('hide');
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                message.innerHTML = "There was an error making the request. Please try again.";
                message.style.color = "red";
                resetMessage();
            });

    }
});

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = "";
        message.style.color = "black";
    }, 10000);
}

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
                    for (i = 0; i < newres.length; i++) {
                        var course = newres[i]["__catalogCourseId"];
                        document.getElementById('requestCourse').insertAdjacentHTML('beforeend', "<option value='" + course + "'>" + course + "</option>");
                    }
                }
            };
            newxhttp.open("GET", "https://byui.kuali.co/api/v1/catalog/courses/" + id, true);
            newxhttp.send();
        }
    };
    xhttp.open("GET", "https://byui.kuali.co/api/v1/catalog/public/catalogs/current", true);
    xhttp.send();
}