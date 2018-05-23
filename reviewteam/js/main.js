// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4QPzcqjwXlZokv3IUuBUSQFF2VMg4xjQ",
    authDomain: "review-team.firebaseapp.com",
    databaseURL: "https://review-team.firebaseio.com",
    projectId: "review-team",
    storageBucket: "review-team.appspot.com",
    messagingSenderId: "1021047023591"
};
firebase.initializeApp(config);

var user;
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // If user is logged in
        firebase.auth().currentUser.providerData.forEach(function (profile) {
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

                        // Load Page
                    }
                }
            }
        });
    } else {
        // User is signed out.
        window.location.replace("index.html");
        // ...
    }
});
