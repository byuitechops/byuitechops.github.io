/*********************************************
 *   
 *      INJECTIBLE.JS
 *      
 *********************************************/


/*********************************************
 * 
 *      VARIABLES
 * 
 *      -   Transcript Info Box
 *      -   Edit Transcript Window
 * 
 *********************************************/

const main = document.getElementById("main");

/********      Transcript Info Box     *******/

const infoField          = document.getElementById("transcript-info-field");

const currentTitle       = document.getElementById("transcript-title");
const currentStage       = document.getElementById("transcript-status");
const currentCourses     = document.getElementById("transcript-code");
const currentPriority    = document.getElementById("transcript-priority");
const currentType        = document.getElementById("transcript-type");
const currentLength      = document.getElementById("transcript-length");
const currentDocEdit     = document.getElementById("transcript-googleEditLink");
const currentDocPub      = document.getElementById("transcript-googlePubLink");
const currentLMS         = document.getElementById("transcript-canvasLink");
const currentMedia       = document.getElementById("transcript-mediaLink");
const currentIsVerbit    = document.getElementById("transcript-verbit");
const currentVerbitID    = document.getElementById("transcript-verbitID");
const currentIsCopied    = document.getElementById("transcript-copied");
const currentCopiedFrom  = document.getElementById("transcript-copiedFrom");

const notesField         = document.getElementById("transcript-notes-field");

const currentReqBy       = document.getElementById("transcript-requestor");
const currentReqOn       = document.getElementById("transcript-requestDate");
const currentPrepBy      = document.getElementById("transcript-preparer");
const currentPrepOn      = document.getElementById("transcript-prepareDate");
const currentTranBy      = document.getElementById("transcript-transcriber");
const currentTranOn      = document.getElementById("transcript-transcriptionDate");
const currentRevBy       = document.getElementById("transcript-reviewer");
const currentRevOn       = document.getElementById("transcript-reviewDate");

/********    Edit Transcript Window    *******/



/*********************************************
 * 
 *      FUNCTIONS
 * 
 *      -   Edit Transcript
 *      -   Create Edit Transcript Window
 *      -   Fill Edit Fields
 *      -   Clear Edit Window Fields
 *      -   Add Course Code Select
 *      -   Confirm Edit
 *      -   Save New Value
 *      -   Cancel Edit
 *      -   Delete Transcript
 *      -   Close Edit Window
 * 
 *********************************************/

/*********************************************
 *  Edit Transcript
 *      The function that is called when the button 
 *      'Edit Transcript' on the Master page is clicked.
 *********************************************/

function editTranscript() {
    createEditTranscriptWindow();
    fillEditFields();
}


/*********************************************
 *  Create Edit Transcript Window
 *      Creates and displays the window the user 
 *      sees when they want to edit the chosen transcript
 *********************************************/
function createEditTranscriptWindow() {
    
    let editWindowHTML = `
            <section class="dup " id="edit-window">
                <div class="dup-content">

                    <div class="dup-header">
                        <h2>Edit Information: - ! Under Construction ! -</h2>
                    </div>

                    <div id="edit-info-field">
                        <h3>Transcript Info</h3>
                        <div>
                            <p>Title</p>
                            <input id="edit-info-title" type="text"></input>
                        </div>
                        <div>
                            <p>Stage</p>
                            <select id="edit-info-stage">
                                <option>- - -</option>
                                <option>Ready for Prep</option>
                                <option>In Prep</option>
                                <option>Ready for Transcription</option>
                                <option>Ready for Review</option>
                                <option>In Review</option>
                                <option>Review Completed</option>
                                <option>Finished</option>
                            </select>
                        </div>
                        <div>
                            <p>Course Code(s)</p>
                            <a id="add-course-code" onclick="addCourseCodeSelect()">+</a>
                            <select id="edit-info-courses" type="text"></select>
                        </div>
                        <div>
                            <p>Priority</p>
                            <select id="edit-info-priority">
                                <option>- - -</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div>
                            <p>Type</p>
                            <select id="edit-info-type">
                                <option>- - -</option>
                                <option>Video</option>
                                <option>Audio</option>
                                <option>Alt Text</option>
                                <option>Slide Show</option>
                            </select>
                        </div>
                        <div>
                            <p>Length</p>
                            <input id="edit-info-length" type="text"></input>
                        </div>
                        <div>
                            <p>Google Doc Edit Link</p>
                            <input id="edit-info-docedit" type="text"></input>
                        </div>
                        <div>
                            <p>Google Doc Publish Link</p>
                            <input id="edit-info-docpub" type="text"></input>
                        </div>
                        <div>
                            <p>LMS URL</p>
                            <input id="edit-info-lms" type="text"></input>
                        </div>
                        <div>
                            <p>Media URL</p>
                            <input id="edit-info-media" type="text"></input>
                        </div>
                        <div>
                            <p>Verbit Used?</p>
                            <select id="edit-info-isverbit">
                                <option>- - -</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>
                        <div>
                            <p>Verbit ID</p>
                            <input id="edit-info-verbitid" type="text"></input>
                        </div>
                    </div>

                    <div id="notes-info-field">
                        <h3>Participating Users</h3>
                        <p>Requested by</p>
                        <span id="edit-info-requested-by"></span>
                        <p>Requested on</p>
                        <span id="edit-info-requested-on"></span>
                        <p>Prepared by</p>
                        <span id="edit-info-prepared-by"></span>
                        <p>Prepared Completed on</p>
                        <span id="edit-info-prepared-on"></span>
                        <p>Transcribed by</p>
                        <span id="edit-info-transcribe-by"></span>
                        <p>Transcription Completed on</p>
                        <span id="edit-info-transcribe-on"></span>
                        <p>Reviewed by</p>
                        <span id="edit-info-review-by"></span>
                        <p>Review Completed on</p>
                        <span id="edit-info-review-on"></span>

                        <h3>Comments</h3>
                        <span id="edit-info-comment"></span>
                    </div>

                    <div class="btn-box">
                        <button id="confirmEditBtn" onclick="confirmEdit()">Confirm</button>
                        <button id="cancelEditBtn" onclick="closeEditWindow()">Cancel</button>
                        <button id="btn-delete-transcript" class="btn-hover red" onclick="deleteTranscript()">Delete Transcript</button>
                    </div>
                </div>
            </section>
    `;
    main.insertAdjacentHTML('beforeEnd', editWindowHTML);
}


/*********************************************
 *  Fill Edit Fields
 *      Fill in the information for the editing transcript
 *      window automatically for the user.
 *********************************************/
function fillEditFields() {

    const editInfoField   = document.getElementById("edit-info-field");
        
    const fillTitle       = document.getElementById("edit-info-title");
    const fillStage       = document.getElementById("edit-info-stage");
    const fillCourses     = document.getElementById("edit-info-courses");
    const fillPriority    = document.getElementById("edit-info-priority");
    const fillType        = document.getElementById("edit-info-type");
    const fillLength      = document.getElementById("edit-info-length");
    const fillDocEdit     = document.getElementById("edit-info-docedit");
    const fillDocPub      = document.getElementById("edit-info-docpub");
    const fillLMS         = document.getElementById("edit-info-lms");
    const fillMedia       = document.getElementById("edit-info-media");
    const fillIsVerbit    = document.getElementById("edit-info-isverbit");
    const fillVerbitID    = document.getElementById("edit-info-verbitid");
        
    const editNotesField  = document.getElementById("notes-info-field");
        
    const fillReqBy       = document.getElementById("edit-info-requested-by");
    const fillReqOn       = document.getElementById("edit-info-requested-on");
    const fillPrepBy      = document.getElementById("edit-info-prepared-by");
    const fillPrepOn      = document.getElementById("edit-info-prepared-on");
    const fillTranBy      = document.getElementById("edit-info-transcribe-by");
    const fillTranOn      = document.getElementById("edit-info-transcribe-on");
    const fillRevBy       = document.getElementById("edit-info-review-by");
    const fillRevOn       = document.getElementById("edit-info-review-on");

    
    fillTitle.value = currentTitle.innerHTML;
}


/*********************************************
 *  Clear Edit Window Fields
 *      Erases the values in the fields of the editing
 *      transcript window
 *********************************************/
function clearEditWindowFields() {
    
}


/*********************************************
 *  Add Course Code Select
 *      Adds a drop down select for the user which shows
 *      every course on the course catalog as an option.
 *********************************************/
function addCourseCodeSelect() {
    
}


/*********************************************
 *  Confirm Edit
 *      Saves all the information filled in on the 
 *      Edit Transcript window to the database, 
 *      writing over the old data.
 *********************************************/
function confirmEdit() {

}


/*********************************************
 *  Save New Value
 *      Saves an individual value for the variable that
 *      is passed to the database.
 *********************************************/
function saveNewValue() {

}


/*********************************************
 *  Delete Transcript
 *      Removes the selected transcript in the Edit Trascript
 *      window from the database entirely.
 *********************************************/
function deleteTranscript() {

}


/*********************************************
 *  Close Edit Window
 *      Removes the Injectible HTML of the Edit Transcript
 *      window from the current HTML page.
 *********************************************/
function closeEditWindow() {
    const editWindow     = document.getElementById("edit-window");
    if (editWindow) {
        editWindow.remove();
    }
}
