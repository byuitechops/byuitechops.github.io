var data = [];
var count = 0;
// 
db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    console.log(JSON.stringify(documentSnapshot.data()));
    data += JSON.stringify(documentSnapshot.data());
  });
});
db.collection("accessibility").get().then((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    db.collection('accessibility').doc(documentSnapshot.id).update({
      height: 315
    });
    // count++;
    // data += JSON.stringify(documentSnapshot.data());
    // console.log(count);
  });
});

db.collection('store').doc('inventory').collection('items').get().then((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    console.log(`${documentSnapshot.id}`);
    db.collection('store').doc('inventory').collection('items').doc(`${documentSnapshot.id}`).update({
      name: `${documentSnapshot.id}`
    });
  });
});

db.collection("accessibility").get().then((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    console.log(documentSnapshot.data());
    db.collection('accessibility').doc(`${documentSnapshot.id}`).update({
      backupCode: String(`${documentSnapshot.data().courseCode}`),
      courseCode: [String(`${documentSnapshot.data().courseCode}`)]
    });
  });
});

db.collection("team").doc("points").collection("pointItems").get().then((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    console.log(`${documentSnapshot.id}`);
    db.collection("team").doc("points").collection("pointItems").doc(`${documentSnapshot.id}`).update({
      title: `${documentSnapshot.id}`
    });
  });
});
db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    db.collection("users").doc(documentSnapshot.id).update({
      storeManager: false
    });
  });
});



db.collection("accessibility").get().then((querySnapshot) => {
  let acc = db.collection("accessibility");
  querySnapshot.forEach(async doc => {
    console.log(doc.id);
    if (doc.status === "Ready for Transcription") {
      await acc.doc(doc.id).update({
        statusNumber: 3
      })
    } else if (doc.status === "In Transcription") {
      await acc.doc(doc.id).update({
        statusNumber: 4
      })
    } else if (doc.status === "Ready for Review") {
      await acc.doc(doc.id).update({
        statusNumber: 5
      })
    } else if (doc.status === "Ready for Prep") {
      await acc.doc(doc.id).update({
        statusNumber: 1
      })
    } else if (doc.status === "In Prep") {
      await acc.doc(doc.id).update({
        statusNumber: 2
      })
    } else if (doc.status === "In Review") {
      await acc.doc(doc.id).update({
        statusNumber: 6
      })
    } else if (doc.status === "Review Completed") {
      await acc.doc(doc.id).update({
        statusNumber: 7
      })
    } else if (doc.status === "Finished") {
      await acc.doc(doc.id).update({
        statusNumber: 8
      })
    }
    console.log(doc.statusNumber);
  });
});