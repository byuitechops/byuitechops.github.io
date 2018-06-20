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

        // Enter code to restore access
        var blockallcode;
        var brightspacecode;
        var canvascode;
        var microsoftcode;
        var staffhubcode;
        var teamdrivecode;
        var teamscode;
        var trainingallcode;
        var trellocode;
        var unblockallcode;
        var workdaycode;
        var slackcode;

        firebase.database().ref().child('acodes').on('value', snap => {
            // Loop through the codes in firebase
            var codes = (snap.val());
            var key0;
            for (key0 in codes) {
                var key1 = codes[key0];
                // Set the variable to the code in firebase
                if (key0 == 'blockall') {
                    blockallcode = key1;
                }
                if (key0 == 'brightspace') {
                    brightspacecode = key1;
                }
                if (key0 == 'canvas') {
                    canvascode = key1;
                }
                if (key0 == 'microsoft') {
                    microsoftcode = key1;
                }
                if (key0 == 'teamdrive') {
                    teamdrivecode = key1;
                }
                if (key0 == 'teams') {
                    teamscode = key1;
                }
                if (key0 == 'trainingall') {
                    trainingallcode = key1;
                }
                if (key0 == 'trello') {
                    trellocode = key1;
                }
                if (key0 == 'unblockall') {
                    unblockallcode = key1;
                }
                if (key0 == 'workday') {
                    workdaycode = key1;
                }
                if (key0 == 'slack') {
                    slackcode = key1;
                }
            }
        });


        document.getElementById('submitCode').addEventListener('click', e => {
            // When the user clicks the submit button
            // Get the inputed text
            var code = txtCode.value;
            // Check if the inputed text is equal to a code
            // If it is true update firebase to be true and reload and reset input fields
            if (code == workdaycode) {
                var data = {
                    workDay: true
                }
                dbRefUsers.child(user).update(data);
                loadUser();
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else if (code == trellocode) {
                var data = {
                    trello: true
                }
                dbRefUsers.child(user).update(data);
                loadUser();
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else if (code == teamdrivecode) {
                var data = {
                    teamDrive: true
                }
                dbRefUsers.child(user).update(data);
                loadUser();
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else if (code == microsoftcode) {
                var data = {
                    microsoft: true
                }
                dbRefUsers.child(user).update(data);
                loadUser();
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else if (code == brightspacecode) {
                var data = {
                    brightspace: true
                }
                dbRefUsers.child(user).update(data);
                loadUser();
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else if (code == canvascode) {
                var data = {
                    canvas: true
                }
                dbRefUsers.child(user).update(data);
                loadUser();
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else if (code == teamscode) {
                var data = {
                    microsoftTeams: true
                }
                dbRefUsers.child(user).update(data);
                loadUser();
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else if (code == slackcode) {
                var data = {
                    slack: true
                }
                dbRefUsers.child(user).update(data);
                loadUser();
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else if (code == trainingallcode) {
                var data = {
                    "brightspace": true,
                    "trello": true,
                    "teamDynamix": true,
                    "teamDrive": true,
                    "microsoft": true,
                    "workDay": true,
                    "canvas": true,
                    "microsoftTeams": true,
                    "equella": true,
                    "teamDynamix": true,
                    "employeeDirectory": true,
                    "proDev": true,
                    "pathway": true,
                    "screenSteps": true,
                    "firebaseConsole": true,
                    "canvasStyleGuide": true,
                    "totStyleGuide": true,
                    "slack": true
                }
                dbRefUsers.child(user).update(data);
                loadUser();
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else {
                document.getElementById('txtCode').placeholder = "Wrong Code";
                document.getElementById('txtCode').value = "";
            }
        });
        // End of code to allow access

        function loadUser() {
            dbRefUsers.child(user).on('value', snap => {
                snap = snap.val();
                // Get database at user

                // Hide code input and submit button
                txtCode.classList.add('hide');
                submitCode.classList.add('hide');

                document.getElementById('month').addEventListener('click', e => {
                    // When user clicks on monthly training button update firebase to be true
                    var data = {
                        "monthlyTraining": true
                    }
                    dbRefUsers.child(user).update(data);
                    window.alert('Congration You Done It!');
                });

                var titles;
                for (titles in snap) {
                    // Loop through user
                    if (titles == 'Admin') {
                        if (snap[titles] == true) {
                            // If Admin true
                            // Access to all
                            document.getElementById('screensteps').classList.remove('hide');
                            if (snap.screenSteps == true) {
                                // If access is true set link for icon and remove grey out
                                var icon = document.getElementById('ss');
                                icon.setAttribute('href', "https://byu-idaho.screenstepslive.com/admin/v2/sites/18626/manuals/70917/chapters/225697/articles");
                                sspic.classList.remove('locked');
                            } else {
                                // If false show code input and submit button and grey out icon, when clicked on alert user that it is locked
                                var icon = document.getElementById('ss');
                                icon.addEventListener('click', e => {
                                    window.alert('You are blocked for training purposes. Check your email for training link');
                                });
                                txtCode.classList.remove('hide');
                                submitCode.classList.remove('hide');
                                sspic.classList.add('locked');
                            }
                            document.getElementById('firebase').classList.remove('hide');
                            if (snap.firebaseConsole == true) {
                                var icon = document.getElementById('fb');
                                icon.setAttribute('href', "https://console.firebase.google.com/");
                                fbpic.classList.remove('locked');
                            } else {
                                var icon = document.getElementById('fb');
                                icon.addEventListener('click', e => {
                                    window.alert('You are blocked for training purposes. Check your email for training link');
                                });
                                txtCode.classList.remove('hide');
                                submitCode.classList.remove('hide');
                                fbpic.classList.add('locked');
                            }
                            document.getElementById('teamdynamix').classList.remove('hide');
                            if (snap.teamDynamix == true) {
                                var icon = document.getElementById('tdyn');
                                icon.setAttribute('href', "https://www.teamdynamix.com/");
                                tdynpic.classList.remove('locked');
                            } else {
                                var icon = document.getElementById('tdyn');
                                icon.addEventListener('click', e => {
                                    window.alert('You are blocked for training purposes. Check your email for training link');
                                });
                                txtCode.classList.remove('hide');
                                submitCode.classList.remove('hide');
                                tdrpic.classList.add('locked');
                            }
                        }
                    }
                    if (titles == 'TeamLead') {
                        if (snap[titles] == true) {
                            // If Team Lead is true
                            // Access to Basic & Teamdynamix
                            document.getElementById('teamdynamix').classList.remove('hide');
                            if (snap.teamDynamix == true) {
                                var icon = document.getElementById('tdyn');
                                icon.setAttribute('href', "https://www.teamdynamix.com/");
                                tdynpic.classList.remove('locked');
                            } else {
                                var icon = document.getElementById('tdyn');
                                icon.addEventListener('click', e => {
                                    window.alert('You are blocked for training purposes. Check your email for training link');
                                });
                                txtCode.classList.remove('hide');
                                submitCode.classList.remove('hide');
                                tdrpic.classList.add('locked');
                            }
                        }
                    }
                    if (titles == 'info') {
                        var key;
                        for (key in snap[titles]) {
                            if (key == 'position') {
                                var position = snap[titles][key];
                                if (position.indexOf("Screensteps") != -1) {
                                    document.getElementById('screensteps').classList.remove('hide');
                                    if (snap.screenSteps == true) {
                                        var icon = document.getElementById('ss');
                                        icon.setAttribute('href', "https://byu-idaho.screenstepslive.com/admin/v2/sites/18626/manuals/70917/chapters/225697/articles");
                                        sspic.classList.remove('locked');
                                    } else {
                                        var icon = document.getElementById('ss');
                                        icon.addEventListener('click', e => {
                                            window.alert('You are blocked for training purposes. Check your email for training link');
                                        });
                                        txtCode.classList.remove('hide');
                                        submitCode.classList.remove('hide');
                                        sspic.classList.add('locked');
                                    }
                                }
                                if (position.indexOf('Tech') != -1 || position.indexOf('Trainer') != -1) {
                                    document.getElementById('firebase').classList.remove('hide');
                                    if (snap.firebaseConsole == true) {
                                        var icon = document.getElementById('fb');
                                        icon.setAttribute('href', "https://console.firebase.google.com/");
                                        fbpic.classList.remove('locked');
                                    } else {
                                        var icon = document.getElementById('fb');
                                        icon.addEventListener('click', e => {
                                            window.alert('You are blocked for training purposes. Check your email for training link');
                                        });
                                        txtCode.classList.remove('hide');
                                        submitCode.classList.remove('hide');
                                        fbpic.classList.add('locked');
                                    }
                                }
                            }
                        }
                    }
                }

                if (snap.workDay == true) {
                    var icon = document.getElementById('wd');
                    icon.setAttribute('href', "https://www.myworkday.com/byuhi/d/home.htmld#selectedWorklet=501%24162");
                    wdpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('wd');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    wdpic.classList.add('locked');
                }
                if (snap.trello == true) {
                    var icon = document.getElementById('trel');
                    icon.setAttribute('href', "https://trello.com/");
                    trellpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('trel');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    trellpic.classList.add('locked');
                }
                if (snap.equella == true) {
                    var icon = document.getElementById('equ');
                    icon.setAttribute('href', "https://content.byui.edu/access/home.do");
                    equpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('equ');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    equpic.classList.add('locked');
                }
                if (snap.teamDrive == true) {
                    var icon = document.getElementById('tdr');
                    icon.setAttribute('href', "https://drive.google.com/drive/team-drives");
                    tdrpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('tdr');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    tdrpic.classList.add('locked');
                }
                if (snap.brightspace == true) {
                    var icon = document.getElementById('bs');
                    icon.setAttribute('href', "https://byui.brightspace.com/d2l/login?noredirect=true");
                    bspic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('bs');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    bspic.classList.add('locked');
                }
                if (snap.microsoft == true) {
                    var icon = document.getElementById('micr');
                    icon.setAttribute('href', "https://www.office.com/1/?auth=2&amp;home=1&amp;from=PortalLanding&amp;client-request-id=77ffd374-bbac-4e2b-8a9d-9c1566dea2ed");
                    micrpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('micr');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    micrpic.classList.add('locked');
                }
                if (snap.canvas == true) {
                    var icon = document.getElementById('can');
                    icon.setAttribute('href', "https://byui.instructure.com/login/canvas");
                    canpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('can');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    canpic.classList.add('locked');
                }
                if (snap.employeeDirectory == true) {
                    var icon = document.getElementById('ed');
                    icon.setAttribute('href', "https://web.byui.edu/directory/employees/");
                    edpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('ed');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    edpic.classList.add('locked');
                }
                if (snap.slack == true) {
                    var icon = document.getElementById('sk');
                    icon.setAttribute('href', "https://byuitechops.slack.com/messages/GABFXPE8L/details/");
                    slackpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('slack');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    slackpic.classList.add('locked');
                }
                if (snap.proDev == true) {
                    var icon = document.getElementById('pd');
                    icon.setAttribute('href', "https://docs.google.com/spreadsheets/u/1/d/15j8TFY49aBn2eC_-yqffvNEQOiw6wK4pfRf7CE-OTu8/edit?usp=drive_web");
                    pdpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('pd');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    pdpic.classList.add('locked');
                }
                if (snap.pathway == true) {
                    var icon = document.getElementById('path');
                    icon.setAttribute('href', "https://pathway.brightspace.com/d2l/login?noredirect=true");
                    pathpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('path');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    pathpic.classList.add('locked');
                }
                if (snap.canvasStyleGuide == true) {
                    var icon = document.getElementById('csg');
                    icon.setAttribute('href', "https://canvas.instructure.com/styleguide");
                    csgpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('csg');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    csgpic.classList.add('locked');
                }
                if (snap.totStyleGuide == true) {
                    var icon = document.getElementById('tsg');
                    icon.setAttribute('href', "https://byui.instructure.com/courses/78/pages/web-features?module_item_id=12334");
                    tsgpic.classList.remove('locked');
                } else {
                    var icon = document.getElementById('csg');
                    icon.addEventListener('click', e => {
                        window.alert('You are blocked for training purposes. Check your email for training link');
                    });
                    txtCode.classList.remove('hide');
                    submitCode.classList.remove('hide');
                    tsgpic.classList.add('locked');
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
                if (snap.val()) {
                    var breakkey;
                    dbRefUsers.child(user).child('TimeClock/breakkey').once('value', snap => {
                        breakkey = snap.val();
                    });
                    showTime();
                    breakOut.classList.add('hide');
                    breakIn.classList.remove('hide');
                } else {
                    breakOut.classList.remove('hide');
                    breakIn.classList.add('hide');
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
