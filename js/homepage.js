const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  if(window.screen.width <= mobileSize ) {
    document.getElementById("mobile").classList.remove('hide');
    var imgHeight = document.getElementById("profile-pic-image").height;
    window.alert(imgHeight);
    document.getElementById("profile-pic-block").style.height = imgHeight + "px";
  } else {
    document.getElementById("desktop").classList.remove('hide');
  }
  
}
