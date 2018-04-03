firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser.displayName;

        firebase.database().ref('working/' + user).child('answer').on('value', snap => {
            snap = snap.val();
            if (snap == false) {
                var working = prompt('Are you working over the break?', 'Yes or No');

                if (working == 'yes' || working == 'Yes') {
                    var answer = 'Yes';
                    var time = prompt('How many hours are you expecting to work?', '10, 20, 30, 40');
                    time = time + ' hours';
                } else if (working == 'no' || working == 'No') {
                    var answer = 'No';
                    var time = 'none';
                } else {
                    alert('Please say Yes or No');
                    location.reload();
                }

                var data = {
                    'answer': answer,
                    'time': time
                }
                firebase.database().ref('working/' + user).update(data);
            }
        })

    } else {
        // No user is signed in.
    }
});
