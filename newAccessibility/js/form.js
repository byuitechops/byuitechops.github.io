getCourses();

var message = document.getElementById('message');
//according to the request type, displays or hide specific pages 
document.getElementById('requestType').addEventListener('change', function () {
    if (document.getElementById('requestType').value === 'Transcript') {
        document.getElementById('requestVideoURLLabel').classList.remove('hide');
        document.getElementById('requestVideoURL').classList.remove('hide');
        document.getElementById('requestLengthLabel').classList.remove('hide');
        document.getElementById('requestLength').classList.remove('hide');
        document.getElementById('requestSoftwareLabel').classList.remove('hide');
        document.getElementById('requestExternalSoftware').classList.remove('hide');
        document.getElementById('timeCalc').classList.remove('hide');
    } else if (document.getElementById('requestType').value === 'Audio') {
        document.getElementById('requestVideoURLLabel').classList.add('hide');
        document.getElementById('requestVideoURL').classList.add('hide');
        document.getElementById('requestLengthLabel').classList.remove('hide');
        document.getElementById('requestLength').classList.remove('hide');
        document.getElementById('requestSoftwareLabel').classList.add('hide');
        document.getElementById('requestExternalSoftware').classList.add('hide');
        document.getElementById('timeCalc').classList.remove('hide');
    } else {
        document.getElementById('requestVideoURLLabel').classList.add('hide');
        document.getElementById('requestVideoURL').classList.add('hide');
        document.getElementById('requestLengthLabel').classList.add('hide');
        document.getElementById('requestLength').classList.add('hide');
        document.getElementById('requestSoftwareLabel').classList.add('hide');
        document.getElementById('requestExternalSoftware').classList.add('hide');
        document.getElementById('timeCalc').classList.add('hide');
    }
});

document.getElementById('requestSubmit').addEventListener('click', function () {
    var requestType = document.getElementById('requestType').value;
    var title = document.getElementById('requestTitle').value.toUpperCase();
    var priority = document.getElementById('requestPriority').value;
    var course = document.getElementById('requestCourse').value;
    var lmsURL = document.getElementById('requestLMSURL').value;
    var week = document.getElementById('requestWeek').value;
    var srcURL = document.getElementById('requestVideoURL').value;
    var videoLength = document.getElementById('requestLength').value;
    var softwareUsed = document.getElementById('requestExternalSoftware').checked;
    var comments = document.getElementById('requestComments').value;

    if (requestType === 'Request Type' || title === '' || priority === 'Priority' || course === 'Course' || lmsURL === '' ||
        week === 'Week') {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else if (requestType === 'Transcript' && (srcURL === '' || videoLength === '' || softwareUsed === '')) {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else if (requestType === 'Audio' && videoLength === '') {
        message.innerHTML = 'You must fill in all inputs';
        message.style.color = 'red';
        resetMessage();
        return;
    } else {
        var user = firebase.auth().currentUser;
       
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
            placed: false,
            notes: comments
        }

        if (requestType == "Transcript") {
          var extraInfo = { 
                srcURL: srcURL,
                videoLength: videoLength,
                softwareUsed: softwareUsed,
                videoHeight: 315
            }
            var test = Object.assign(extraInfo, docData)  
        }
        

        if (requestType == "Audio") {
            var extraInfo = {
                videoLength: videoLength
            }
            var test = Object.assign(extraInfo, docData)
        }

        if (requestType == "Alt Text" || requestType == "Slide") {
            var test = Object.assign({}, docData)
        }

        // Add a new document in collection "accessibility"
        db.collection('accessibility').add(test)
            .then(function (docRef) {
                console.log('Document written with ID: ', docRef.id);
                message.innerHTML = 'Request has been made.';
                message.style.color = 'blue';
                resetMessage();

                var elems = document.getElementsByClassName('prev');

                for (var i = 0; i < elems.length - 1; i++) {
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
                var prev = [videoLength, srcURL, week, lmsURL, priority, title, course, requestType];

                for (var i = 0; i < 8; i++) {
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
                document.getElementById('requestExternalSoftware').value = '';
                document.getElementById('requestVideoURLLabel').classList.add('hide');
                document.getElementById('requestVideoURL').classList.add('hide');
                document.getElementById('requestLengthLabel').classList.add('hide');
                document.getElementById('requestLength').classList.add('hide');
                document.getElementById('requestSoftwareLabel').classList.add('hide');
                document.getElementById('requestExternalSoftware').classList.add('hide');
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
    }, 3000);
}

// This function compares the title and URL to make sure that we do not have duplicates
// The HTML sends string x and that is used to decide if it is a URL or title
function searchForSameTranscript(x) {
    var value = document.getElementById(x).value.toUpperCase();
    var repeated = false;
    if (x == "requestVideoURL"){
        db.collection("accessibility").where("srcURL", "==", value )
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                repeated = true;
            });
            if (repeated) {
                message.innerHTML = `A request for this video has been found`;
                message.style.color = 'red';
                document.getElementById('requestSubmit').setAttribute('disabled', true);
                resetMessage();
            } else {
                document.getElementById('requestSubmit').removeAttribute('disabled');
            }
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    } else if (x == "requestTitle"){
        db.collection("accessibility").where("title", "==", value)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                repeated = true;
            });
            if (repeated) {
                message.innerHTML = `A request for this video has been found`;
                message.style.color = 'red';
                document.getElementById('requestSubmit').setAttribute('disabled', true);
                resetMessage();
            } else {
                document.getElementById('requestSubmit').removeAttribute('disabled');
            }
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    }
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
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('timeCalc').addEventListener('click', function () {
    modal.style.display = "block";
});

document.getElementById('requestType').addEventListener('change', () => {
    document.getElementById('requestType').style.borderColor = "rgb(169, 169, 169)";
})

document.getElementById('requestCourse').addEventListener('change', () => {
    document.getElementById('requestCourse').style.borderColor = "rgb(169, 169, 169)";
})

document.getElementById('requestTitle').addEventListener('change', () => {
    document.getElementById('requestTitle').style.borderColor = "rgb(169, 169, 169)";
})

document.getElementById('requestPriority').addEventListener('change', () => {
    document.getElementById('requestPriority').style.borderColor = "rgb(169, 169, 169)";
})

document.getElementById('requestLMSURL').addEventListener('change', () => {
    document.getElementById('requestLMSURL').style.borderColor = "rgb(169, 169, 169)";
})

document.getElementById('requestWeek').addEventListener('change', () => {
    document.getElementById('requestWeek').style.borderColor = "rgb(169, 169, 169)";
})

document.getElementById('requestVideoURL').addEventListener('change', () => {
    document.getElementById('requestVideoURL').style.borderColor = "rgb(169, 169, 169)";
})

document.getElementById('requestLength').addEventListener('change', () => {
    document.getElementById('requestLength').style.borderColor = "rgb(169, 169, 169)";
})

document.getElementById('requestExternalSoftware').addEventListener('change', () => {
    document.getElementById('requestExternalSoftware').style.borderColor = "rgb(169, 169, 169)";
})

//Calculates the total of time in seconds according 
//to user's input for the transcript selected
function calculateTotal() {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var total = 0;
    hours = document.getElementById("hours0").value;
    minutes = document.getElementById("minutes0").value;
    seconds = document.getElementById("seconds0").value;
    if (hours == "" && minutes == "" && seconds == "") {
        document.getElementById("total" + i).value = "";
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
        document.getElementById("total0").value = "NaN";
    }
    if (seconds >= 60 && seconds <= 1000000) {
        while (seconds >= 60) {
            minutes++;
            seconds -= 60;
        }
        document.getElementById("seconds0").value = seconds;
        document.getElementById("minutes0").value = minutes;
    }
    if (minutes >= 60 && minutes <= 1000000) {
        while (minutes >= 60) {
            hours++;
            minutes -= 60;
        }
        document.getElementById("minutes0").value = minutes;
        document.getElementById("hours0").value = hours;
    }
    total = (hours * 60 * 60) + (minutes * 60) + (seconds * 1);
    if (total === 0) {
        total = "";
        document.getElementById("total0").value = total;
    }
    document.getElementById("total0").value = total;
};

function calculateSubmit() {
    var total = document.getElementById('total0').value;
    document.getElementById('requestLength').value = total;
    document.getElementById('requestLength').style.borderColor = "rgb(169, 169, 169)";
    modal.style.display = "none";
}

//Counts the ammount of transcripts in the database
function countDocs(){
    db.collection('accessibility').get()
                .then((querySnapshot) => {
                    var count = 0;
                    querySnapshot.forEach((doc) => {
                        count +=1;
                        console.log(count);
                    })
                })           
    }