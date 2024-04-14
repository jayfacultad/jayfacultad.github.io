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
  if (myLinks.style.display === "block") {
    myLinks.style.display = "none";
    myLinks.style.opacity = 0;
  } else {
    myLinks.style.display = "block";
    myLinks.style.opacity = 1;
  }
  
  x.classList.toggle("change");
}

window.addEventListener('scroll', scrollHandler);
