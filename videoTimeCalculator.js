function calculateTotal() {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var total = 0;
    for (var i = 0; i < 10; i++) {
        hours = document.getElementById("hours" + i).value;
        minutes = document.getElementById("minutes" + i).value;
        seconds = document.getElementById("seconds" + i).value;
        if (hours == "" && minutes == "" && seconds == "") {
            continue;
        }
        if (hours == "") {
            hours = 0;
        }
        if (minutes == "") {
            minutes = 0;
        }
        if (seconds == "") {
            seconds = 0;
        }
        if (hours < 0 || minutes < 0 || seconds < 0) {
            document.getElementById("total" + i).value = "NaN";
            continue;
        }
        total = (hours * 60 * 60) + (minutes * 60) + (seconds * 1);
        if (total === 0) {
            total = "";
            document.getElementById("total" + i).value = total;
            continue;
        }
        document.getElementById("total" + i).value = total + " seconds";
    }
};
