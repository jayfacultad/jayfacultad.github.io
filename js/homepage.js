const mobileSize = 480;
const tabletSize = 768;

var lastScrollTop = 0;

window.addEventListener('load', function() {
  if(window.screen.width <= mobileSize ) {
    document.getElementById("mobile").classList.remove('hide');
  } else {
    document.getElementById("desktop").classList.remove('hide');
  }
});

window.addEventListener('scroll', function(){
    //document.getElementById("scroll-down-container").style.opacity = '0';
    //document.getElementById("hero-block").style.opacity = '0';

/*
var viewportOffset = el.getBoundingClientRect();
// these are relative to the viewport
var top = viewportOffset.top;
var left = viewportOffset.left;
*/

   if (this.oldScroll > this.scrollY){
      //scrolled up
      document.getElementById("hero-block").style.opacity = '1';
   } else {
      //scrolled down
      document.getElementById("hero-block").style.opacity = '0';
   }

   this.oldScroll = this.scrollY;

});
