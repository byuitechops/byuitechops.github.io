const config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
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
                            //Load Admin Link
                            document.getElementById('adminlink').classList.remove('hide');
                        }
                    }
                }
            });
        });
    } else {
        // User is signed out.
        window.location.replace("index.html");
        // ...
    }
});

function calculateTotal() {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var total = 0;
    var data = document.getElementsByName("cb");
    for (var i = 0; i < 5; i++) {
        hours = document.getElementById("hours" + i).value;
        minutes = document.getElementById("minutes" + i).value;
        seconds = document.getElementById("seconds" + i).value;
        if (hours == "" && minutes == "" && seconds == "") {
            document.getElementById("total" + i).value = "";
            continue;
        }
        if (hours == "") {
            hours = 0;
        }
        if (minutes == "") {
            minutes = 0;
        }
        if (seconds == "") {
            seconds = 0;
        }
        if (hours < 0 || minutes < 0 || seconds < 0) {
            document.getElementById("total" + i).value = "NaN";
            continue;
        }
        if (seconds >= 60 && seconds <= 1000000) {
            while (seconds >= 60) {
                minutes++;
                seconds -= 60;
            }
            document.getElementById("seconds" + i).value = seconds;
            document.getElementById("minutes" + i).value = minutes;
        }
        if (minutes >= 60 && minutes <= 1000000) {
            while (minutes >= 60) {
                hours++;
                minutes -= 60;
            }
            document.getElementById("minutes" + i).value = minutes;
            document.getElementById("hours" + i).value = hours;
        }
        total = (hours * 60 * 60) + (minutes * 60) + (seconds * 1);
        if (total === 0) {
            total = "";
            document.getElementById("total" + i).value = total;
            continue;
        }
        document.getElementById("total" + i).value = total + " seconds";
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].checked) {
            calculateCheckBoxTotal();
        }
    }
};

function calculateCheckBoxTotal() {
    var totalHours = 0;
    var totalMinutes = 0;
    var totalSeconds = 0;
    var granTotal = 0;
    var test = true;
    var data = document.getElementsByName("cb");
    for (var i = 0; i < data.length; i++) {
        if (data[i].checked) {
            totalHours += document.getElementById("hours" + i).value * 1;
            totalMinutes += document.getElementById("minutes" + i).value * 1;
            totalSeconds += document.getElementById("seconds" + i).value * 1;
            test = false;
        }
    }
    if (test) {
        document.getElementById("totalSeconds").value = "";
        document.getElementById("totalMinutes").value = "";
        document.getElementById("totalHours").value = "";
        document.getElementById("granTotal").value = "";
        return;
    }
    if (totalHours < 0 || totalMinutes < 0 || totalSeconds < 0) {
        document.getElementById("granTotal").value = "NaN";
        return;
    }
    if (totalHours == "" && totalMinutes == "" && totalSeconds == "") {
        return;
    }
    document.getElementById("totalSeconds").value = totalSeconds * 1;
    document.getElementById("totalMinutes").value = totalMinutes * 1;
    document.getElementById("totalHours").value = totalHours * 1;
    granTotal = (totalHours * 60 * 60) + (totalMinutes * 60) + (totalSeconds * 1);
    if (granTotal === 0) {
        granTotal = "";
        document.getElementById("granTotal").value = granTotal;
        document.getElementById("totalSeconds").value = "";
        document.getElementById("totalMinutes").value = "";
        document.getElementById("totalHours").value = "";
        return;
    }
    document.getElementById("granTotal").value = granTotal + " seconds";
};
