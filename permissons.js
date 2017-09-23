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
        icon.setAttribute('href', "https://www.myworkday.com/byuhi/d/home.htmld#selectedWorklet=501%24162");
        console.log(data[id].workDay);
    } else {
        var icon = document.getElementById('wd');
        icon.setAttribute('href', "");
    }
    if (data[id].trello == true) {
        var icon = document.getElementById('trel');
        icon.setAttribute('href', "https://trello.com/");
    } else {
        var icon = document.getElementById('trel');
        icon.setAttribute('href', "");
    }
    if (data[id].equella == true) {
        var icon = document.getElementById('equ');
        icon.setAttribute('href', "https://content.byui.edu/access/home.do");
    } else {
        var icon = document.getElementById('equ');
        icon.setAttribute('href', "");
    }
    if (data[id].teamDynamix == true) {
        var icon = document.getElementById('tdy');
        icon.setAttribute('href', "https://td.byui.edu");
    } else {
        var icon = document.getElementById('tdy');
        icon.setAttribute('href', "");
    }
    if (data[id].teamDrive == true) {
        var icon = document.getElementById('tdr');
        icon.setAttribute('href', "https://drive.google.com/drive/folders/0AKiJtEpGJEXOUk9PVA");
    } else {
        var icon = document.getElementById('tdr');
        icon.setAttribute('href', "");
    }
    if (data[id].brightspace == true) {
        var icon = document.getElementById('bs');
        icon.setAttribute('href', "https://byui.brightspace.com/d2l/login?noredirect=true");
    } else {
        var icon = document.getElementById('bs');
        icon.setAttribute('href', "");
    }
    if (data[id].microsoft == true) {
        var icon = document.getElementById('micr');
        icon.setAttribute('href', "https://www.office.com/1/?auth=2&amp;home=1&amp;from=PortalLanding&amp;client-request-id=77ffd374-bbac-4e2b-8a9d-9c1566dea2ed");
    } else {
        var icon = document.getElementById('micr');
        icon.setAttribute('href', "");
    }
    if (data[id].staffHub == true) {
        var icon = document.getElementById('sh');
        icon.setAttribute('href', "https://staffhub.ms/app/TEAM_beb31523bee44c99b3a052306b0a71c4/schedules");
    } else {
        var icon = document.getElementById('sh');
        icon.setAttribute('href', "");
    }
    if (data[id].canvas == true) {
        var icon = document.getElementById('can');
        icon.setAttribute('href', "https://byui.instructure.com/login/canvas");
    } else {
        var icon = document.getElementById('can');
        icon.setAttribute('href', "");
    }
    if (data[id].employeeDirectory == true) {
        var icon = document.getElementById('ed');
        icon.setAttribute('href', "https://web.byui.edu/directory/employees/");
    } else {
        var icon = document.getElementById('ed');
        icon.setAttribute('href', "");
    }
}


//Get JSON
var data = [{
        "name": "Zoe Miner",
        "email": "min16009@byui.edu",
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
        "name": "Albree Joy",
        "email": "wak13001@byui.edu",
        "brightspace": false,
        "trello": false,
        "equella": false,
        "teamDynamix": false,
        "teamDrive": false,
        "microsoft": false,
        "workDay": false,
        "staffHub": false,
        "canvas": false,
        "employeeDirectory": true
        }, {
        "name": "Taylor Wanlas",
        "email": "wan15005@byui.edu",
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
        "name": "Brooklyn Cook",
        "email": "coo15018@byui.edu",
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
        "name": "Taylor Beavers",
        "email": "bea15001@byui.edu",
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
        "name": "Kaden Heaton",
        "email": "hea11006@byui.edu",
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
        "name": "Rachel James",
        "email": "jam17003@byui.edu",
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
        "name": "Brooke Ericson",
        "email": "eri11006@byui.edu",
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
        "name": "John Soon",
        "email": "soo16001@byui.edu",
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
        "name": "Seth Farr",
        "email": "far16016@byui.edu",
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
        "name": "Emma Stevenson",
        "email": "hou51003@byui.edu",
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
        "name": "Cal Wilson",
        "email": "wil13034@byui.edu",
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
        "name": "Casey Streeter",
        "email": "str14028@byui.edu",
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
        "name": "Julie James",
        "email": "jam15006@byui.edu",
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
        "name": "Welechele Shabandoje",
        "email": "sha12039@byui.edu",
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
        "name": "Mahonri Saldana",
        "email": "ste16023@byui.edu",
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
        "name": "James Rees",
        "email": "ree15011@byui.edu",
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
        "name": "Corey Moore",
        "email": "mooreco@byui.edu",
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
        "name": "Ian Caloobanan",
        "email": "cal15034@byui.edu",
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
        "name": "Sierra Gervasi",
        "email": "ger14005@byui.edu",
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
        "name": "Logan Jenkins",
        "email": "jen12060@byui.edu",
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
        "name": "Megan Havens",
        "email": "hav17001@byui.edu",
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
        "name": "Sophia Beyer",
        "email": "bey16003@byui.edu",
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
