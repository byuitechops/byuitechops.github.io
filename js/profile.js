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
    var data = firebase.database().ref('users').child(name).child("info");
    var info = prompt("What is the updated information?");
    info = String(info);
    if (info != null) {
        var j = '{"' + title + '": "' + info + '"}';
        j = JSON.parse(j);
        data.update(j)
            .then(function () {
                //Update successful
                alert('Update successful');
            }).catch(function (error) {
                //An error happened
                alert(error);
            })
    }
}
