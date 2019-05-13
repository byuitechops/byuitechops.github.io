// /**
//  * 
//  */

// document.getElementById('name').innerText = `${data.nameDisplay}'s Cart`;


// // Checkout Dialog
// var checkModal = document.getElementById('checkoutModal');
// var checkBtn = document.getElementById("checkoutBtn");
// var checkClose = document.getElementById("checkoutClose");
// checkBtn.addEventListener('click', () => {
//     checkModal.style.display = "block";
//     var itemsDiv = document.getElementById('items');
//     var cart = document.getElementById('cart');
//     for (var i = 1; i < cart.childElementCount; i++) {
//         itemsDiv.insertAdjacentElement("beforeend", cart.children[i].children[0].cloneNode(true));
//         itemsDiv.insertAdjacentHTML("beforeend", `<span>${cart.children[i].children[1].childNodes[0].textContent.trim()}</span>`);
//     }
//     document.getElementById('total').innerText = `Total: ${document.getElementById('cartTotal').innerText}`;
// });
// checkClose.onclick = function () {
//     checkModal.style.display = "none";
//     document.getElementById('items').innerHTML = "";
// }
// window.onclick = function (event) {
//     if (event.target == checkModal) {
//         checkModal.style.display = "none";
//         document.getElementById('items').innerHTML = "";
//     }
// }

// // Check if payment type is selected
// var payment;

// function checkPayment() {
//     if (document.getElementById('total').innerText.slice(8) <= 0) {
//         document.getElementById('confirmBtn').disabled = true;
//     } else {
//         document.getElementById('confirmBtn').disabled = false;
//     }
//     var radios = document.getElementsByName('payment');
//     for (var i = 0, length = radios.length; i < length; i++) {
//         if (radios[i].checked) {
//             // do whatever you want with the checked radio
//             payment = radios[i].value;
//             // only one radio can be logically checked, don't check the rest
//             break;
//         }
//     }
// }

// // Confim Dialog
// var confirmModal = document.getElementById('confirmModal');
// var confirmBtn = document.getElementById("confirmBtn");
// var confirmClose = document.getElementById("confirmClose");
// confirmBtn.addEventListener('click', () => {
//     var items = document.getElementById('items').children;
//     var array = [];
//     for (var i = 0; i < items.length; i++) {
//         if (i % 2 == 0) {
//             var item = items[i].innerText;
//             var arrayResult = searchArray(array, item);
//             if (typeof arrayResult == "number") {
//                 array[arrayResult].count += 1;
//             } else {
//                 array.push({
//                     name: item,
//                     count: 1
//                 });
//             }
//         }
//     }
//     var itemsJson = `{"items": {`;
//     // Update the count
//     for (var i = 0; i < array.length; i++) {
//         updateFirebase(array[i].name, array[i].count);
//         itemsJson += `"${array[i].name}": "${array[i].count}",`;
//     }
//     itemsJson = `${itemsJson.slice(0, -1)}}, 
//         "payTotal": ${document.getElementById('total').innerText.replace(/Total: \$/g, "")},
//         "payType": "${payment}",
//         "user": "${data.nameDisplay}"}`;
//     // Push transaction record to firebase
//     var now = new Date();
//     var dateString = `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}-${("0" + now.getDate()).slice(-2)} ${("0" + now.getHours()).slice(-2)}:${("0" + now.getMinutes()).slice(-2)}`;
//     db.collection('store').doc('transactions').collection('receipts').doc(dateString).set(JSON.parse(itemsJson)).then(function () {
//         console.log("Document successfully written!");
//     });
//     // Update Money fields
//     db.collection('store').doc('inventory').get().then(function (doc) {
//         var newMoneyTotal = (Number(doc.data()[payment]) + Number(document.getElementById('total').innerText.replace(/Total: \$/g, ""))).toFixed(2);
//         var moneyJson = `{"${payment}": "${newMoneyTotal}"}`;
//         db.collection('store').doc('inventory').update(JSON.parse(moneyJson))
//             .then(function () {
//                 console.log("Document successfully updated!");
//             })
//             .catch(function (error) {
//                 // The document probably doesn't exist.
//                 console.error("Error updating document: ", error);
//             });
//     });

//     // Show Confirm Box
//     confirmModal.style.display = "block";
//     checkModal.style.display = "none";
//     document.getElementById('totalFinal').innerText = document.getElementById('total').innerText;
//     setTimeout(function () {
//         location.reload();
//     }, 3000);
// });

// function searchArray(array, item) {
//     for (var i = 0; i < array.length; i++) {
//         if (array[i].name == item) {
//             return i;
//         }
//     }
//     return false;
// }

// function updateFirebase(name, sub) {
//     db.collection('store').doc('inventory').collection('items').doc(`${name}`).get().then(function (doc) {
//         var count = doc.data().count;
//         db.collection('store').doc('inventory').collection('items').doc(name)
//             .update({
//                 count: `${count -= sub}`
//             })
//             .then(function () {
//                 console.log("Document successfully updated!");
//             })
//             .catch(function (error) {
//                 // The document probably doesn't exist.
//                 console.error("Error updating document: ", error);
//             });
//     });
// }

// confirmClose.onclick = function () {
//     confirmModal.style.display = "none";
// }
// window.onclick = function (event) {
//     if (event.target == confirmModal) {
//         confirmModal.style.display = "none";
//     }
// }

// db.collection("store").doc("inventory").collection("items").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         if (doc.data().count > 0) {
//             firebase.storage().ref().child(`images/${doc.data().image}`).getDownloadURL().then((url) => {
//                 var html = `<div><img src="${url}" alt="${doc.id}"><div>
//             <p>${doc.id}</p>
//             <span>$${doc.data().price}</span>
//             <span id="${(doc.id).replace(/ /g, '')}count">Count: ${doc.data().count}</span>
//             <button id="${(doc.id).replace(/ /g, '')}btn" onclick="addToCart('${doc.id}', '${doc.data().price}')">Add to Cart</button>
//             </div>
//             </div>`;
//                 document.getElementById("left").insertAdjacentHTML("beforeend", html);
//             }).catch(function (error) {
//                 console.log("There was an error retreiving " + image + " from firebase");
//                 var html = `<div><img src="assets/default.jpeg" alt="${doc.id}"><div>
//             <p>${doc.id}</p>
//             <span>$${doc.data().price}</span>
//             <span>Count: ${doc.data().count}</span>
//             <button onclick="addToCart('${doc.id}', '${doc.data().price}', '${doc.data().count}')">Add to Cart</button>
//             </div>
//             </div>`;
//                 document.getElementById("left").insertAdjacentHTML("beforeend", html);
//             })
//         }
//     })
// });

// function addToCart(item, price) {
//     var count = document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "");
//     document.getElementById(`${item.replace(/ /g, '')}count`).innerText = `Count: ${--count}`;
//     var cartTotal = document.getElementById('cartTotal');
//     var total = cartTotal.innerText.replace(/\$/g, "");
//     var newTotal = (Number(total) + Number(price)).toFixed(2);
//     cartTotal.innerText = `$${newTotal}`;
//     if (document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "") <= 0) {
//         document.getElementById(`${item.replace(/ /g, '')}btn`).disabled = true;
//         document.getElementById(`${item.replace(/ /g, '')}btn`).classList.add("disabled");
//     }
//     var html = `<p>
//       <span>${item}</span>
//       <span>${price}
//       <span onclick="removeItem(event, '${item}', '${price}')" class="remove">&times;</span></span>
//       </p>`;
//     document.getElementById('cart').insertAdjacentHTML('beforeend', html);
// }

// function removeItem(e, item, price) {
//     e.preventDefault;

//     var cartTotal = document.getElementById('cartTotal');
//     var total = cartTotal.innerText.replace(/\$/g, "");
//     var newTotal = (Number(total) - Number(price)).toFixed(2);
//     cartTotal.innerText = `$${newTotal}`;

//     var count = document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "");
//     document.getElementById(`${item.replace(/ /g, '')}count`).innerText = `Count: ${++count}`;
//     if (document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "") > 0) {
//         document.getElementById(`${item.replace(/ /g, '')}btn`).disabled = false;
//         document.getElementById(`${item.replace(/ /g, '')}btn`).classList.remove("disabled");
//     }
//     var cart = document.getElementById('cart');
//     if (e.target.matches('.remove')) {
//         cart.removeChild(e.target.parentNode.parentNode);
//     }
// }

// var editOneItem = false;
// // CONFIRM EDITIONS TO THE ITEM
// var checkModal = document.getElementById('checkoutModal');
// var confirmEditBtn = document.getElementById("submitEdit");
// confirmEditBtn.addEventListener('click', () => {
//     var name;
//     var count;
//     var price;
//     var imgFile;

//     if (document.getElementById('nameInput') != undefined) {
//         name = document.getElementById('nameInput').value;
//     } else {
//         name = document.getElementById('nameEdit').innerText;
//     }

//     if (document.getElementById('countInput') != undefined) {
//         count = document.getElementById('countInput').value;
//     } else {
//         count = document.getElementById('countEdit').innerText;
//     }

//     if (document.getElementById('priceInput') != undefined) {
//         price = document.getElementById('priceInput').value;
//     } else {
//         price = document.getElementById('priceEdit').innerText;
//     }

//     if (document.getElementById('imgFile') != undefined) {
//         imgFile = document.getElementById('imgFile').files[0];
//         console.log(document.getElementById('imgFile').files);
//     } else {
//         imgFile = undefined;
//     }

//     if (imgFile == undefined) {
//         db.collection('store').doc('inventory').collection('items').doc(name).get()
//             .then(function (doc) {
//                 if (doc.exists) {
//                     db.collection('store').doc('inventory').collection('items').doc(name).update({
//                             count: count,
//                             price: price
//                         })
//                         .then(function () {
//                             console.log("Document successfully updated!");
//                             location.reload();
//                         })
//                         .catch(function (error) {
//                             // The document probably doesn't exist.
//                             console.error("Error updating document: ", error);
//                         });
//                 } else {
//                     db.collection('store').doc('inventory').collection('items').doc(name).set({
//                             count: count,
//                             price: price,
//                             image: "default-image.png"
//                         })
//                         .then(function () {
//                             console.log("Document successfully updated!");
//                             location.reload();
//                         })
//                         .catch(function (error) {
//                             // The document probably doesn't exist.
//                             console.error("Error updating document: ", error);
//                         });
//                 }
//             })
//     } else {
//         var imgName = imgFile.name;
//         var storage = firebase.storage().ref().child(`images/${imgName}`);
//         storage.put(imgFile).then(function (snapshot) {
//             console.log('Uploaded a blob or file!');
//             console.log(snapshot);
//             db.collection('store').doc('inventory').collection('items').doc(name).get()
//                 .then(function (doc) {
//                     if (doc.exists) {
//                         db.collection('store').doc('inventory').collection('items').doc(name).update({
//                                 count: count,
//                                 price: price,
//                                 image: imgName
//                             })
//                             .then(function () {
//                                 console.log("Document successfully updated!");
//                                 location.reload();
//                             })
//                             .catch(function (error) {
//                                 // The document probably doesn't exist.
//                                 console.error("Error updating document: ", error);
//                             });
//                     } else {
//                         db.collection('store').doc('inventory').collection('items').doc(name).set({
//                                 count: count,
//                                 price: price,
//                                 image: imgName
//                             })
//                             .then(function () {
//                                 console.log("Document successfully updated!");
//                                 location.reload();
//                             })
//                             .catch(function (error) {
//                                 // The document probably doesn't exist.
//                                 console.error("Error updating document: ", error);
//                             });
//                     }
//                 })
//         })
//     }
// });

// window.onclick = function (event) {
//     if (event.target == checkModal) {
//         checkModal.style.display = "none";
//         document.getElementById('items').innerHTML = "";
//     }
// }

// // Show items from firebase
// db.collection("store").doc("inventory").collection("items").get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//         firebase.storage().ref().child(`images/${doc.data().image}`).getDownloadURL().then(function (url) {
//             var html = `<div><img src="${url}" alt="${doc.id}"><div>
//             <p>${doc.id}</p>
//             <span>$${doc.data().price}</span>
//             <span id="${(doc.id).replace(/ /g, '')}count">Count: ${doc.data().count}</span>
//             <button id="${(doc.id).replace(/ /g, '')}btn" onclick="editItem('${doc.id}', '${doc.data().price}', '${doc.data().count}', '${url}')">Edit Item</button>
//             </div>
//             </div>`;
//             document.getElementById("left").insertAdjacentHTML("beforeend", html);
//         }).catch(function (error) {
//             console.log("There was an error retreiving " + image + " from firebase");

//         })
//     })
// });

// // Populate Edit box
// function editItem(item, price, count, url) {
//     if (!editOneItem) {
//         document.getElementById('editItemBox').style.visibility = "visible";
//         document.getElementById('name').innerText = `${item}`;
//         var count = document.getElementById(`${item.replace(/ /g, '')}count`).innerText.replace(/Count: /g, "");
//         document.getElementById('nameEdit').innerText = item;
//         document.getElementById('countEdit').innerText = count;
//         document.getElementById('priceEdit').innerText = price;
//         document.getElementById('priceEdit').value = price;
//         document.getElementById('imgEdit').innerHTML = `<img src="${url}" id="${item}">`;
//         editOneItem = true;
//     } else {
//         location.reload();
//     }
// }

// // add a new item
// document.getElementById("addNewItem").addEventListener("click", () => {
//     if (!editOneItem) {
//         document.getElementById('editItemBox').style.visibility = "visible";
//         document.getElementById('name').innerText = `New Item`;
//         document.getElementById('nameEdit').innerHTML = `<input type="text" id="nameInput">`;
//         document.getElementById('countEdit').innerHTML = `<input type="text" id="countInput">`;
//         document.getElementById('priceEdit').innerHTML = `<input type="text" id="priceInput">`;
//         document.getElementById('imgEdit').innerHTML = `<input type="file" id="imgFile">`;
//         editOneItem = true;
//     } else {
//         location.reload();
//     }
// })


// //handles the item's count editing call
// var doneCount = false;
// document.getElementById('countEdit').addEventListener('click', () => {
//     if (!doneCount) {
//         var input = document.createElement('input');
//         input.id = "countInput";
//         input.type = "number";
//         input.min = "0";
//         input.value = document.getElementById('countEdit').innerHTML;
//         document.getElementById('countEdit').insertAdjacentElement('afterbegin', input);
//         document.getElementById('countEdit').removeChild(document.getElementById('countEdit').lastChild);
//         doneCount = true;
//     }
// })

// //handles the item's price editing call
// var donePrice = false;
// document.getElementById('priceEdit').addEventListener('click', () => {
//     if (!donePrice) {
//         var input = document.createElement('input');
//         input.id = "priceInput";
//         if (document.getElementById('priceEdit').value != undefined) {
//             input.value = document.getElementById('priceEdit').value;
//         }
//         document.getElementById('priceEdit').insertAdjacentElement('afterbegin', input);
//         document.getElementById('priceEdit').removeChild(document.getElementById('priceEdit').lastChild);
//         donePrice = true;
//     }
// })

// //handles the item's image editing call
// var doneImg = false;
// document.getElementById('imgEdit').addEventListener('click', () => {
//     if (!doneImg) {
//         var input = document.createElement('input');
//         input.id = "imgFile";
//         input.type = "file";
//         // input.value = document.getElementById('imgEdit').innerHTML;
//         document.getElementById('imgEdit').insertAdjacentElement('afterbegin', input);
//         document.getElementById('imgEdit').removeChild(document.getElementById('imgEdit').lastChild);
//         doneImg = true;
//     }
// })
// //cancels the item editing 
// document.getElementById('cancelEdit').addEventListener("click", () => {
//     document.getElementById('editItemBox').style.visibility = "hidden";
//     location.reload();
// })




//////////////////////////////
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
        invoicePage.classList.remove('hide');
        shoppingPage.classList.add('hide');
    }
})
// Show items from firebase
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
    cartTotal.innerText = `$${newTotal}`;
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