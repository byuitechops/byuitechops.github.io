const invoicePage = document.getElementById('invoicePage');
const shoppingPage = document.getElementById('shoppingPage');
const editStore = document.getElementById('editStore');
const invoiceStore = document.getElementById('invoiceStore');
const snack = document.getElementById("snack-in-cart");
const snackEdit = document.getElementById('snack-edit');
const snackAdd = document.getElementById('snack-add');
const snackCart = document.getElementById('snack-cart');
const snackList = document.getElementById("snack-container");
const snackItemsInCart = document.getElementById("snack-shopping-list");
const cartTotal = document.getElementById('shopping-list-total');
const cartCancel = document.getElementById("snack-cart-cancel");
const cartCheckout = document.getElementById("snack-cart-checkout");
var editingStore = false;

function loadPage() {
    db.collection("users").where("name", "==", userName)
        .onSnapshot((querySnapshot) => {
            var data = querySnapshot.docs[0].data();
            var userId = querySnapshot.docs[0].id;
            var preferance = data.viewMode;
            if (data.admin || data.storeManager) {
                editStore.classList.remove('hide');
                invoiceStore.classList.remove('hide');
            }
        })
    loadSnacks();
}
$(editStore).click(() => {
    if (!editingStore) {
        $(editStore).html("Save Store");
        $(snackEdit, snackAdd).removeClass('hide');
        $(snackCart, invoiceStore).addClass('hide');
        $(snackList).empty();
        editingStore = true;
        loadSnacks();
    } else {
        $(editStore).html("Edit Store");
        $(snackEdit, snackAdd).addClass('hide');
        $(snackCart, invoiceStore).removeClass('hide');
        $(snackList).empty();
        editingStore = false;
        loadSnacks();
    }
});
$(invoiceStore).click(() => {
    if (!editingStore) {
        $(invoicePage).removeClass('hide');
        $(shoppingPage).addClass('hide');
        loadInvoice();
    }
})
$(cartCancel).click(() => {
    $(cartTotal).html("$0.00");
    $(snackItemsInCart).empty();
    $(snackList).empty();
    loadSnacks();

})
$(cartCheckout).click(() => {

})
function loadSnacks() {
    db.collection("store").doc("inventory").collection("items").orderBy("price", "desc").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            firebase.storage().ref().child(`images/${doc.data().image}`).getDownloadURL().then(function (url) {
                if (doc.data().count > 0 || editingStore) {
                    var html = `<section class="snack col5 flex-container">
                    <div class="0snack-pic col5">
                        <img src="${url}" alt="${doc.id}"/>
                    </div>
                    <div class="snack-info col5">
                        <h3 class="snack-name">${doc.id}</h3>
                        <p class="snack-cost">$${doc.data().price}</p>
                        <p class="snack-count" id="${(doc.id).replace(/ /g, '')}Count">Count: ${doc.data().count}</p>
                        <button class="add-to-cart-btn" onclick="addCart('${doc.id}', '${doc.data().price}', '${doc.data().count}')">Add to Cart</button>
                    </div>
                </section>`;
                    snackList.insertAdjacentHTML("beforeend", html);
                }
            }).catch(function (error) {
                console.log("There was an error retreiving " + image + " from firebase");

            })
        })
    });
}
function addCart(item, price, count) {
    const snackCount = document.getElementById(`${item.replace(/ /g, '')}Count`);
    var count = snackCount.innerText.replace(/Count: /g, "");
    if (count - 1 >= 0) {
        var html = `<div class="snack-in-cart">
        <span class="snack-name col7">${item}</span>
        <span class="snack-cost col2">$${price}</span>
        <button class="col1" id="snack-remove-btn" onclick="removeItem(event, '${item}', '${price}')">X</button>
    </div>`
        snackItemsInCart.insertAdjacentHTML("beforeend", html);
        var count = snackCount.innerText.replace(/Count: /g, "");
        snackCount.innerHTML = `Count: ${--count}`;
        changeTotal(price);
    }
}
function removeItem(e, item, price) {
    const snackCount = document.getElementById(`${item.replace(/ /g, '')}Count`);
    var count = snackCount.innerText.replace(/Count: /g, "");
    snackCount.innerHTML = `Count: ${++count}`;
    changeTotal(0 - price);
    $(e.target).parent().remove();
}
function changeTotal(price) {
    var total = cartTotal.innerText.replace(/\$/g, "");
    var newTotal = (Number(total) + Number(price)).toFixed(2);
    cartTotal.innerHTML = `$${newTotal}`;
}
function updateFirebase(name, change) {
    db.collection('store').doc('inventory').collection('items').doc(`${name}`).get().then(function (doc) {
        var count = doc.data().count;
        db.collection('store').doc('inventory').collection('items').doc(name)
            .update({
                count: `${count += change}`
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



/**
 * Invoice section
 */
const cashTotal = document.getElementById('cash');
const venmoTotal = document.getElementById('venmo');
const storageTotal = document.getElementById('storage');
var doneCash = false;
var doneVenmo = false;
var doneStorage = false;

function loadInvoice() {
    //checks if the user has correct permissions first
    if ((data.admin || data.storeManager)) {
        db.collection('store').doc('inventory').get()
        .then(function (doc) {
            cashTotal.innerHTML = `${doc.data().cash}`;
            venmoTotal.innerHTML = `${doc.data().venmo}`;
            storageTotal.innerHTML = `${doc.data().storage}`;
        });

    db.collection("store").doc("transactions").collection("receipts").get()
        .then(function (querySnapshot) {
            console.log
            var html = ``;
            querySnapshot.forEach((doc) => {
                var docData = `<div class="snack snack-info col4"><h3>${doc.id}</h3>`;
                var items = doc.data().items;
                docData += `<p><b>Items:</b><br> `;
                for (var key in items) {
                    docData += `<span>Amount of ${key}s: ${items[key]}<br></span>`;
                }
                docData += `</p><p><b>Total Paid:</b> $${Number(doc.data().payTotal).toFixed(2)} </p> <p><b>Payment Type:</b> ${(doc.data().payType)[0].toUpperCase()}${doc.data().payType.slice(1)} </p><p><b>User:</b> ${doc.data().user}</p></div>`;
                html = `${docData}${html}`;
            })
            document.getElementById('data').insertAdjacentHTML('beforeend', html);
        });
    } else {
        
    }
}
$(cashTotal, venmoTotal, storageTotal).click(() =>{
    if (event.target.id == 'cash'){
        if (!doneCash) {
            var input = document.createElement('input');
            input.id = "cashInput";
            input.type = "number";
            input.min = "0";
            input.value = cashTotal.innerHTML;
            cashTotal.insertAdjacentElement('afterbegin', input);
            cashTotal.removeChild(cashTotal.lastChild);
            doneCash = true;
        }
    } else if (event.target.id == 'venmo'){
        if (!doneVenmo) {
            var input = document.createElement('input');
            input.id = "venmoInput";
            input.type = "number";
            input.min = "0";
            input.value = venmoTotal.innerHTML;
            venmoTotal.insertAdjacentElement('afterbegin', input);
            venmoTotal.removeChild(venmoTotal.lastChild);
            doneVenmo = true;
        }
    } else if (event.target.id == 'storage'){
        if (!doneStorage) {
            var input = document.createElement('input');
            input.id = "storageInput";
            input.type = "number";
            input.min = "0";
            input.value = storageTotal.innerHTML;
            storageTotal.insertAdjacentElement('afterbegin', input);
            storageTotal.removeChild(storageTotal.lastChild);
            doneStorage = true;
        }
    }
})
function submitMoney() {
    var cash, storage, venmo;
    if (document.getElementById('cashInput') != undefined) {
        cash = document.getElementById('cashInput').value;
    } else {
        cash = cashTotal.innerText;
    }
    if (document.getElementById('venmoInput') != undefined) {
        venmo = document.getElementById('venmoInput').value;
    } else {
        venmo = cashTotal.innerText;
    }
    if (document.getElementById('storageInput') != undefined) {
        storage = document.getElementById('storageInput').value;
    } else {
        storage = storageTotal.innerText;
    }
    db.collection('store').doc('inventory').update({
            cash: cash,
            storage: storage,
            venmo: venmo
        })
        .then(function () {
            location.reload();
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}