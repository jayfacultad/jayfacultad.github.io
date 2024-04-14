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
  if (myLinks.classList.contains("show")) {
    myLinks.classList.add("hide");
    myLinks.classList.remove("hide");
  } else {
    myLinks.classList.add("show");
    myLinks.classList.remove("hide");
  }
  
  x.classList.toggle("change");
}

window.addEventListener('scroll', scrollHandler);
