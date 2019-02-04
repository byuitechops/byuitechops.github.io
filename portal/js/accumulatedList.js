// loads the page providing different information if the user is an admin/lead
function loadPage() {
    //checks if the user has correct permissions first
    if (data.admin || data.lead) {
        document.getElementById('admin').style.visibility = "initial";
        generateList();
    } else {

    }
}
// db.collection('users').where("team", "==", team).get()

// document.getElementById("listTime").insertAdjacentHTML('beforeend', `<p>Name:  </p><p>Accumulated Time: </p> </br>`);


function generateList() {
    db.collection('users').orderBy("nameDisplay", "asc").get()
    .then(function(documents){
        var count = 1;
       documents.forEach(function(doc){
        //    console.log(doc.data().nameDisplay + " - > ");
        //    console.log(doc.data().time.accumulatedTime);
           if (count % 2){
               var interpolate ="active"
           } 
           document.getElementById("generate").insertAdjacentHTML('beforeend', `<tr class='${interpolate}'> <td>${count}</td> <td>${doc.data().nameDisplay}</td> <td id="${doc.id}"onclick="editTime('${doc.id}', '${doc.data().time.accumulatedTime}')">${doc.data().time.accumulatedTime}</td>`)
           count ++;
       })
    })
}

function editTime(){
    
}
// function editTime(firestore, time){
//     document.getElementById(firestore).insertAdjacentHTML('beforeend',`<input id='value${time}' type="text"> <button onclick="updateDb(${firestore})" style="width:3em" type="submit"> Send </button>`);
// }

// function updateDb(accessId){
// console.log(document.getElementById(`value${accessId}`).value);
// }