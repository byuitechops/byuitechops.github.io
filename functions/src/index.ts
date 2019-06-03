import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'


// Algolia Search Functionality

// import * as algoliasearch from 'algoliasearch';

// const env = functions.config();
// const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
// const index = client.initIndex('transcripts');

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