// referanser til html-elementer
const header = document.getElementById("header_landing"),
  header_grid = document.getElementById("header_landing_grid"),
  multimedia_scroll = document.getElementById("multimedia-scroll"),
  multimedia_scroll_media = document.getElementById("multimedia-scroll_media"),
  nilsen_video = document.getElementById("video-a"),
  mm_a = document.getElementById("multimedia-a"),
  mm_a_text = document.getElementById("multimedia-a_text"),
  mm_a_media_img1 = document.getElementById("multimedia-a_media_img--1"),
  mm_a_media_img2 = document.getElementById("multimedia-a_media_img--2"),
  mm_b_text = document.getElementById("multimedia-b_text"),
  mm_b_quote1 = document.getElementById("multimedia-b_excerpt_p"),
  mm_d_text = document.getElementsByClassName("multimedia-d_text")[0],
  mm_d_media_img1 = document.getElementsByClassName(
    "multimedia-d_media_img--1"
  )[0],
  mm_d_media_img2 = document.getElementsByClassName(
    "multimedia-d_media_img--2"
  )[0],
  mm_d_media_quote1 = document.getElementsByClassName(
    "multimedia-d_excerpt_p"
  )[0],
  quote1 = document.getElementsByClassName(
    "multimedia-scroll_text_quoteblock"
  )[1],
  quote2 = document.getElementsByClassName(
    "multimedia-scroll_text_quoteblock"
  )[2],
  quote3 = document.getElementsByClassName(
    "multimedia-scroll_text_quoteblock"
  )[3],
  img1 = document.getElementById("img-1"),
  img2 = document.getElementById("img-2"),
  img3 = document.getElementById("img-3"),
  mm_f_button = document.getElementById("multimedia-f_button"),
  mm_f_video = document.getElementById("multimedia-f_media_video"),
  mm_h = document.getElementById("multimedia-h");

// multimedia-e "fotovinner" bildekarusell
// hentet fra https://www.w3schools.com/howto/howto_js_slideshow.asp
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  const slides = document.getElementsByClassName("slides");
  const numbers = document.getElementsByClassName("numbertext");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    numbers[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot--active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  numbers[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " dot--active";
}

// header scroll-event
var scrollpos = window.scrollY,
  header_height = header.offsetHeight,
  header_grid_height = header_grid.offsetHeight;

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

// multimedia-f "klubben inne/ute", klikk for å vise video
mm_f_button.onclick = function() {
  mm_f_video.classList.remove("fade-out");
  mm_f_video.classList.add("fade-in-2");
  mm_f_video.play();
  mm_f_video.addEventListener("ended", function() {
    mm_f_button.innerHTML = "Se igjen";
    mm_f_button.classList.add("fade-in-2");
    mm_f_button.classList.remove("fade-out");
  });

  mm_f_button.classList.add("fade-out");
};

// nils petter video-intervju, lyd av/på
/* nilsen_video.addEventListener('click', function () {
  if (nilsen_video.muted == true) {
    nilsen_video.muted = false;
  } else {
    nilsen_video.muted = true;
  }
}) */


// body scroll-events
// basert på kode fra https://jsfiddle.net/shaaraddalvi/4rp09jL0/

// scroll listener function
// legger til klasser på elementer hvis de er synlig på diverse måter
window.addEventListener("scroll", function(e) {
  // animasjon for nils petter tekst-intervju
  if (isTopScrolledIntoView(mm_a_media_img1)) {
    mm_a_media_img1.classList.remove("fade-out");
    mm_a_media_img2.classList.remove("fade-out");

    mm_a_media_img1.classList.add("slide-up-short");
    mm_a_media_img2.classList.add("slide-up-medium");
  } else {
    mm_a_media_img1.classList.add("fade-out");
    mm_a_media_img2.classList.add("fade-out");

    mm_a_media_img1.classList.remove("slide-up-short");
    mm_a_media_img2.classList.remove("slide-up-medium");
  };

  // animasjon for kjersti aarum tekst-intervju
  if (isTopScrolledIntoView(mm_d_media_img1)) {
    mm_d_media_img1.classList.remove("fade-out");
    mm_d_media_img2.classList.remove("fade-out");
    mm_d_media_quote1.classList.remove("fade-out");

    mm_d_media_img1.classList.add("slide-up-short");
    mm_d_media_img2.classList.add("slide-up-medium");
    mm_d_media_quote1.classList.add("slide-up-long");
  } else {
    mm_d_media_img1.classList.add("fade-out");
    mm_d_media_img2.classList.add("fade-out");
    mm_d_media_quote1.classList.add("fade-out");

    mm_d_media_img1.classList.remove("slide-up-short");
    mm_d_media_img2.classList.remove("slide-up-medium");
    mm_d_media_quote1.classList.remove("slide-up-long");
  };

  // animasjon for familien tekst-intervju
  if (isTopScrolledIntoView(mm_b_quote1)) {
    mm_b_quote1.classList.remove("fade-out");
    mm_b_quote1.classList.add("slide-up-medium");
  } else {
    mm_b_quote1.classList.remove("slide-up-medium");
    mm_b_quote1.classList.add("fade-out");
  }

  // animasjon for "nye planer for fiskebrygga"
  if (isScrolledIntoView(multimedia_scroll)) {
    multimedia_scroll_media.classList.remove("not-visible");

    img1.classList.add("fade-out");
  }

  if (!isScrolledIntoView(multimedia_scroll)) {
    multimedia_scroll_media.classList.add("not-visible");
  }

  if (isMiddleScrolledIntoView(quote1)) {
    img1.classList.remove("fade-out");
    img2.classList.add("fade-out");
  }

  if (isMiddleScrolledIntoView(quote2)) {
    img1.classList.add("fade-out");
    img2.classList.remove("fade-out");
    img3.classList.add("fade-out");
  }

  if (isMiddleScrolledIntoView(quote3)) {
    img1.classList.add("fade-out");
    img2.classList.add("fade-out");
    img3.classList.remove("fade-out");
  }

  // automatisk avspilling av video, nils petter video-intervju
  if (isSubtitleScrolledIntoView(nilsen_video)) {
    // pga autoplay-policy forandringer i Chrome kan man ikke lengre automatisk spille av lyd
    // dersom bruker ikke har hatt noen interaksjon med nettstedet.
    // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
    // koden under gjør at videoen blir satt til mute hvis bruker ikke har interagert slik at den kan spilles automatisk
    
    var promise = nilsen_video.play();
    if (promise !== undefined) {
      promise
        .then(_ => {})
        .catch(error => {
          nilsen_video.muted = true;
        });
    }
    
  }else{
    nilsen_video.pause();
  }
});

// metoder for å sjekke om elementet synlig i viewport på diverse måter

// sjekker om TOPP ELLER BUNN av elementet er synlig
function isScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;

  // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

// sjekker om HELE elementet er synlig
function isScrolledFullyIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;

  var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  return isVisible;
}

// sjekker om TOPPEN av elementet er synlig
function isTopScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var isVisible = elemTop <= window.innerHeight;
  return isVisible;
}

// sjekker om BUNNEN av elementet er synlig
function isBottomScrolledIntoView(el) {
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible = elemBottom <= window.innerHeight;
  return isVisible;
}

// sjekker om MIDTEN av elementet har scrollet inn i MIDTEN AV VIEWPORT
function isMiddleScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible = elemTop <= window.innerHeight / 2 && elemBottom >= 0;
  return isVisible;
}

// sjekker om UNDERTEKSTEN på VIDEO er synlig på nils petter-intervju
function isSubtitleScrolledIntoView(el) {
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible = elemBottom <= window.innerHeight * 1.2 && elemBottom > 0;

  return isVisible;
}

// sjekker om MIDTEN av elementet IKKE er synlig på nils petter-intervju
function isNotMiddleScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible =
    elemTop + elemBottom < 0 || (window.innerHeight / 2) * 1.2 < elemTop;
  return isVisible;
}