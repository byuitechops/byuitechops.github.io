/*********************************************
 *   
 *
 *********************************************/
var notLoggedIn = (() => {
    var data =
        `<div id="continue-guest" class="dup">
                <div class="dup-content" id="continue-guest-window">
                    <div class="dup-header">
                        <h2>Continue As Guest</h2>
                    </div>
                    <div id="btn-box">
                        <button id="dupFinishedBtn" onclick="redirect()">Sign In</button>
                        <button id="dupFinishedBtn" onlclick="loginGuest()">Continue As Guest</button>
                    </div>
                </div>
            </div>`;

    document.getElementsByName("body").appendChild(data);
});

var loginGuest = (()=>{
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
});

var redirect= (()=>{
    if (window.location.pathname != '/index.html') {
        window.location.assign('index.html');
    };
});