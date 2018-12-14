// //  reads from firestore and searches for a matching date.
// var today = new Date().toString();
// var editToday = today.slice(4, 10);

// db.collection("users").where("info.birthday", "==", editToday).get()
//     .then(function (querySnapshot) {
//         console.log(querySnapshot);
//     })

// //handles the modal box for the event
// var modal = document.getElementById('myModal');
// modal.style.display = "block";
// var span = document.getElementsByClassName("close")[0];
// span.onclick = function () {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// modal.style.display = "block";