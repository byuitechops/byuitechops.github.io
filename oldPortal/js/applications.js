var canvas = document.getElementById("canvas");
var pathway = document.getElementById("pathway");
var brightspace = document.getElementById("brightspace");
var drive = document.getElementById("drive");
var email = document.getElementById("email");
var katana = document.getElementById("katana");
var equella = document.getElementById("equella");
var trello = document.getElementById("trello");
var accessibility = document.getElementById("accessibility");
var slack = document.getElementById("slack");
var googleChat = document.getElementById("googleChat");

canvas.addEventListener("click", () => {
    window.open("https://byui.instructure.com/login/canvas");
})

pathway.addEventListener("click", () => {
    window.open("https://pathway.brightspace.com/d2l/local");
})


brightspace.addEventListener("click", () => {
    window.open("http://byui.brightspace.com/d2l/local");
})

drive.addEventListener("click", () => {
    window.open("https://drive.google.com/drive/team-drives");
})

email.addEventListener("click", () => {
    window.open("https://outlook.office365.com/owa/?realm=byui.edu&exsvurl=1&ll-cc=1033&modurl=0");
})


katana.addEventListener("click", () => {
    window.open("http://10.5.188.122:8000/home");
})

equella.addEventListener("click", () => {
    window.open("https://content.byui.edu/access/home.do");
})

trello.addEventListener("click", () => {
    window.open("https://trello.com/");
})

accessibility.addEventListener("click", () => {
    window.open("https://byuitechops.github.io/newAccessibility/home.html");
})

googleChat.addEventListener("click", () => {
    window.open("https://chat.google.com/room/AAAAGWGIzV4");
})
// slack.addEventListener("click", () => {
//     window.open("https://byuitechops.slack.com/messages/GABFXPE8L/details/");
// })

function loadPage() {
    // load the page
}
var clicked = false;
document.getElementsByTagName('h1')[0].addEventListener('click', () => {
    if (!clicked) {
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length; i++) {
            if (i != 6 && i != 12) {
                divs[i].classList.add('filter');
            }
        }
        clicked = true;
    } else {
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length; i++) {
            if (i != 6 && i != 12) {
                divs[i].classList.remove('filter');
            }
        }
        clicked = false;
    }
})