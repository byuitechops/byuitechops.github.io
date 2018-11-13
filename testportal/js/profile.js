// dropdown toggleView funcionality 

function toggleView() {
    var info = document.getElementById('info');
    var aboutMe = document.getElementById('aboutMe');
    var img = document.getElementById('arrowImg');
    // If info is shown
    if (info.style.height == "20%") {
        info.style.height = "0%";
        aboutMe.style.height = "64%";
        aboutMe.style.overflow = "auto";
        img.style.transform = "rotate(0deg)";
    } else {
        info.style.height = "20%";
        aboutMe.style.height = "44%";
        aboutMe.style.overflow = "hidden";
        img.style.transform = "rotate(180deg)";
    }
}

//tool tip on click

var toolTip = document.getElementById("clock");
var toolTipBox = document.getElementById("toolTipBox");
toolTip.addEventListener("click", () => {

    if (toolTipBox.style.visibility == "hidden") {
        toolTipBox.style.visibility = "visible";
    } else {
        toolTipBox.style.visibility = "hidden";
    }

})

//showing up the redeem tool
var redeemBtn = document.getElementById("redeem");
var redeemTool = document.getElementById("usingRedeem");
redeemBtn.addEventListener("click", () => {

    if (redeemTool.style.visibility == "hidden") {
        redeemTool.style.visibility = "visible";
        toolTipBox.style.visibility = "hidden";
    } else {
        redeemTool.style.visibility = "hidden";
    }
})

//when the user presses the "cancel" button, goes back to the screen
var cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener('click', () => {
    redeemTool.style.visibility = "hidden";
})

// when the user clicks the "redeem" button, it shows the confirm
var redeemConfirmBtn = document.getElementById("redeembtn");
redeemConfirmBtn.addEventListener('click', () => {
    redeemTool.style.visibility = "hidden";
    document.getElementById("confirmRedeem").style.visibility = "visible";
})

// When the use clicks ok close confirm
var okBtn = document.getElementById("close");
okBtn.addEventListener('click', () => {
    document.getElementById("confirmRedeem").style.visibility = "hidden";
})