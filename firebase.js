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
        promise.catch(e => alert('Incorrect Email or Password'));

        loadUser();
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
        promise.catch(e => console.log(e.message));

        setUser();
        loadUser();
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        location.reload(true);
        localStorage.setItem("user", null);
    });


    submitCode.addEventListener('click', e => {
        var code = txtCode.value;
        if (code == 'WorkDay') {
            var data = {
                workDay: true
            }
            dbRefUsers.child(user).update(data);
            loadUser();
            document.getElementById('txtCode').value = "";
        } else if (code == 'Trello') {
            var data = {
                trello: true
            }
            dbRefUsers.child(user).update(data);
            loadUser();
            document.getElementById('txtCode').value = "";
        } else if (code == 'TeamDrive') {
            var data = {
                teamDrive: true
            }
            dbRefUsers.child(user).update(data);
            loadUser();
            document.getElementById('txtCode').value = "";
        } else if (code == 'Microsoft') {
            var data = {
                microsoft: true
            }
            dbRefUsers.child(user).update(data);
            loadUser();
            document.getElementById('txtCode').value = "";
        } else if (code == 'Brightspace') {
            var data = {
                brightspace: true
            }
            dbRefUsers.child(user).update(data);
            loadUser();
            document.getElementById('txtCode').value = "";
        } else if (code == 'StaffHub') {
            var data = {
                staffHub: true
            }
            dbRefUsers.child(user).update(data);
            loadUser();
            document.getElementById('txtCode').value = "";
        } else if (code == 'Canvas') {
            var data = {
                canvas: true
            }
            dbRefUsers.child(user).update(data);
            loadUser();
            document.getElementById('txtCode').value = "";
        } else if (code == 'MicTeams') {
            var data = {
                microsoftTeams: true
            }
            dbRefUsers.child(user).update(data);
            loadUser();
            document.getElementById('txtCode').value = "";
        } else {
            document.getElementById('txtCode').value = "Wrong Code";
        }
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            txtEmail.classList.add('hide');
            txtPassword.classList.add('hide');
            txtCode.classList.remove('hide');
            btnLogin.classList.add('hide');
            btnSignUp.classList.add('hide');
            submitCode.classList.remove('hide');
            btnLogout.classList.remove('hide');
        } else {
            console.log('not logged in')
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
            "screenSteps": true
        };
        dbRefUsers.child(user).set(data);
    }

    function loadUser() {
        dbRefUsers.child(user).on('value', snap => {
            var string = JSON.stringify(snap.val(), null, 3);
            var array = JSON.parse(string);
            if (array.workDay == true) {
                var icon = document.getElementById('wd');
                icon.setAttribute('href', "https://www.myworkday.com/byuhi/d/home.htmld#selectedWorklet=501%24162");
                wdpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('wd');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.trello == true) {
                var icon = document.getElementById('trel');
                icon.setAttribute('href', "https://trello.com/");
                trellpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('trel');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.equella == true) {
                var icon = document.getElementById('equ');
                icon.setAttribute('href', "https://content.byui.edu/access/home.do");
                equpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('equ');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.teamDynamix == true) {
                var icon = document.getElementById('tdy');
                icon.setAttribute('href', "https://td.byui.edu");
                tdypic.classList.remove('locked');
            } else {
                var icon = document.getElementById('tdy');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.teamDrive == true) {
                var icon = document.getElementById('tdr');
                icon.setAttribute('href', "https://drive.google.com/drive/folders/0AKiJtEpGJEXOUk9PVA");
                tdrpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('tdr');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.brightspace == true) {
                var icon = document.getElementById('bs');
                icon.setAttribute('href', "https://byui.brightspace.com/d2l/login?noredirect=true");
                bspic.classList.remove('locked');
            } else {
                var icon = document.getElementById('bs');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.microsoft == true) {
                var icon = document.getElementById('micr');
                icon.setAttribute('href', "https://www.office.com/1/?auth=2&amp;home=1&amp;from=PortalLanding&amp;client-request-id=77ffd374-bbac-4e2b-8a9d-9c1566dea2ed");
                micrpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('micr');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.staffHub == true) {
                var icon = document.getElementById('sh');
                icon.setAttribute('href', "https://staffhub.ms/app/TEAM_beb31523bee44c99b3a052306b0a71c4/schedules");
                shpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('sh');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.canvas == true) {
                var icon = document.getElementById('can');
                icon.setAttribute('href', "https://byui.instructure.com/login/canvas");
                canpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('can');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.employeeDirectory == true) {
                var icon = document.getElementById('ed');
                icon.setAttribute('href', "https://web.byui.edu/directory/employees/");
                edpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('ed');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.microsoftTeams == true) {
                var icon = document.getElementById('mteam');
                icon.setAttribute('href', "https://teams.microsoft.com/start");
                mteampic.classList.remove('locked');
            } else {
                var icon = document.getElementById('mteam');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.proDev == true) {
                var icon = document.getElementById('pd');
                icon.setAttribute('href', "https://docs.google.com/spreadsheets/u/1/d/15j8TFY49aBn2eC_-yqffvNEQOiw6wK4pfRf7CE-OTu8/edit?usp=drive_web");
                pdpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('pd');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.pathway == true) {
                var icon = document.getElementById('path');
                icon.setAttribute('href', "https://pathway.brightspace.com/d2l/login?noredirect=true");
                pathpic.classList.remove('locked');
            } else {
                var icon = document.getElementById('path');
                icon.setAttribute('href', "http://www.google.com");
            }
            if (array.screenSteps == true) {
                var icon = document.getElementById('ss');
                icon.setAttribute('href', "https://byu-idaho.screenstepslive.com/admin/v2/sites/18626/manuals/70917/chapters/225697/articles");
                sspic.classList.remove('locked');
            } else {
                var icon = document.getElementById('ss');
                icon.setAttribute('href', "http://www.google.com");
            }

        });

    }

    const preObject = document.getElementById('object');
    const ulList = document.getElementById('list');

    const dbRefUsers = firebase.database().ref('users');
    const dbRefList = dbRefUsers.child(0);

    var array = null;

    dbRefUsers.on('value', snap => {
        var string = JSON.stringify(snap.val(), null, 3);
        array = JSON.parse(string);
    });

    dbRefList.on('child_added', snap => {
        const li = document.createElement('li');
        li.innerText = snap.val();
        li.id = snap.key;
        ulList.appendChild(li);
    });

    dbRefList.on('child_changed', snap => {
        const liChanged = document.getElementById(snap.key);
        liChanged.innerText = snap.val();
    });

    dbRefList.on('child_removed', snap => {
        const liToRemove = document.getElementById(snap.key);
        liToRemove.remove();
    });


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

}());
