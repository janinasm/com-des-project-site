$(window).scroll(function(){
  $(".header_landing_grid").css("opacity", 1 - $(window).scrollTop() / 700);
});
