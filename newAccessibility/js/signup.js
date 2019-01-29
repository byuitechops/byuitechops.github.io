//***************************************************
// Purpose: Handles sign up and makes sure the user
// provides enough information to create an account
//****************************************************
function submitSignUp() {
    var email = document.getElementById('signUpEmail').value;
    var inputName = document.getElementById('signUpName').value;
    var password = document.getElementById('signUpPassword').value;
    var inputRole = document.getElementById('signUpRole').value;
    var message = document.getElementById('message');
    if (email == "" || inputName == "" || password == "" || inputRole == "Select Who You Are") {
        message.innerHTML = "You must fill in all inputs";
        message.style.color = "red";
        resetMessage();
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {
                // Update display name
                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: inputName
                }).then(function () {
                    // Update successful.
                    // Add Data to database
                    db.collection("users").add({
                            email: email,
                            name: inputName,
                            role: inputRole
                        })
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            // User is signed in.
                            window.location.assign('home.html');
                        })
                        .catch(function (error) {
                            console.error("Error adding document: ", error);
                            message.innerHTML = error.message;
                            message.style.color = "red";
                            resetMessage();
                        });
                }).catch(function (error) {
                    // An error happened.
                    console.error("Error adding document: ", error);
                    message.innerHTML = error.message;
                    message.style.color = "red";
                    resetMessage();
                });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.error("Error adding document: ", error);
                message.innerHTML = error.errorMessage;
                message.style.color = "red";
                resetMessage();
            });
    }
}

//ressets error message
function resetMessage() {
    setTimeout(() => {
        message.innerHTML = "";
        message.style.color = "black";
    }, 10000);
}