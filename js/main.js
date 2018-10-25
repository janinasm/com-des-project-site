
// MULTIMEDIA E - IMAGE-BOX

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");

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

/*

$(window).scroll(function(){
$(".header_landing_grid").css("opacity", 1 - $(window).scrollTop() / 700);
});*/

/*


let scrollpos = window.scrollY
const header = document.getElementById("img-2")
const header_height = header.offsetHeight

const scroll_container = document.getElementsByClassName("multimedia-scroll_media")
const scroll_container_height = scroll_container.offsetHeight

//const add_class_on_scroll = () => header.classList.add("fade-in");
//const remove_class_on_scroll = () => header.classList.remove("fade-in")

window.addEventListener('scroll', function() { 
    scrollpos = window.scrollY;
    if (scrollpos >= header_height) { 
		
		header.classList.add("fade-in");
		header.classList.remove("sticky");
		
	}
	else { 
		header.classList.remove("fade-in");
		header.classList.add("sticky");
	 }
	
	console.log(scrollpos)
})*/

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
/*


var multimedia_scroll_media = document.getElementById(
  "multimedia-scroll_media"
);
var img1 = document.getElementById("img-1");
var img2 = document.getElementById("img-2");
var img3 = document.getElementById("img-3");

var scroll_container = document.getElementById("scroll-helper");
var scroll_container_height = scroll_container.offsetHeight;

var multimedia_scroll = document.getElementById("multimedia-scroll");
var multimedia_scroll_height = multimedia_scroll.offsetHeight;



 

  if (
    scrollpos >= scroll_container_height &&
    scrollpos < scroll_container_height + (multimedia_scroll_height )
  ) {
    multimedia_scroll_media.classList.remove("fade-in");
  } else {
    multimedia_scroll_media.classList.add("fade-in");
  }







  if (scrollpos >= scroll_container_height + (multimedia_scroll_height /2)) {
    img2.classList.remove("fade-in");
  } else {
    img2.classList.add("fade-in");
  }

 // console.log(scrollpos);
});


/*


function addClassOnScroll(elem, class) {
	header.classList.add("fade-in");
}

function removeClassOnScroll() {
	header.classList.remove("fade-in");
}

window.addEventListener('scroll', function() {
	scrollpos = window.scrollY;


	if(scrollpos > header_height) {
		header.classList.add("fade-in");
	}
	else {
		header.classList.remove("fade-in");
	}


	if(scrollpos > 0 && scrollpos <= header_grid_height * 2) {
		header_grid.classList.add("fade-in");
	}
	else {
		header_grid.classList.remove("fade-in");
	}


*/
 // scroll container

  /*
	if(scrollpos >= scroll_container_height && scrollpos < scroll_container_height + multimedia_scroll_height) {
		mutlimedia_scroll_media.classList.remove("fade-in");
	}
	else  {
		mutlimedia_scroll_media.classList.add("fade-in");
	}


	if(scrollpos >= scroll_container_height) {
		img1.classList.add("sticky");
	}
	else  {
		img1.classList.remove("sticky");
	}


	
});
*/

/*
function isInViewport(elem) {
  let elemTop = elem.offsetTop;
  let elemBottom = elemTop + elem.height;
  let viewportTop = window.scrollY;
  let viewportBottom = viewportTop + window.innerHeight;
  return elemBottom > viewportTop && elemTop < viewportBottom;
};*/

var multimedia_scroll = document.getElementById('multimedia-scroll');

var quote1 = document.getElementsByClassName('multimedia-scroll_text_quoteblock')[1];
var quote2 = document.getElementsByClassName('multimedia-scroll_text_quoteblock')[2];
var quote3 = document.getElementsByClassName('multimedia-scroll_text_quoteblock')[3];

var img1 = document.getElementById('img-1');
var img2 = document.getElementById('img-2');
var img3 = document.getElementById('img-3');

var visible = false;

// https://jsfiddle.net/shaaraddalvi/4rp09jL0/
window.addEventListener('scroll', function(e) {


  if(isScrolledIntoView(multimedia_scroll)) {
    img1.classList.remove('fade-out');
  } 

  if(!isScrolledIntoView(multimedia_scroll)) {
    img1.classList.add('fade-out');
    img2.classList.add('fade-out');
    img3.classList.add('fade-out');
  } 



	if(isScrolledIntoView(quote1)) {
    img2.classList.add('fade-out');
  } 

  if(isScrolledIntoView(quote2)) {
    img1.classList.add('fade-out');
    img2.classList.remove('fade-out');
    img3.classList.add('fade-out');
  } 

  if(isScrolledIntoView(quote3)) {
    img2.classList.add('fade-out');
    img3.classList.remove('fade-out');
  } 
  
})


function isScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;

  // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  var isVisible = elemTop < window.innerHeight && elemBottom >= 0
  return isVisible;
}