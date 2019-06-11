/*********************************************
 *   
 *
 *********************************************/

const editWindow = document.getElementById("edit-window");
const editTranscriptBtn = document.getElementById("btn-edit-transcript");
const main = document.getElementsByTagName("main");

function editTranscript() {
    createEditTranscriptWindow();
}

function createEditTranscriptWindow() {
    var editWindowHTML = ``;
    main.insertAdjacentHTML("beforeend", editWindowHTML);
}

function addCourseCodeSelect() {
    
}

function closeEditWindow() {
    editWindow.classList.add("hide");
}