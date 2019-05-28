//***************************************************
// This page has the purpose of integrating code 
// in JS so all other pages can work more
// Effectively and with clean code. 
//****************************************************


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAIcGQ94aGJRMZihtoTcmMK7j3NavnPEOs",
    authDomain: "byui-accessibility-redemption.firebaseapp.com",
    databaseURL: "https://byui-accessibility-redemption.firebaseio.com",
    projectId: "byui-accessibility-redemption",
    storageBucket: "byui-accessibility-redemption.appspot.com",
    messagingSenderId: "630332651011"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

var user = firebase.auth().currentUser;
var userID = [];
var userName = [];
var checkDuplicates = [];
var userAction = [];
var userPrepares = [];


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (window.location.pathname != '/index.html') {
            // User is signed in.
            db.collection('users').where('name', "==", user.displayName).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var userData = doc.data();
                        if (userData.lead) {
                            document.getElementById('master').classList.remove('hide');
                        }
                        if (userData.role == "Copyedit") {
                            document.getElementById('copyEdit').classList.remove('hide');
                            document.getElementById('prepare').classList.add('hide');
                            document.getElementById('transcribe').classList.add('hide');
                            document.getElementById('copyEditCheck').classList.add('hide');
                            if (userData.lead) {
                                document.getElementById('copyEditCheck').classList.remove('hide');
                            }
                        }
                        if (userData.role == "Quality Assurance" ^ (doc.data().name == 'Lucas Wargha' || doc.data().name == 'Calvin Smoot')) {
                            document.getElementById('copyEdit').classList.add('hide');
                            document.getElementById('copyEditCheck').classList.add('hide');
                        }
                        if (doc.data().webMaster != null){
                            if (doc.data().webMaster) {
                                document.getElementById('master').classList.remove('hide');
                                document.getElementById('copyEdit').classList.remove('hide');
                                document.getElementById('copyEditCheck').classList.remove('hide');
                            }
                        }
                    })
                })
        } else {
            if (window.location.pathname != '/home.html') {
                window.location.assign('home.html');
            } else {

            }
        }
    } else {
        if (window.location.pathname != '/index.html') {
            window.location.assign('index.html');
        } else {

        }

    }
});

//logs out the user
// Logout of firebase and website
function userLogout() {
    firebase.auth().signOut();
    window.location.reload();
}


// Get information from the Univeristy Catalog

// getCourses();
//get courses for the dropdown through xmlh request
function getCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            var res = JSON.parse(this.responseText);
            var id = res._id;
            var newxhttp = new XMLHttpRequest();
            newxhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status === 200) {
                    var newres = JSON.parse(this.responseText);
                    for (var i = 0; i < newres.length; i++) {
                        var course = newres[i]['__catalogCourseId'];
                        document.getElementById('requestCourse').insertAdjacentHTML('beforeend', '<option value=\'' + course + '\'>' + course + '</option>');
                    }
                }
            };
            newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
            newxhttp.send();
        }
    };
    xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
    xhttp.send();
}

function verifyEmail() {
    var user = firebase.auth().currentUser;
    console.log(user.emailVerified);
    if (user.emailVerified == true) {
        document.getElementById("verifyButton").className = 'hide';
    } else {
        user.sendEmailVerification().then(function () {
            // Email sent.
            alert("Email has been sent. Please check inbox");
        }).catch(function (error) {
            // An error happened.
        });
    }

}


//generates the code to the user, according to the media url received
function showCodeEmbedded() {
    document.getElementById('codehtml').innerText = '';
    var transcriptID = document.getElementById('storeTranscriptID').innerText;
    db.collection('accessibility').doc(transcriptID).get()
        .then(function (doc) {
            var link, height, seconds, title, pubLink;
            link = doc.data().srcURL;
            height = Number(document.getElementById('requestHeight').value);
            seconds = Number(document.getElementById('requestLength').value);
            title = doc.data().title;
            if (document.getElementById('googleDocPublish').value != '' && document.getElementById('googleDocPublish').value.includes('/pub') && height != '' && seconds != '') {
                pubLink = document.getElementById('googleDocPublish').value;
                getModal();
            } else {
                alert("Before getting the code, make sure to add a published google doc to the transcript as well as a height a and a length for the transcript, if necessary.");
            }

            var setlink = pubLink;
            var time = secondsToHms(seconds);

            if (link.includes("youtube")) {
                var id = link.slice(link.indexOf("watch?v=") + 8, (link.indexOf("watch?v=") + 9) + 11);
                var html = `<p><iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;


            } else if (link.includes("youtu.be")) {
                var id = link.slice(link.indexOf(".be/") + 4, (link.indexOf(".be/") + 4) + 11);
                var html = `<p><iframe width="560" height="${height}px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;

            } else if (link.includes("video.byui.edu")) {
                var id = link.slice(link.indexOf("/0_") + 1, (link.indexOf("/0_") + 1) + 10);
                var html = `<p><iframe id="kaltura_player_1534785808" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" width="560" height="${height}" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0"></iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;

            } else if (link.includes("vimeo")) {
                var id = link.slice(link.indexOf("vimeo.com/") + 10, (link.indexOf("vimeo.com/") + 10) + 9);
                var html = `<p><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" width="560" height="${height}px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br>
            (${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;

            } else if (link.includes("fod.infobase.com")) {
                var id = link.slice(link.indexOf("loid=") + 5, (link.indexOf("loid=") + 5) + 5);
                var html = `<p><iframe allow='encrypted-media' height='${height}' frameborder='0' width='560' style='border: 1px solid #ddd;'  src='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' allowfullscreen >&nbsp;</iframe><br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;

            } else {
                var html = `<p><a href='${link}' target="_blank">Go to this link and get the embed code to place</a><br>Copy the rest of this and place it in with the embedded in a single p tag<br>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;
            }
        })
}

function showCodeLink() {
    var transcriptID = document.getElementById('storeTranscriptID').innerText;
    document.getElementById('codehtml').innerText = '';
    db.collection('accessibility').doc(transcriptID).get()
        .then(function (doc) {
            var link, seconds, title, pubLink;
            link = doc.data().srcURL;
            // height = Number(document.getElementById('requestHeight').value);
            seconds = Number(document.getElementById('requestLength').value);
            title = doc.data().title;
            if (document.getElementById('googleDocPublish').value != '' && document.getElementById('googleDocPublish').value.includes('/pub') && seconds != '') {
                pubLink = document.getElementById('googleDocPublish').value;
                getModal();
            } else {
                alert("Before getting the code, make sure to add a published google doc to the transcript as well as a length for the transcript, if necessary.");
            }
            var setlink = pubLink;
            var time = secondsToHms(seconds);

            if (link.includes("youtube")) {
                var id = link.slice(link.indexOf("watch?v=") + 8, (link.indexOf("watch?v=") + 9) + 11);
                var html = `<p><a href="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;
            } else if (link.includes("youtu.be")) {
                var id = link.slice(link.indexOf(".be/") + 4, (link.indexOf(".be/") + 4) + 11);
                var html = `<p><a href="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;
            } else if (link.includes("video.byui.edu")) {
                var id = link.slice(link.indexOf("/0_") + 1, (link.indexOf("/0_") + 1) + 10);
                var html = `<p><a href="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;
            } else if (link.includes("vimeo")) {
                var id = link.slice(link.indexOf("vimeo.com/") + 10, (link.indexOf("vimeo.com/") + 10) + 9);
                var html = `<p><a href="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0 target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;
            } else if (link.includes("fod.infobase.com")) {
                var id = link.slice(link.indexOf("loid=") + 5, (link.indexOf("loid=") + 5) + 5);
                var html = `<p><a href='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;
            } else {
                var html = `<p><a href='${link}' target="_blank">${title}</a>(${time} mins, <a href="${setlink}" target="_blank">${title} Transcript</a>)</p>`;
                document.getElementById('codehtml').innerText = html;
            }
        })
}