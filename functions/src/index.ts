import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import algoliasearch from 'algoliasearch';
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

exports.firestoreOnWrite = functions.firestore.document('accessibility/{docID}')
    .onWrite((change, context) => {
        if(change.after.exists){
            console.log('Copying to Algolia');

            const newDataObject = change.after.data();
            const objectID = change.after.id;

            return index.saveObject({
                objectID,
                ...newDataObject
            })
            .then((success) => {
                console.log(success);
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            const objectID = change.before.id;
            return index.deleteObject(objectID);
        }
    });