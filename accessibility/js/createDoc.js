/* eslint no-console:0 */

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({
            scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.apps.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.photos.readonly'
        })
        .then(function () {
                console.log('Sign-in successful');
            },
            function (err) {
                console.error('Error signing in', err);
            });
}

function loadClient() {
    return gapi.client.load('https://content.googleapis.com/discovery/v1/apis/drive/v2/rest')
        .then(function () {
                console.log('GAPI client loaded for API');
            },
            function (err) {
                console.error('Error loading GAPI client for API', err);
            });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    var title = document.getElementById('requestTitle').value;
    return gapi.client.drive.files.copy({
            'fileId': '1B41vSP4ggurSr-FWFGfTXSmYTyD9cLUoBNYGCZ_t0v8',
            'convert': 'false',
            'ocr': 'false',
            'supportsTeamDrives': 'true',
            'resource': {
                'title': 'Transcript: ' + title,
                'parents': [{
                    'id': '0B3DpK7IUgwKBdmh6bUxPYWZsQjQ'
                }]
            }
        })

        .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log('Response', response);
                var newFileId = response.body.slice(33, 77);
                placeDocInCanvas(newFileId);

            },
            function (err) {
                console.error('Execute error', err);
            });
}


function executeGetChildren() {
    return gapi.client.drive.children.list({
            "folderId": "0AJzE0BZcnVJpUk9PVA"
        })
        .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response['result']['items']);
                response['result']['items'].forEach(element => {
                    console.log(element.id);
                    executeGetFiles(element);
                });
            },
            function (err) {
                console.error("Execute error", err);
            });
}

function executeGetFiles(element) {
    return gapi.client.drive.files.get({
            "fileId": element.id,
            "supportsTeamDrives": "true"
        })
        .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", element, response['result']['title']);
            },
            function (err) {
                console.error("Execute error", err);
            });
}


gapi.load('client:auth2', function () {
    gapi.auth2.init({
        client_id: '275383619900-a03vtbvhm40mlne3dc1mkhq235k62eds.apps.googleusercontent.com'
    });
});

function placeDocInCanvas(id) {
    var url = `https://docs.google.com/document/d/${id}`;
    console.log(url);
    var LmsUrl = 'https://byui.instructure.com/courses/10956/pages/my-page';

    return new Promise((resolve, reject) => {
        // var $ =

        $.ajax({
            dataType: "json",
            url: LmsUrl,
            success: resolve,
            method: 'GET',
            error: reject
        });
    });
}