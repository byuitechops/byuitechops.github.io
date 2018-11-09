// Checkout Dialog
var checkModal = document.getElementById('checkoutModal');
var checkBtn = document.getElementById("checkoutBtn");
var checkClose = document.getElementById("checkoutClose");
checkBtn.addEventListener('click', () =>{
    checkModal.style.display = "block";
});
checkClose.onclick = function() {
    checkModal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == checkModal) {
    checkModal.style.display = "none";
  }
}

// Confim Dialog
var confirmModal = document.getElementById('confirmModal');
var confirmBtn = document.getElementById("confirmBtn");
var confirmClose = document.getElementById("confirmClose");
confirmBtn.addEventListener('click', () =>{
    confirmModal.style.display = "block";
    checkModal.style.display = "none";
});
confirmClose.onclick = function() {
    confirmModal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == confirmModal) {
    confirmModal.style.display = "none";
  }
}