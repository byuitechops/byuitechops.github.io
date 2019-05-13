const ssCanvas2 = "https://docs.google.com/spreadsheets/d/1jUFL2Dr-_MjAE7axb6rEZy0vSfH6y_8fOHSo1b0oLDo/edit?rm=minimal";
const ssCanvas1 = "https://docs.google.com/spreadsheets/d/1g53WojmX1wG7fTGU1Q1Hg93-QJ5GBadcCU7rbeyGWoc/edit?rm=minimal";
const team = document.getElementById("teams");
const iframe = document.getElementById("spreadsheet");
const teamSelector = document.getElementById("selectTeam")
const newTab = document.getElementById("newTab");

function loadPage() {
    db.collection("users").where("name", "==", userName).onSnapshot((querySnapshot) => {
        var userId = querySnapshot.docs[0].id;
        db.collection("users").doc(userId).get().then(function (doc) {
            const myData = doc.data();
            if (!(myData.admin || myData.lead)){
                $(teamSelector).addClass('hide')
            }
            if (myData.team == "lms") {
                iframe.src = ssCanvas1;
                newTab.href = ssCanvas1;
            } else if (myData.team == "accessibility") {
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