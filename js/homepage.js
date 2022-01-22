const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  if(window.screen.width <= mobileSize ) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } 
  
}
