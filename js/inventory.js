// Connect to firebase
const config = {
    apiKey: "AIzaSyA_I75-CU5_GlNP1QSKvvH8nbYVkaAUgNA",
    authDomain: "techopsportal.firebaseapp.com",
    databaseURL: "https://techopsportal.firebaseio.com",
    projectId: "techopsportal",
    storageBucket: "techopsportal.appspot.com",
    messagingSenderId: "265124430634"
};

//initialize Firebase
firebase.initializeApp(config);

//Make sure the user is logged in, if so call createTable function
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
                    //                    else {
                    //                        window.location.replace("home.html");
                    //                    }
                }
            });
        });
        createTable();
    } else {
        window.location.replace("index.html");
    }
});


// retrieves inventory items from firebase and uses items to create shopping cart table
function createTable() {
    var id = 1; //id number used to identify the number of each row of the table

    var table = document.getElementById("inventory-table");
    table.innerHTML = ''; //clear any existing cells in the inventory table
    var row = table.insertRow(-1); //insert row containing table column headings
    row.insertCell(0).innerHTML = "<b>Item</b>";
    var cell2 = row.insertCell(1).innerHTML = "<b>Image</b>";
    var cell3 = row.insertCell(2).innerHTML = "<b>Price</b>";
    var cell4 = row.insertCell(3).innerHTML = "<b>Stock</b>";
    var cell5 = row.insertCell(4);

    var query = firebase.database().ref("inventory/items").orderByKey(); //get inventory items from firebase
    query.once("value")
        .then(function (snapshot) { //loop through each inventory item
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key; //gets inventory item name
                var childData = childSnapshot.val(); //gets data associated with item
                var count = childData.count;
                var price = parseFloat(childData.price).toFixed(2);
                var image = childData.image;

                //create new row with four cell into table
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);

                //insert name, price, and quanity of item into cells
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

                //give each cell an id
                cell1.id = "item" + id;
                cell2.id = "image" + id;
                cell3.id = "price" + id;
                cell4.id = "count" + id;

                //create the edit button by appending a span to cell 4
                var updateButton = cell5.appendChild(document.createElement("span"));
                updateButton.innerHTML = "Edit";
                updateButton.style.cursor = "pointer";
                updateButton.style.color = "#0076c6";

                //add click eventlistener to span that calls displayUpdateModal function
                updateButton.addEventListener("click", function () {
                    displayUpdateModal(key);
                });

                //create the delete button by appending another span to cell 4
                var deleteButton = cell5.appendChild(document.createElement("span"));
                deleteButton.innerHTML = "&#x2715;";
                deleteButton.style.cursor = "pointer";

                //add click eventlistener to span that calls delete function
                deleteButton.addEventListener("click", function () {
                    deleteItem(key);
                });

                id += 1; //increment id by 1
            });

            //create a the last row in table to contain input fields for new inventory items
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            //create three input elements
            var input1 = document.createElement("input");
            var input2 = document.createElement("input");
            var input3 = document.createElement("input");
            var input4 = document.createElement("input");

            //give each input a new id
            input1.id = "input1";
            input2.id = "input2";
            input3.id = "input3";
            input4.id = "input4";

            //set the type attribute on each input
            input1.setAttribute("type", "text");
            input2.setAttribute("type", "file");
            input3.setAttribute("type", "number");
            input4.setAttribute("type", "number");
            input4.setAttribute("multiple", "false");
            input4.setAttribute("accept", "image/*");

            //set the min range and step for input 2 and 3 to zero
            input3.step = 0.01;
            input3.min = 0;
            input4.min = 0;

            //set the name for each input
            input1.name = "itemName";
            input2.name = "image";
            input3.name = "price";
            input4.name = "quantity";

            //set the name for each input
            input1.placeholder = "Item Name";
            input3.placeholder = "Price";
            input4.placeholder = "# in stock";


            //apend div to cell2
            var div = document.createElement("div");
            div.id = "image-preview";
            div.className = "image-container";
            cell2.appendChild(div);
            div.style.display = "none";

            //apend label to cell2
            var label = document.createElement("label");
            label.innerHTML = "Choose a file";
            label.htmlFor = "input2";
            label.className = "custom-file-upload";
            cell2.appendChild(label);

            //append each input to respective cell within new row
            cell1.appendChild(input1);
            label.appendChild(input2);
            cell3.appendChild(input3);
            cell4.appendChild(input4);


            //append button to cell 4
            var addButton = cell5.appendChild(document.createElement("button"));
            addButton.innerHTML = "Add";
            addButton.style.fontWeight = "bold";

            //add click eventListener to call createItem function
            addButton.addEventListener("click", createItem);

            //add click eventListener to call createItem function
            input2.addEventListener("change", displayImageFile);
        });
}


//displays modal allowing user to update a selected item
function displayUpdateModal(item) {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");

    // Open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //display the name of item to be edited in modal
    document.getElementById("name").innerHTML = item;

    //retrieve the price and count from firebase for selected item
    firebase.database().ref('/inventory/items/' + item).once('value').then(function (snapshot) {
        var itemData = snapshot.val(); //data for selected item
        var itemPrice = parseFloat(itemData.price).toFixed(2);
        var itemCount = itemData.count;
        var itemImage = itemData.image;

        //insert image into cell2
        if (itemImage == '') {
            itemImage = "default-image.png";
        }
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var spaceRef = storageRef.child('images/' + itemImage);
        spaceRef.getDownloadURL().then(function (url) {
            document.getElementById("image").style.backgroundImage = "url('" + url + "')";
        }).catch(function (error) {
            console.log("There was an error retreiving " + itemImage + " from firebase");
        });

        //display the current price and quantity of item to user in input fields
        document.getElementById("price").value = itemPrice;
        document.getElementById("quantity").value = itemCount;
        document.getElementById("hiddenInput").value = itemImage;
    });
}

//edits and updates selected item in firebase
function editItem() {
    // get item, name, price, and quantity
    var item = document.getElementById("name").innerHTML;
    var price = parseFloat((document.getElementById("price").value)).toFixed(2);
    var quantity = document.getElementById("quantity").value;
    var fileinput = document.getElementById("img");
    var file = fileinput.files[0];
    var filename = fileinput.files[0].name;

    if (!filename) {
        filename = '';
    }

    var originalImage = document.getElementById("hiddenInput").value;
    var newData;

    //check that input fields are not empty, if not update new data for item to firebase
    if (item != '' && price != '' && quantity != '') {
        if (filename === '' || filename === originalImage) {
            newData = {
                "count": quantity,
                "price": price,
                "image": originalImage
            }
            updates = {};
            updates['/inventory/items/' + item] = newData;
            firebase.database().ref().update(updates);
            createTable(); //call createTable to re-render updated table on the user interface
        } else if (filename !== originalImage) {
            if (originalImage === "default-image.png") {
                var storageRef = firebase.storage().ref();
                var imagePathRef = storageRef.child('images/' + filename);

                imagePathRef.put(file).then(function (snapshot) {
                    imagePathRef.put(file).then(function (snapshot) {
                    firebase.database().ref('/inventory/items/' + item).update({
                        "count": quantity,
                        "price": price,
                        "image": filename
                    });
                }).catch(function (error) {
                    console.error(error);
                });
                });
            } else {
                //                var storageRef = firebase.storage().ref();
                //                var deleteRef = storageRef.child('images/' + originalImage);
                //
                //                // Delete the original image file
                //                deleteRef.delete().then(function () {
                //                    var imagePathRef = storageRef.child('images/' + image);
                //                    imagePathRef.put(file).then(function (snapshot) {
                //                        newData = {
                //                            "count": quantity,
                //                            "price": price,
                //                            "image": filename
                //                        }
                //                        updates = {};
                //                        updates['/inventory/items/' + item] = newData;
                //                        firebase.database().ref().update(updates);
                //                        document.getElementById("image-preview").style.display = "none";
                //                        document.getElementById("warning").innerHTML = item + " was successfully added";
                //                        createTable(); //call createTable to re-render updated table on the user interfaces
                //                    });
                //                }).catch(function (error) {
                //                    console.log("An error occurred in removing " + originalImage + " from firebase storage");
                //                });

            }
        }
    } else if (item == '') { //if item input is empty display message to enter item name 
        document.getElementById("modal-warning").innerHTML = "Please enter an item name";
    } else if (price == '') { //if item input is empty display message to enter price 
        document.getElementById("modal-warning").innerHTML = "Please enter a price for the new item";
    } else if (quantity == '') { //if item input is empty display message to enter quantity
        document.getElementById("modal-warning").innerHTML = "Please enter the number of items in stock";
    }
}

//deletes selected item
function deleteItem(item) {
    //display confirmation pop-up box prompting user to confirm the deletion
    var a = confirm("Are you sure you would like to delete" + item + "?");

    //if the user confirms the deletion, delete the selected item from firebase
    if (a) {
        newData = {
            "count": null,
            "price": null
        }
        updates = {};
        updates['/inventory/items/' + item] = newData;
        firebase.database().ref().update(updates);
        createTable(); //call createTable to re-render updated table on the user interface 
    }
}

//creates a new item and writes new item to firebase
function createItem() {
    document.getElementById("warning").innerHTML = '';
    //get the name, price, and quantity of new item from input values
    var item = document.getElementById("input1").value;
    var price = parseFloat((document.getElementById("input3").value)).toFixed(2);
    var quantity = document.getElementById("input4").value;
    var fileinput = document.getElementById("input2");
    var file = fileinput.files[0];
    var filename = fileinput.files[0].name;

    if (!filename) {
        filename = "default-image.png";
    }

    //check that each input has a value, if none of the inputs are empty, write the new item to firebase
    if (item != '' && price != '' && quantity != '') {
        var storageRef = firebase.storage().ref();
        var imagePathRef = storageRef.child('images/' + filename);

        imagePathRef.put(file).then(function (snapshot) {
            newData = {
                "count": quantity,
                "price": price,
                "image": filename
            }
            updates = {};
            updates['/inventory/items/' + item] = newData;
            firebase.database().ref().update(updates);
            document.getElementById("image-preview").style.display = "none";
            document.getElementById("warning").innerHTML = item + " was successfully added";
            createTable();
        }).catch(function (error) {
            document.getElementById("warning").innerHTML = "There was a problem adding " + item + "to the inventory";
            console.error(error);
        });

    } else if (item == '') { //if item input is empty display message to enter item name 
        document.getElementById("warning").innerHTML = "Please enter an item name";
    } else if (price == '') { //if item input is empty display message to enter price 
        document.getElementById("warning").innerHTML = "Please enter a price for the new item";
    } else if (quantity == '') { //if item input is empty display message to enter quantity
        document.getElementById("warning").innerHTML = "Please enter the number of items in stock";
    }
}

function displayImageFile() {
    var fileinput = document.getElementById("input2");
    var file = fileinput.files[0];
    var filename = fileinput.files[0].name;
    var imagePreview = document.getElementById("image-preview");

    var reader = new FileReader();

    reader.onload = function (e) {
        imagePreview.style.backgroundImage = "url('" + e.target.result + "')";
        imagePreview.style.display = "block";
    }
    //declare the file loading
    reader.readAsDataURL(file);
}

function modalDisplayImageFile() {
    var fileinput = document.getElementById("img");
    var file = fileinput.files[0];
    var filename = fileinput.files[0].name;
    var imagePreview = document.getElementById("image");

    var reader = new FileReader();

    reader.onload = function (e) {
        imagePreview.style.backgroundImage = "url('" + e.target.result + "')";
        imagePreview.style.display = "block";
    }
    //declare the file loading
    reader.readAsDataURL(file);
}
