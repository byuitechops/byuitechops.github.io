// Connect to Firebase
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
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // If user is logged in
        // Set user to loggedinUser
        var loggedinUser = firebase.auth().currentUser;
        loggedinUser.providerData.forEach(function (profile) {
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

        function loadUser() {
            dbRefUsers.child(user).on('value', snap => {
                snap = snap.val();
                // Get database at user

                var titles;
                for (titles in snap) {
                    // Loop through user
                    if (titles == 'Admin') {
                        if (snap[titles] == true) {
                            // If Admin true
                            // Access to all
                            document.getElementById('screensteps').classList.remove('hide');
                            document.getElementById('firebase').classList.remove('hide');
                            document.getElementById('teamdynamix').classList.remove('hide');
                        }
                    }
                    if (titles == 'TeamLead') {
                        if (snap[titles] == true) {
                            // If Team Lead is true
                            // Access to Basic & Teamdynamix
                            document.getElementById('teamdynamix').classList.remove('hide');
                        }
                    }
                    if (titles == 'info') {
                        var key;
                        for (key in snap[titles]) {
                            if (key == 'position') {
                                var position = snap[titles][key];
                                if (position.indexOf("Screensteps") != -1) {
                                    document.getElementById('screensteps').classList.remove('hide');
                                }
                            }
                        }
                    }
                }
            });
        }

        const dbRefUsers = firebase.database().ref('users');

        document.onload = pageReload();

        function pageReload() {
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    loadUser();
                    isBreak();
                    isCheckedIn();
                    document.getElementById('comment').classList.remove('hide');
                } else {
                    window.location.replace('index.html');
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
            var time = hours + ':' + min + ':' + sec + " " + mer;
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
            window.open('https://www.myworkday.com/byuhi/d/home.htmld#selectedWorklet=501%24162');
            window.open('https://byuitechops.slack.com/messages/GABFXPE8L/details/', '_blank');
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
            showEvent();
        });

        document.getElementById('checkOut').addEventListener('click', e => {
            window.open('https://www.myworkday.com/byuhi/d/home.htmld#selectedWorklet=501%24162');
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
            var time = hours + ':' + min + ':' + sec + " " + mer;
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

        document.getElementById('breakOut').addEventListener('click', e => {
            var ref = dbRefUsers.child(user).child('TimeClock').child('Breaks');
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
            var time = hours + ':' + min + ':' + sec + " " + mer;
            var date = (d.getMonth() + 1) + '-' + ('0' + d.getDate()).slice(-2) + '-' + d.getFullYear() + ' ' + time;
            var data = {
                Out: time
            }
            var breakdata = {
                break: true
            };
            dbRefUsers.child(user).child('TimeClock').update(breakdata);
            ref.child(date).update(data);
            dbRefUsers.child(user).child('TimeClock').update({
                breakkey: date
            });
            isBreak();
        });

        document.getElementById('breakIn').addEventListener('click', e => {
            var breakkey;
            dbRefUsers.child(user).child('TimeClock/breakkey').once('value', snap => {
                breakkey = snap.val();
            });
            var ref = dbRefUsers.child(user).child('TimeClock').child('Breaks');
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
            var time = hours + ':' + min + ':' + sec + " " + mer;
            var date = (d.getMonth() + 1) + '-' + ('0' + d.getDate()).slice(-2) + '-' + d.getFullYear() + ' ' + time;
            var data = {
                In: time
            }
            var breakdata = {
                break: false
            };
            dbRefUsers.child(user).child('TimeClock').update(breakdata);
            ref.child(breakkey).update(data);
            isBreak();
            clearTime();
        });

        function isBreak() {
            var breakOut = document.getElementById('breakOut');
            var breakIn = document.getElementById('breakIn');
            var breaks;
            dbRefUsers.child(user).child('TimeClock').child('break').on('value', snap => {
                var breakkey;
                dbRefUsers.child(user).child('TimeClock/breakkey').once('value', snap => {
                    breakkey = snap.val();
                });
                if (snap.val()) {
                    showTime();
                    breakOut.classList.add('hide');
                    breakIn.classList.remove('hide');
                    document.getElementById('showbreak').innerHTML = ``;
                } else {
                    breakOut.classList.remove('hide');
                    breakIn.classList.add('hide');
                    dbRefUsers.child(user).child('TimeClock/Breaks').child(breakkey).child('In').on('value', snap => {
                        document.getElementById('showbreak').innerHTML = `Last Break Ended: ${snap.val()}`;
                    })
                }
            });
        }

        firebase.database().ref('users').child(user).child('TimeClock').child('break').on('value', snap => {
            if (snap.val()) {
                timer();
            }
        });

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