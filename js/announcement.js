    // Firebase
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
            var db = firebase.database().ref('announcements');
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
            var db = firebase.database().ref('announcements');
            db.on('value', snap => {
                console.log(snap.val())
            })

            function sendAnnouncementToFirebase(title, message, image, text, link, date) {
                var data = {
                    "title": title,
                    "message": message,
                    "image": image,
                    "text": text,
                    "link": link,
                    "date": date
                }
                var key = db.push().key;
                db.push(data);
                modal.style.display = "none";
            }
            // Display Announcements
            db.on('value', snap => {
                var keys = Object.keys(snap.val());
                var html = "";
                for (var i = 0; i < keys.length; i++) {
                    var childKey = snap.key;
                    var childData = snap.val()[keys[i]];
                    if (childData.urgency == true) {
                        var urgent = "<strong style='color: red' font-family: 'Impact'>URGENT</strong>";
                    } else var urgent = "";
                    if (childData != "null") {
                        html += "<hr><div class='item'>" + urgent + "<h2>" + childData.title + "</h2><p>" + childData.message + "</p><input class='deleteButton' type='button' onclick=\"deleteAnnouncement('" + keys[i] + "')\" value='Delete'></div>";
                        if (i == (keys.length - 1)) {
                            html += "<hr>";
                        }
                    }
                }
                document.getElementById('display').innerHTML = html;
            });
            // Delete Announcements
            db.on('value', snap => {
                snap.forEach(function (snapshot) {
                    var childKey = snapshot.key;
                    var childData = snapshot.val();
                    var firebasedate = childData.date;
                    var d = new Date();
                    var month = d.getMonth() + 1;
                    if (month < 10) {
                        month = '0' + month;
                    }
                    var date = d.getDate();
                    if (date < 10) {
                        date = '0' + date;
                    }
                    var today = d.getFullYear() + "-" + (month) + "-" + date;
                    //                    if (firebasedate < today) {
                    //                        db.child(childKey).set(null);
                    //                    };
                });
            });
            // Get the modal
            var modal = document.getElementById('myModal');
            // Get the button that opens the modal
            var btn = document.getElementById("myBtn");
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            // When the user clicks on the button, open the modal 
            btn.onclick = function () {
                modal.style.display = "block";
            }
            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
                document.getElementById('title').value = "";
                document.getElementById('message').value = "";
                document.getElementById('urgency').value = "";
                document.getElementById('date').value = "";
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    document.getElementById('title').value = "";
                    document.getElementById('message').value = "";
                    document.getElementById('urgency').value = "";
                    document.getElementById('date').value = "";
                }
            }
        } else {
            // User is signed out.
            window.location.replace("index.html");
            // ...
        }
    });

    function deleteAnnouncement(toDelete) {
        if (confirm('Are you sure you want to delete this announcement?')) {
            firebase.database().ref('announcements/' + toDelete).remove();
        } else {
            return;
        }
    }

    function sendAnnouncementToFirebase() {
        var modal = document.getElementById('myModal');
        var currentDate = new Date();
        var db = firebase.database().ref('announcements/' + currentDate);
        var title = document.getElementById("title").value;
        var message = document.getElementById("message").value;
        var urgency = document.getElementById("urgency").checked;
        var date = document.getElementById("date").value;
        if (title == "") {
            if (confirm('Please include a title in your announcement.')) {
                return;
            } else {
                return;
            }
        }
        document.getElementById('title').value = "";
        document.getElementById('message').value = "";
        document.getElementById('urgency').value = "";
        document.getElementById('date').value = "";
        var data = {
            "title": title,
            "message": message,
            "urgency": urgency,
            "expirationDate": date
        }
        db.update(data);
        modal.style.display = "none";
    }
