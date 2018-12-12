// loads the page providing different information if the user is an admin/lead
function loadPage() {
    //checks if the user has correct permissions first
    if (data.admin || data.title == "Store Manager") {
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
    console.log(queryDay);

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
                docData += `</p><p><b>Total Paid:</b> $${Number(doc.data().payTotal).toFixed(2)} </p> <p><b>Payment Type:</b> ${doc.data().payType} </p><p><b>User:</b> ${doc.data().user}</p></div>`;
                html = `${docData}${html}`;
            })
            document.getElementById('data').insertAdjacentHTML('beforeend', html);
        })
}