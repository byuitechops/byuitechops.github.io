import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch';

admin.initializeApp();

const env = functions.config();
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('transcripts');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const getTime = functions.https.onCall((request, response) => {

});

// export const algoliaCreate = functions.firestore.document('accessibility/{docID}')
//     .onCreate((snap, context) => {
//         let data = snap.data();
//         let objectID = snap.id;

//         return index.addObject({
//             objectID,
//             ...data
//         });
//     });

// export const algoliaDelete = functions.firestore.document('accessibility/{docID}')
//     .onDelete((snap, context) => {
//         let objectID = snap.id;

//         return index.deleteObject(objectID);
//     });