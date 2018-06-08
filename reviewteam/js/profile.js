// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4QPzcqjwXlZokv3IUuBUSQFF2VMg4xjQ",
    authDomain: "review-team.firebaseapp.com",
    databaseURL: "https://review-team.firebaseio.com",
    projectId: "review-team",
    storageBucket: "review-team.appspot.com",
    messagingSenderId: "1021047023591"
};
firebase.initializeApp(config);

var user;
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // If user is logged in
        firebase.auth().currentUser.providerData.forEach(function (profile) {
            // Set user to Name of Current User
            user = profile.displayName;
        });
        firebase.database().ref('users').child(user).on('value', snap => {
            // Loop through the user in the database
            var titles;
            var shot = snap.val();
            for (titles in shot) {
                if (titles == 'Admin') {
                    if (shot[titles] == true) {
                        // If the user is an admin
                        //Load Admin Link
                        document.getElementById('adminlink').classList.remove('hide');
                        // Build drop down list
                        firebase.database().ref('users').on('value', snap => {
                            snap = snap.val();
                            var namesList = [];
                            var x;
                            for (x in snap) {
                                namesList.push(x);
                            }
                            var namesDiv = document.getElementById('names');
                            var selectTag = "<select id='sNames' onchange='displayInfo(this.value)'>";
                            for (y = 0; y < namesList.length; y++) {
                                if (name == namesList[y]) {
                                    selectTag += "<option value='" + namesList[y] + "' selected>" + namesList[y] + "</option>";
                                } else {
                                    selectTag += "<option value='" + namesList[y] + "'>" + namesList[y] + "</option>";
                                }
                            }
                            selectTag += "</select>";
                            namesDiv.innerHTML = selectTag;
                        })
                    }
                }
            }
        });
        displayInfo(user);
        // Load Page

    } else {
        // User is signed out.
        window.location.replace("index.html");
        // ...
    }
});

function displayInfo(selected) {
    name = selected;
    data = firebase.database().ref('users').child(name).child("Profile");
    data.on('value', snapshot => {
        var snap = snapshot.val();

        document.getElementById('dName').innerHTML = name;

        if (snap.phoneNum == "") {
            document.getElementById('dPhone').innerHTML = "No Data";
        } else {
            document.getElementById('dPhone').innerHTML = snap.phoneNumber;
        }

        if (snap.birthday == "") {
            document.getElementById('dBirthday').innerHTML = "No Data";
        } else {
            document.getElementById('dBirthday').innerHTML = snap.birthday;
        }

        if (snap.graduation == "") {
            document.getElementById('dGraduation').innerHTML = "No Data";
        } else {
            document.getElementById('dGraduation').innerHTML = snap.graduation;
        }

        if (snap.major == "") {
            document.getElementById('dMajor').innerHTML = "No Data";
        } else {
            document.getElementById('dMajor').innerHTML = snap.major;
        }

        if (snap.track == "") {
            document.getElementById('dTrack').innerHTML = "No Data";
        } else {
            document.getElementById('dTrack').innerHTML = snap.track;
        }

        if (snap.lastDay == "") {
            document.getElementById('dLastDay').innerHTML = "No Data";
        } else {
            document.getElementById('dLastDay').innerHTML = snap.lastDay;
        }

        if (snap.personalHoursUsed == "") {
            document.getElementById('dPHours').innerHTML = "No Data";
        } else {
            document.getElementById('dPHours').innerHTML = snap.personalHoursUsed;
        }
    });

}

function updateInfo(title) {

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");

    // Open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        document.getElementById('haha').remove();
        document.getElementById('hahaSubmit').remove();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById('haha').remove();
            document.getElementById('hahaSubmit').remove();
        }
    }

    if (title == "phoneNum" || title == "major" || title == "lastDay") {
        var newItem = document.createElement('input');
        newItem.setAttribute('id', 'haha');
        newItem.setAttribute('type', 'text');

        var newSubmit = document.createElement('button');
        newSubmit.setAttribute('id', 'hahaSubmit');
        var t = document.createTextNode('Submit');
        newSubmit.appendChild(t);

        var modolly = document.getElementById('modal-content');
        modolly.insertBefore(newItem, modolly.lastChild.nextSibling);
        modolly.insertBefore(newSubmit, modolly.lastChild.nextSibling);
    } else if (title == "graduation") {
        var newItem = document.createElement('select');
        newItem.setAttribute('id', 'haha');
        newItem.setAttribute('required', '');
        newItem.innerHTML = "<option value='' disabled hidden selected>Select One</option>"
        var sem = ['Winter', 'Spring', 'Fall'];
        var year = ['2018', '2019', '2020', '2021', '2022'];
        for (i = 0; i < year.length; i++) {
            for (y = 0; y < sem.length; y++) {
                var t = sem[y] + " " + year[i];
                newItem.innerHTML += "<option value='" + t + "'>" + t + "</option>";
            }
        }

        var newSubmit = document.createElement('button');
        newSubmit.setAttribute('id', 'hahaSubmit');
        var t = document.createTextNode('Submit');
        newSubmit.appendChild(t);

        var modolly = document.getElementById('modal-content');
        modolly.insertBefore(newItem, modolly.lastChild.nextElementSibling);
        modolly.insertBefore(newSubmit, modolly.lastChild.nextSibling);
    } else if (title == "track") {
        var newItem = document.createElement('select');
        newItem.setAttribute('id', 'haha');
        newItem.setAttribute('required', '');
        newItem.innerHTML = "<option value='' disabled hidden selected>Select One</option><option value='Winter/Spring'>Winter/Spring</option><option value='Spring/Fall'>Spring/Fall</option><option value='Fall/Winter'>Fall/Winter</option>";

        var newSubmit = document.createElement('button');
        newSubmit.setAttribute('id', 'hahaSubmit');
        var t = document.createTextNode('Submit');
        newSubmit.appendChild(t);

        var modolly = document.getElementById('modal-content');
        modolly.insertBefore(newItem, modolly.lastChild.nextElementSibling);
        modolly.insertBefore(newSubmit, modolly.lastChild.nextSibling);
    }

    document.getElementById("hahaSubmit").addEventListener("click", function () {
        var info = document.getElementById('haha').value;
        info = String(info);
        var data = firebase.database().ref('users').child(name).child("Profile");
        if (info != "") {
            var j = '{"' + title + '": "' + info + '"}';
            j = JSON.parse(j);
            data.update(j)
                .then(function () {
                    //Update successful
                    modal.style.display = "none";
                    document.getElementById('haha').remove();
                    document.getElementById('hahaSubmit').remove();
                }).catch(function (error) {
                    //An error happened
                    alert(error);
                })
        }

    });
}
