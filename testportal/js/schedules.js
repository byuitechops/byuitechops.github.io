// loads the page providing different information if the user is an admin/lead
function loadPage(){
    //gets and reads database, stores into a variable
     db.collection("users").doc(userId).get()
    .then(function (doc) {
        const myData = doc.data();
      var team =  document.getElementById("teams");
      var iframe = document.getElementById("spreadsheet");
      //checks for permissions to see both teams' schedule
        if (myData.admin || myData.teamLead){
            document.getElementById("admin").style.visibility = "visible";
            team.style.visibility = "visible";
            //clicked on team 1
            document.getElementById("selectTeam").addEventListener("change", ()=>{
               if (document.getElementById("selectTeam").value == "canvas1"){
                iframe.src = "https://docs.google.com/spreadsheets/d/1P8rKKlO4BxLonT840yB7SeO59bjnmLnjvYNiurNaywg/?widget=true"
               }
               else{
                iframe.src = "https://docs.google.com/spreadsheets/d/1TaUkWSifGGYkE5um2Rjtfi_Q37EzPUWmY-_X87sBQSo/?widget=true"
               }  
            })
        }
        else {
            if (myData.team == "Canvas 1" || myData.team == "canvas1"){
                team.style.visibility = "visible";
            }
            else{
                team.style.visibility = "visible";
                iframe.src = "https://docs.google.com/spreadsheets/d/1TaUkWSifGGYkE5um2Rjtfi_Q37EzPUWmY-_X87sBQSo/?widget=true"
                
            }
        }
    })
}