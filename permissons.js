function logIn() {
    //Select User
    var email = document.getElementById('input').value;
    var user = "";
    var id;
    for (var i = 0; i <= 26; i++) {
        var e = data[i].email;
        if (e == email) {
            user = data[i].name;
            id = i;
        }
    }
    setLink(id);
    //clear input
    document.getElementById('input').value = "";
    document.getElementById('input').setAttribute('placeholder', 'Enter Code')
    var funcCode = 'enterCode(' + id + ')';
    document.getElementById('button').setAttribute('onclick', funcCode);
    document.getElementById('button').innerHTML = 'Enter Code';
    console.log(user);
}

function enterCode(id) {
    var code = document.getElementById('input').value;
    //Code Input
    if (code == 'WorkDay') {
        data[id].workDay = true;
    }
    if (code == 'Trello') {
        data[id].trello = true;
    }
    if (code == 'Equella') {
        data[id].equella = true;
    }
    if (code == 'TeamDynamix') {
        data[id].teamDynamix = true;
    }
    if (code == 'TeamDrive') {
        data[id].teamDrive = true;
    }
    if (code == 'Microsoft') {
        data[id].microsoft = true;
    }
    if (code == 'Brightspace') {
        data[id].brightspace = true;
    }
    if (code == 'StaffHub') {
        data[id].staffHub = true;
    }
    if (code == 'Canvas') {
        data[id].canvas = true;
    }
    if (code == 'EmployeeDirectory') {
        data[id].employeeDirectory = true;
    }
    if (code == 'Trello') {
        data[id].trello = true;
    }
    document.getElementById('input').value = "";
    setLink(id);
}

function setLink(id) {
    //Create Hyperlinks
    if (data[id].workDay == true) {
        var icon = document.getElementById('wd');
        wd.setAttribute('href', "https://www.myworkday.com/byuhi/d/home.htmld#selectedWorklet=501%24162");
    } else {
        var icon = document.getElementById('wd');
        wd.setAttribute('href', "");
    }
    if (data[id].trello == true) {
        var icon = document.getElementById('trel');
        trel.setAttribute('href', "https://trello.com/");
    } else {
        var icon = document.getElementById('trel');
        trel.setAttribute('href', "");
    }
    if (data[id].equella == true) {
        var icon = document.getElementById('equ');
        equ.setAttribute('href', "https://content.byui.edu/access/home.do");
    } else {
        var icon = document.getElementById('equ');
        equ.setAttribute('href', "");
    }
    if (data[id].teamDynamix == true) {
        var icon = document.getElementById('tdy');
        tdy.setAttribute('href', "https://td.byui.edu");
    } else {
        var icon = document.getElementById('tdy');
        tdy.setAttribute('href', "");
    }
    if (data[id].teamDrive == true) {
        var icon = document.getElementById('tdr');
        tdr.setAttribute('href', "https://drive.google.com/drive/folders/0AKiJtEpGJEXOUk9PVA");
    } else {
        var icon = document.getElementById('tdr');
        tdr.setAttribute('href', "");
    }
    if (data[id].brightspace == true) {
        var icon = document.getElementById('bs');
        bs.setAttribute('href', "https://byui.brightspace.com/d2l/login?noredirect=true");
    } else {
        var icon = document.getElementById('bs');
        bs.setAttribute('href', "");
    }
    if (data[id].microsoft == true) {
        var icon = document.getElementById('micr');
        micr.setAttribute('href', "https://www.office.com/1/?auth=2&amp;home=1&amp;from=PortalLanding&amp;client-request-id=77ffd374-bbac-4e2b-8a9d-9c1566dea2ed");
    } else {
        var icon = document.getElementById('micr');
        micr.setAttribute('href', "");
    }
    if (data[id].staffHub == true) {
        var icon = document.getElementById('sh');
        sh.setAttribute('href', "https://staffhub.ms/app/TEAM_beb31523bee44c99b3a052306b0a71c4/schedules");
    } else {
        var icon = document.getElementById('sh');
        sh.setAttribute('href', "");
    }
    if (data[id].canvas == true) {
        var icon = document.getElementById('can');
        can.setAttribute('href', "https://byui.instructure.com/login/canvas");
    } else {
        var icon = document.getElementById('can');
        can.setAttribute('href', "");
    }
    if (data[id].employeeDirectory == true) {
        var icon = document.getElementById('ed');
        ed.setAttribute('href', "https://web.byui.edu/directory/employees/");
    } else {
        var icon = document.getElementById('ed');
        ed.setAttribute('href', "");
    }
}


//Get JSON
var data = [{
        "name": "Zoe Miner",
        "email": "min16009@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": false,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Jessica Heiner",
        "email": "hei15001@byui.edu",
        "brightspace": false,
        "trello": false,
        "equella": false,
        "teamDynamix": false,
        "teamDrive": false,
        "microsoft": false,
        "workDay": false,
        "staffHub": false,
        "canvas": false,
        "employeeDirectory": false
        }, {
        "name": "Zac Mendenhall",
        "email": "men12016@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Albree Joy",
        "email": "wak13001@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Taylor Wanlass",
        "email": "wan15005@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Adrian Whetten",
        "email": "whe15017@byui.edu",
        "brightspace": false,
        "trello": false,
        "equella": false,
        "teamDynamix": false,
        "teamDrive": false,
        "microsoft": false,
        "workDay": false,
        "staffHub": false,
        "canvas": false,
        "employeeDirectory": false
        }, {
        "name": "Shayla Salazar",
        "email": "max16011@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Brooklyn Cook",
        "email": "coo15018@byui.edu",
        "brightspace": false,
        "trello": true,
        "equella": true,
        "teamDynamix": false,
        "teamDrive": true,
        "microsoft": true,
        "workDay": false,
        "staffHub": true,
        "canvas": false,
        "employeeDirectory": true
        }, {
        "name": "Taylor Beavers",
        "email": "bea15001@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Kaden Heaton",
        "email": "hea11006@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Rachel James",
        "email": "jam17003@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Brooke Ericson",
        "email": "eri11006@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "John Soon",
        "email": "soo16001@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Seth Farr",
        "email": "far16016@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Emma Stevenson",
        "email": "hou51003@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Cal Wilson",
        "email": "wil13034@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Casey Streeter",
        "email": "str14028@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Julie James",
        "email": "jam15006@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Welechele Shabandoje",
        "email": "sha12039@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Mahonri Saldana",
        "email": "ste16023@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "James Rees",
        "email": "ree15011@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Corey Moore",
        "email": "mooreco@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Ian Caloobanan",
        "email": "cal15034@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Sierra Gervasi",
        "email": "ger14005@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Logan Jenkins",
        "email": "jen12060@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Megan Havens",
        "email": "hav17001@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }, {
        "name": "Sophia Beyer",
        "email": "bey16003@byui.edu",
        "brightspace": true,
        "trello": true,
        "equella": true,
        "teamDynamix": true,
        "teamDrive": true,
        "microsoft": true,
        "workDay": true,
        "staffHub": true,
        "canvas": true,
        "employeeDirectory": true
        }
    ]
/*
    "wd" 
    "trel"
    "equ"
    "tdy"
    "tdr"
    "micr"
    "bs" 
    "sh" 
    "can"
    "ed" */
