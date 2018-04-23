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

// Set the count to zero
var c = 0;

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        var name;
        // Get current logged in user
        var user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
            // Get name of user
            name = profile.displayName;
            // Go through the user
            firebase.database().ref('users').child(name).on('value', snap => {
                var titles;
                var shot = snap.val();
                for (titles in shot) {
                    if (titles == 'Admin') {
                        if (shot[titles] == true) {
                            //Load Admin Link
                            document.getElementById('adminlink').classList.remove('hide');
                            // If admin Load Page
                            document.getElementById('view');
                            // Start listing users
                            firebase.database().ref('users').on('value', snap => {
                                snap = snap.val();
                                var users;
                                var list = [];
                                for (users in snap) {
                                    list.push(users);
                                }
                                // Only create the table once
                                if (c == 0) {
                                    tableCreate(list);
                                    c++;
                                };
                            });
                            break;
                        }
                    } else {
                        // If not admin change to home
                        window.location.replace("home.html");
                    }

                }

            });
        });
    } else {
        // If not logged in send to login page
        window.location.replace("index.html");
    }
});

function tableCreate(list) {
    // Get the element the table will go in
    var view = document.getElementById('view');
    // Create the table & style it
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
                // If the first column put name is table cell
                td.appendChild(document.createTextNode(list[z]));
            } else if (j == 1) {
                // If the second column create the buttons
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

                // Style the buttons
                btnV.style.width = "5em";
                btnE.style.width = "5em";
                btnD.style.width = "5em";

                // Put the buttons into the table cell
                td.appendChild(btnV);
                td.appendChild(btnE);
                td.appendChild(btnD);
                z++;
            }
            // Put the cell into the row
            tr.appendChild(td);
        }
        // Put the row into the table body
        tbdy.appendChild(tr);
    }
    // Put the body into the table
    tbl.appendChild(tbdy);
    // Put the table into the page
    view.appendChild(tbl)
}

// This function displays the users and their permissions
function viewUser(user) {
    // Make the modal visible
    viewModal.style.display = "block";
    var shot;
    var list = [];
    var data = [];
    // Loop through user
    firebase.database().ref('users/' + user).on('value', snapshot => {
        shot = snapshot.val();
        var titles;
        for (titles in shot) {
            if (titles == 'TimeClock' || titles == "info") {
                // Don't add TimeClock or info to the list
                continue;
            } else {
                // Add everything else to the list
                list.push(titles);
                data.push(shot[titles]);
            }
        }
    })
    // Get where the table is going into
    var viewTable = document.getElementById('viewTable');
    // Create table and stlye it
    var tbl = document.createElement('table');
    tbl.style.width = '75%';
    tbl.style.margin = "0 auto 1em auto";
    tbl.setAttribute('border', '1');

    // Create table heading and style it
    var heading = document.createElement('caption');
    var node = document.createTextNode(user);
    heading.appendChild(node);
    heading.style.fontSize = "1.5em";
    heading.style.margin = "15px auto 20px auto";
    // Put heading into table
    tbl.appendChild(heading);

    // Create table body
    var tbdy = document.createElement('tbody');
    var z = 0;
    for (var i = 0; i < list.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            // Create table cell
            var td = document.createElement('td');
            td.style.textAlign = 'center';
            td.style.padding = "0.3em";
            td.style.textTransform = "capitalize";
            if (j == 0) {
                // If first column add item name
                // Put text into cell
                td.appendChild(document.createTextNode(list[z]));
            } else if (j == 1) {
                // If second column add item data
                var t = document.createTextNode(data[z]);
                // Put text into cell
                td.appendChild(t);
            }
            // Put cell into row
            tr.appendChild(td);
        }
        // Move to next item in list
        z++;
        // Put row into table body
        tbdy.appendChild(tr);
    }
    // Put body into table
    tbl.appendChild(tbdy);
    // Put table into page
    viewTable.appendChild(tbl);
}

// This function edits the users and their permissions
function editUser(user) {
    // Make modal visible
    editModal.style.display = "block";
    var shot;
    var list = [];
    var data = [];
    // Loop through user
    firebase.database().ref('users/' + user).on('value', snapshot => {
        shot = snapshot.val();
        var titles;
        for (titles in shot) {
            if (titles == 'TimeClock' || titles == 'info') {
                // Don't add TimeClock or info
                continue;
            } else {
                // Add item to list
                list.push(titles);
                data.push(shot[titles]);
            }
        }
    })
    // Get where table is to be put into page
    var editTable = document.getElementById('editTable');
    // Create table and style it
    var tbl = document.createElement('table');
    tbl.style.width = '75%';
    tbl.style.margin = "0 auto 1em auto";
    tbl.setAttribute('border', '1');

    // Add title to table & style it
    var heading = document.createElement('caption');
    var node = document.createTextNode(user);
    heading.appendChild(node);
    heading.style.fontSize = "1.5em";
    heading.style.margin = "15px auto 20px auto";
    tbl.appendChild(heading);

    // Create table body
    var tbdy = document.createElement('tbody');
    var z = 0;
    for (var i = 0; i < list.length; i++) {
        // Create table row
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            // Create table cell & style it
            var td = document.createElement('td');
            td.style.textAlign = 'center';
            td.style.padding = "0";
            td.style.textTransform = "capitalize";

            // Create dropdown
            var sTF = document.createElement('select');
            sTF.setAttribute('onChange', "updateFirebase('" + user + "', this.value, '" + list[z] + "')");
            sTF.style.margin = '0.5em';
            var caps = data[z];
            caps = String(caps);
            caps = caps.charAt(0).toUpperCase() + caps.slice(1);
            sTF.innerHTML = "<option value='' selected disabled hidden>" + caps + "</option>";

            if (j == 0) {
                // If column 1 put item name into cell
                var t = document.createTextNode(list[z]);
                td.setAttribute('value', list[z]);
                td.appendChild(t);
                td.value
            } else if (j == 1 && list[z] == 'Team') {
                // If column 2 and item is Team add dropdown & options of team
                sTF.innerHTML += "<select><option value='canvas 1'>Canvas 1</option><option value='canvas 3'>Canvas 3</option><option value='canvas 2'>Canvas 2</option></select>";
                td.appendChild(sTF);
            } else if (j == 1) {
                // If column 2 add dropdown & options of true or false
                sTF.innerHTML += "<select><option value='true'>True</option><option value='false'>False</option></select>";
                td.appendChild(sTF);
            }
            // Style cell
            td.style.padding = '0.25em';
            // Put cell into row
            tr.appendChild(td);
        }
        // Move to next item
        z++;
        // Put row into table body
        tbdy.appendChild(tr);
    }
    // Put table body into table
    tbl.appendChild(tbdy);
    // Put table into page
    editTable.appendChild(tbl);
}

// This function sends the updated info to firebase
function updateFirebase(user, value, title) {
    var info;
    if (value === 'true') {
        // If the input is true change the text to a bool
        value === true;
        // Create Data string
        info = '{"' + title + '": ' + value + '}';
    } else if (value === 'false') {
        // If the input is false change the text to a bool
        value === false;
        // Create Data string
        info = '{"' + title + '": ' + value + '}';
    } else {
        // If not true or false keep the text and create data string
        info = '{"' + title + '": "' + value + '"}';
    };

    // Turn data string into json object
    info = JSON.parse(info);
    // Send to firebase
    firebase.database().ref('users/' + user).update(info)
        .then(function () {
            // If it worked tell the user
            alert('Firebase has been updated.')
        })
        .catch(function (error) {
            // If it did not work show the user
            alert(error);
        });
    // Reload page
    location.reload();
}

// Deletes the user from the database
function deleteUser(user) {
    // Check if user really wants to delete the person
    if (confirm('Are you sure you want to delete ' + user + ' from the database?')) {
        // If they said yes remove person
        return firebase.database().ref('users').child(user).remove()
            .then(function () {
                // If removing the person worked remove person from dates
                return firebase.database().ref('dates').child(user).remove()
                    .then(function () {
                        // If removing person from dates worked alert user
                        alert(user + ' is deleted');
                    })
                    .catch(function (error) {
                        // If removing persom from date did not work alert user
                        alert(error)
                    });
            })
            .catch(function (error) {
                // If removing the person did not work alert user
                alert(error)
            });
    }
    // Reload page
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
