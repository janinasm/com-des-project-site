


// MULTIMEDIA E - IMAGE-BOX
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
  }

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block"; 
}

// add/remove class on scroll
$(document).ready(function() {
	var s = $(".header_landing");
	var pos = s.position();					   
	$(window).scroll(function() {
		var windowpos = $(window).scrollTop();
		if (windowpos >= pos.top & windowpos <=2000) {
			s.addClass("stick");
		} else {
			s.removeClass("stick");	
		}
	});
});

$(document).ready(function() {
	var s2 = $(".img-b");
	var pos2 = s2.position();					   
	$(window).scroll(function() {
		var windowpos = $(window).scrollTop();
		if (windowpos >= pos2.top & windowpos > 2000) {
            s2.addClass("stick");
            s2.addClass("visible");
            s2.addClass("zindex");
		} else {
            s2.removeClass("stick");
            s2.removeClass("visible");
            s2.removeClass("zindex");
		}
	});
});