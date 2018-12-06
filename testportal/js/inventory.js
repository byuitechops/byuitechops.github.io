function loadPage() {
  document.getElementById('name').innerText = `Edit Item`;
  document.getElementById('editItemBox').style.visibility = "hidden";
  if (!data.admin && data.title != "Store Manager") {
    window.location.replace('profile.html')
  }
}
var editOneItem = false;
// CONFIRM EDITIONS TO THE ITEM
var checkModal = document.getElementById('checkoutModal');
var confirmEditBtn = document.getElementById("submitEdit");
confirmEditBtn.addEventListener('click', () => {
  var name;
  var count;
  var price;
  var imgFile;

  if (document.getElementById('nameInput') != undefined) {
    name = document.getElementById('nameInput').value;
  } else {
    name = document.getElementById('nameEdit').innerText;
  }
  
  if (document.getElementById('countInput') != undefined) {
    count = document.getElementById('countInput').value;
  } else {
    count = document.getElementById('countEdit').innerText;
  }

  if (document.getElementById('priceInput') != undefined) {
    price = document.getElementById('priceInput').value;
  } else {
    price = document.getElementById('priceEdit').innerText;
  }

  if (document.getElementById('imgFile') != undefined) {
    imgFile = document.getElementById('imgFile').files[0];
    console.log(document.getElementById('imgFile').files);
  } else {
    imgFile = undefined;
  }

  if (imgFile == undefined) {
    db.collection('store').doc('inventory').collection('items').doc(name).get()
      .then(function (doc) {
        if (doc.exists) {
          db.collection('store').doc('inventory').collection('items').doc(name).update({
              count: count,
              price: price
            })
            .then(function () {
              console.log("Document successfully updated!");
              location.reload();
            })
            .catch(function (error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        } else {
          db.collection('store').doc('inventory').collection('items').doc(name).set({
              count: count,
              price: price,
              image: "default-image.png"
            })
            .then(function () {
              console.log("Document successfully updated!");
              location.reload();
            })
            .catch(function (error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      })
  } else {
    var imgName = imgFile.name;
    var storage = firebase.storage().ref().child(`images/${imgName}`);
    storage.put(imgFile).then(function (snapshot) {
      console.log('Uploaded a blob or file!');
      console.log(snapshot);
      db.collection('store').doc('inventory').collection('items').doc(name).get()
      .then(function (doc) {
        if (doc.exists) {
          db.collection('store').doc('inventory').collection('items').doc(name).update({
              count: count,
              price: price,
              image: imgName
            })
            .then(function () {
              console.log("Document successfully updated!");
              location.reload();
            })
            .catch(function (error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        } else {
          db.collection('store').doc('inventory').collection('items').doc(name).set({
              count: count,
              price: price,
              image: imgName
            })
            .then(function () {
              console.log("Document successfully updated!");
              location.reload();
            })
            .catch(function (error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      })
    })
  }
});

window.onclick = function (event) {
  if (event.target == checkModal) {
    checkModal.style.display = "none";
    document.getElementById('items').innerHTML = "";
  }
}

// // Confim Dialog
// var confirmBtn = document.getElementById("confirmBtn");
// var confirmClose = document.getElementById("confirmClose");
// confirmBtn.addEventListener('click', () => {
//   // Show Confirm Box

//   checkModal.style.display = "none";
//   setTimeout(function () {
//     location.reload();
//   }, 3000);
// });

// Show items from firebase
db.collection("store").doc("inventory").collection("items").get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    firebase.storage().ref().child(`images/${doc.data().image}`).getDownloadURL().then(function (url) {
      var html = `<div><img src="${url}" alt="${doc.id}"><div>
          <p>${doc.id}</p>
          <span>$${doc.data().price}</span>
          <span id="${(doc.id).replace(/ /g, '')}count">Count: ${doc.data().count}</span>
          <button id="${(doc.id).replace(/ /g, '')}btn" onclick="editItem('${doc.id}', '${doc.data().price}', '${doc.data().count}', '${url}')">Edit Item</button>
          </div>
          </div>`;
      document.getElementById("left").insertAdjacentHTML("beforeend", html);
    }).catch(function (error) {
      console.log("There was an error retreiving " + image + " from firebase");

    })
  })
});

// Populate Edit box
function editItem(item, price, count, url) {
  if (!editOneItem) {
    document.getElementById('editItemBox').style.visibility = "visible";
    document.getElementById('name').innerText = `${item}`;
    var count = document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "");
    document.getElementById('nameEdit').innerText = item;
    document.getElementById('countEdit').innerText = count;
    document.getElementById('priceEdit').innerText = price;
    document.getElementById('imgEdit').innerHTML = `<img src="${url}" id="${item}">`;
    editOneItem = true;
  } else {
    location.reload();
  }
}

// add a new item
document.getElementById("addNewItem").addEventListener("click", () =>{
  if (!editOneItem) {
    document.getElementById('editItemBox').style.visibility = "visible";
    document.getElementById('name').innerText = `New Item`;
    document.getElementById('nameEdit').innerHTML =`<input type="text" id="nameInput">`;
    document.getElementById('countEdit').innerHTML = `<input type="text" id="countInput">`;
    document.getElementById('priceEdit').innerHTML = `<input type="text" id="priceInput">`;
    document.getElementById('imgEdit').innerHTML = `<input type="file" id="imgFile">`;
    editOneItem = true;
  } else {
    location.reload();
  }
})
//handles the item's name editing call
// var doneName = false;
// document.getElementById('nameEdit').addEventListener('click', () => {
//   if (!doneName) {
//     var input = document.createElement('input');
//     input.id = "nameInput";
//     input.value = document.getElementById('nameEdit').innerHTML;
//     document.getElementById('nameEdit').insertAdjacentElement('afterbegin', input);
//     document.getElementById('nameEdit').removeChild(document.getElementById('nameEdit').lastChild);
//     doneName = true;
//   }
// })

//handles the item's count editing call
var doneCount = false;
document.getElementById('countEdit').addEventListener('click', () => {
  if (!doneCount) {
    var input = document.createElement('input');
    input.id = "countInput";
    input.type = "number";
    input.min = "0";
    input.value = document.getElementById('countEdit').innerHTML;
    document.getElementById('countEdit').insertAdjacentElement('afterbegin', input);
    document.getElementById('countEdit').removeChild(document.getElementById('countEdit').lastChild);
    doneCount = true;
  }
})

//handles the item's price editing call
var donePrice = false;
document.getElementById('priceEdit').addEventListener('click', () => {
  if (!donePrice) {
    var input = document.createElement('input');
    input.id = "priceInput";
    input.value = document.getElementById('priceEdit').innerHTML;
    document.getElementById('priceEdit').insertAdjacentElement('afterbegin', input);
    document.getElementById('priceEdit').removeChild(document.getElementById('priceEdit').lastChild);
    donePrice = true;
  }
})

//handles the item's image editing call
var doneImg = false;
document.getElementById('imgEdit').addEventListener('click', () => {
  if (!doneImg) {
    var input = document.createElement('input');
    input.id = "imgFile";
    input.type = "file";
    // input.value = document.getElementById('imgEdit').innerHTML;
    document.getElementById('imgEdit').insertAdjacentElement('afterbegin', input);
    document.getElementById('imgEdit').removeChild(document.getElementById('imgEdit').lastChild);
    doneImg = true;
  }
})
//cancels the item editing 
document.getElementById('cancelEdit').addEventListener("click", () => {
  document.getElementById('editItemBox').style.visibility = "hidden";
  location.reload();
})