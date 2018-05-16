// Connect to firebase
const config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};
firebase.initializeApp(config);

// Check that user is logged in, if so run createTable function, if not redirect to index.html
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // If logged in do this
        user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
            name = profile.displayName;
            firebase.database().ref('users').child(name).on('value', snap => {
                var titles;
                var shot = snap.val();
                for (titles in shot) {
                    if (titles == 'Admin') {
                        if (shot[titles] == true) {
                            //Load Admin Link
                            document.getElementById('adminlink').classList.remove('hide');
                        }
                    }
                }
            });
        });
        var nameInput = document.getElementById('nameInput');
        nameInput.setAttribute('readonly', true);
        nameInput.setAttribute('value', name);
        createTable();
    } else {
        createTable();
    }
});

// use inventory items stored in firebase to create rows in shopping cart table
function createTable() {

    var table = document.getElementById("shopping-cart");
    var id = 1; //id used to identify each row

    // reads and loops through inventory items in firebase
    var query = firebase.database().ref("inventory/items").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                var key = childSnapshot.key; // item name
                var childData = childSnapshot.val(); // data for item
                firebase.database().ref('inventory/items/' + key + '/count').on('value', snap => {
                    //                    localStorage.setItem('count', snap.val());
                })
                var count = childData.count;
                //                var count = localStorage.getItem('count');

                var price = parseFloat(childData.price).toFixed(2);
                var image = childData.image;

                // create row with four cells
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);

                // If Party item has already been paid by user hide
                if (key.includes('Party') == true) {
                    firebase.database().ref('inventory/party/customers').on("value", snap => {
                        snap = snap.val();
                        var names;
                        for (names in snap) {
                            if (names === name) {
                                row.classList.add('hide');
                            }
                        }
                    })
                    if (firebase.auth().currentUser === null) {
                        row.classList.add('hide');
                    }
                }

                // insert item name, price, and count into cells
                cell1.innerHTML = key;
                cell3.innerHTML = price;
                cell4.innerHTML = count;

                //insert image into cell2
                if (image == '') {
                    image = "default-image.png";
                }
                var div = document.createElement("div");
                div.className = "image-container";
                var storage = firebase.storage();
                var storageRef = storage.ref();
                var spaceRef = storageRef.child('images/' + image);
                spaceRef.getDownloadURL().then(function (url) {
                    div.style.backgroundImage = "url('" + url + "')";
                }).catch(function (error) {
                    console.log("There was an error retreiving " + image + " from firebase");
                });
                cell2.appendChild(div);

                // give each cell an id
                cell1.id = "item" + id;
                cell2.id = "image" + id;
                cell3.id = "price" + id;
                cell4.id = "count" + id;

                // create an input element and append to cell 4
                var input = cell5.appendChild(document.createElement("input"));
                input.setAttribute("type", "number");
                if (key.includes('Party')) {
                    input.setAttribute("max", 1);
                } else {
                    input.setAttribute("max", count);
                }
                input.setAttribute("min", 0);
                input.setAttribute("placeholder", 0);
                input.setAttribute("id", "input" + id);
                id += 1;

                // add click event listener to input to call calculateTotal function
                input.addEventListener("input", calculateTotal);
            });
        });
}

// calculate the total price of purchase
function calculateTotal() {
    var rows = document.getElementById("shopping-cart").rows.length - 1; // total length of rows in shopping cart
    var total = 0;

    for (var i = 1; i <= rows; i++) { // loop through each row
        var count = document.getElementById("input" + i).value; // get quantity of item wanted by user
        var price = document.getElementById("price" + i).innerHTML; // get price of item

        var itemTotal = count * price; // find total price of item  
        total += itemTotal; // add item total to over all total
    }

    document.getElementById("cart-total").innerHTML = "$" + (total.toFixed(2));
}

// opens the confirm purchase modal 
function confirmPurchase() {

    if (document.getElementById('nameInput').value) {
        var message;
        var rows = document.getElementById("shopping-cart").rows.length - 1;
        var total = 0;

        // loops through each row in the shopping cart table
        for (var i = 1; i <= rows; i++) {
            var count = document.getElementById("input" + i).value; // get quantity of item to be purchased

            if (count > 0) { // if quantity of item to be purchased is greater than 0 add to list of items to be purchased in modal
                var price = document.getElementById("price" + i).innerHTML;
                var itemTotal = count * price;
                total += itemTotal; // add price of item to total cost
                var item = document.getElementById("item" + i).innerHTML;
                var li = document.createElement("LI");
                li.innerHTML = "(" + count + ") " + item;
                document.getElementById("modal-cart-items").appendChild(li);
            }
        }

        document.getElementById("modal-cart-total").innerHTML = total.toFixed(2); // display total cost of all items to modal

        if (total > 0) { //if the total cost of all items is greater than 0 display modal

            document.getElementById("notification").innerHTML = ''; // remove any message being displayed below the shopping cart table

            var modal = document.getElementById('myModal'); // Get the modal

            var span = document.getElementById("close"); // Get the <span> element that closes the modal

            modal.style.display = "block"; // Open the modal 

            // When the user clicks on <span> (x), close the modal, clear item list, purchase total, warning message, and uncheck radio buttons
            span.onclick = function () {
                modal.style.display = "none";
                document.getElementById('modal-cart-items').innerHTML = '';
                document.getElementById('modal-cart-total').innerHTML = '';
                document.getElementById('warning').innerHTML = '';
                document.getElementById('payment-method-1').checked = false;
                document.getElementById('payment-method-2').checked = false;
            }

            // When the user clicks anywhere outside of the modal, close it, clear item list, purchase total, warning message, and uncheck radio buttons
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    document.getElementById('modal-cart-items').innerHTML = '';
                    document.getElementById('modal-cart-total').innerHTML = '';
                    document.getElementById('warning').innerHTML = '';
                    document.getElementById('payment-method-1').checked = false;
                    document.getElementById('payment-method-2').checked = false;
                }
            }
        } else { // if no items have been selected display warning message
            message = "You must choose an item before checking out!";
            var notification = document.getElementById("notification");
            notification.innerHTML = message;
            notification.style.color = "red";

        }
    } else {
        message = "You must enter a name!";
        var notification = document.getElementById("notification");
        notification.innerHTML = message;
        notification.style.color = "red";
    }


}

// confirms purchase and updates firebase with count of item and venmo/cash payment totals
function submitConfirmation() {

    var results;
    var radios = document.getElementsByName('payment-method');
    var paymentMethod;
    var message;
    var user = document.getElementById('nameInput').value;

    var newDate = new Date();
    var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    var day = ("0" + newDate.getDate()).slice(-2);
    var year = ("0" + newDate.getFullYear()).slice(-4);

    var hours = ("0" + newDate.getHours()).slice(-2);
    var minutes = ("0" + newDate.getMinutes()).slice(-2);
    var seconds = ("0" + newDate.getSeconds()).slice(-2);
    var meridiem = hours >= 12 ? "PM" : "AM";

    var date = month + "-" + day + "-" + year + " " + meridiem + " " + hours + ":" + minutes + ":" + seconds;

    // loop through radio buttons, if a button has been checked, set value of radio button to payment method
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            paymentMethod = radios[i].value;
        }
    }

    if (paymentMethod) {
        var purchaseTotal = parseFloat(document.getElementById("modal-cart-total").innerHTML);
        var newRunningTotal;
        var newData;
        var updates;
        var rows = document.getElementById("shopping-cart").rows.length - 1;

        //loop through shopping cart table rows
        for (var i = 1; i <= rows; i++) {
            var item = document.getElementById("item" + i).innerHTML; // get item name
            var count = document.getElementById("input" + i).value; // get quantity of item to be purchased
            var currentCount;

            if (count > 0) { // if quantity to be purchased is > 0, subtract the quantity of item from the number of items in stock currently

                firebase.database().ref('inventory/items/' + item + '/count').once('value', snap => {
                    currentCount = snap.val();
                })

                var updatedCount = currentCount - count;

                // Update firebase with an updated inventory count for item
                firebase.database().ref('/inventory/items/' + item).update({
                    count: updatedCount
                });

                // display the updated item count to the user in the shopping cart table
                var currentCount = document.getElementById("count" + i).innerHTML = updatedCount;
                document.getElementById("input" + i).value = ''; // clear the input fields

                firebase.database().ref('/inventory/transactions/' + date + '/items/' + item).update({
                    count: count
                });

                firebase.database().ref('/inventory/transactions/' + date).update({
                    user: user,
                    paymentTotal: purchaseTotal,
                    paymentType: paymentMethod
                });

                if (item.includes('Party')) {
                    var data = '{"' + user + '": "paid" }';
                    data = JSON.parse(data);
                    firebase.database().ref('inventory/party/customers').update(data);
                }
            }
        }
        var user = document.getElementById('nameInput').value;

        // get the running total for the selected payment method
        firebase.database().ref("inventory/paymentTotals/" + paymentMethod).once('value').then(function (snapshot) {
            var data = snapshot.val();
            var runningTotal;
            runningTotal = parseFloat(data.total);
            newRunningTotal = runningTotal + purchaseTotal; // add the purchase total to the current payment method total to get updated total
            newData = {
                "total": newRunningTotal
            }
            updates = {};
            updates['/inventory/paymentTotals/' + paymentMethod] = newData;
            firebase.database().ref().update(updates); // update new payment total to firebase

            // display payment confirmation success message to user
            message = "You've successfully checked out an item!";
            var notification = document.getElementById("notification");
            notification.innerHTML = message;
            notification.style.color = "#f89901";

            if (firebase.auth().currentUser !== null) {
                nameInput.setAttribute('value', name);
            } else {
                document.getElementById('nameInput').value = "";
            }

            //close the modal, clear item list, purchase total, warning message, and uncheck radio buttons
            var modal = document.getElementById('myModal');
            modal.style.display = "none";
            document.getElementById('modal-cart-items').innerHTML = '';
            document.getElementById('modal-cart-total').innerHTML = '';
            document.getElementById('warning').innerHTML = '';
            document.getElementById('payment-method-1').checked = false;
            document.getElementById('payment-method-2').checked = false;
        });
    } else { // if a payment method has not been chosen display warning to user
        message = "You must choose a payment method!";
        var warning = document.getElementById("warning");
        warning.innerHTML = message;
        warning.style.color = "red";
    }

}
