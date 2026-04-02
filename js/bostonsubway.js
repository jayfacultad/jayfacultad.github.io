var mbta_key = "8845d177307541a1847cb860f31e3f14";
var map;
var infoWindow;

var features = [
  { position: { lat: 42.352271, lng: -71.05524200000001 }, name: 'South Station', id: 'place-sstat' },
  { position: { lat: 42.330154, lng: -71.057655 }, name: 'Andrew', id: 'place-andrw' },
  { position: { lat: 42.3884, lng: -71.11914899999999 }, name: 'Porter Square', id: 'place-portr' },
  { position: { lat: 42.373362, lng: -71.118956 }, name: 'Harvard Square', id: 'place-harsq' },
  { position: { lat: 42.320685, lng: -71.052391 }, name: 'JFK/UMass', id: 'place-jfk' },
  { position: { lat: 42.31129, lng: -71.053331 }, name: 'Savin Hill', id: 'place-shmnl' },
  { position: { lat: 42.35639457, lng: -71.0624242 }, name: 'Park Street', id: 'place-pktrm' },
  { position: { lat: 42.342622, lng: -71.056967 }, name: 'Broadway', id: 'place-brdwy' },
  { position: { lat: 42.275275, lng: -71.029583 }, name: 'North Quincy', id: 'place-nqncy' },
  { position: { lat: 42.29312583, lng: -71.06573796000001 }, name: 'Shawmut', id: 'place-smmnl' },
  { position: { lat: 42.39674, lng: -71.121815 }, name: 'Davis', id: 'place-davis' },
  { position: { lat: 42.395428, lng: -71.142483 }, name: 'Alewife', id: 'place-alfcl' },
  { position: { lat: 42.36249079, lng: -71.08617653 }, name: 'Kendall/MIT', id: 'place-knncl' },
  { position: { lat: 42.361166, lng: -71.070628 }, name: 'Charles/MGH', id: 'place-chmnl' },
  { position: { lat: 42.355518, lng: -71.060225 }, name: 'Downtown Crossing', id: 'place-dwnxg' },
  { position: { lat: 42.251809, lng: -71.005409 }, name: 'Quincy Center', id: 'place-qnctr' },
  { position: { lat: 42.233391, lng: -71.007153 }, name: 'Quincy Adams', id: 'place-qamnl' },
  { position: { lat: 42.284652, lng: -71.06448899999999 }, name: 'Ashmont', id: 'place-asmnl' },
  { position: { lat: 42.2665139, lng: -71.0203369 }, name: 'Wollaston', id: 'place-wlsta' },
  { position: { lat: 42.300093, lng: -71.061667 }, name: 'Fields Corner', id: 'place-fldcr' },
  { position: { lat: 42.365486, lng: -71.103802 }, name: 'Central Square', id: 'place-cntsq' },
  { position: { lat: 42.2078543, lng: -71.0011385 }, name: 'Braintree', id: 'place-brntn' }
];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 42.352271, lng: -71.05524200000001 },
    zoom: 12,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#111b2b' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#c9d5e6' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#111b2b' }] },
      { featureType: 'poi', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1a273a' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0b223d' }] }
    ]
  });

  infoWindow = new google.maps.InfoWindow();

  createStationMarkers();
  drawRoutes();
  showUserLocation();
}

function createStationMarkers() {
  var stationInfoWindow = new google.maps.InfoWindow();

  features.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: 'icons/mbtaicon.png',
      map: map,
      title: feature.name
    });

    marker.addListener('click', function() {
      fetchStationPredictions(feature, marker, stationInfoWindow);
    });
  });
}

function fetchStationPredictions(feature, marker, stationInfoWindow) {
  if (feature.name === 'Wollaston') {
    stationInfoWindow.setContent(buildStationInfoCard(feature.name, [], true));
    stationInfoWindow.open(map, marker);
    return;
  }

  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'https://api-v3.mbta.com/predictions?filter[route]=Red&filter[stop]=' + feature.id + '&page[limit]=6&sort=departure_time&api_key=' + mbta_key,
    true
  );

  request.onreadystatechange = function() {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {
      var schedule = JSON.parse(request.responseText);
      var departures = (schedule.data || []).map(function(item) {
        var directionId = item.attributes.direction_id;
        var departureTime = item.attributes.departure_time;
        return {
          direction: directionId === 1 ? 'Northbound (Alewife)' : 'Southbound (Ashmont/Braintree)',
          time: departureTime ? formatDepartureTime(departureTime) : 'No data'
        };
      });

      stationInfoWindow.setContent(buildStationInfoCard(feature.name, departures, false));
      stationInfoWindow.open(map, marker);
    } else {
      stationInfoWindow.setContent(buildStationInfoCard(feature.name, [], true, 'Schedule unavailable right now.'));
      stationInfoWindow.open(map, marker);
    }
  };

  request.send();
}

function buildStationInfoCard(name, departures, isUnavailable, fallbackMessage) {
  if (isUnavailable) {
    return (
      '<div class="info-card">' +
        '<h3>' + name + '</h3>' +
        '<p class="info-empty">' + (fallbackMessage || 'No live schedule data available for this station.') + '</p>' +
      '</div>'
    );
  }

  var rows = departures.length
    ? departures.map(function(item) {
        return '<div class="info-row"><span>' + item.time + '</span><span>' + item.direction + '</span></div>';
      }).join('')
    : '<p class="info-empty">No departure data available right now.</p>';

  return (
    '<div class="info-card">' +
      '<h3>' + name + '</h3>' +
      '<p class="info-meta">Upcoming Red Line departures</p>' +
      rows +
    '</div>'
  );
}

function drawRoutes() {
  var mainRouteCoordinates = [
    { lat: 42.2078543, lng: -71.0011385 },
    { lat: 42.233391, lng: -71.007153 },
    { lat: 42.251809, lng: -71.005409 },
    { lat: 42.275275, lng: -71.029583 },
    { lat: 42.31129, lng: -71.053331 },
    { lat: 42.320685, lng: -71.052391 },
    { lat: 42.330154, lng: -71.057655 },
    { lat: 42.342622, lng: -71.056967 },
    { lat: 42.352271, lng: -71.05524200000001 },
    { lat: 42.355518, lng: -71.060225 },
    { lat: 42.35639457, lng: -71.0624242 },
    { lat: 42.361166, lng: -71.070628 },
    { lat: 42.36249079, lng: -71.08617653 },
    { lat: 42.365486, lng: -71.103802 },
    { lat: 42.373362, lng: -71.118956 },
    { lat: 42.3884, lng: -71.11914899999999 },
    { lat: 42.39674, lng: -71.121815 },
    { lat: 42.395428, lng: -71.142483 }
  ];

  var ashmontBranchCoordinates = [
    { lat: 42.320685, lng: -71.052391 },
    { lat: 42.31129, lng: -71.053331 },
    { lat: 42.300093, lng: -71.061667 },
    { lat: 42.29312583, lng: -71.06573796000001 },
    { lat: 42.284652, lng: -71.06448899999999 }
  ];

  [mainRouteCoordinates, ashmontBranchCoordinates].forEach(function(path) {
    new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#ff5d6c',
      strokeOpacity: 1,
      strokeWeight: 3,
      map: map
    });
  });
}

function showUserLocation() {
  if (!navigator.geolocation) {
    handleLocationError(false, map.getCenter());
    return;
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    var geoMarker = new google.maps.Marker({
      position: pos,
      icon: 'icons/geomarker.png',
      map: map,
      title: 'Your location'
    });

    var nearestStation = findNearestStation(pos);
    var userInfoWindow = new google.maps.InfoWindow();
    var userLine;

    geoMarker.addListener('click', function() {
      if (userLine) {
        userLine.setMap(null);
      }

      userLine = new google.maps.Polyline({
        path: [nearestStation.position, pos],
        strokeOpacity: 0,
        icons: [{
          icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 4,
            strokeColor: '#8cc3ff'
          },
          offset: '0',
          repeat: '18px'
        }],
        map: map
      });

      userInfoWindow.setContent(
        '<div class="info-card">' +
          '<h3>Your location</h3>' +
          '<p class="info-meta">Nearest Red Line station</p>' +
          '<div class="info-row"><span>' + nearestStation.name + '</span><span>' + nearestStation.distanceMiles.toFixed(2) + ' mi</span></div>' +
        '</div>'
      );
      userInfoWindow.open(map, geoMarker);
    });

    map.setCenter(pos);
  }, function() {
    handleLocationError(true, map.getCenter());
  });
}

function findNearestStation(pos) {
  var closest = {
    distanceMiles: Infinity,
    name: '',
    position: null
  };

  features.forEach(function(feature) {
    var distanceKm = haversineDistance(pos.lat, pos.lng, feature.position.lat, feature.position.lng);
    var distanceMiles = distanceKm * 0.621371;
    if (distanceMiles < closest.distanceMiles) {
      closest = {
        distanceMiles: distanceMiles,
        name: feature.name,
        position: feature.position
      };
    }
  });

  return closest;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = toRadians(lat2 - lat1);
  var dLon = toRadians(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(value) {
  return value * Math.PI / 180;
}

function formatDepartureTime(isoString) {
  var date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function handleLocationError(browserHasGeolocation, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Location access was blocked or unavailable.'
      : 'Your browser does not support geolocation.'
  );
  infoWindow.open(map);
}
