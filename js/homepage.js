const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', function() {
  if(window.screen.width <= mobileSize ) {
    document.getElementById("mobile").classList.remove('hide');
  } else {
    document.getElementById("desktop").classList.remove('hide');
  }
});

/*
window.addEventListener('scroll', function(){
    document.getElementById("scroll-down-container").style.opacity = '0';
    document.getElementById("hero-block").style.opacity = '0';
});

var header = document.getElementById('header');
*/

window.addEventListener('scroll', scrollHandler);

function scrollHandler() {
  fadeOutOnScroll(document.getElementById("hero-block"));
}

function fadeOutOnScroll(element) {
  if (!element) {
    return;
  }
  
  console.log('--------------------------------------------');
  
  console.log('element.getBoundingClientRect().top ' + element.getBoundingClientRect().top);
  console.log('document.documentElement.scrollTop ' + document.documentElement.scrollTop);
  
  console.log('----');
  
  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
  var elementHeight = element.offsetHeight;
  var scrollTop = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop;
  
  console.log('distanceToTop ' + distanceToTop);
  console.log('elementHeight ' + elementHeight);
  console.log('scrollTop ' + scrollTop);
  
  console.log('--------------------------------------------');
  
  var opacity = 1;
  
  if (scrollTop > distanceToTop) {
    opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
  }
  
  if (opacity >= 0) {
    element.style.opacity = opacity;
  }
}
