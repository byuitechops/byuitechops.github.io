function loadPage() {
  document.getElementById('name').innerText = `Edit Item`;
  document.getElementById('editItemBox').style.visibility = "hidden"; 
     if (!data.admin && data.title != "Project Lead") {
       window.location.replace('profile.html')
   }
}
var editOneItem = false;
// Checkout Dialog
var checkModal = document.getElementById('checkoutModal');
var checkBtn = document.getElementById("submitEdit");
var checkClose = document.getElementById("checkoutClose");
checkBtn.addEventListener('click', () => {
  checkModal.style.display = "block";
  var itemsDiv = document.getElementById('items');
  var cart = document.getElementById('cart');
  for (var i = 1; i < cart.childElementCount; i++) {
    itemsDiv.insertAdjacentElement("beforeend", cart.children[i].children[0].cloneNode(true));
    itemsDiv.insertAdjacentHTML("beforeend", `<span>${cart.children[i].children[1].childNodes[0].textContent.trim()}</span>`);
  }
  document.getElementById('total').innerText = `Total: ${document.getElementById('cartTotal').innerText}`;
});

window.onclick = function (event) {
  if (event.target == checkModal) {
    checkModal.style.display = "none";
    document.getElementById('items').innerHTML = "";
  }
}

// Check if payment type is selected
var payment;

function checkPayment() {
  if (document.getElementById('total').innerText.slice(8) <= 0) {
    document.getElementById('confirmBtn').disabled = true;
  } else {
    document.getElementById('confirmBtn').disabled = false;
  }
  var radios = document.getElementsByName('payment');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      payment = radios[i].value;
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}

// Confim Dialog
var confirmModal = document.getElementById('confirmModal');
var confirmBtn = document.getElementById("confirmBtn");
var confirmClose = document.getElementById("confirmClose");
confirmBtn.addEventListener('click', () => {
  var items = document.getElementById('items').children;
  var array = [];
  for (var i = 0; i < items.length; i++) {
    if (i % 2 == 0) {
      var item = items[i].innerText;
      var arrayResult = searchArray(array, item);
      if (typeof arrayResult == "number") {
        array[arrayResult].count += 1;
      } else {
        array.push({
          name: item,
          count: 1
        });
      }
    }
  }
  var itemsJson = `{"items": {`;
  // Update the count
  for (var i = 0; i < array.length; i++) {
    updateFirebase(array[i].name, array[i].count);
    itemsJson += `"${array[i].name}": "${array[i].count}",`;
  }
  itemsJson = `${itemsJson.slice(0, -1)}}, 
      "payTotal": ${document.getElementById('total').innerText.replace(/Total: \$/g, "")},
      "payType": "${payment}",
      "user": "${data.nameDisplay}"}`;
  // Push transaction record to firebase
  var now = new Date();
  var dateString = `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}-${("0" + now.getDate()).slice(-2)} ${("0" + now.getHours()).slice(-2)}:${("0" + now.getMinutes()).slice(-2)}`;
  db.collection('store').doc('transactions').collection('receipts').doc(dateString).set(JSON.parse(itemsJson)).then(function() {
    console.log("Document successfully written!");
  });
  // Update Money fields
  db.collection('store').doc('inventory').get().then(function (doc) {
    var newMoneyTotal = (Number(doc.data()[payment]) + Number(document.getElementById('total').innerText.replace(/Total: \$/g, ""))).toFixed(2);
    var moneyJson = `{"${payment}": "${newMoneyTotal}"}`;
    db.collection('store').doc('inventory').update(JSON.parse(moneyJson))
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  });

  // Show Confirm Box
  confirmModal.style.display = "block";
  checkModal.style.display = "none";
  document.getElementById('totalFinal').innerText = document.getElementById('total').innerText;
  setTimeout(function(){ location.reload(); }, 3000);
});

function searchArray(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name == item) {
      return i;
    }
  }
  return false;
}

function updateFirebase(name, sub) {
  db.collection('store').doc('inventory').collection('items').doc(name).get().then(function (doc) {
    var count = doc.data().count;
    db.collection('store').doc('inventory').collection('items').doc(name)
      .update({
        count: `${count -= sub}`
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  });
}

confirmClose.onclick = function () {
  confirmModal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == confirmModal) {
    confirmModal.style.display = "none";
  }
}

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

function editItem(item, price, count, url) {
  if(!editOneItem){
  document.getElementById('editItemBox').style.visibility = "visible"; 
  document.getElementById('name').innerText = `${item}`;
  var count = document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "");
 
  var html = `
    <p> <span> Current Name: ${item}</p>
    <p> <span> Current Count: ${count}</span></p>
    <p> <span> Current Price: ${price}</p>
    <p> <span> Current Image: </p>
    <div><img src="${url}" id="${item}"></div>
    `;
    document.getElementById('cart').insertAdjacentHTML('beforeend', html);
    editOneItem = true;
  }
  else{
    location.reload();
  }
}

//cancels the item editing 
document.getElementById('cancelEdit').addEventListener("click", ()=>{
  document.getElementById('editItemBox').style.visibility = "hidden";
  location.reload();
})
