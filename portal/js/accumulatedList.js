// loads the page providing different information if the user is an admin/lead
function loadPage() {
    //checks if the user has correct permissions first
    if (data.admin || data.lead) {
        document.getElementById('admin').style.visibility = "initial";
        generateList();
    } else {
        window.location.replace("home.html");
    }
}

function generateList() {
    db.collection('users').orderBy("nameDisplay", "asc").get()
        .then(function (documents) {
            var count = 1;
            documents.forEach(function (doc) {
                if (count % 2) {
                    var interpolate = "active"
                }
                document.getElementById("generate").insertAdjacentHTML('beforeend', `<tr class='${interpolate}'> <td>${count}</td> <td>${doc.data().nameDisplay}</td><td id="${doc.id}"><span id="count${doc.id}" onclick="editTime('${doc.id}', '${doc.data().time.accumulatedTime}')">${doc.data().time.accumulatedTime}</span></td>`)
                count++;
            })
        })
}

function editTime(firestore, time) {
    if (document.getElementsByClassName('notUsed').length == 0) {
        document.getElementById(firestore).insertAdjacentHTML('beforeend', `<span class="notUsed"><input id='value${firestore}' value="${time}" type="text"> <button onclick="updateDb('${firestore}', ${time}, ${'this'})" style="width:3em" type="submit"> Send </button> <button onclick="deleteSpan(${'this'})" style="width:3em" type="Text"> Close </button> </span>`);
    } else {

    }
}

function updateDb(accessId, timeToAdd, element) {
    console.log(timeToAdd);
    var id = "value" + accessId;
    console.log(id);
    var value = Number(document.getElementById(id).value);
    db.collection('users').doc(accessId).update({
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

function deleteSpan(element){
  element.parentNode.remove();
}