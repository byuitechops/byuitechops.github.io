// loads the page providing different information if the user is an admin/lead
function loadPage() {
    //checks if the user has correct permissions first
    if (data.admin || !data.storeManager) {
        showAllUsers();
    } else {
        showOneUser();
    }
}

function showOneUser() {
    db.collection("store").doc("transactions").collection("receipts").where("user", "==", data.nameDisplay).
    orderBy(firebase.firestore.FieldPath.documentId(), "desc").limit(15).get()
        .then(function (querySnapshot) {
            if (querySnapshot.empty) {
                console.log("No Transactions for this User");
            }
            var i = 1;
            querySnapshot.forEach((doc) => {
                var html = `<div><h3>Transaction ${i}</h3>`;
                i++;
                html += `<p><b>Items:</b> <br> `;
                var items = doc.data().items;
                console.log(items);
                for (var key in items) {
                    html += `<span>Amount of ${key}s: ${items[key]}</br></span>`;
                }
                html += `</p><p><b>Total Paid:</b> $${Number(doc.data().payTotal).toFixed(2)} </p> <p><b>Payment Type:</b> ${doc.data().payType} </p> </div>`;
                document.getElementById('data').insertAdjacentHTML('beforeend', html);
            })
        })
}

function showAllUsers() {
    var today = new Date();
    var month = today.getMonth();
    if (month == 0) {
        month = 12;
    }
    var queryDay = `${today.getFullYear()}-${month}-${today.getDate()} 00:00`;

    db.collection('store').doc('inventory').get()
        .then(function (doc) {
            document.getElementById('cash').innerHTML = `${doc.data().cash}`;
            document.getElementById('venmo').innerHTML = `${doc.data().venmo}`;
            document.getElementById('storage').innerHTML = `${doc.data().storage}`;
        })

    db.collection("store").doc("transactions").collection("receipts")
        .where(firebase.firestore.FieldPath.documentId(), ">", queryDay).get()
        .then(function (querySnapshot) {
            var html = ``;
            querySnapshot.forEach((doc) => {
                var docData = `<div><h3>${doc.id}</h3>`;
                var items = doc.data().items;

                docData += `<p><b>Items:</b><br> `;
                for (var key in items) {
                    docData += `<span>Amount of ${key}s: ${items[key]}<br></span>`;
                }
                docData += `</p><p><b>Total Paid:</b> $${Number(doc.data().payTotal).toFixed(2)} </p> <p><b>Payment Type:</b> ${(doc.data().payType)[0].toUpperCase()}${doc.data().payType.slice(1)} </p><p><b>User:</b> ${doc.data().user}</p></div>`;
                html = `${docData}${html}`;
            })
            document.getElementById('data').insertAdjacentHTML('beforeend', html);
        })
}

//handles the cash edit call
var doneCash = false;
document.getElementById('cash').addEventListener('click', () => {
    if (!doneCash) {
        var input = document.createElement('input');
        input.id = "cashInput";
        input.type = "number";
        input.min = "0";
        input.value = document.getElementById('cash').innerHTML;
        document.getElementById('cash').insertAdjacentElement('afterbegin', input);
        document.getElementById('cash').removeChild(document.getElementById('cash').lastChild);
        doneCash = true;
    }
})

//handles the venmo edit call
var doneVenmo = false;
document.getElementById('venmo').addEventListener('click', () => {
    if (!doneVenmo) {
        var input = document.createElement('input');
        input.id = "venmoInput";
        input.type = "number";
        input.min = "0";
        input.value = document.getElementById('venmo').innerHTML;
        document.getElementById('venmo').insertAdjacentElement('afterbegin', input);
        document.getElementById('venmo').removeChild(document.getElementById('venmo').lastChild);
        doneVenmo = true;
    }
})

//handles the storage edit call
var doneStorage = false;
document.getElementById('storage').addEventListener('click', () => {
    if (!doneStorage) {
        var input = document.createElement('input');
        input.id = "storageInput";
        input.type = "number";
        input.min = "0";
        input.value = document.getElementById('storage').innerHTML;
        document.getElementById('storage').insertAdjacentElement('afterbegin', input);
        document.getElementById('storage').removeChild(document.getElementById('storage').lastChild);
        doneStorage = true;
    }
})

// submit the money changes
function submitMoney() {
    var cash, storage, venmo;
    if (document.getElementById('cashInput') != undefined) {
        cash = document.getElementById('cashInput').value;
    } else {
        cash = document.getElementById('cash').innerText;
    }
    if (document.getElementById('venmoInput') != undefined) {
        venmo = document.getElementById('venmoInput').value;
    } else {
        venmo = document.getElementById('venmo').innerText;
    }
    if (document.getElementById('storageInput') != undefined) {
        storage = document.getElementById('storageInput').value;
    } else {
        storage = document.getElementById('storage').innerText;
    }
    console.log(cash);
    console.log(venmo);
    console.log(storage);
    db.collection('store').doc('inventory').update({
        cash: cash,
        storage: storage,
        venmo: venmo
    })
    .then(function() {
        console.log("Document successfully updated!");
        location.reload();
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}