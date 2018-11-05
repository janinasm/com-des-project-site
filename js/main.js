// multimedia-e imageslider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");
  var numbers = document.getElementsByClassName("number");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

// headline
var scrollpos = window.scrollY;
var header = document.getElementById("header_landing");
var header_height = header.offsetHeight;

var header_grid = document.getElementById("header_landing_grid");
var header_grid_height = header_grid.offsetHeight;

window.addEventListener("scroll", function() {
  scrollpos = window.scrollY;

  if (scrollpos > header_height) {
    header.classList.add("fade-out");
  } else {
    header.classList.remove("fade-out");
  }

  if (scrollpos > 50 && scrollpos <= header_grid_height * 2) {
    header_grid.classList.add("fade-out");
  } else {
    header_grid.classList.remove("fade-out");
  }
});

// scroll-seksjon
// https://jsfiddle.net/shaaraddalvi/4rp09jL0/
var multimedia_scroll = document.getElementById("multimedia-scroll");
var multimedia_scroll_media = document.getElementById(
  "multimedia-scroll_media"
);

var video_a = document.getElementById("video-a");
var video = document.getElementById("video");
var mm_a = document.getElementById("multimedia-a");

// multimedia-a nils petter
var mm_a_text = document.getElementById("multimedia-a_text");
var mm_a_media_img1 = document.getElementById(
  "multimedia-a_media_img--1"
);
var mm_a_media_img2 = document.getElementById(
  "multimedia-a_media_img--2"
);

// multimedia-a familien
var mm_b_text = document.getElementById("multimedia-b_text");
var mm_b_quote1 = document.getElementById("multimedia-b_excerpt_p");

// multimedia-d aarum
var mm_d_text = document.getElementsByClassName("multimedia-d_text")[0];
var mm_d_media_img1 = document.getElementsByClassName(
  "multimedia-d_media_img--1"
)[0];
var mm_d_media_img2 = document.getElementsByClassName(
  "multimedia-d_media_img--2"
)[0];
var mm_d_media_quote1 = document.getElementsByClassName(
  "multimedia-d_excerpt_p"
)[0];

var quote1 = document.getElementsByClassName(
  "multimedia-scroll_text_quoteblock"
)[1];
var quote2 = document.getElementsByClassName(
  "multimedia-scroll_text_quoteblock"
)[2];
var quote3 = document.getElementsByClassName(
  "multimedia-scroll_text_quoteblock"
)[3];

var img1 = document.getElementById("img-1");
var img2 = document.getElementById("img-2");
var img3 = document.getElementById("img-3");

// scroll listener function
window.addEventListener("scroll", function(e) {
  if (isTopScrolledIntoView(mm_a_media_img2)) {
    mm_a_media_img1.classList.remove("fade-out");
    mm_a_media_img2.classList.remove("fade-out");

    mm_a_media_img1.classList.add("slide-up-long");
    mm_a_media_img2.classList.add("slide-up-long");
  }

  if (isTopScrolledIntoView(mm_d_media_quote1)) {
    mm_d_media_img1.classList.remove("fade-out");
    mm_d_media_img2.classList.remove("fade-out");
    mm_d_media_quote1.classList.remove("fade-out");

    mm_d_media_img1.classList.add("slide-up-short");
    mm_d_media_img2.classList.add("slide-up-medium");
    mm_d_media_quote1.classList.add("slide-up-long");
  }

  if (isTopScrolledIntoView(mm_b_quote1)) {
    mm_b_quote1.classList.remove("fade-out");

    mm_b_quote1.classList.add("slide-up-medium");
  }

  if (isBottomScrolledIntoView(video)) {
    video.classList.add("sticky");
  }

  if (isBottomScrolledIntoView(video_a) || isScrolledIntoView(mm_a_text)) {
    video.classList.remove("sticky");
  }

  if (isScrolledIntoView(multimedia_scroll)) {
    multimedia_scroll_media.classList.remove("not-visible");

    img1.classList.remove("fade-out");
  }

  if (!isScrolledIntoView(multimedia_scroll)) {
    multimedia_scroll_media.classList.add("not-visible");
  }

  if (isScrolledIntoView(quote1)) {
    img2.classList.add("fade-out");
  }

  if (isScrolledIntoView(quote2)) {
    img1.classList.add("fade-out");
    img2.classList.remove("fade-out");
    img3.classList.add("fade-out");
  }

  if (isScrolledIntoView(quote3)) {
    img2.classList.add("fade-out");
    img3.classList.remove("fade-out");
  }
});

// top or bottom
function isScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;

  // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

// fully
function isScrolledFullyIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;

  var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  return isVisible;
}

// top
function isTopScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;

  var isVisible = elemTop <= window.innerHeight;
  return isVisible;
}

// bottom
function isBottomScrolledIntoView(el) {
  var elemBottom = el.getBoundingClientRect().bottom;

  var isVisible = elemBottom <= window.innerHeight;
  return isVisible;
}

// multimedia-f klikk for å vise video
var mm_f_button = document.getElementById("multimedia-f_button");
var mm_f_video = document.getElementById("multimedia-f_media_video");


mm_f_button.onclick = function() {
  mm_f_video.classList.remove("fade-out");
  mm_f_video.classList.add("fade-in-2")
  mm_f_video.play();
  mm_f_video.addEventListener('ended', function() {
    mm_f_button.innerHTML = "Se igjen";
    mm_f_button.classList.remove("fade-out");
  })

  mm_f_button.classList.add("fade-out");
}
