$(window).scroll(function() {
  scroll = ($(window).scrollTop())
  $(".blur").css("opacity", scroll / 500);
  
  if (scroll > 500) {  $(".navbar").removeClass("transparent");
  } else {
    $(".navbar").addClass("transparent");
  }
});