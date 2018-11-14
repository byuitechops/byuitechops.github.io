// Checkout Dialog
var checkModal = document.getElementById('checkoutModal');
var checkBtn = document.getElementById("checkoutBtn");
var checkClose = document.getElementById("checkoutClose");
checkBtn.addEventListener('click', () => {
  checkModal.style.display = "block";
});
checkClose.onclick = function () {
  checkModal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == checkModal) {
    checkModal.style.display = "none";
  }
}

// Confim Dialog
var confirmModal = document.getElementById('confirmModal');
var confirmBtn = document.getElementById("confirmBtn");
var confirmClose = document.getElementById("confirmClose");
confirmBtn.addEventListener('click', () => {
  confirmModal.style.display = "block";
  checkModal.style.display = "none";
});
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
  if (document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "") <= 0) {  
    document.getElementById(`${item.replace(/ /g, '')}btn`).disabled = true;
    document.getElementById(`${item.replace(/ /g, '')}btn`).style.backgroundColor = "grey";
    document.getElementById(`${item.replace(/ /g, '')}btn`).style.opacity = "1";
  }
  var html = `<p>
    <span>${item}</span>
    <span>${price}
    <span onclick="removeItem()">&times;</span></span>
    </p>`;
  document.getElementById('cart').insertAdjacentHTML('beforeend', html);
}

function removeItem() {
  console.log(this);
  // this.parentElement.parentElement.removeItem();
}

function checkOut() {

}