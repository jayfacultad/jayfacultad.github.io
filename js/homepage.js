const mobileSize = 480;
const tabletSize = 768;

let elementsArray = document.querySelectorAll(".block");
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

/*
   if (this.oldScroll > this.scrollY){
      //scrolled up
      document.getElementById("hero-block").style.opacity = '1';
   } else {
      //scrolled down
      document.getElementById("hero-block").style.opacity = '0';
   }
*/

/*
   this.oldScroll = this.scrollY;

for (var i = 0; i < elementsArray.length; i++) {
        var elem = elementsArray[i]
        var distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
        if (distInView < 0) {
            elem.classList.add("inView");
            elem.classList.remove("outView");
        } else {
            elem.classList.add("outView");
            elem.classList.remove("inView");
        }
    }
*/

});
