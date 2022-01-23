const mobileSize = 480;
const tabletSize = 768;

setDesktopOrMobileView();

function setDesktopOrMobileView() {
  if(window.screen.width <= mobileSize ) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } 
  
}
