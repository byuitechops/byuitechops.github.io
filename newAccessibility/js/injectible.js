/*********************************************
*   
*
*********************************************/

if (/* user is a guest */ true) {

    var data = 
        `<div id="continue-guest" class="dup">
            <div class="dup-content" id="continue-guest-window">
                <div class="dup-header">
                    <h2>Continue As Guest</h2>
                </div>
                <div id="btn-box">
                    <button id="dupFinishedBtn">Sign In</button>
                    <button id="dupFinishedBtn">Continue As Guest</button>
                </div>
            </div>
        </div>`;

    document.getElementsByName("body").appendChild(data);
}