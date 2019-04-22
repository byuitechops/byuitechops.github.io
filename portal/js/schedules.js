// loads the page providing different information if the user is an admin/lead
ssCanvas2 = "https://docs.google.com/spreadsheets/d/1jUFL2Dr-_MjAE7axb6rEZy0vSfH6y_8fOHSo1b0oLDo/edit?rm=minimal";
ssCanvas1 = "https://docs.google.com/spreadsheets/d/1g53WojmX1wG7fTGU1Q1Hg93-QJ5GBadcCU7rbeyGWoc/edit?rm=minimal#gid=0";

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
