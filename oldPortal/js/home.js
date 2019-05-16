function loadPage() {

}

var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");

showSlides();

function showSlides() {
  var i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000); // Change image every 5 seconds
}

function currentSlide(no) {
  var i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex = no;
  slides[no - 1].style.display = "block";
}

function plusSlides(n) {
  var newslideIndex = slideIndex + n;
  if (newslideIndex < 4 && newslideIndex > 0) {
    currentSlide(newslideIndex);
  }
}
var type = 'Activity Type';
db.collection('teams').doc('canvas1').collection('logs').get()
  .then(function (querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
    })
  })