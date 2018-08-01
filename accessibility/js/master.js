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
                    if (userData.role != "Admin") {
                        window.location.assign('home.html');
                        document.getElementById('master').classList.add('hide');
                    }
                    getData(userData);
                })
            })
    } else {
        // No user is signed in.
        window.location.assign('home.html');
    }
});

// Get Data
function getData(userData) {
    db.collection("accessibility").orderBy('title').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().title}`);

            var items = ["type", "title", "docURL", "courseCode"];

            for (var i = 0; i < items.length; i++) {
                var item;
                if (doc.data()[items[i]] == undefined) {
                    item = document.createElement('span');
                    item.innerHTML = "Empty";
                    item.style.color = "red";
                } else {
                    item = document.createElement('span');
                    item.innerHTML = doc.data()[items[i]];
                }
                document.getElementById('text').insertAdjacentElement('beforeend', item);
            }
            document.getElementById('text').insertAdjacentHTML('beforeend', `<button onclick="viewItem('${doc.id}')">View</button>`);
        });
    });
}

// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('docData').innerHTML = "";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('docData').innerHTML = "";
    }
}

function viewItem(docId) {
    modal.style.display = "block";

    db.collection("accessibility").doc(docId).get()
        .then((doc) => {
            // console.log(doc.data());

            if (doc.data().type = "Transcript") {
                var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsLink", "priority",
                             "requestor", "srcURL", "status", "transcriber", "videoHeight", "videoLength", 
                             "week", "requestDate", "transcriptClaimed", "transcriptFinished", "reviewClaimed", "reviewFinished"];
    
                for (var i = 0; i < items.length; i++) {
                    var p = document.createElement('p');
                    var item = document.createElement('span');
                    var title = items[i].charAt(0).toUpperCase() + items[i].slice(1);

                    if (doc.data()[items[i]] == undefined) {
                        item.innerHTML = ": Empty";
                        item.style.color = "red";
                    } else if (items[i] == "requestDate" || items[i] == "transcriptClaimed" || items[i] == "transcriptFinished"
                    || items[i] == "reviewClaimed" || items[i] == "reviewFinished") {
                        item.innerHTML = `: ${doc.data()[items[i]].toDate()}`;
                    } else {
                        item.innerHTML = `: ${doc.data()[items[i]]}`;
                    }
                    document.getElementById('docData').insertAdjacentElement('beforeend', p);
                    p.insertAdjacentHTML('beforeend', `${title}`);
                    p.insertAdjacentElement('beforeend', item);
                    p.insertAdjacentHTML('beforeend', `<button onclick="editItem('${items[i]}')">Edit</button>`);
                }
            }

            if (doc.data().type == "Alt Text") {
                var items = ["type", "title", "docURL", "courseCode", "copyeditor", "lmsLink", "priority",
                             "requestor", "status", "week", "requestDate", "copyeditClaimed", "copyeditFinished"];
    
                for (var i = 0; i < items.length; i++) {
                    var item;
                    if (doc.data()[items[i]] == undefined) {
                        item = document.createElement('span');
                        item.innerHTML = "Empty";
                        item.style.color = "red";
                    } else {
                        item = document.createElement('span');
                        item.innerHTML = doc.data()[items[i]];
                    }
                    // document.getElementById('text').insertAdjacentElement('beforeend', item);
                }
                // document.getElementById('text').insertAdjacentHTML('beforeend', `<button onclick="viewItem('${doc.id}')">View</button>`);
            }



            var html;
            var type = doc.data().type;
            var title = doc.data().title;
            var docURL = doc.data().docURL;
            var courseCode = doc.data().courseCode;
            var copyeditor = doc.data().copyeditor;
            var lmsLink = doc.data().lmsLink;
            var priority = doc.data().priority;
            var requestor = doc.data().requestor;
            var srcURL = doc.data().srcURL;
            var status = doc.data().status;
            var transcriber = doc.data().transcriber;
            var videoHeight = doc.data().videoHeight;
            var videoLength = doc.data().videoLength;
            var week = doc.data().week;
            var copyeditClaimed = doc.data().copyeditClaimed;
            var copyeditFinished = doc.data().copyeditFinished;
            var requestDate = doc.data().requestDate;
            var transcriptClaimed = doc.data().transcriptClaimed;
            var transcriptFinished = doc.data().transcriptFinished;
            var reviewFinished = doc.data().reviewFinished;
            var reviewClaimed = doc.data().videoLength;

            if (doc.data().type == undefined) {
                type = "Empty";
            }
            if (doc.data().title == undefined) {
                title = "Empty";
            }
            if (doc.data().docURL == undefined) {
                docURL = "Empty";
            }
            if (doc.data().courseCode == undefined) {
                courseCode = "Empty";
            }
            if (doc.data().copyeditor == undefined) {
                copyeditor = "Empty";
            }
            if (doc.data().lmsLink == undefined) {
                lmsLink = "Empty";
            }
            if (doc.data().priority == undefined) {
                priority = "Empty";
            }
            if (doc.data().requestor == undefined) {
                requestor = "Empty";
            }
            if (doc.data().srcURL == undefined) {
                srcURL = "Empty";
            }
            if (doc.data().status == undefined) {
                status = "Empty";
            }
            if (doc.data().transcriber == undefined) {
                transcriber = "Empty";
            }
            if (doc.data().videoHeight == undefined) {
                videoHeight = "Empty";
            }
            if (doc.data().videoLength == undefined) {
                videoLength = "Empty";
            }
            if (doc.data().week == undefined) {
                week = "Empty";
            }

            if (doc.data().copyeditClaimed == undefined) {
                copyeditClaimed = "Empty";
            } else {
                copyeditClaimed = copyeditClaimed.toDate();
            }

            if (doc.data().copyeditFinished == undefined) {
                copyeditFinished = "Empty";
            } else {
                copyeditFinished = copyeditFinished.toDate();
            }

            if (doc.data().requestDate == undefined) {
                requestDate = "Empty";
            } else {
                requestDate = requestDate.toDate();
            }

            if (doc.data().transcriptClaimed == undefined) {
                transcriptClaimed = "Empty";
            } else {
                transcriptClaimed = transcriptClaimed.toDate();
            }

            if (doc.data().transcriptFinished == undefined) {
                transcriptFinished = "Empty";
            } else {
                transcriptFinished = transcriptFinished.toDate();
            }

            if (doc.data().reviewFinished == undefined) {
                reviewFinished = "Empty";
            } else {
                reviewFinished = reviewFinished.toDate();
            }

            if (doc.data().reviewClaimed == undefined) {
                reviewClaimed = "Empty";
            } else {
                reviewClaimed = reviewClaimed.toDate();
            }

            if (doc.data().type == "Transcript") {
                html = `<p>Type: ${type} <button onclick="editItem(type)>Edit</button></p>
                        <p>Title: ${title} <button onclick="editItem(type)>Edit</button></p>
                        <p>Doc URl: ${docURL} <button onclick="editItem(type)>Edit</button></p>
                        <p>Course Code: ${courseCode} <button onclick="editItem(type)>Edit</button></p>
                        <p>Copyeditor: ${copyeditor} <button onclick="editItem(type)>Edit</button></p>
                        <p>Canvas URl: ${lmsLink} <button onclick="editItem(type)>Edit</button></p>
                        <p>Prority: ${priority} <button onclick="editItem(type)>Edit</button></p>
                        <p>Request Date: ${requestDate} <button onclick="editItem(type)>Edit</button></p>
                        <p>Requestor: ${requestor} <button onclick="editItem(type)>Edit</button></p>
                        <p>Review Finished: ${reviewFinished} <button onclick="editItem(type)>Edit</button></p>
                        <p>Source URL: ${srcURL} <button onclick="editItem(type)>Edit</button></p>
                        <p>Status: ${status} <button onclick="editItem(type)>Edit</button></p>
                        <p>Transcriber: ${transcriber} <button onclick="editItem(type)>Edit</button></p>
                        <p>Transcript Claimed: ${transcriptClaimed} <button onclick="editItem(type)>Edit</button></p>
                        <p>Transcript Finished: ${transcriptFinished} <button onclick="editItem(type)>Edit</button></p>
                        <p>Video Height: ${videoHeight} <button onclick="editItem(type)>Edit</button></p>
                        <p>Video Length: ${videoLength} <button onclick="editItem(type)>Edit</button></p>
                        <p>Review Claimed: ${reviewClaimed} <button onclick="editItem(type)>Edit</button></p>
                        <p>Week: ${week} <button onclick="editItem(type)>Edit</button></p>`;
            }

            if (doc.data().type == "Alt Text") {
                html = `<p>Type: ${type} <button onclick="editItem(type)>Edit</button></p>
                        <p>Title: ${title} <button onclick="editItem(type)>Edit</button></p>
                        <p>Doc URl: ${docURL} <button onclick="editItem(type)>Edit</button></p>
                        <p>Course Code: ${courseCode} <button onclick="editItem(type)>Edit</button></p>
                        <p>Copyeditor: ${copyeditor} <button onclick="editItem(type)>Edit</button></p>
                        <p>Canvas URL: ${lmsLink} <button onclick="editItem(type)>Edit</button></p>
                        <p>Prority: ${priority} <button onclick="editItem(type)>Edit</button></p>
                        <p>Request Date: ${requestDate} <button onclick="editItem(type)>Edit</button></p>
                        <p>Requestor: ${requestor} <button onclick="editItem(type)>Edit</button></p>
                        <p>Status: ${status} <button onclick="editItem(type)>Edit</button></p>
                        <p>Copyedit Claimed: ${copyeditClaimed} <button onclick="editItem(type)>Edit</button></p>
                        <p>Copyedit Finished: ${copyeditFinished} <button onclick="editItem(type)>Edit</button></p>
                        <p>Week: ${week} <button onclick="editItem(type)>Edit</button></p>`;
            }

            // document.getElementById('docData').insertAdjacentHTML('beforeend', html);
        })
}