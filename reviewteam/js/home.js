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
                    }
                }
            }
        });
        // Load Page
        const dbRefUsers = firebase.database().ref('users');

        document.onload = pageReload();

        function pageReload() {
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    loadUser();
                    isCheckedIn();
                    document.getElementById('comment').classList.remove('hide');
                } else {
                    window.location.replace('index.html');
                }
            });
        }

        function loadUser() {
            dbRefUsers.child(user).on('value', snap => {
                snap = snap.val();
                // If Admin show Links
                var titles;
                for (titles in snap) {
                    // Loop through user
                    if (titles == 'Admin') {
                        if (snap[titles] == true) {
                            // If Admin true
                            // Access to all
                            document.getElementById('pht').classList.remove('hide');
                            document.getElementById('itticket').classList.remove('hide');
                            document.getElementById('ataglance').classList.remove('hide');
                            document.getElementById('redevqueue').classList.remove('hide');
                            document.getElementById('equella').classList.remove('hide');
                            document.getElementById('reviewrequest').classList.remove('hide');
                            document.getElementById('improvement').classList.remove('hide');
                            document.getElementById('trello').classList.remove('hide');
                        }
                    }

                    // If TeamLead show links
                    if (titles == 'Lead') {
                        if (snap[titles] == true) {
                            // If Team Lead is true
                            // Access to Basic & Teamdynamix
                            document.getElementById('ataglance').classList.remove('hide');
                            document.getElementById('redevqueue').classList.remove('hide');
                            document.getElementById('equella').classList.remove('hide');
                            document.getElementById('reviewrequest').classList.remove('hide');
                            document.getElementById('improvement').classList.remove('hide');
                            document.getElementById('trello').classList.remove('hide');
                        }
                    }
                }
            });
        }

        document.getElementById('checkIn').addEventListener('click', e => {
            var ref = dbRefUsers.child(user).child('TimeClock').child('HoursWorked');
            var d = new Date();
            var hours = d.getHours();
            var mer = "am";
            if (hours - 12 > 0) {
                hours = '0' + (hours - 12);
                mer = "pm";
            };
            if (hours - 12 == 0) {
                mer = "pm";
            };
            var min = ('0' + d.getMinutes()).slice(-2);
            var sec = ('0' + d.getSeconds()).slice(-2);
            var time = mer + " " + hours + ':' + min + ':' + sec + " ";
            var date = (d.getMonth() + 1) + '-' + ('0' + d.getDate()).slice(-2) + '-' + d.getFullYear() + ' ' + time;
            var data = {
                In: time
            }
            var checkdata = {
                check: true
            };
            dbRefUsers.child(user).child('TimeClock').update(checkdata);
            ref.child(date).update(data);
            dbRefUsers.child(user).child('TimeClock').update({
                timekey: date
            });
            window.open('https://www.myworkday.com/byuhi/d/home.htmld', '_blank');
            window.open('https://byuidaho.facebook.com/', '_blank');
            var cmessage = document.getElementById('comment').value;
            var comment = {
                CommentIn: cmessage
            };
            if (cmessage != "") {
                ref.child(date).update(comment);
                document.getElementById('comment').innerHTML = "";
            };
            document.getElementById('comment').value = "";
            isCheckedIn();
        });

        document.getElementById('checkOut').addEventListener('click', e => {
            window.open('https://www.myworkday.com/byuhi/d/home.htmld', '_blank');
            var ref = dbRefUsers.child(user).child('TimeClock').child('HoursWorked');
            var d = new Date();
            var time = d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
            var hours = d.getHours();
            var mer = "am";
            if (hours - 12 > 0) {
                hours = '0' + (hours - 12);
                mer = "pm";
            };
            if (hours - 12 == 0) {
                mer = "pm";
            };
            var min = ('0' + d.getMinutes()).slice(-2);
            var sec = ('0' + d.getSeconds()).slice(-2);
            var time = mer + " " + hours + ':' + min + ':' + sec + " ";
            var date;
            dbRefUsers.child(user).child('TimeClock/timekey').once('value', snap => {
                date = snap.val();
            });
            var data = {
                Out: time
            }
            var checkdata = {
                check: false
            };
            dbRefUsers.child(user).child('TimeClock').update(checkdata);
            isCheckedIn();
            ref.child(date).update(data);
            var cmessage = document.getElementById('comment').value;
            var comment = {
                CommentOut: cmessage
            };
            if (cmessage != "") {
                ref.child(date).update(comment);
                document.getElementById('comment').innerHTML = "";
            };
            document.getElementById('comment').value = "";
        });

        function isCheckedIn() {
            var checkInBtn = document.getElementById('checkIn');
            var checkOutBtn = document.getElementById('checkOut');
            var check;
            dbRefUsers.child(user).child('TimeClock').child('check').on('value', snap => {
                if (snap.val()) {
                    checkOutBtn.classList.remove('hide');
                    checkInBtn.classList.add('hide');
                    var timekey;
                    dbRefUsers.child(user).child('TimeClock/timekey').once('value', snap => {
                        timekey = snap.val();
                    });
                    if (timekey != null) {
                        dbRefUsers.child(user).child('TimeClock').child('HoursWorked').child(timekey).child('In').on('value', snap => {
                            document.getElementById('showclocked').innerHTML = "Clocked In At: " + snap.val();
                        });
                    };

                } else {
                    checkOutBtn.classList.add('hide');
                    checkInBtn.classList.remove('hide');
                    document.getElementById('showclocked').innerHTML = "";
                }
            });
        }

        // Logout of firebase and website
        document.getElementById('btnLogout').addEventListener('click', e => {
            firebase.auth().signOut();
        });

    } else {
        // User is signed out.
        window.location.replace("index.html");
        // ...
    }
});
