const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  var width = window.innerWidth;
  if( (window.innerWidth || window.outerWidth) <= mobileSize) {
    console.log('mobile');
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } else {
    console.log('desktop');
    document.getElementById("hero-image").src = "/staticresources/newyork.jpg";
  }
  
}
