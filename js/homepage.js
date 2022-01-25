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
  var elements = document.getElementsByClassName("block");
  for(var i = 0; i < elements.length; i++) {
    fadeOutOnScroll(elements[i]);
  }
 
}

function fadeOutOnScroll(element) {
  if (!element) {
    return;
  }
  
  setTimeout(function() {
      console.log('--------------------------------------------');
      var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
      var elementHeight = element.offsetHeight;
      var scrollTop = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop;
    
      var opacity = 1;
  
      if (scrollTop > distanceToTop) {
        opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
      }

      if (opacity >= 0) {
        element.style.opacity = opacity;
      }
    
    console.log('window.pageYOffset + element.getBoundingClientRect().top');
    console.log(window.pageYOffset + ' + ' + element.getBoundingClientRect().top);
    console.log('elementHeight ' + elementHeight);
    console.log('window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop');
    console.log(window.pageYOffset + ' ? ' + window.pageYOffset + ' : ' + document.documentElement.scrollTop);

    console.log('--------------------------------------------');
    }, 60);

  
  
  

}
