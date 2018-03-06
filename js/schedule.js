(function () {
    //------------------ Connect to Firebase -----------------------//
    const config = {
        apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
        authDomain: "techopsportal.firebaseapp.com",
        databaseURL: "https://techopsportal.firebaseio.com",
        projectId: "techopsportal",
        storageBucket: "techopsportal.appspot.com",
        messagingSenderId: "265124430634"
    };
    firebase.initializeApp(config);

    // Check if Logged In
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // Check which team
            var name;
            var user = firebase.auth().currentUser;
            user.providerData.forEach(function (profile) {
                name = profile.displayName;
                firebase.database().ref('users').child(name).on('value', snap => {
                    var titles;
                    var shot = snap.val();
                    for (titles in shot) {
                        if (titles == 'Admin') {
                            if (shot[titles] == true) {
                                document.getElementById('team-dropdown').classList.remove('hide');
                                //Load Admin Link
                                document.getElementById('adminlink').classList.remove('hide');
                                break;
                            }
                        } else if (titles == 'Team') {
                            document.getElementById('scheduleFrame').classList.remove('hide');
                            if (shot[titles] == 'canvas 3') {
                                document.getElementById('scheduleFrame').setAttribute('src', 'https://docs.google.com/spreadsheets/d/1mY6vvcCC7ptSYrlnoFrhwgWh4DMqGwQNdcgtjUz4f9M/edit?usp=sharing');
                            } else if (shot[titles] == 'canvas 1') {
                                document.getElementById('scheduleFrame').setAttribute('src', 'https://docs.google.com/spreadsheets/d/1ge7AlgKH_0nkvmbZ_BxWiP6WfAg2rynA1ccXMFei22k/edit?usp=sharing');
                            } else if (shot[titles] == 'canvas 2') {
                                document.getElementById('scheduleFrame').setAttribute('src', 'https://docs.google.com/spreadsheets/d/1BMVKAqfiPspOLZy4OFPHdccCWWJVtkHMrLoNobFCkTI/edit?usp=sharing');
                            }
                        }

                    }

                });
            });
        } else {
            window.location.replace("index.html");
        }
    });
}());

function showTeam(team) {
    var frame = document.getElementById('scheduleFrame');
    frame.setAttribute('src', '');
    if (team == 'canvas 3') {
        console.log('Canvas 3 Team')
        frame.setAttribute('src', 'https://docs.google.com/spreadsheets/d/1mY6vvcCC7ptSYrlnoFrhwgWh4DMqGwQNdcgtjUz4f9M/edit?usp=sharing');
    } else if (team == 'canvas 1') {
        console.log('Canvas 1 Team')
        frame.setAttribute('src', 'https://docs.google.com/spreadsheets/d/1ge7AlgKH_0nkvmbZ_BxWiP6WfAg2rynA1ccXMFei22k/edit?usp=sharing');
    } else if (team == 'canvas 2') {
        console.log('Canvas 2 Team')
        frame.setAttribute('src', 'https://docs.google.com/spreadsheets/d/1BMVKAqfiPspOLZy4OFPHdccCWWJVtkHMrLoNobFCkTI/edit?usp=sharing');
    }
}
