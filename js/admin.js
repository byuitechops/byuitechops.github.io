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


firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // If not admin change to home
        var name;
        var user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
            name = profile.displayName;
            firebase.database().ref('users').child(name).on('value', snap => {
                var titles;
                var shot = snap.val();
                for (titles in shot) {
                    if (titles == 'Admin') {
                        //Load Page
                        document.getElementById('view');
                        // Start listing users from the beginning, 1000 at a time.
                        firebase.database().ref('users').on('value', snap => {
                            snap = snap.val();
                            var users;
                            for (users in snap) {
                                console.log(users);
                                document.getElementById('view').innerHTML += users;
                            }
                        });
                        break;
                    } else {
                        window.location.replace("home.html");
                    }

                }

            });
        });
    } else {
        window.location.replace("index.html");
    }
});
