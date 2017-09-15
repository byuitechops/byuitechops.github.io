//Get JSON
function getJSON(url) {
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Get the data from the json
function getData() {
    var url = "employee.json";
    getJSON(url).then(function (data) {
        console.log(data);
    });
}


function logIn() {
    getJSON("employee.json").then(function (data) {
        //Select User
        var email = document.getElementById('email').value;
        console.log(email);
        var user = "";
        var id;
        console.log(data);
        var i = 0;
        for (i = 0; i <= 21; i++) {
            var e = data[i].email;
            if (e == email) {
                user = data[i].name;
                id = i;
            }
        }
        console.log(user);
        console.log(id);
        console.log(data[id].brightspace); 
        display(id, user);
    })
}

function display(id, user) {
    getJSON('employee.json').then(function (data) {
        //hide form
        document.getElementById('form').classList.add('hide');
        //display icons
        if (data[id].brightspace == true) {
            document.getElementById('bs').className = document.getElementById('bs').className.replace('hide', '');
        }
        if (data[id].workDay == true) {
            document.getElementById('wd').className = document.getElementById('bs').className.replace('hide', 'show');
        }
    })
}

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
