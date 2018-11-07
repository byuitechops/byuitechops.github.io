function toggleView() {
    var info = document.getElementById('info');
    var aboutMe = document.getElementById('aboutMe');
    var img = document.getElementById('arrowImg');
    // If info is shown
    if (info.style.height == "20%") {
        info.style.height = "0%";
        aboutMe.style.height = "65%";
        aboutMe.style.overflow = "auto";
        img.style.transform = "rotate(0deg)";
    } else {
        info.style.height = "20%";
        aboutMe.style.height = "44%";
        aboutMe.style.overflow = "hidden";
        img.style.transform = "rotate(180deg)";
    }
}