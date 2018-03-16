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

var c = 0;

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
                        if (shot[titles] == true) {
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
                                if (c == 0) {
                                    tableCreate(list);
                                    c++;
                                };
                            });
                            break;
                        }
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
    tbl.style.width = '60%';
    tbl.style.minWidth = '600px';
    tbl.style.margin = "0 auto 30px auto";
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
                btnE.setAttribute('onclick', "editUser(this.value)");
                var tE = document.createTextNode("Edit");
                btnE.appendChild(tE);

                var btnD = document.createElement("BUTTON");
                btnD.setAttribute('value', list[z]);
                btnD.setAttribute('onclick', "deleteUser(this.value)");
                var tD = document.createTextNode("Delete");
                btnD.appendChild(tD);

                btnV.style.width = "5em";
                btnE.style.width = "5em";
                btnD.style.width = "5em";

                td.appendChild(btnV);
                td.appendChild(btnE);
                td.appendChild(btnD);
                z++;
            }
            tr.appendChild(td);
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    view.appendChild(tbl)
}

// This function displays the users and their permissions
function viewUser(user) {
    viewModal.style.display = "block";
    var shot;
    var list = [];
    var data = [];
    firebase.database().ref('users/' + user).on('value', snapshot => {
        shot = snapshot.val();
        var titles;
        for (titles in shot) {
            if (titles == 'TimeClock' || titles == "info") {
                continue;
            } else {
                list.push(titles);
                data.push(shot[titles]);
            }
        }
    })
    var viewTable = document.getElementById('viewTable');
    var tbl = document.createElement('table');
    tbl.style.width = '75%';
    tbl.style.margin = "0 auto 1em auto";
    tbl.setAttribute('border', '1');

    var heading = document.createElement('caption');
    var node = document.createTextNode(user);
    heading.appendChild(node);
    heading.style.fontSize = "1.5em";
    heading.style.margin = "15px auto 20px auto";
    tbl.appendChild(heading);

    var tbdy = document.createElement('tbody');
    var z = 0;
    for (var i = 0; i < list.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            var td = document.createElement('td');
            td.style.textAlign = 'center';
            td.style.padding = "0.3em";
            td.style.textTransform = "capitalize";
            if (j == 0) {
                td.appendChild(document.createTextNode(list[z]));
            } else if (j == 1) {
                var t = document.createTextNode(data[z]);
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

// This function edits the users and their permissions
function editUser(user) {
    editModal.style.display = "block";
    var shot;
    var list = [];
    var data = [];
    firebase.database().ref('users/' + user).on('value', snapshot => {
        shot = snapshot.val();
        var titles;
        for (titles in shot) {
            if (titles == 'TimeClock' || titles == 'info') {
                continue;
            } else {
                list.push(titles);
                data.push(shot[titles]);
            }
        }
    })
    var editTable = document.getElementById('editTable');
    var tbl = document.createElement('table');
    tbl.style.width = '75%';
    tbl.style.margin = "0 auto 1em auto";
    tbl.setAttribute('border', '1');

    var heading = document.createElement('caption');
    var node = document.createTextNode(user);
    heading.appendChild(node);
    heading.style.fontSize = "1.5em";
    heading.style.margin = "15px auto 20px auto";
    tbl.appendChild(heading);

    var tbdy = document.createElement('tbody');
    var z = 0;
    for (var i = 0; i < list.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            var td = document.createElement('td');
            td.style.textAlign = 'center';
            td.style.padding = "0";
            td.style.textTransform = "capitalize";
            var sTF = document.createElement('select');
            sTF.setAttribute('onChange', "updateFirebase('" + user + "', this.value, '" + list[z] + "')");
            sTF.style.margin = '0.5em';
            var caps = data[z];
            caps = String(caps);
            caps = caps.charAt(0).toUpperCase() + caps.slice(1);
            sTF.innerHTML = "<option value='' selected disabled hidden>" + caps + "</option>";

            if (j == 0) {
                var t = document.createTextNode(list[z]);
                td.setAttribute('value', list[z]);
                td.appendChild(t);
                td.value
            } else if (j == 1 && list[z] == 'Team') {
                sTF.innerHTML += "<select><option value='canvas 1'>Canvas 1</option><option value='canvas 3'>Canvas 3</option><option value='canvas 2'>Canvas 2</option></select>";
                td.appendChild(sTF);
            } else if (j == 1 && list[z] == 'TeamLead') {
                sTF.innerHTML += "<select><option value='canvas 1'>Canvas 1</option><option value='canvas 3'>canvas 3</option><option value='canvas 2'>Canvas 2</option><option value='false'>False</option></select>";
                td.appendChild(sTF);
            } else if (j == 1) {
                sTF.innerHTML += "<select><option value='true'>True</option><option value='false'>False</option></select>";
                td.appendChild(sTF);
            }
            td.style.padding = '0.25em';
            tr.appendChild(td);
        }
        z++;
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    editTable.appendChild(tbl);
}

// This function sends the updated info to firebase
function updateFirebase(user, value, title) {
    var info;
    if (value === 'true') {
        value === true;
        info = '{"' + title + '": ' + value + '}';
    } else if (value === 'false') {
        value === false;
        info = '{"' + title + '": ' + value + '}';
    } else {
        info = '{"' + title + '": "' + value + '"}';
    };

    console.log(info);
    info = JSON.parse(info);
    firebase.database().ref('users/' + user).update(info)
        .then(function () {
            alert('Firebase has been updated.')
        })
        .catch(function (error) {
            alert(error);
        });
    location.reload();
}

// Deletes the user from the database
function deleteUser(user) {
    if (confirm('Are you sure you want to delete ' + user + ' from the database?')) {
        return firebase.database().ref('users').child(user).remove()
            .then(function () {
                return firebase.database().ref('dates').child(user).remove()
                    .then(function () {
                        alert(user + ' is deleted');
                    })
                    .catch(function (error) {
                        alert(error)
                    });
            })
            .catch(function (error) {
                alert(error)
            });
    }
    location.reload();
}

// Get the View modal
var viewModal = document.getElementById('viewModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', e => {
    var tableContent = document.getElementById('viewTable');
    while (tableContent.firstChild) {
        tableContent.removeChild(tableContent.firstChild);
    }
    viewModal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', e => {
    if (event.target == viewModal) {
        var tableContent = document.getElementById('viewTable');
        while (tableContent.firstChild) {
            tableContent.removeChild(tableContent.firstChild);
        }
        viewModal.style.display = "none";
    }
});

// Get the Edit modal
var editModal = document.getElementById('editModal');

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close")[1];

// When the user clicks on <span> (x), close the modal
span2.addEventListener('click', e => {
    var tableContent = document.getElementById('editTable');
    while (tableContent.firstChild) {
        tableContent.removeChild(tableContent.firstChild);
    }
    editModal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', e => {
    if (event.target == editModal) {
        var tableContent = document.getElementById('editTable');
        while (tableContent.firstChild) {
            tableContent.removeChild(tableContent.firstChild);
        }
        editModal.style.display = "none";
    }
});
