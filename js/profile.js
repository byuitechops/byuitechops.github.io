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
var data = firebase.database().ref('users').child(name).child("info");

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

        console.log(user);

        document.getElementById('dName').innerHTML = user.displayName;
        document.getElementById('dEmail').innerHTML = user.email;
        document.getElementById('dPhone').innerHTML = data.phoneNum;
        document.getElementById('dBirthday').innerHTML = data.brithday;
        document.getElementById('dGraduation').innerHTML = data.graduation;
        document.getElementById('dMajor').innerHTML = data.major;
        document.getElementById('dTrack').innerHTML = data.track;
        document.getElementById('dStrikes').innerHTML = data.strikes;
        document.getElementById('dSick').innerHTML = data.sick;


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
        alert(j);
        j = JSON.parse(j);
        console.log(j);
        if (title == "displayName" || title == "email") {
            user.updateProfile(j).then(function () {
                //Update successful
                alert('Update successful');
            }).catch(function (error) {
                //An error happened
                alert(error);
            })
        } else {
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
}
