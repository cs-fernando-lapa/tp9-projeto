function clearOverlays() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

function searchAndRender(type) {
  infoWindow.setPosition(pos);
  infoWindow.setContent('Você está aqui.');
  map.setCenter(pos);

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pos,
    radius: 500,
    keyword: type,
  }, callback);

clearOverlays()

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var marker = createMarker(results[i]);
      markers.push(marker);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  return marker;
  }
  if ($(window).width() < 990) {
    $(".menuOpcoes").animate({ left: "-500"} , 1000)
  }
}

var map;
var pos;
var infoWindow;

if (localStorage.getItem('pos')) {
  pos = JSON.parse(localStorage.getItem('pos'));
}

var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 17,
        mapTypeId: 'roadmap'
    });

    infoWindow = new google.maps.InfoWindow({
        map: map
    });
    // Try HTML5 geolocation.
    if (navigator.geolocation && pos == undefined) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            localStorage.setItem('pos', JSON.stringify(pos));
            searchAndRender('Futebol', pos, map);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else if (pos != undefined) {
      searchAndRender('Futebol', pos, map, infoWindow);
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
};

}

function focusMe(button) {
      var elem = document.getElementsByClassName("button-selected")[0];
      // if element having class `"button-selected"` defined, do stuff
      if (elem) {
        elem.className = "";
      }
      button.className = "button-selected";
    }
var show;
$(document).ready(function(){
  show = true;

  $(window).resize(function() {
    if($(window).width() < 1000){
      $(".menuOpcoes").animate({ left: "-500"} , 1000)
      show = false;
    } else {
      $(".menuOpcoes").animate({ left: "0"} , 1000);
      show = true;
    }
  });

  $("#show").on('click', function(){
    if(show){
      show = false;
      $(".menuOpcoes").animate({ left: "-500"} , 1000);
    } else {
      show = true;
      $(".menuOpcoes").animate({ left: "0"} , 1000);
    }
  })
})
