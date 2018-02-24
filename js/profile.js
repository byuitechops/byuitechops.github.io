// Connect to firebase
const config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};
firebase.initializeApp(config);

var user;
var name;
var data;
var teamBase;

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // If logged in do this
        user = firebase.auth().currentUser;
        console.log(user);
        user.providerData.forEach(function (profile) {
            name = profile.displayName;
            firebase.database().ref('users').child(name).on('value', snap => {
                var titles;
                var shot = snap.val();
                for (titles in shot) {
                    if (titles == 'Admin') {
                        //Load Admin Link
                        var ul = document.getElementById('sidenav');
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        a.setAttribute('href', 'admin.html');
                        var t = document.createTextNode('Admin');
                        a.appendChild(t);
                        li.appendChild(a);
                        var ref = ul.lastChild;
                        ref.parentNode.insertBefore(li, ref.nextSibling);

                        firebase.database().ref('users').on('value', snap => {
                            snap = snap.val();
                            var list = [];
                            var x;
                            for (x in snap) {
                                list.push(snap);
                            }
                            console.log(list);
                            //                        document.getElementById('names').innerHTML = "<select><"
                        })
                    }
                }
            });
        });

        data = firebase.database().ref('users').child(name).child("info");
        data.on('value', snapshot => {
            var snap = snapshot.val();

            document.getElementById('dName').innerHTML = user.displayName;
            document.getElementById('dEmail').innerHTML = user.email;
            document.getElementById('dPhone').innerHTML = snap.phoneNum;
            document.getElementById('dBirthday').innerHTML = snap.birthday;
            document.getElementById('dGraduation').innerHTML = snap.graduation;
            document.getElementById('dMajor').innerHTML = snap.major;
            document.getElementById('dTrack').innerHTML = snap.track;
            document.getElementById('dPosition').innerHTML = snap.position;
            document.getElementById('dSpeed').innerHTML = snap.speed;
            document.getElementById('dStrikes').innerHTML = snap.strikes;
            document.getElementById('dSick').innerHTML = snap.sick;

        });

        teamBase = firebase.database().ref('users').child(name);
        teamBase.on('value', snapshot => {
            var snap = snapshot.val();

            document.getElementById('dTeam').innerHTML = snap.Team;
            document.getElementById('dTeam').style.textTransform = 'capitalize';
        });

    } else {
        window.location.replace("index.html");
    }
});

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

    if (title == "phoneNum" || title == "major" || title == "position" || title == "speed") {
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
        var data = firebase.database().ref('users').child(name).child("info");
        if (info != null) {
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
