// loads the page providing different information if the user is an admin/lead
ssCanvas2 = "https://docs.google.com/spreadsheets/d/1xZGwTxPbx9w56hC-4CUJnBxK0fPJTrMLqj-91pCFRhQ/edit?rm=minimal";
ssCanvas1 = "https://docs.google.com/spreadsheets/d/12WXvcWmS7S2E0NZaTnyyhLdzNsrwllD85UsavRXfpZM/edit?rm=minimal"

function loadPage() {
    //gets and reads database, stores into a variable
    db.collection("users").doc(userId).get()
        .then(function (doc) {
            const myData = doc.data();
            var team = document.getElementById("teams");
            var iframe = document.getElementById("spreadsheet");
            //checks for permissions to see both teams' schedule
            if (myData.admin || myData.lead) {
                document.getElementById("admin").style.visibility = "visible";
                team.style.visibility = "visible";
                //clicked on team 1
                document.getElementById("selectTeam").addEventListener("change", () => {
                    if (document.getElementById("selectTeam").value == "canvas1") {
                        iframe.src = ssCanvas1
                        document.getElementById("newTab").href = ssCanvas1;
                    } else {
                        iframe.src = ssCanvas2
                        document.getElementById("newTab").href = ssCanvas2;
                    }
                })
            } else {
                if (myData.team == "Canvas 1" || myData.team == "canvas1") {
                    team.style.visibility = "visible";
                    iframe.src = ssCanvas1;
                    document.getElementById("newTab").href = ssCanvas1;
                } else {
                    team.style.visibility = "visible";
                    iframe.src = ssCanvas2;
                    document.getElementById("newTab").href = ssCanvas2;

                }
            }
        })
}
