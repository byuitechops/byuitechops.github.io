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

const db = firebase.database().ref('announcements');

function sendAnnouncementToFirebase(title, message, image, date) {
    var data = {
        "title": title,
        "message": message,
        "image": image,
        "date": date
    }
    db.push(data);
    modal.style.display = "none";
}

// Display Announcements
db.on('value', snap => {
    var html = "";
    snap.forEach(function (snapshot) {
        var i = 1;
        var childKey = snapshot.key;
        var childData = snapshot.val();

        html = "<div class='item'><img src='" + childData.image + "'><h2>" + childData.title + "</h2><p>" + childData.message + "</p></div>" + html;        
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
        var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        
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
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the image checkbox
var img = document.getElementById('imagecheck');

// Is the Checkbox checked
function isChecked() {
    var imgcheck = document.getElementById('imagecheck');
    var selectImage = document.getElementById('selectImage');
    if (imgcheck.checked) {
        selectImage.classList.remove('hide');
    } else {
        selectImage.classList.add('hide');
    }
}

// Submit the form
function makeAnAnouncement() {
    var title = document.getElementById('title').value;
    var message = document.getElementById('message').value;
    message = message.replace(/\n/g, "<br>");
    var image = document.getElementById('image').value;
    var date = document.getElementById('date').value;
    sendAnnouncementToFirebase(title, message, image, date);
    document.getElementById('title').value = "";
    document.getElementById('message').value = "";
    document.getElementById('image').value = "";
    document.getElementById('date').value = "";
    document.getElementById('imagecheck').checked = false;
    isChecked();
}