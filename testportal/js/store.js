// Checkout Dialog
var checkModal = document.getElementById('checkoutModal');
var checkBtn = document.getElementById("checkoutBtn");
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
  if (document.getElementById('total').innerText.slice(8) <= 0) {
    document.getElementById('confirmBtn').disabled = true;
  } else {
    document.getElementById('confirmBtn').disabled = false;
  }
});
checkClose.onclick = function () {
  checkModal.style.display = "none";
  document.getElementById('items').innerHTML = "";
}
window.onclick = function (event) {
  if (event.target == checkModal) {
    checkModal.style.display = "none";
    document.getElementById('items').innerHTML = "";
  }
}

// Confim Dialog
var confirmModal = document.getElementById('confirmModal');
var confirmBtn = document.getElementById("confirmBtn");
var confirmClose = document.getElementById("confirmClose");
confirmBtn.addEventListener('click', () => {
  confirmModal.style.display = "block";
  checkModal.style.display = "none";

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
  for (var i = 0; i < array.length; i++) {
    updateFirebase(array[i].name, array[i].count);
  }
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
    if (doc.data().count > 0) {
      firebase.storage().ref().child(`images/${doc.data().image}`).getDownloadURL().then(function (url) {
        var html = `<div><img src="${url}" alt="${doc.id}"><div>
          <p>${doc.id}</p>
          <span>$${doc.data().price}</span>
          <span id="${(doc.id).replace(/ /g, '')}count">Count: ${doc.data().count}</span>
          <button id="${(doc.id).replace(/ /g, '')}btn" onclick="addToCart('${doc.id}', '${doc.data().price}')">Add to Cart</button>
          </div>
          </div>`;
        document.getElementById("left").insertAdjacentHTML("beforeend", html);
      }).catch(function (error) {
        console.log("There was an error retreiving " + image + " from firebase");
        var html = `<div><img src="assets/default.jpeg" alt="${doc.id}"><div>
          <p>${doc.id}</p>
          <span>$${doc.data().price}</span>
          <span>Count: ${doc.data().count}</span>
          <button onclick="addToCart('${doc.id}', '${doc.data().price}', '${doc.data().count}')">Add to Cart</button>
          </div>
          </div>`;
        document.getElementById("left").insertAdjacentHTML("beforeend", html);
      })
    }
  })
});

function addToCart(item, price) {
  var count = document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "");
  document.getElementById(`${item.replace(/ /g, '')}count`).innerText = `Count: ${--count}`;
  var cartTotal = document.getElementById('cartTotal');
  var total = cartTotal.innerText.slice(2);
  var newTotal = (Number(total) + Number(price)).toFixed(2);
  cartTotal.innerText = `$${newTotal}`;
  if (document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "") <= 0) {
    document.getElementById(`${item.replace(/ /g, '')}btn`).disabled = true;
    document.getElementById(`${item.replace(/ /g, '')}btn`).classList.add("disabled");
  }
  var html = `<p>
    <span>${item}</span>
    <span>${price}
    <span onclick="removeItem(event, '${item}', '${price}')" class="remove">&times;</span></span>
    </p>`;
  document.getElementById('cart').insertAdjacentHTML('beforeend', html);
}

function removeItem(e, item, price) {
  e.preventDefault;

  var cartTotal = document.getElementById('cartTotal');
  var total = cartTotal.innerText.slice(2);
  var newTotal = (Number(total) - Number(price)).toFixed(2);
  cartTotal.innerText = `$${newTotal}`;

  var count = document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "");
  document.getElementById(`${item.replace(/ /g, '')}count`).innerText = `Count: ${++count}`;
  if (document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "") > 0) {
    document.getElementById(`${item.replace(/ /g, '')}btn`).disabled = false;
    document.getElementById(`${item.replace(/ /g, '')}btn`).classList.remove("disabled");
  }
  var cart = document.getElementById('cart');
  if (e.target.matches('.remove')) {
    cart.removeChild(e.target.parentNode.parentNode);
  }
}