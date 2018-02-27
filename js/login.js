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
        window.location.replace("home.html");
    } else {

        var user;
        const txtEmail = document.getElementById('txtEmail');
        const txtPassword = document.getElementById('txtPassword');
        const btnLogin = document.getElementById('btnLogin');
        const btnSignup = document.getElementById('btnSignUp');
        const btnLogout = document.getElementById('btnLogout');

        document.getElementById('txtPassword').addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                btnLogin.click();
            }
        });

        btnLogin.addEventListener('click', e => {
            const email = txtEmail.value;
            const pass = txtPassword.value;
            const auth = firebase.auth();

            const promise = auth.signInWithEmailAndPassword(email, pass);
            promise.then(e => {
                var profile = firebase.auth().currentUser;
                profile.providerData.forEach(function (prof) {
                    if (prof.displayName == null) {
                        var getName = prompt('Enter your first and last name. Example: Zoe Miner');
                        if (getName != null) {
                            profile.updateProfile({
                                displayName: getName
                            });
                        };
                    };
                    user = prof.displayName;
                    console.log(user);
                    localStorage.setItem('user', user);
                    window.location.replace("home.html");
                });
            });
            promise.catch(e => {
                window.alert(e);
                document.getElementById('txtEmail').value = "";
                document.getElementById('txtPassword').value = "";
            });
        });

        btnSignup.addEventListener('click', e => {
            window.location.replace('signup.html');
        });

        document.getElementById('resetPassword').addEventListener('click', e => {
            var emailAddress = prompt('Input Email Address');
            firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
                // Email sent.
                alert("An email has been sent. Please check your email.");
            }).catch(function (error) {
                // An error happened.
                alert(error);
            });
        });
    }
})
