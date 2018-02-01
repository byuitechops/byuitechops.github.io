(function () {
        //------------------ Connect to Firebase -----------------------//
        const config = {
            apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
            authDomain: "techopsportal.firebaseapp.com",
            databaseURL: "https://techopsportal.firebaseio.com",
            projectId: "techopsportal",
            storageBucket: "techopsportal.appspot.com",
            messagingSenderId: "265124430634"
        };
        firebase.initializeApp(config);

        // Function to check which team
        var name;
        var user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
                name = profile.displayName;
                firebase.database.re('users').child(user).on('value', snap => {
                        var titles;
                        var shot = snap.val();
                        for (titles in shot) {
                            if (titles == 'Admin') {
                                var frame1 = document.createElement('iframe');
                                frame1.setAttribute('src', 'https://docs.google.com/spreadsheets/d/1mY6vvcCC7ptSYrlnoFrhwgWh4DMqGwQNdcgtjUz4f9M/edit#gid=266358356');
                                frame1.setAttribute('class', 'iframes');

                                var frame2 = document.createElement('iframe');
                                frame2.setAttribute('scr', 'https://docs.google.com/spreadsheets/d/1ge7AlgKH_0nkvmbZ_BxWiP6WfAg2rynA1ccXMFei22k/edit#gid=1630866338');
                                frame2.setAttribute('class', 'iframes');


                                var frame3 = document.createElement('iframe');
                                frame3.setAttribute('src', 'https://docs.google.com/spreadsheets/d/1BMVKAqfiPspOLZy4OFPHdccCWWJVtkHMrLoNobFCkTI/edit#gid=2021360543');
                                frame3.setAttribute('class', 'iframes');
                            }

                        }
                        if (shot[titles] == 'tech') {
                            document.getElementById('scheduleFrame').setAttribute('src', 'https://docs.google.com/spreadsheets/d/1mY6vvcCC7ptSYrlnoFrhwgWh4DMqGwQNdcgtjUz4f9M/edit#gid=266358356');
                        } else if (shot[titles] == 'canvas') {
                            document.getElementById('scheduleFrame').setAttribute('src', 'https://docs.google.com/spreadsheets/d/1ge7AlgKH_0nkvmbZ_BxWiP6WfAg2rynA1ccXMFei22k/edit#gid=1630866338');
                        } else if (shot[titles] == 'transcript') {
                            document.getElementById('scheduleFrame').setAttribute('src', 'https://docs.google.com/spreadsheets/d/1BMVKAqfiPspOLZy4OFPHdccCWWJVtkHMrLoNobFCkTI/edit#gid=2021360543');
                        } else if ()
                    }
                });
        });
}());
