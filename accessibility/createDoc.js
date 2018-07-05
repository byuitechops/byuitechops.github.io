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
    return gapi.client.drive.files.copy({
        'fileId': '1B41vSP4ggurSr-FWFGfTXSmYTyD9cLUoBNYGCZ_t0v8',
        'title': 'Hello Emma',
        'convert': 'false',
        'ocr': 'false',
        'supportsTeamDrives': 'true',
        'visibility': 'DEFAULT',
        'resource': {}
    })
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log('Response', response);
            console.log(response.body.id);

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