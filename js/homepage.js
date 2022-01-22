const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  var width = window.innerWidth;
  if(window.innerWidth <= mobileSize || window.outerWidth <= mobileSize) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
    document.getElementById("hero-image").classList.remove("fadeInUp");
    document.getElementById("hero-image").classList.add("fadeInUp-mobile");
    document.getElementById("hero-image").classList.remove("eyebrow");
    document.getElementById("hero-image").classList.add("eyebrow-mobile");
    document.getElementById("hero-image").classList.remove("title");
    document.getElementById("hero-image").classList.add("title-mobile");
  } 
  
}
