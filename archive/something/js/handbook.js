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
    // Check if logged in
    if (firebaseUser) {
        var name;
        // Get current user
        var user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
            // Get current users name
            name = profile.displayName;
            firebase.database().ref('users').child(name).on('value', snap => {
                // Loop through user
                var titles;
                var shot = snap.val();
                for (titles in shot) {
                    if (titles == 'Admin') {
                        // Check if user is admin
                        if (shot[titles] == true) {
                            //Load Admin Link
                            document.getElementById('adminlink').classList.remove('hide');
                        }
                    }
                }
            });
        });
    } else {
        // User is signed out send page back to log in page
        window.location.replace("index.html");
    }
});
