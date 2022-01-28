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
  
  var aboutMeElements = [];
  var aboutMeElementClassNames = ['about-me-title','profile-pic-image','about-me-text'];
  for(var i = 0; i < document.getElementsByClassName("about-me-title").length; i++) {
    aboutMeElements.push();
  }
  aboutMeElements = aboutMeElements.concat(document.getElementsByClassName("about-me-title"));
  aboutMeElements = aboutMeElements.concat(document.getElementsByClassName("profile-pic-image"));
  aboutMeElements = aboutMeElements.concat(document.getElementsByClassName("about-me-text"));
  console.log(aboutMeElements);
  for(var i = 0; i < aboutMeElements.length; i++) {
    var aboutMeElement = aboutMeElements[i].getBoundingClientRect();
    var elemTop = aboutMeElement.top;
    var elemBottom = aboutMeElement.bottom;

    // Only executes for visible elements
    if((elemTop >= 0) && (elemBottom <= window.innerHeight)) {
      if(!aboutMeElement.classList.contains('animatedFadeIn')) {
        console.log(aboutMeElement);
        consoel.log('in view');
        aboutMeElement.classList.add('animatedQuick','animatedFadeIn','fadeInRight');
      }
    }
    else {
      if(aboutMeElement.classList.contains('animatedFadeIn')) {
        console.log(aboutMeElement);
        consoel.log('not in view');
        aboutMeElement.classList.remove('animatedQuick','animatedFadeIn','fadeInRight');
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
