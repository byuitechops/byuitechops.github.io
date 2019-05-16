const users = db.collection('users');
const admin = document.getElementById('admin');
const generate = document.getElementById("generate");
const checkBox = document.getElementById("checkShow");
function loadPage() {
    users.where("name", "==", userName)
        .onSnapshot((querySnapshot) => {
            data = querySnapshot.docs[0].data();
            if (data.admin || data.lead) {
                generateList(false);
            } else {
                window.location.replace("home.html");
            }
        })
}
function generateList(all) {
    users.orderBy("nameDisplay", "asc").get()
        .then(function (documents) {
            let count = 1
            documents.forEach(function (doc) {
                // This will filter out anyone who is not actively on our team
                if ((doc.data().team != "default" && doc.data().team != "other" && doc.data().nameDisplay != "Demo Student") || all){
                    if (count % 2 == 0) {
                        var interpolate = "active"
                    }
                    generate.insertAdjacentHTML('beforeend', `<tr class='${interpolate}'> <td class="admin-count">${count}</td> <td>${doc.data().nameDisplay}</td><td id="${doc.id}"><span id="count${doc.id}" onclick="editTime('${doc.id}', '${doc.data().time.accumulatedTime}')">${doc.data().time.accumulatedTime}</span></td><td>${doc.data().team}</td><td>${doc.data().title}</td>`)
                    count++;
                }

            })
        })
}
$(checkBox).change(() => {
    if ($(checkBox).is(':checked')) {
        $(generate).empty();
        generateList(true)
    } else {
        $(generate).empty();
        generateList(false);
    }
});
function editTime(firestore, time) {
    if (document.getElementsByClassName('notUsed').length == 0) {
        document.getElementById(firestore).insertAdjacentHTML('beforeend', `<span class="notUsed"><input id='value${firestore}' value="${time}" type="text"> <button onclick="updateDb('${firestore}', ${time}, ${'this'})" type="submit"> Send </button> <button onclick="deleteSpan(${'this'})" type="Text"> Close </button> </span>`);
    } 
}
function updateDb(accessId, timeToAdd, element) {
    console.log(timeToAdd);
    var id = "value" + accessId;
    console.log(id);
    var value = Number(document.getElementById(id).value);
    users.doc(accessId).update({
            "time.accumulatedTime": value
        })
        .then(function () {
            console.log("Document Written with Success")
        })
        .catch(function (error) {
            console.log(error);
        })
    var updateHTML = "count" + accessId;
    document.getElementById(updateHTML).innerText = value;
    element.parentNode.remove();
}
function deleteSpan(element) {
    element.parentNode.remove();
}