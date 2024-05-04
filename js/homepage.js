const mobileSize = 480;
const tabletSize = 768;

window.addEventListener('load', function() {
    setFormFactor();
});

window.addEventListener('resize', function() {
    setFormFactor();
});

function setFormFactor() {
    if(window.screen.width <= mobileSize ) {
        document.getElementById("mobile").classList.remove('hide');
    } else {
    document.getElementById("desktop").classList.remove('hide');
    }
}

function navBarClick(x) {
  console.log('Menu bar clicked');

  var myLinks = document.getElementById("myLinks");
  if (myLinks.classList.contains("show-nav")) {
    myLinks.classList.add("hide-nav");
    myLinks.classList.remove("show-nav");
  } else {
    myLinks.classList.add("show-nav");
    myLinks.classList.remove("hide-nav");
  }
  
  x.classList.toggle("change");
}

window.addEventListener('scroll', scrollHandler);
