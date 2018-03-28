var breakP = document.getElementById('breakP');
var seconds = 0,
    minutes = 0,
    hours = 0,
    t;

function showTime() {
    console.log(seconds);
    breakP.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
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
}

function timer() {
    document.getElementById('breakTimer').style.display = 'block';
    if (localStorage.getItem('seconds') != null) {
        seconds = localStorage.getItem('seconds');
    }
    if (localStorage.getItem('minutes') != null) {
        minutes = localStorage.getItem('minutes');
    }
    if (localStorage.getItem('hours') != null) {
        hours = localStorage.getItem('hours');
    }
    t = setInterval(function () {
        showTime()
    }, 1000);
}

function clearTime() {
    breakP.innerHTML = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('breakTimer').style.display = 'none';
    clearInterval(t);
    localStorage.removeItem('seconds');
    localStorage.removeItem('minutes');
    localStorage.removeItem('hours');
}
