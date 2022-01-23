const mobileSize = 480;
const tabletSize = 768;

(function () {
  if(window.screen.width <= mobileSize ) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
  } 
})();
