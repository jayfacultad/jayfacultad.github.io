var mobileSize = 480;
var tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  console.log('finished loading');
  var width = window.innerWidth;
  if(width <= mobileSize) {
    console.log('mobile');
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } else {
    console.log('desktop');
    document.getElementById("hero-image").src = "/staticresources/newyork.jpg";
  }
  
}
