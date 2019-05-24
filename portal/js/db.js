var repoStore = function () {
 var db = firebase.firestore();
 db.settings({
  timestampsInSnapshots: true
 });

 var get = function (data) {
  db.collection("store").doc("inventory").collection("items").doc(`${data.name}`).get()
  .then((document) => {
      snackHTML(document);
  });
 };

 var replace = function (data, oldName) {
  db.collection("store").doc("inventory").collection("items").doc(`${oldName}`).get().then((doc) => {
   if (doc && doc.exists) {
       db.collection("store").doc("inventory").collection("items").doc(`${data.name}`).set(data).then(() => {
           db.collection("store").doc("inventory").collection("items").doc(`${oldName}`).delete();
       });
   }
});
 };

 var set = function (data) {
  db.collection("store").doc("inventory").collection("items").doc(`${this.name}`).set({
   name: this.name,
   price: this.price,
   count: this.count,
   image: this.img.name
});
 };

 var update = function(data){
  db.collection("store").doc("inventory").collection("items").doc(`${data.name}`).update(data);
 }

 return {
  get: get,
  replace: replace,
  update: update,
  set: set
 }
}