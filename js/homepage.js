const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', function() {
  if(window.screen.width <= mobileSize ) {
    document.getElementById("mobile").classList.remove('hide');
  } else {
    document.getElementById("desktop").classList.remove('hide');
  }
});

function navBarClick(x) {
  console.log('Menu bar clicked');

  var myLinks = document.getElementById("myLinks");
  if (myLinks.style.width === "0%") {
    myLinks.style.width = "0%";
  } else {
    myLinks.style.width = "100%";
  }
  
  x.classList.toggle("change");
}

window.addEventListener('scroll', scrollHandler);
