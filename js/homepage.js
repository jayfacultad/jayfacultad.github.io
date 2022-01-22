const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  var width = window.screen.width;
  if(window.innerWidth <= mobileSize ) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } 
  
}
