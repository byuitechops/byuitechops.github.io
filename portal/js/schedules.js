// loads the page providing different information if the user is an admin/lead
function loadPage(){
    //gets and reads database, stores into a variable
     db.collection("users").doc(userId).get()
    .then(function (doc) {
        const myData = doc.data();
      var team =  document.getElementById("teams");
      var iframe = document.getElementById("spreadsheet");
      //checks for permissions to see both teams' schedule
        if (myData.admin || myData.lead){
            document.getElementById("admin").style.visibility = "visible";
            team.style.visibility = "visible";
            //clicked on team 1
            document.getElementById("selectTeam").addEventListener("change", ()=>{
               if (document.getElementById("selectTeam").value == "canvas1"){
                iframe.src = "https://docs.google.com/spreadsheets/d/12WXvcWmS7S2E0NZaTnyyhLdzNsrwllD85UsavRXfpZM/edit?ts=5c2e753c#gid=0"
               }
               else{
                iframe.src = "https://docs.google.com/spreadsheets/d/1xZGwTxPbx9w56hC-4CUJnBxK0fPJTrMLqj-91pCFRhQ/edit?ts=5c2e752e#gid=0/?widget=true"
                document.getElementById("newTab").href ="https://docs.google.com/spreadsheets/d/1xZGwTxPbx9w56hC-4CUJnBxK0fPJTrMLqj-91pCFRhQ/edit?ts=5c2e752e#gid=0/?widget=true";
               }  
            })
        }
        else {
            if (myData.team == "Canvas 1" || myData.team == "canvas1"){
                team.style.visibility = "visible";
            }
            else{
                team.style.visibility = "visible";
                iframe.src = "https://docs.google.com/spreadsheets/d/1TaUkWSifGGYkE5um2Rjtfi_Q37EzPUWmY-_X87sBQSo/?widget=true";
                document.getElementById("newTab").href ="https://docs.google.com/spreadsheets/d/1TaUkWSifGGYkE5um2Rjtfi_Q37EzPUWmY-_X87sBQSo/?widget=true";
                
            }
        }
    })
}