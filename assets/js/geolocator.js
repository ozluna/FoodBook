  var map,infoWindow,services;
  var startPos;
  var geoOptions = {
     timeout: 10 * 1000
  };
  let userPosition;

function initMap() {
   
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {            
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 14
            });
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow);
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow);
        }
             
     
    
}
    // Handle a geolocation error
    function handleLocationError(browserHasGeolocation, infoWindow) {
        // Set default location to Sydney, Australia
        pos = {lat:52.2141579, lng: 0.147892};
        map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
        });

        // Display an InfoWindow at the map center
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
        currentInfoWindow = infoWindow;

    /* TODO: Step 3B3, Call the Places Nearby Search */
}
// adding nearby restaurants I will use places google   
//adding markers for the restaurants
//set an radius 
//add event listener for the buttons restaurants , cafes , tourist attractions and hotels
