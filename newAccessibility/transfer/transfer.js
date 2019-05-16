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
    count++;
    data += JSON.stringify(documentSnapshot.data());
    console.log(count);
  });
});