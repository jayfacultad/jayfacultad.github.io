var mobileSize = 480;
var tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  console.log('finished loading');
  var width = window.innerWidth;
  if(width <= mobileSize && document.getElementById("hero-image") != null) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } else {
    document.getElementById("hero-image").src = "/staticresources/newyork.jpg";
  }
  
}
