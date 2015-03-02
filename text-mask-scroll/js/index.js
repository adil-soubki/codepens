//Inspired by (stolen from) a combination of http://codepen.io/dghez/pen/ItxKE
// and
//http://codepen.io/robooneus/pen/Aclqr

$(window).scroll( function(){

  //get scroll position
  var topWindow = $(window).scrollTop();
  //multipl by 1.5 so the arrow will become transparent half-way up the page
  var topWindow = topWindow * 1.5;
  
  //get height of window
  var windowHeight = $(window).height();
      
  //set position as percentage of how far the user has scrolled 
  var position = topWindow / windowHeight;
  //invert the percentage
  position = 1 - position;

  //define arrow opacity as based on how far up the page the user has scrolled
  //no scrolling = 1, half-way up the page = 0
  var bp = $('.title').css('background-position').split(' ')
  
  $(".title").css({"background-position": bp[1] + "%" + (1-position)*100 + "%"});

});