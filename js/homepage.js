const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  var width = window.innerWidth;
  if(window.innerWidth <= mobileSize ) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } 
  
}
