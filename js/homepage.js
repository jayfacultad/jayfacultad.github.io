const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', function() {
  if(window.screen.width <= mobileSize ) {
    document.getElementById("mobile").classList.remove('hide');
  } else {
    document.getElementById("desktop").classList.remove('hide');
  }
});

window.addEventListener('scroll', function(){
    document.getElementById("scroll-down-container").style.opacity = '0';
    document.getElementById("hero-block").style.opacity = '0';

/*
var viewportOffset = el.getBoundingClientRect();
// these are relative to the viewport
var top = viewportOffset.top;
var left = viewportOffset.left;
*/

var st = window.pageYOffset;
   if (st > lastScrollTop){
      window.alert('scrolled down');
   } else {
      window.alert('scrolled up');
   }

});
