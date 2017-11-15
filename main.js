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
            document.getElementById('txtEmail').value = "";
            document.getElementById('txtEmail').placeholder = "Incorrect Email or Password";
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
        "staffHub": true,
        "canvas": true,
        "microsoftTeams": true,
        "equella": true,
        "teamDynamix": true,
        "employeeDirectory": true,
        "proDev": true,
        "pathway": true,
        "screenSteps": true,
        "firebaseConsole": true
    };
    var dataUpdateBlock = {
        "brightspace": false,
        "trello": false,
        "teamDrive": false,
        "microsoft": false,
        "workDay": true,
        "staffHub": false,
        "canvas": true,
        "microsoftTeams": false,
        "equella": false,
        "teamDynamix": false,
        "employeeDirectory": false,
        "proDev": false,
        "pathway": false,
        "screenSteps": false,
        "firebaseConsole": false
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
            if (key0 == 'staffhub') {
                staffhubcode = key1;
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
        } else if (code == staffhubcode) {
            var data = {
                staffHub: true
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
                "staffHub": true,
                "canvas": true,
                "microsoftTeams": true,
                "equella": true,
                "teamDynamix": true,
                "employeeDirectory": true,
                "proDev": true,
                "pathway": true,
                "screenSteps": true,
                "firebaseConsole": true
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
            "staffHub": false,
            "canvas": false,
            "microsoftTeams": false,
            "equella": true,
            "teamDynamix": true,
            "employeeDirectory": true,
            "proDev": true,
            "pathway": true,
            "screenSteps": true,
            "monthlyTraining": true,
            "firebaseConsole": true
        };
        dbRefUsers.child(user).set(data);
    }

    function loadUser() {
        dbRefUsers.child(user).on('value', snap => {
            var string = JSON.stringify(snap.val(), null, 3);
            var array = JSON.parse(string);

            txtCode.classList.add('hide');
            submitCode.classList.add('hide');

            formId.classList.add('formLogout');
            month.classList.remove('hide');
            month.classList.add('monthButton');
            month.addEventListener('click', e => {
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
            if (array.staffHub == true) {
                var icon = document.getElementById('sh');
                icon.setAttribute('href', "https://staffhub.ms/app/TEAM_beb31523bee44c99b3a052306b0a71c4/schedules");
                shpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('sh');
                icon.addEventListener('click', e => {
                    window.alert('You are blocked for training purposes. Check your email for training link');
                });
                txtCode.classList.remove('hide');
                submitCode.classList.remove('hide');
                formId.classList.remove('formLogout');
                shpic.classList.add('locked');
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
            } else {
                console.log("not logged in")
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
}());
