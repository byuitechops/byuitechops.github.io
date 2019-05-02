/**********************************************
 * MAIN.JS | Quality Assurance Javascript File
 * 
 * 
 *********************************************/

var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");

showSlides();

function showSlides() {

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 8000); // Change image every 10 seconds
}

function currentSlide(no) {

  for (var i = 0; i < slides.length; i++) {
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