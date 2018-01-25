(function () {

    const config = {
        apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
        authDomain: "techopsportal.firebaseapp.com",
        databaseURL: "https://techopsportal.firebaseio.com",
        projectId: "techopsportal",
        storageBucket: "techopsportal.appspot.com",
        messagingSenderId: "265124430634"
    };
    firebase.initializeApp(config);

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    var user = null;

    document.getElementById('txtPassword').addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            btnLogin.click();
        }
    })
    
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        user = String(email);
        user = user.slice(0, 8);
        console.log(user);
        localStorage.setItem("user", user);

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.then(e => {
            loadUser();
        });
        promise.catch(e => {
            window.alert(e);
            document.getElementById('txtEmail').value = "";
            document.getElementById('txtPassword').value = "";
        });
    });


    btnSignup.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        user = String(email);
        user = user.slice(0, 8);
        console.log(user);
        localStorage.setItem("user", user);

        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.then(e => {
            setUser();
            loadUser();
        });
        promise.catch(e => alert(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        location.reload(true);
        localStorage.setItem("user", null);
    });


    document.getElementById('resetPassword').addEventListener('click', e => {
        var emailAddress = prompt('Input Email Address');
        firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            alert("An email has been sent. Please check your email.");
        }).catch(function (error) {
            // An error happened.
            alert(error);
        });
    });

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
    var dataUpdateUn = {
        "brightspace": true,
        "trello": true,
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
        "totStyleGuide": true
    };
    var dataUpdateBlock = {
        "brightspace": false,
        "trello": false,
        "teamDrive": false,
        "microsoft": false,
        "workDay": true,
        "canvas": true,
        "microsoftTeams": false,
        "equella": false,
        "teamDynamix": false,
        "employeeDirectory": false,
        "proDev": false,
        "pathway": false,
        "screenSteps": false,
        "firebaseConsole": false,
        "canvasStyleGuide": false,
        "totStyleGuide": false
    };
    var base = firebase.database().ref().child('acodes').on('value', snap => {
        var codes = (snap.val());
        var key0;
        for (key0 in codes) {
            var key1 = codes[key0];
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
        }
    });


    submitCode.addEventListener('click', e => {
        var code = txtCode.value;
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
        } else if (code == trainingallcode) {
            var data = {
                "brightspace": true,
                "trello": true,
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
                "totStyleGuide": true
            }
            dbRefUsers.child(user).update(data);
            console.log('akldfj');
            loadUser();
            document.getElementById('txtCode').value = "";
            document.getElementById('txtCode').placeholder = "Enter Code";
        } else {
            document.getElementById('txtCode').placeholder = "Wrong Code";
            document.getElementById('txtCode').value = "";
        }
        if (user == 'byuitech') {
            if (code == unblockallcode) {
                checkFirebase(dataUpdateUn);
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else if (code == blockallcode) {
                checkFirebase(dataUpdateBlock);
                document.getElementById('txtCode').value = "";
                document.getElementById('txtCode').placeholder = "Enter Code";
            } else {
                document.getElementById('txtCode').placeholder = "Wrong Code";
                document.getElementById('txtCode').value = "";
            }
        }

    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            txtEmail.classList.add('hide');
            txtPassword.classList.add('hide');
            btnLogin.classList.add('hide');
            btnSignUp.classList.add('hide');
            btnLogout.classList.remove('hide');
            document.getElementById('resetPassword').classList.add('hide');
            document.getElementById('loggedInForm').classList.remove('hide');
        } else {
            console.log('not logged in');
        }
    });

    function setUser() {
        var data = {
            "brightspace": false,
            "trello": false,
            "teamDrive": false,
            "microsoft": false,
            "workDay": false,
            "canvas": false,
            "microsoftTeams": false,
            "equella": true,
            "teamDynamix": true,
            "employeeDirectory": true,
            "proDev": true,
            "pathway": true,
            "screenSteps": true,
            "monthlyTraining": true,
            "firebaseConsole": true,
            "canvasStyleGuide": true,
            "totStyleGuide": true
        };
        dbRefUsers.child(user).set(data);
    }

    function loadUser() {
        dbRefUsers.child(user).on('value', snap => {
            var string = JSON.stringify(snap.val(), null, 3);
            var array = JSON.parse(string);

            txtCode.classList.add('hide');
            submitCode.classList.add('hide');

            document.getElementById('formId').classList.add('loggedIn');
            document.getElementById('month').classList.remove('hide');

            document.getElementById('month').addEventListener('click', e => {
                var data = {
                    "monthlyTraining": true
                }
                dbRefUsers.child(user).update(data);
                window.alert('Congration You Done It!');
            });

            if (array.workDay == true) {
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
                formId.classList.remove('formLogout');
                wdpic.classList.add('locked');
            }
            if (array.trello == true) {
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
                formId.classList.remove('formLogout');
                trellpic.classList.add('locked');
            }
            if (array.equella == true) {
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
                formId.classList.remove('formLogout');
                equpic.classList.add('locked');
            }
            if (array.teamDynamix == true) {
                var icon = document.getElementById('tdy');
                icon.setAttribute('href', "https://td.byui.edu");
                tdypic.classList.remove('locked');
            } else {
                var icon = document.getElementById('tdy');
                icon.addEventListener('click', e => {
                    window.alert('You are blocked for training purposes. Check your email for training link');
                });
                txtCode.classList.remove('hide');
                submitCode.classList.remove('hide');
                formId.classList.remove('formLogout');
                tdypic.classList.add('locked');
            }
            if (array.teamDrive == true) {
                var icon = document.getElementById('tdr');
                icon.setAttribute('href', "https://drive.google.com/drive/folders/0AKiJtEpGJEXOUk9PVA");
                tdrpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('tdr');
                icon.addEventListener('click', e => {
                    window.alert('You are blocked for training purposes. Check your email for training link');
                });
                txtCode.classList.remove('hide');
                submitCode.classList.remove('hide');
                formId.classList.remove('formLogout');
                tdrpic.classList.add('locked');
            }
            if (array.brightspace == true) {
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
                formId.classList.remove('formLogout');
                bspic.classList.add('locked');
            }
            if (array.microsoft == true) {
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
                formId.classList.remove('formLogout');
                micrpic.classList.add('locked');
            }
            if (array.canvas == true) {
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
                formId.classList.remove('formLogout');
                canpic.classList.add('locked');
            }
            if (array.employeeDirectory == true) {
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
                formId.classList.remove('formLogout');
                edpic.classList.add('locked');
            }
            if (array.microsoftTeams == true) {
                var icon = document.getElementById('mteam');
                icon.setAttribute('href', "https://teams.microsoft.com/start");
                mteampic.classList.remove('locked');
            } else {
                var icon = document.getElementById('mteam');
                icon.addEventListener('click', e => {
                    window.alert('You are blocked for training purposes. Check your email for training link');
                });
                txtCode.classList.remove('hide');
                submitCode.classList.remove('hide');
                formId.classList.remove('formLogout');
                mteampic.classList.add('locked');
            }
            if (array.proDev == true) {
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
                formId.classList.remove('formLogout');
                pdpic.classList.add('locked');
            }
            if (array.pathway == true) {
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
                formId.classList.remove('formLogout');
                pathpic.classList.add('locked');
            }
            if (array.screenSteps == true) {
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
                formId.classList.remove('formLogout');
                sspic.classList.add('locked');
            }
            if (array.firebaseConsole == true) {
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
                formId.classList.remove('formLogout');
                fbpic.classList.add('locked');
            }
            if (array.canvasStyleGuide == true) {
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
                formId.classList.remove('formLogout');
                csgpic.classList.add('locked');
            }
            if (array.totStyleGuide == true) {
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
                formId.classList.remove('formLogout');
                tsgpic.classList.add('locked');
            }
            if (user == 'byuitech') {
                txtCode.classList.remove('hide');
                submitCode.classList.remove('hide');
                formId.classList.remove('formLogout');
            }
        });
    }

    const dbRefUsers = firebase.database().ref('users');

    document.onload = pageReload();

    function pageReload() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                user = localStorage.getItem('user');
                console.log(user);
                loadUser();
                isBreak();
                isCheckedIn();
                document.getElementById('comment').classList.remove('hide');
            } else {
                console.log("not logged in");
            }
        });
    }

    function checkFirebase(dataUpdate) {
        var key2;
        dbRefUsers.once('value').then(function (snap) {
            var users = (snap.val());
            for (key2 in users) {
                dbRefUsers.child(key2).update(dataUpdate);
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
        var min = ('0' + d.getMinutes()).slice(-2);
        var sec = ('0' + d.getSeconds()).slice(-2);
        var time = hours + ':' + min + ':' + sec + " " + mer;
        var date = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear() + ' ' + time;
        var data = {
            In: time
        }
        var checkdata = {
            check: true
        };
        dbRefUsers.child(user).child('TimeClock').update(checkdata);
        ref.child(date).update(data);
        localStorage.setItem('timekey', date);
        window.open('https://www.myworkday.com/byuhi/d/home.htmld#selectedWorklet=501%24162');
        window.open('https://teams.microsoft.com/start', '_blank');
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
        var min = ('0' + d.getMinutes()).slice(-2);
        var sec = ('0' + d.getSeconds()).slice(-2);
        var time = hours + ':' + min + ':' + sec + " " + mer;
        var date = localStorage.getItem('timekey');
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
        localStorage.removeItem('timekey');
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
                var timekey = localStorage.getItem('timekey');
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
        var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var date = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear() + ' ' + time;
        var data = {
            Out: time
        }
        var breakdata = {
            break: true
        };
        dbRefUsers.child(user).child('TimeClock').update(breakdata);
        isBreak();
        ref.child(date).update(data);
        localStorage.setItem('breakkey', date);
    });

    document.getElementById('breakIn').addEventListener('click', e => {
        var ref = dbRefUsers.child(user).child('TimeClock').child('Breaks');
        var d = new Date();
        var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var date = localStorage.getItem('breakkey');
        var data = {
            In: time
        }
        var breakdata = {
            break: false
        };
        dbRefUsers.child(user).child('TimeClock').update(breakdata);
        isBreak();
        ref.child(date).update(data);
        localStorage.removeItem('breakkey');
    });

    function isBreak() {
        var breakOut = document.getElementById('breakOut');
        var breakIn = document.getElementById('breakIn');
        var breaks;
        dbRefUsers.child(user).child('TimeClock').child('break').on('value', snap => {
            if (snap.val()) {
                breakOut.classList.add('hide');
                breakIn.classList.remove('hide');
            } else {
                breakOut.classList.remove('hide');
                breakIn.classList.add('hide');
            }
        });
    }
}());
