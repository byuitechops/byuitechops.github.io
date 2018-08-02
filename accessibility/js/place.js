// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWv05RlAPUpAts6LNXgG5-wsdhd9jXafg",
    authDomain: "byui-accessability.firebaseapp.com",
    databaseURL: "https://byui-accessability.firebaseio.com",
    projectId: "byui-accessability",
    storageBucket: "byui-accessability.appspot.com",
    messagingSenderId: "275383619900"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = { /* your settings... */
    timestampsInSnapshots: true
};
db.settings(settings);


// Check if Logged In
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        db.collection('users').where('name', "==", user.displayName).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var userData = doc.data();
                    if (userData.role != "Copyedit") {
                        document.getElementById('place').classList.remove('hide');
                    }
                    if (userData.role == "Admin") {
                        document.getElementById('master').classList.remove('hide');
                    }
                    getData(userData);
                })
            })
    } else {
        // No user is signed in.
        window.location.assign('index.html');
    }
});

// Logout of firebase and website
document.getElementById('btnLogout').addEventListener('click', function () {
    firebase.auth().signOut();
});

function resetMessage() {
    setTimeout(() => {
        message.innerHTML = "";
        message.style.color = "black";
    }, 10000);
}

function getData(userData) {
    // Get Data
    db.collection("accessibility").orderBy('priority').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data().type}`);
                if (doc.data().placed == undefined && doc.data().docURL != undefined) {
                    if (doc.data().type == "Transcript") {
                        var text = `<span>${doc.data().courseCode}</span>
                                    <span>${doc.data().priority}</span>
                                    <span>${doc.data().type}</span>
                                    <span>${doc.data().title}</span>
                                    <span><a href="${doc.data().lmsURL}" target="_blank">Canvas URL</a></span>
                                    <span><button onclick="displayEmbedCode('${doc.data().srcURL}', '${doc.data().videoHeight}')">Show Code</button></span>
                                    <span><button onclick="displayLinkCode('${doc.data().srcURL}')">Show Code</button></span>
                                    <span><a href="${doc.data().docURL}" target="_blank">Doc URL</a></span>
                                    <button onclick="placeCheck('${doc.id}')">Place</button>`;
                    }
                    if (doc.data().type == "Alt Text") {
                        var text = `<span>${doc.data().courseCode}</span>
                                    <span>${doc.data().priority}</span>
                                    <span>${doc.data().type}</span>
                                    <span>${doc.data().title}</span>
                                    <span><a href="${doc.data().lmsURL}" target="_blank">Canvas URL</a></span>
                                    <span></span>
                                    <span></span>
                                    <span><a href="${doc.data().docURL}" target="_blank">Doc URL</a></span>
                                    <button onclick="placeCheck('${doc.id}')">Place</button>`;
                    }
                    document.getElementById('text').insertAdjacentHTML('beforeend', text);
                }
            });
        });
}


function displayEmbedCode(link, height) {
    console.log(link);
    modal.style.display = "block";
    document.getElementById('modal-heading').innerHTML = "Video Embed Code";
    if (link.includes("youtube")) {
        var id = link.slice(link.indexOf("watch?v=") + 8, (link.indexOf("watch?v=") + 9) + 11);
        console.log(id);
        var html = `<iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    } else if (link.includes("youtu.be")) {
        var id = link.slice(link.indexOf(".be/") + 4, (link.indexOf(".be/") + 4) + 11);
        console.log(id);
        var html = `<iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    } else if (link.includes("video.byui.edu")) {
        var id = link.slice(link.indexOf("/0_") + 1, (link.indexOf("/0_") + 1) + 10);
        console.log(id);
        var html = `<iframe id="kaltura_player_1532969286" src="http://cdnapi.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1532969286&entry_id=${id}&flashvars[streamerType]=auto"
                     width="560" height="${height}" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0"></iframe>`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    } else if (link.includes("vimeo")) {
        var id = link.slice(link.indexOf("vimeo.com/") + 10, (link.indexOf("vimeo.com/") + 10) + 9);
        console.log(id);
        var html = `<iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" width="560" height="${height}px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    } else {
        var html = `${link}`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    }
}

function displayLinkCode(link) {
    console.log(link);
    modal.style.display = "block";
    document.getElementById('modal-heading').innerHTML = "Video Embed Code";
    if (link.includes("youtube")) {
        var id = link.slice(link.indexOf("watch?v=") + 8, (link.indexOf("watch?v=") + 9) + 11);
        console.log(id);
        var html = `https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    } else if (link.includes("youtu.be")) {
        var id = link.slice(link.indexOf(".be/") + 4, (link.indexOf(".be/") + 4) + 11);
        console.log(id);
        var html = `https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    } else if (link.includes("video.byui.edu")) {
        var id = link.slice(link.indexOf("/0_") + 1, (link.indexOf("/0_") + 1) + 10);
        console.log(id);
        var html = `http://cdnapi.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1532969286&entry_id=${id}&flashvars[streamerType]=auto`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    } else if (link.includes("vimeo")) {
        var id = link.slice(link.indexOf("vimeo.com/") + 10, (link.indexOf("vimeo.com/") + 10) + 9);
        console.log(id);
        var html = `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    } else {
        var html = `${link}`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="cancel()">Close</button></div>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    }
}

function placeCheck(docId) {
    modal.style.display = "block";
    document.getElementById('modal-heading').innerHTML = "Place Check";
    db.collection('accessibility').doc(docId).get().then((doc) => {
        var html = `Has "${doc.data().title}" been correctly placed in ${doc.data().courseCode}?`;
        document.getElementById('intro').innerText = html;

        var html = `<div id="buttons"><button id="placeButton" onclick="updateDocToFB('` + docId + `')">Yes</button><button id="cancelButton" onclick="cancel()">No</button>`;
        document.getElementById('modal-content').insertAdjacentHTML('beforeend', html);
    })
}

function updateDocToFB(docId) {
    var user = firebase.auth().currentUser;
    db.collection('accessibility').doc(docId).update({
            placed: true,
            placer: user.displayName,
            placedDate: new Date()
        })
        .then(function () {
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error updating document: ', error);
            message.innerHTML = 'There was an error making the request. Please try again.';
            message.style.color = 'red';
            resetMessage();
        });
    modal.style.display = "none";
    document.getElementById('buttons').parentNode.removeChild(document.getElementById('buttons'));
    document.getElementById('intro').parentNode.removeChild(document.getElementById('intro'));
    document.getElementById('modal-message').innerHTML = "";
}

// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('intro').innerHTML = "";
    document.getElementById('buttons').parentNode.removeChild(document.getElementById('buttons'));
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('intro').innerHTML = "";
        document.getElementById('buttons').parentNode.removeChild(document.getElementById('buttons'));
    }
}

function cancel() {
    modal.style.display = "none";
    document.getElementById('intro').innerHTML = "";
    document.getElementById('buttons').parentNode.removeChild(document.getElementById('buttons'));
}