var breakP = document.getElementById('breakTimer').children[0];
var seconds = 0,
    minutes = 0,
    hours = 0,
    t;

function showTime() {
    if (localStorage.getItem('seconds') != null) {
        seconds = localStorage.getItem('seconds');
    }
    if (localStorage.getItem('mintues') != null) {
        minutes = localStorage.getItem('minutes');
    }
    if (localStorage.getItem('hours') != null) {
        hours = localStorage.getItem('hours');
    }
    document.getElementById('breakTimer').style.display = 'block';
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    localStorage.setItem('seconds', seconds);
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('hours', hours);

    breakP.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(showTime, 1000);
}

function clearTime() {
    breakP.innerHTML = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('breakTimer').style.display = 'none';
    clearTimeout(t);
    localStorage.removeItem('seconds');
    localStorage.removeItem('minutes');
    localStorage.removeItem('hours');
}
