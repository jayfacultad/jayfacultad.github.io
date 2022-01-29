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
  var aboutMeText = document.getElementsByClassName("about-me-text");
  console.log('Top: ' + aboutMeText[0].getBoundingClientRect().top);
  console.log('Bottom: ' + aboutMeText[0].getBoundingClientRect().bottom);
  
  
  var elements = document.getElementsByClassName("block");
  for(var i = 0; i < elements.length; i++) {
    fadeOutOnScroll(elements[i]);
  }
  
  var aboutMeElements = [];
  var aboutMeElementClassNames = ['about-me-title','about-me-text','profile-pic-image'];
  for(var i = 0; i < aboutMeElementClassNames.length; i++) {
    var aboutMeElementsFromClasses = document.getElementsByClassName(aboutMeElementClassNames[i]);
    for(var j=0; j < aboutMeElementsFromClasses.length; j++) {
      aboutMeElements.push(aboutMeElementsFromClasses[j]);
    }
  }


  for(var i = 0; i < aboutMeElements.length; i++) {
    if(aboutMeElements[i]) {
      // Check if elment is in view. Add animation if so.
      var aboutMeElement = aboutMeElements[i];
      var elemTop = aboutMeElement.getBoundingClientRect().top;
      var elemBottom = aboutMeElement.getBoundingClientRect().bottom;
      if((elemTop >= 0 && elemBottom <= window.innerHeight) || (elemTop < 0 && elemBottom > 0)) {
        if(!aboutMeElement.classList.contains('animated')) {
          aboutMeElement.classList.remove('hide');
          aboutMeElement.classList.add('animated','animatedFadeIn','fadeInRight');
          if(aboutMeElement.style.opacity != 1) {
            aboutMeElement.style.opacity = 1;
          }
        }
      }
    }
  }
 
}

function fadeOutOnScroll(element) {
  if (!element) {
    return;
  }

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

}
