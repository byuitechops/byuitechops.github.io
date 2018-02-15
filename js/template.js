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
                        //Load Admin Link
                        var ul = document.getElementById('sidenav');
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        a.setAttribute('href', 'admin.html');
                        var t = document.createTextNode('Admin');
                        a.appendChild(t);
                        li.appendChild(a);
                        var ref = ul.lastChild;
                        ref.parentNode.insertBefore(li, ref.nextSibling);
                    }
                }
            });
        });
    } else {
        window.location.replace("index.html");
    }
});
