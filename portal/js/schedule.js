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
                            // Check if admin
                            if (shot[titles] == true) {
                                // Show dropdown for teams
                                document.getElementById('team-dropdown').classList.remove('hide');
                                //Load Admin Link
                                document.getElementById('adminlink').classList.remove('hide');
                                // Exit loop
                                break;
                            }
                        } else if (titles == 'TeamLead') {
                            if (shot[titles] == true) {
                                // Show dropdown for teams
                                document.getElementById('team-dropdown').classList.remove('hide');
                            }
                        } else if (titles == 'Team') {
                            // Show iframe for schedule
                            document.getElementById('scheduleFrame').classList.remove('hide');
                            if (shot[titles] == 'canvas 1') {
                                // If canvas 1 set iframe to show canvas 1 schedule
                                document.getElementById('scheduleFrame').setAttribute('src', 'https://docs.google.com/spreadsheets/d/1P8rKKlO4BxLonT840yB7SeO59bjnmLnjvYNiurNaywg/edit?usp=sharing');
                            } else if (shot[titles] == 'canvas 2') {
                                // If canvas 2 set iframe to show canvas 2 schedule
                                document.getElementById('scheduleFrame').setAttribute('src', 'https://docs.google.com/spreadsheets/d/1TaUkWSifGGYkE5um2Rjtfi_Q37EzPUWmY-_X87sBQSo/edit?usp=sharing');
                            }
                        }

                    }

                });
            });
        } else {
            // If not logged in go back to login page
            window.location.replace("index.html");
        }
    });
}());

// This function is run when the user changes the dropdown selection
function showTeam(team) {
    // Get the iframe for the schedule
    var frame = document.getElementById('scheduleFrame');
    if (team == 'canvas 1') {
        // If canvas 1 set iframe to show canvas 1 schedule
        frame.setAttribute('src', 'https://docs.google.com/spreadsheets/d/1P8rKKlO4BxLonT840yB7SeO59bjnmLnjvYNiurNaywg/edit?usp=sharing');
    } else if (team == 'canvas 2') {
        // If canvas 2 set iframe to show canvas 2 schedule
        frame.setAttribute('src', 'https://docs.google.com/spreadsheets/d/1TaUkWSifGGYkE5um2Rjtfi_Q37EzPUWmY-_X87sBQSo/edit?usp=sharing');
    }
}