var mobileSize = 480;
var tabletSize = 768;

setDesktopOrMobileView();

function setDesktopOrMobileView() {
  var width = window.innerWidth;
  if(width <= mobileSize) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } else {
    document.getElementById("hero-image").src = "/staticresources/newyork.jpg";
  }
  
}
