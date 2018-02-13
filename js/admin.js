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
        // If not admin change to home
        var name;
        var user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
            name = profile.displayName;
            firebase.database().ref('users').child(name).on('value', snap => {
                var titles;
                var shot = snap.val();
                for (titles in shot) {
                    if (titles == 'Admin') {
                        //Load Page
                        document.getElementById('view');
                        // Start listing users from the beginning, 1000 at a time.
                        firebase.database().ref('users').on('value', snap => {
                            snap = snap.val();
                            var users;
                            var list = [];
                            for (users in snap) {
                                list.push(users);
                            }
                            tableCreate(list);
                        });
                        break;
                    } else {
                        window.location.replace("home.html");
                    }

                }

            });
        });
    } else {
        window.location.replace("index.html");
    }
});

function tableCreate(list) {
    var view = document.getElementById('view');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    var z = 0;
    for (var i = 0; i < list.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            var td = document.createElement('td');
            td.style.textAlign = 'center';
            if (j == 0) {
                td.appendChild(document.createTextNode(list[z]));
            } else if (j == 1) {
                var btnV = document.createElement("BUTTON");
                btnV.setAttribute('value', list[z]);
                btnV.setAttribute('onclick', "viewUser(this.value)");
                var tV = document.createTextNode("View");
                btnV.appendChild(tV);

                var btnE = document.createElement("BUTTON");
                btnE.setAttribute('value', list[z]);
                btnE.setAttribute('onclick', "location.href='permissions.html?edit");
                var tE = document.createTextNode("Edit");
                btnE.appendChild(tE);

                var btnD = document.createElement("BUTTON");
                btnD.setAttribute('value', list[z]);
                btnD.setAttribute('onclick', "deleteUser(this.value)");
                var tD = document.createTextNode("Delete");
                btnD.appendChild(tD);

                var btnF = document.createElement("BUTTON");
                btnF.setAttribute('value', list[z]);
                btnF.style.backgroundColor = '#f22500';
                btnF.setAttribute('onclick', "if (confirm('Are your sure you want to fire ' + this.value)){ window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}");
                var tF = document.createTextNode("Fire");
                btnF.appendChild(tF);

                td.appendChild(btnV);
                td.appendChild(btnE);
                td.appendChild(btnD);
                td.appendChild(btnF);
                z++;
            }
            tr.appendChild(td);
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    view.appendChild(tbl)
}

function viewUser(user) {
    viewModal.style.display = "block";
    var content = document.getElementById('viewModalContent');
    if (content.firstChild) {
        content.insertBefore(document.createTextNode(user), content.firstChild);
    }
    var shot;
    var list = [];
    firebase.database().ref('users/' + user).on('value', snapshot => {
        shot = snapshot.val();
        var titles;
        for (titles in shot) {
            list.push(titles);
        }
    })
    var viewTable = document.getElementById('viewTable');
    var tbl = document.createElement('table');
    tbl.setAttribute('width', '50%');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    var z = 0;
    for (var i = 0; i < list.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            var td = document.createElement('td');
            td.style.textAlign = 'center';
            if (j == 0) {
                td.appendChild(document.createTextNode(list[z]));
            } else if (j == 1) {
                var t = document.createTextNode("Fire");
                td.appendChild(t);
            }
            tr.appendChild(td); 
        }
            z++;
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    viewTable.appendChild(tbl)
}

function deleteUser(user) {
    if (confirm('Are you sure you want to delete ' + user + ' from authentication and from the database?')) {
        return firebase.database().ref('users').child(user).remove()
            .then(function () {
                alert(user + 'is deleted');
            })
            .catch(function (error) {
                alert(error)
            });
    }
}

// Get the View modal
var viewModal = document.getElementById('viewModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    viewModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == viewModal) {
        viewModal.style.display = "none";
    }
}

// Get the modal
var viewModal = document.getElementById('viewModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    viewModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == viewModal) {
        viewModal.style.display = "none";
    }
}
