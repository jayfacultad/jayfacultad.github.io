// Note: This requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var mbta_key = "8845d177307541a1847cb860f31e3f14";

// var map, infoWindow;

// function initMap() {
// map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 42.352271, lng: -71.05524200000001},
//     zoom: 14
//     });
// infoWindow = new google.maps.InfoWindow;

// Set location for each station.
var features = [
  {
    position: new google.maps.LatLng(42.352271, -71.05524200000001),
    name: 'South Station',
    id: 'place-sstat'
  },
  {
    position: new google.maps.LatLng(42.330154, -71.057655),
    name: 'Andrew',
    id: 'place-andrw'
  },
  {
    position: new google.maps.LatLng(42.3884, -71.11914899999999),
    name: 'Porter Square',
    id: 'place-portr'
  },
  {
    position: new google.maps.LatLng(42.373362, -71.118956),
    name: 'Harvard Square',
    id: 'place-harsq'
  },
  {
    position: new google.maps.LatLng(42.320685, -71.052391),
    name: 'JFK/UMass',
    id: 'place-jfk'
  },
  {
    position: new google.maps.LatLng(42.31129, -71.053331),
    name: 'Savin Hill',
    id: 'place-shmnl'
  },
  {
    position: new google.maps.LatLng(42.35639457, -71.0624242),
    name: 'Park Street',
    id: 'place-pktrm'
  },
  {
    position: new google.maps.LatLng(42.342622, -71.056967),
    name: 'Broadway',
    id: 'place-brdwy'
  },
  {
    position: new google.maps.LatLng(42.275275, -71.029583),
    name: 'North Quincy',
    id: 'place-nqncy'
  },
  {
    position: new google.maps.LatLng(42.29312583, -71.06573796000001),
    name: 'Shawmut',
    id: 'place-smmnl'
  },
  {
    position: new google.maps.LatLng(42.39674, -71.121815),
    name: 'Davis',
    id: 'place-davis'
  },
  {
    position: new google.maps.LatLng(42.395428, -71.142483),
    name: 'Alewife',
    id: 'place-alfcl'
  },
  {
    position: new google.maps.LatLng(42.36249079, -71.08617653),
    name: 'Kendall/MIT',
    id: 'place-knncl'
  },
  {
    position: new google.maps.LatLng(42.361166, -71.070628),
    name: 'Charles/MGH',
    id: 'place-chmnl'
  },
  {
    position: new google.maps.LatLng(42.355518, -71.060225),
    name: 'Downtown Crossing',
    id: 'place-dwnxg'
  },
  {
    position: new google.maps.LatLng(42.251809, -71.005409),
    name: 'Quincy Center',
    id: 'place-qnctr'
  },
  {
    position: new google.maps.LatLng(42.233391, -71.007153),
    name: 'Quincy Adams',
    id: 'place-qamnl'
  },
  {
    position: new google.maps.LatLng(42.284652, -71.06448899999999),
    name: 'Ashmont',
    id: 'place-asmnl'
  },
  {
    position: new google.maps.LatLng(42.2665139, -71.0203369),
    name: 'Wollaston',
    id: 'place-wlsta'
  },
  {
    position: new google.maps.LatLng(42.300093, -71.061667),
    name: 'Fields Corner',
    id: 'place-fldcr'
  },
  {
    position: new google.maps.LatLng(42.365486, -71.103802),
    name: 'Central Square',
    id: 'place-cntsq'
  },
  {
    position: new google.maps.LatLng(42.2078543, -71.0011385),
    name: 'Braintree',
    id: 'place-brntn'
  },

];

// Content window for station schedule
var contentString;
var infowindowClick = new google.maps.InfoWindow;

// Create station markers.
features.forEach(function(feature) {
  var marker = new google.maps.Marker(
  {
    position: feature.position,
    icon: 'marker.png',
    map: map
  });
  // Info window displaying schedule is displayed when the user clicks on staiton marker.
  // For a more accurate schedule, the information is requested each time the staiton is clicked.
  marker.addListener('click', function() {
  var request = new XMLHttpRequest();
  request.open("GET", "https://api-v3.mbta.com/predictions?filter[route]=Red&filter[stop]=" + feature.id + "&page[limit]=10&page[offset]=0&sort=departure_time&api_key=" + mbta_key, true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        var theData = request.responseText;
        var schedule = JSON.parse(theData);
        var upcomingTrain = [];
        var direction;
        for (i = 0; i < schedule.data.length; i++) {
            if (JSON.stringify(schedule.data[i].attributes["direction_id"]) == 1) {
                direction = "Northbound &nbsp; (Alewife)";
            }  
            else if (JSON.stringify(schedule.data[i].attributes["direction_id"]) == 0) {
                direction = "Southbound &nbsp; (Ashmont/Braintree)";
            }

            var time;
            time = schedule.data[i].attributes["departure_time"];
            
            // If departure time is "null", display message for no data
            if (time == null) {
                time = "No data &nbsp";
                direction = "N/A";
            } else {
                time = time.substring(11, time.length - 6);
            }

            // Adds departure times and direction in array.
            upcomingTrain[i] = 
                time + 
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
                direction + 
                "<br>";
            };

        // Set the infowindow to display the clicked station's info (extracted from array above).
        if (feature.name != 'Wollaston'){
        infowindowClick.setContent(
            "<div id='name'>" + 
            feature.name + "</div>" +"<br>" +
            "<div id='header'>" + 
            "Departure" + 
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
            "Direction" + "</div>" + 
            "<div id='schedule'>" + upcomingTrain.join('') + "</div>");}
        // Special message for Wollaston station
        else {
            infowindowClick.setContent(
            "<div id='name'>" + 
            feature.name + "</div>" +"<br>" +
            "No information avaialable for this station");
        }
        infowindowClick.open(map, marker);
        }
  }
  request.send();
});
});

// Creates a 2-pixel-wide red polyline connection for the red line route.
var stationCoordinates = [
  {lat: 42.2078543, lng: -71.0011385},
  {lat: 42.233391, lng: -71.007153},
  {lat: 42.251809, lng: -71.005409},
  {lat: 42.251809, lng: -71.005409},
  {lat: 42.275275, lng: -71.029583},
  {lat: 42.31129, lng: -71.053331},
  {lat: 42.320685, lng: -71.052391},
  {lat: 42.330154, lng: -71.057655},
  {lat: 42.342622, lng: -71.056967},
  {lat: 42.352271, lng: -71.05524200000001},
  {lat: 42.355518, lng: -71.060225},
  {lat: 42.35639457, lng: -71.0624242},
  {lat: 42.361166, lng: -71.070628},
  {lat: 42.36249079, lng: -71.08617653},
  {lat: 42.365486, lng: -71.103802},
  {lat: 42.373362, lng: -71.118956},
  {lat: 42.3884, lng: -71.11914899999999},
  {lat: 42.39674, lng: -71.121815},
  {lat: 42.395428, lng: -71.142483}
];
var route = new google.maps.Polyline({
  path: stationCoordinates,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});
route.setMap(map);

// A separate polyline connection for the Ashmont branch.
var coordinatesToAshmont = [
  {lat: 42.320685, lng: -71.052391},
  {lat: 42.31129, lng: -71.053331},
  {lat: 42.300093, lng: -71.061667},
  {lat: 42.29312583, lng: -71.06573796000001},
  {lat: 42.284652, lng: -71.06448899999999}
];
var ashmontBranch = new google.maps.Polyline({
  path: coordinatesToAshmont,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});
ashmontBranch.setMap(map);

// HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
var geomarker = new google.maps.Marker(
  {
    position: pos,
    icon: 'geomarker.png',
    map: map
  });

// Find nearest station to the geolocation
var geoClick = new google.maps.InfoWindow;
var geoLineCoordinates;
var closest_lat;
var closest_lng;

    var lat2 = geomarker.position.lat();
    var lon2 = geomarker.position.lng();
    var R = 6371; // radius of earth in km
    var closest = 100;
    var station;
    Number.prototype.toRad = function() {
         return this * Math.PI / 180;
         }
// Iterate through features array and use Haversine Formula for each station
// to get the shortest distance to current geolocation.
for( i=0; i<features.length; i++ ) {
        var lat1 = features[i].position.lat();
        var lon1 = features[i].position.lng();
        var x1 = lat2 - lat1;
        var dLat  = x1.toRad();
        var x2 = lon2 - lon1;
        var dLong = x2.toRad(); 

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        if ( d < closest) { 
            closest_lat = lat1;
            closest_lng = lon1;
            closest = d;
            station = features[i].name;
        }  
   }

// Display neartest station and distance from geolocation when user's location is clicked.
geomarker.addListener('click', function() {
    // Convert km to miles
    closest = closest * 0.62137;
    geoClick.setContent(
        "Closest station is " + closest.toFixed(2) + " miles away: " + station
        );
    geoClick.open(map, geomarker);
});

// Add dotted polyline from geolocation to nearest station
geoLineCoordinates = [ 
    {lat: closest_lat, lng: closest_lng},
    {lat: lat2, lng: lon2} ];
var geoLine = new google.maps.Polyline({
    path: geoLineCoordinates,
    strokeOpacity: 0,
    icons: [{
        icon: {
            path: 'M 0, -1 0, 1',
            strokeOpacity: 1,
            scale: 4
        },
        offset: '0',
        repeat: '20px'
    }]
    });
geoLine.setMap(map); 

// Center map on current geolocation
map.setCenter(pos);
}, function() {
    handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}

}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
infoWindow.open(map);
}
