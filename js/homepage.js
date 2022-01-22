var mobileSize = 480;
var tabletSize = 768;

window.addEventListener('DOMContentLoaded', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  var width = window.innerWidth;
  if(width <= mobileSize && document.getElementById("hero-image") != null) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } else {
    document.getElementById("hero-image").src = "/staticresources/newyork.jpg";
  }
  
}
