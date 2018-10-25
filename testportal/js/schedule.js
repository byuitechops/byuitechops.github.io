function openWeek(evt, week, team) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(week).parentElement.style.display = "block";
    document.getElementById(week).style.display = "block";
    evt.currentTarget.classList.add("active");
    document.getElementById(team).classList.add("active");
    if (document.getElementById(week).innerHTML == "") {
        buildWeek(week);
    }
}

function openTeam(evt, team) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(`${team}div`).style.display = "block";
    // document.getElementById(`${team}Week1`).style.display = "block";
    evt.currentTarget.classList.add("active");
    // document.getElementById(`${team}Week1btn`).classList.add("active");
}


// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();

const teamNumber = 2;
const weekNumber = 14;
const stationsNumber = 5;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var section = document.getElementsByTagName('section')[0];

var btnDiv = document.createElement('div');
btnDiv.classList.add('tab');
section.insertAdjacentElement('afterbegin', btnDiv);

for (var i = 1; i <= teamNumber; i++) {
    var btn = document.createElement('button');
    btn.setAttribute('onclick', `openTeam(event, 'Canvas${i}')`);
    btn.classList.add('tablinks');
    btn.setAttribute('id', `Canvas${i}`);
    btn.appendChild(document.createTextNode(`Canvas${i}`));
    btnDiv.insertAdjacentElement('beforeend', btn);

    var teamDiv = document.createElement('div');
    teamDiv.setAttribute('id', `Canvas${i}div`);
    teamDiv.classList.add('tabcontent');
    section.insertAdjacentElement('beforeend', teamDiv);

    var weekBtnDiv = document.createElement('div');
    weekBtnDiv.classList.add('tab');
    teamDiv.insertAdjacentElement('afterbegin', weekBtnDiv);

    for (var j = 1; j <= weekNumber; j++) {
        var weekBtn = document.createElement('button');
        weekBtn.setAttribute('onclick', `openWeek(event, 'Canvas${i}Week${j}', 'Canvas${i}')`);
        weekBtn.classList.add('tablinks');
        weekBtn.setAttribute('id', `Canvas${i}Week${j}btn`)
        weekBtn.appendChild(document.createTextNode(`Week ${j}`));
        weekBtnDiv.insertAdjacentElement('beforeend', weekBtn);

        var weekDiv = document.createElement('div');
        weekDiv.setAttribute('id', `Canvas${i}Week${j}`);
        weekDiv.classList.add('tabcontent');
        teamDiv.insertAdjacentElement('beforeend', weekDiv);
    }
}

function buildWeek(week) {
    for (var k = 1; k <= 1; k++) {
        var tbl = document.createElement('table');
        tbl.style.width = '100%';
        tbl.setAttribute('border', '1');
        var tbdy = document.createElement('tbody');
        for (var i = 0; i < 3; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < 2; j++) {
                if (i == 2 && j == 1) {
                    break
                } else {
                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode('\u0020'))
                    i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                    tr.appendChild(td)
                }
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        document.getElementById(week).insertAdjacentElement("beforeend", tbl);
    }
}