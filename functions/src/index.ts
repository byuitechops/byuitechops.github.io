import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import algoliasearch from 'algoliasearch';
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

admin.initializeApp();

const env = functions.config();
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('transcripts');
const db = admin.firestore();

exports.algoliaCreate = functions.firestore
.document('accessibility/{docID}')
    .onCreate((snap, context) => {
        const data = snap.data();
        const objectID = snap.id;

        return index.addObject({
            objectID,
            ...data
        });
    });

exports.algoliaDelete = functions
    .firestore.document('accessibility/{docID}')
    .onDelete((snap, context) => {
        const objectID = snap.id;

        return index.deleteObject(objectID);
    });

// export const algoliaUpdate = functions.firestore.document('accessibility/{docID}')
//     .onWrite((snap, context) =>{
//         const data = snap.data();
//         const objectID = snap.id;

//         return index.addObject({
//             objectID,
//             ...data
//         });
//     });

// Export all content is being exported from algolia from firebase /accessibility
exports.addFirestoreData = functions.https.onRequest((req, res) =>{
    const list = new Array();
    db.collection("accessibility").get()
    .then((docs) =>{
        docs.forEach((doc) =>{
            const transcript = doc.data()
            transcript.objectID = doc.id;

            list.push(transcript);

        });

        index.saveObject(list, function (err, content){
            res.status(200).send(content);
        });
    }).catch((err)=>{
        console.log(err);
    })
});

