(function () {
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
                var html = "";
                snap.forEach(function (snapshot) {
                    var childKey = snapshot.key;
                    var childData = snapshot.val();

                    if (childData != "null") {
                        html = "<div class='item'><img src='" + childData.image + "'><h2>" + childData.title + "</h2><p>" + childData.message + "</p><a href='" + childData.link + "' target='_blank'>" + childData.text + "</a></div>" + html;
                    };

                });

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

                    if (firebasedate < today) {
                        db.child(childKey).set(null);
                    };
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
                document.getElementById('image').value = "";
                document.getElementById('text').value = "";
                document.getElementById('link').value = "";
                document.getElementById('date').value = "";
                document.getElementById('imagecheck').checked = false;
                document.getElementById('linkcheck').checked = false;
                isChecked();
                tinymce.get('message').setContent("");
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    document.getElementById('title').value = "";
                    document.getElementById('image').value = "";
                    document.getElementById('text').value = "";
                    document.getElementById('link').value = "";
                    document.getElementById('date').value = "";
                    document.getElementById('imagecheck').checked = false;
                    document.getElementById('linkcheck').checked = false;
                    isChecked();
                    tinymce.get('message').setContent("");
                }
            }

            // Is the Checkbox checked
            function isChecked() {
                var imgcheck = document.getElementById('imagecheck');
                var selectImage = document.getElementById('selectImage');
                if (imgcheck.checked) {
                    selectImage.classList.remove('hide');
                } else {
                    selectImage.classList.add('hide');
                }

                var linkcheck = document.getElementById('linkcheck');
                var addLink = document.getElementById('addLink');
                if (linkcheck.checked) {
                    addLink.classList.remove('hide');
                } else {
                    addLink.classList.add('hide');
                }
            }

            // Submit the form
            document.getElementById('submitAnnounce').addEventListener('click', e => {
                var title = document.getElementById('title').value;
                var message = tinymce.get('message').getContent();
                var image = document.getElementById('image').value;
                var text = document.getElementById('text').value;
                var link = document.getElementById('link').value;
                var date = document.getElementById('date').value;

                sendAnnouncementToFirebase(title, message, image, text, link, date);

                document.getElementById('title').value = "";
                document.getElementById('image').value = "";
                document.getElementById('text').value = "";
                document.getElementById('link').value = "";
                document.getElementById('date').value = "";
                document.getElementById('imagecheck').checked = false;
                document.getElementById('linkcheck').checked = false;
                isChecked();
                tinymce.get('message').setContent("");
            });

            // WYSIWYG
            tinymce.init({
                selector: 'textarea'
            });
        } else {
            // User is signed out.
            window.location.replace("index.html");
            // ...
        }
    });
}());
