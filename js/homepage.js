const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  var width = window.innerWidth;
  if(window.innerWidth <= mobileSize || window.outerWidth <= mobileSize) {
    document.getElementById("hero-image").src = "/staticresources/newyorkmobile.jpg";
    document.getElementById("intro-block").classList.remove("fadeInUp");
    document.getElementById("intro-block").classList.add("fadeInUp-mobile");
    document.getElementById("heading").classList.remove("heading");
    document.getElementById("heading").classList.add("heading-mobile");
    document.getElementById("eyebrow").classList.remove("eyebrow");
    document.getElementById("eyebrow").classList.add("eyebrow-mobile");
    document.getElementById("title").classList.remove("title");
    document.getElementById("title").classList.add("title-mobile");
    document.getElementById("hero-image").classList.remove("hero-image");
    document.getElementById("hero-image").classList.add("hero-image-mobile");
  } 
  
}
