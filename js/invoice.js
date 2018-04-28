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
    // Check if user is logged in
    if (firebaseUser) {
        var name;
        // Get current user
        var user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
            // Get name of current user
            name = profile.displayName;
            firebase.database().ref('users').child(name).on('value', snap => {
                // Loop through user
                var titles;
                var shot = snap.val();
                for (titles in shot) {
                    if (titles == 'Admin') {
                        // Check if admin
                        if (shot[titles] == true) {
                            //Load Admin Link
                            document.getElementById('adminlink').classList.remove('hide');
                            var ref = firebase.database().ref('inventory');
                            ref.child('transactions').on('value', snap => {
                                snap = snap.val();
                                var key;
                                for (key in snap) {
                                    var div = document.createElement('div');
                                    div.insertAdjacentHTML('beforeend', "<h3>" + key + "</h3>");
                                    var key2;
                                    for (key2 in snap[key]) {
                                        if (key2 == "items") {
                                            var key3;
                                            for (key3 in snap[key][key2]) {
                                                var key4;
                                                for (key4 in snap[key][key2][key3]) {
                                                    div.insertAdjacentHTML('beforeend', "<p><span class='bold'>" + key3 + ": </span>" + snap[key][key2][key3][key4] + "</p>");
                                                }
                                            }
                                        } else if (key2 == "paymentTotal") {
                                            div.insertAdjacentHTML('beforeend', "<p><span class='bold'>Payment Total:</span> $" + snap[key][key2].toFixed(2) + "</p>");
                                        } else if (key2 == "paymentType") {
                                            div.insertAdjacentHTML('beforeend', "<p><span class='bold'>Payment Type:</span> " + snap[key][key2] + "</p>");
                                        } else if (key2 == "user") {
                                            div.insertAdjacentHTML('beforeend', "<p><span class='bold'>Buyer: </span>" + snap[key][key2] + "</p>");
                                        }
                                    }
                                    document.getElementById('trans').insertAdjacentElement('afterbegin', div);
                                }
                            })
                            ref.child('paymentTotals').on('value', snap => {
                                snap = snap.val();
                                document.getElementById('cash').insertAdjacentHTML('beforeend', "<p><span class='bold'>Cash:</span> $" + snap.cash.total.toFixed(2) + "</p>");
                                document.getElementById('venmo').insertAdjacentHTML('beforeend', "<p><span class='bold'>Venmo:</span> $" + snap.venmo.total.toFixed(2) + "</p>");
                            });
                            ref.child('items').on('value', snap => {
                                snap = snap.val();
                                var key;
                                for (key in snap) {
                                    document.getElementById('items').insertAdjacentHTML('beforeend', "<p><span class='bold'>" + key + ":</span> " + snap[key].count + " $" + snap[key].price + "</p>")
                                }
                            })
                        } else {
                            // Send page back to home page
                            window.location.replace("home.html");
                        }
                    }
                }
            });
        });
    } else {
        // Send page back to login page
        window.location.replace("index.html");
    }
});
