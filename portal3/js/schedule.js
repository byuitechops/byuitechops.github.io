// loads the page providing different information if the user is an admin/lead

// These are the two 
ssCanvas2 = "https://docs.google.com/spreadsheets/d/1jUFL2Dr-_MjAE7axb6rEZy0vSfH6y_8fOHSo1b0oLDo/edit?rm=minimal";
ssCanvas1 = "https://docs.google.com/spreadsheets/d/1g53WojmX1wG7fTGU1Q1Hg93-QJ5GBadcCU7rbeyGWoc/edit?rm=minimal#gid=0";


document.getElementById("selectTeam").addEventListener('change', () => {
    db.collection("users").where("name", "==", userName)
        .onSnapshot((querySnapshot) => {
            data = querySnapshot.docs[0].data();
            userId = querySnapshot.docs[0].id;
            preferance = data.viewMode;
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
                            if (document.getElementById("selectTeam").value == "1") {
                                iframe.src = ssCanvas1
                                document.getElementById("newTab").href = ssCanvas1;
                            } else {
                                iframe.src = ssCanvas2
                                document.getElementById("newTab").href = ssCanvas2;
                            }
                        })
                    } else {
                        if (myData.team == "lms") {
                            team.style.visibility = "visible";
                            iframe.src = ssCanvas1;
                            document.getElementById("newTab").href = ssCanvas1;
                        } else if (myData.team == "accessibility") {
                            team.style.visibility = "visible";
                            iframe.src = ssCanvas2;
                            document.getElementById("newTab").href = ssCanvas2;

                        }
                    }
                })
        })
})