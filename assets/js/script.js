  var map,infoWindow,services,keyWord;
  let infoCard;
  let userPosition;

function initMap() {
        bounds = new google.maps.LatLngBounds();   
        infoWindow = new google.maps.InfoWindow;
        infoCard = document.getElementById('restaurantInfo');
       
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
           getNearbyPlaces(pos);
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
        // Set default location to Cambridge, United Kingdom
        pos = {lat:52.2141579, lng: 0.147892};
        map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 14
        });

        // Display an InfoWindow at the map center
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
        currentInfoWindow = infoWindow;

    
}
//add event listener for the buttons restaurants , cafes , tourist attractions and hotels
document.getElementById("british").addEventListener("click",British);
document.getElementById("indian").addEventListener("click", Indian);
document.getElementById("japanese").addEventListener("click", Japanese);
document.getElementById("mediterranean").addEventListener("click", Mediterranean);
document.getElementById("middle-eastern").addEventListener("click", MiddleEastern);
document.getElementById("chinese").addEventListener("click", Chinese);

function British(){   
    let request={
        bounds: map.getBounds(),
        keyword:'fishandchips'
        }   
    
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}
function Chinese(){
    
    let request={
        bounds: map.getBounds(),
        keyword:'chinese+restaurant'
        }   
    
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}
function Indian(){
      let request={
        bounds: map.getBounds(),
        keyword:'indian+restaurant'
        }   
    
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}


function Japanese(){
    let request={
        bounds: map.getBounds(),
        keyword:'japanese+restaurant'
        }   
    
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}
function Mediterranean(){
    
    let request={
        bounds: map.getBounds(),
        keyword:'mediterranean+restaurant'
        }   
    
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}
function MiddleEastern(){
    let request={
        bounds: map.getBounds(),
        keyword:'middle eastern+restaurant'
        }   
    
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

// adding nearby restaurants I will use places google   
function getNearbyPlaces(position){
    let request={
        location: position,
        radius:'500',
        keyword:'sushi'
       
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
    
}

//adding markers for the restaurants
function nearbyCallback(results,status){
    if(status==google.maps.places.PlacesServiceStatus.OK){
        createMarkers(results);
    }
}
function createMarkers(places) {
    places.forEach(place => {
    let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
    });

   

    // Adjust the map bounds to include the location of this marker
    bounds.extend(place.geometry.location);
    });
    /* Once all the markers have been placed, adjust the bounds of the map to
    * show all the markers within the visible area. */
    map.fitBounds(bounds);
}



//set an radius 
