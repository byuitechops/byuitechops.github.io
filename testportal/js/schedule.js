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
const stationsNumber = 12;
const stationsArray = ["Station 01", "Station 02", "Station 03", "Station 04", "Station 05", "Station 06", "Station 07", "Station 08", "Station 09", "Station 10", "Station 11", "Station 12"];
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
    for (var k = 0; k < days.length; k++) {
        var tbl = document.createElement('table');
        for (var colNum = 0; colNum <= stationsArray.length; colNum++) {
           var col = document.createElement('col');
           col.width = 100/(stationsArray.length + 1) + "%";
           tbl.insertAdjacentElement("beforeend", col);
        }
        tbl.style.width = '100%';
        tbl.setAttribute('border', '1');
        var header = tbl.createTHead();
        header.colSpan = stationsArray.length + 1;
        var row = header.insertRow(0);
        var cell = row.insertCell(0);
        cell.colSpan = stationsArray.length + 1;
        cell.style.textAlign = "center";
        cell.innerHTML = `<b>${days[k]}</b>`;
        var tbdy = document.createElement('tbody');
        stationHead = tbdy.insertRow(0);
        for (c = 0; c <= stationsArray.length; c++) {
            var station = stationHead.insertCell(-1);
            if (c == 0) {
                station.innerHTML = "Time";
            } else {
                station.innerHTML = stationsArray[c-1];
            }
        }
        for (var i = 7; i < 22; i += 0.5) {
            var mer;
            var hour;
            var min;

            if (i >= 12) {
                if (!Number.isInteger(i)) {
                    hour = i.toString().slice(0, 2) - 12;
                    if (hour == "0") {
                        hour = 12;
                    }
                    mer = "pm";
                    min = "30";
                } else {
                    hour = i.toString() - 12;
                    if (hour == "0") {
                        hour = 12;
                    }
                    mer = "pm";
                    min = "00";
                }
            } else {
                if (!Number.isInteger(i)) {
                    hour = i.toString().slice(0, -2)
                    mer = "am";
                    min = "30";
                } else {
                    hour = i
                    mer = "am";
                    min = "00";
                }
            }
            var tr = document.createElement('tr');
            for (var j = 1; j <= stationsArray.length + 1; j++) {
                if (j == 1) {
                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode(`${hour}:${min} ${mer}`));
                    // i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                    tr.appendChild(td)
                } else {
                    var td = document.createElement('td');
                    var drop = document.createElement('select');
                    var optionsArray = ["Zoe", "Taylor", "Jared", "Tammy"];
                    for (opt = 0; opt < optionsArray.length; opt++) {
                        var option = document.createElement('option');
                        option.text = optionsArray[opt];
                        drop.appendChild(option);
                    }
                    td.appendChild(drop)
                    // i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                    tr.appendChild(td)
                }
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        document.getElementById(week).insertAdjacentElement("beforeend", tbl);
    }
}