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
        // If logged in do this
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
        window.location.replace("index.html");
    }
});
