// Get the modal
var modal = document.getElementById('myModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementsByClassName('content')[0].style.overflow = 'initial';
        // Get every div created
        var elements = document.getElementsByClassName('deletethis');
        // Delete all the divs
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

function showEvent() {
    christmasCountdown();
    firebase.database().ref('dates').on('value', snap => {
        snap = snap.val();

        var name;
        for (name in snap) {
            // Loop through names in dates
            var event;
            for (event in snap[name]) {
                // Loop through events in the name
                // Get the data from the event
                var eventDate = snap[name][event];
                // Get month for event
                var em = eventDate.slice(0, 2);
                // Get day for event
                var ed = eventDate.slice(3, 5);

                // Get todays date
                var today = new Date();
                // Get todays day
                var td = today.getDate();
                // Get todays month
                var tm = today.getMonth() + 1;
                // Get todays year
                var ty = today.getFullYear();

                // If todays day is a single digit add a 0
                if (td < 10) {
                    td = '0' + td;
                }
                // If todays monty is a single digit add a 0
                if (tm < 10) {
                    tm = '0' + tm;
                }

                // If event month equals todays month continue
                if (em == tm) {
                    // If even day equals todays day continue
                    if (ed == td) {
                        // If the event is a workiversary continue
                        // Make page not move
                        document.getElementsByClassName('content')[0].style.overflow = 'hidden';
                        if (event == 'anniversary') {
                            // Get event year
                            var ey = eventDate.slice(6, 10);
                            // Get the difference between today's year and the event year
                            var yearDiff = ty - ey;
                            if (yearDiff == 0) {
                                break;
                            } else {
                                // Change the difference to a string
                                yearDiff = yearDiff.toString();
                                // Get the last number of the difference
                                var num = yearDiff.slice(-1);
                                var oi;
                                // Get the right ordianal indicator
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
                                // Create the greeting message
                                var message = 'full year working here! Congratulations on your workiversary';

                                // Create the div for the display
                                var div = document.createElement('div');
                                // Create the image
                                var image = document.createElement('img');
                                // Set which image to use & style it
                                image.src = 'images/anniversary.png';
                                image.style.display = 'block';
                                image.style.margin = '10px auto';
                                // Add class to div for easy cleanup
                                div.classList.add('deletethis');
                                // Fill the div with display
                                div.innerHTML = "Today marks <span class='big'>" + name + "'s " + yearDiff + oi + "</span> " + message;
                                // Add image to div
                                div.appendChild(image);
                                // Add div to page
                                document.getElementById('announce').appendChild(div);
                            }
                        }
                        // If event is a birthday continue
                        if (event == 'birthday') {
                            // Create greeting message
                            var message = '! Happy birthday ' + name + "!";

                            // Create the div for the display
                            var div = document.createElement('div');
                            // Create the image
                            var image = document.createElement('img');
                            // Set which image to use & style it
                            image.src = 'images/birthday.png';
                            image.style.display = 'block';
                            image.style.margin = '10px auto';
                            // Fill div with display
                            div.innerHTML = "Today is <span class='big'>" + name + "'s </span> " + event + message;
                            // Add image to display
                            div.appendChild(image);
                            // Add div to page
                            document.getElementById('announce').appendChild(div);
                        }
                        // Make modal visible
                        document.getElementById('myModal').style.display = "block";
                    }
                    if (Number(ed) - 1 == td) {
                        // If event is a birthday continue
                        if (event == 'birthday') {
                            // Create greeting message
                            var message = '! Happy Early birthday ' + name + "!";

                            // Create the div for the display
                            var div = document.createElement('div');
                            // Create the image
                            var image = document.createElement('img');
                            // Set which image to use & style it
                            image.src = 'images/birthday.png';
                            image.style.display = 'block';
                            image.style.margin = '10px auto';
                            // Fill div with display
                            div.innerHTML = "Tomorrow is <span class='big'>" + name + "'s </span> " + event + message;
                            // Add image to display
                            div.appendChild(image);
                            // Add div to page
                            document.getElementById('announce').appendChild(div);
                            // Make modal visible
                            document.getElementById('myModal').style.display = "block";
                        }
                    }
                    if (Number(ed) + 1 == td) {
                        // If event is a birthday continue
                        if (event == 'birthday') {
                            // Create greeting message
                            var message = '! Happy late birthday ' + name + "!";

                            // Create the div for the display
                            var div = document.createElement('div');
                            // Create the image
                            var image = document.createElement('img');
                            // Set which image to use & style it
                            image.src = 'images/birthday.png';
                            image.style.display = 'block';
                            image.style.margin = '10px auto';
                            // Fill div with display
                            div.innerHTML = "Yesterday was <span class='big'>" + name + "'s </span> " + event + message;
                            // Add image to display
                            div.appendChild(image);
                            // Add div to page
                            document.getElementById('announce').appendChild(div);
                            // Make modal visible
                            document.getElementById('myModal').style.display = "block";
                        }
                    }
                }
            }
        }
    })
}


function christmasCountdown() {
    // Get the modal
    var christmasModal = document.getElementById('christmasModal');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == christmasModal) {
            christmasModal.style.display = "none";
            document.getElementsByClassName('content')[0].style.overflow = 'initial';
        }
    }

    Date.daysBetween = function (date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.round(difference_ms / one_day);
    }

    const today = new Date();
    if (today.getMonth() > 9) {
        christmasModal.style.display = "block";
        var christmas = new Date(today.getFullYear(), 11, 25);
        var daysLeft = Math.abs(Date.daysBetween(christmas, today));
        document.getElementById('christmasText').innerText = `${daysLeft} days left till Christmas`;
    }
}