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

// Get Data
db.collection("accessibility").orderBy('priority').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().title}`);
        var text = `<p>${doc.data().title},  ${doc.data().courseCode}, ${doc.data().priority}, ${doc.data().type}, ${doc.data().docURL}</p>`;
        document.getElementById('text').insertAdjacentHTML('beforeend', text);
    });
});