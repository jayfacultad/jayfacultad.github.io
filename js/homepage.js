const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', (event) => {
  setDesktopOrMobileView();
});

function setDesktopOrMobileView() {
  if(window.screen.width <= mobileSize ) {
    document.getElementById("mobile").classList.remove('hide');
    var imgHeight = document.getElementById("profile-pic-image").height;
    document.getElementById("profile-pic-block").height = imgHeight + "px";
  } else {
    document.getElementById("desktop").classList.remove('hide');
  }
  
}


function resizeElementHeight(element) {
  var height = 0;
  var body = window.document.body;
  if (window.innerHeight) {
      height = window.innerHeight;
  } else if (body.parentElement.clientHeight) {
      height = body.parentElement.clientHeight;
  } else if (body && body.clientHeight) {
      height = body.clientHeight;
  }
  element.style.height = ((height - element.offsetTop) + "px");
}
