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

    // Function to check which team
    var name;
    var user = firebase.auth().currentUser;
    user.providerData.forEach(function (profile) {
        name = profile.displayName;
        alert(name);
    });
}());
