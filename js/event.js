// Get the modal
var modal = document.getElementById('myModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

firebase.database().ref('dates').on('value', snap => {
    snap = snap.val();

    var name;
    for (name in snap) {
        var event;
        for (event in snap[name]) {
            var eventDate = snap[name][event];
            var em = eventDate.slice(0, 2);
            var ed = eventDate.slice(3, 5);
            var ey = eventDate.slice(6, 10);

            var today = new Date();
            var td = today.getDate();
            var tm = today.getMonth() + 1;
            var ty = today.getFullYear();

            if (td < 10) {
                td = '0' + td;
            }
            if (tm < 10) {
                tm = '0' + tm;
            }

            var todayDate = tm + '/' + td + '/' + ty;

            if (em == tm) {
                if (ed == td) {
                    var yearDiff = ty - ey;
                    yearDiff = yearDiff.toString();
                    var num = yearDiff.slice(-1);
                    var oi;
                    if (yearDiff == '11' || yearDiff == '12' || yearDiff == '13') {
                        oi = 'th';
                    } else if (num == '1') {
                        oi = 'st';
                    } else if (num == '2') {
                        oi = 'nd';
                    } else if (num == '3') {
                        oi = 'rd'
                    } else {
                        oi = 'th';
                    }

                    var message = '! Wish them a happy birthday!'

                    if (event == 'anniversary') {
                        event = 'year working here';
                        message = '! Congratulate them on their work workiversary';
                    }

                    var div = document.createElement('div');
                    div.innerHTML = "Today is " + "<span class='big'>" + name + "'s " + yearDiff + oi + "</span> " + event + message;
                    document.getElementById('announce').appendChild(div);

                }
            }
        }
    }
})
