var user = firebase.auth().currentUser;
console.log(user);
firebase.database().ref('working/' + user).child('answer').on('value', snap => {
    snap = snap.val();
    if (snap == false) {
        var working = prompt('Are you working over the break?', 'Yes or No');

        if (working == 'yes' || working == 'Yes') {
            answer = 'Yes';
        } else if (working == 'no' || working == 'No') {
            answer = 'No';
        } else {
            alert('Please say Yes or No');
            location.reload();
        }
    } else {}
})
