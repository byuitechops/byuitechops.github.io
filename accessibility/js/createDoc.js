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
            "fileId": "1B41vSP4ggurSr-FWFGfTXSmYTyD9cLUoBNYGCZ_t0v8",
            'title': 'Transcript: ' + title,
            "convert": "false",
            "ocr": "false",
            "supportsTeamDrives": "true",
            "resource": {
                "parents": [{
                    "id": "0B3DpK7IUgwKBdmh6bUxPYWZsQjQ"
                }]
            }
            // 'fileId': '1B41vSP4ggurSr-FWFGfTXSmYTyD9cLUoBNYGCZ_t0v8',
            // 'title': 'Transcript: ' + title,
            // 'resource': {
            //     "parents": [{
            //         "id": "0B3DpK7IUgwKBdmh6bUxPYWZsQjQ"
            //     }]
            // },
            // 'convert': 'false',
            // 'ocr': 'false',
            // 'supportsTeamDrives': 'true',
            // 'visibility': 'DEFAULT',

        })

        .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log('Response', response);
                var newFileId = response.body.slice(33, 77);
                // move(newFileId);

            },
            function (err) {
                console.error('Execute error', err);
            });
}

function move(id) {
    console.log('my id', id);
    return gapi.client.drive.files.update({
            'fileId': id,
            'addParents': '0B3DpK7IUgwKBdmh6bUxPYWZsQjQ',
            'removeParents': '0BztuMIt3a96YUUhjMWl3WElDUFk',
            'supportsTeamDrives': 'true',
            'resource': {}
        })
        .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log('Response', response);
            },
            function (err) {
                console.error('Execute error', err);
            });
}


gapi.load('client:auth2', function () {
    gapi.auth2.init({
        client_id: '275383619900-a03vtbvhm40mlne3dc1mkhq235k62eds.apps.googleusercontent.com'
    });
});