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


var admin = require("firebase-admin");

var serviceAccount = require("techopsportal-firebase-adminsdk-e37qn-4a4fbd5fd1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://techopsportal.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});



firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // If not admin change to home
        var name;
        var user = firebase.auth().currentUser;
        console.log(firebase.UserInfo);
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
                btnV.setAttribute('onclick', "location.href='permissions.html?view'");
                var tV = document.createTextNode("View");
                btnV.appendChild(tV);

                var btnE = document.createElement("BUTTON");
                btnE.setAttribute('value', list[z]);
                btnE.setAttribute('onclick', "location.href='permissions.html?edit");
                var tE = document.createTextNode("Edit");
                btnE.appendChild(tE);

                var btnD = document.createElement("BUTTON");
                btnD.setAttribute('value', list[z]);
                btnD.setAttribute('onclick', "if (confirm('Are you sure you want to delete this user from authentication and from the database?')) { var user = firebase.auth().User; user.delete().then(function() { alert(this.value + 'is deleted');}).catch(function(error) {alert(error)});}");
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

function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log("user", userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      }
    })
    .catch(function(error) {
      console.log("Error listing users:", error);
    });
}
// Start listing users from the beginning, 1000 at a time.
listAllUsers();