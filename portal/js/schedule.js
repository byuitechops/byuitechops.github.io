const ssCanvas1 = "https://docs.google.com/spreadsheets/d/1DdQfPe-JuB0pjPQ1qTUmFHl6RlGG3WJPyS_tcogQ-Zs/edit#gid=0";
const ssCanvas2 = "https://docs.google.com/spreadsheets/d/1I8_4D8T4mXJOlR9GysuuCDvHq2qlpcjCUNfjorphqKs/edit#gid=0";
const team = document.getElementById("teams");
const iframe = document.getElementById("spreadsheet");
const teamSelector = document.getElementById("selectTeam");
const newTab = document.getElementById("newTab");

function loadPage() {
    db.collection("users").where("name", "==", userName).onSnapshot((querySnapshot) => {
        var userId = querySnapshot.docs[0].id;
        db.collection("users").doc(userId).get().then(function (doc) {
            const myData = doc.data();
            if (!(myData.admin || myData.lead)){
                $(teamSelector).addClass('hide')
            }
            if (myData.team == "Team 1") {
                iframe.src = ssCanvas1;
                newTab.href = ssCanvas1;
            } else if (myData.team == "Team 2") {
                iframe.src = ssCanvas2;
                newTab.href = ssCanvas2;


            }
        })
    })
}
$(teamSelector).change(() => {
    if (teamSelector.value == 1) {
        iframe.src = ssCanvas1
        newTab.href = ssCanvas1;
    } else if (teamSelector.value == 2) {
        iframe.src = ssCanvas2
        newTab.href = ssCanvas2;
    }
});