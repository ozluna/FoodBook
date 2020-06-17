  var map,infoWindow,services,keyWord;
  let userPosition;
  var markers=[];
  let currentInfoWindow;
     
function initMap() {
        bounds = new google.maps.LatLngBounds();   
        infoWindow = new google.maps.InfoWindow;
             
        currentInfoWindow = infoWindow;
     
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
           //getNearbyPlaces(pos);
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
//adding markers for the restaurants
function nearbyCallback(results,status){
    if(status==google.maps.places.PlacesServiceStatus.OK){
        createMarkers(results);
    }
}
function createMarkers(places) {
    removeMarkers();
    places.forEach(place => {
    let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
        animation: google.maps.Animation.DROP
    });
    
    markers.push(marker);
    //showing the place details on demand
    google.maps.event.addListener(marker, 'click', function() {
        console.log("the markers is clicked")
    let request = {
    placeId: place.place_id,
    fields: ['name', 'formatted_address', 'geometry', 'rating',
        'website', 'photos','reviews']
    };
    
    /* Only fetch the details of a place when the user clicks on a marker.*/
    
    service.getDetails(request,function (placeResult, status) {
    showDetails(placeResult, marker, status)
            });
        });
    // Adjust the map bounds to include the location of this marker
    bounds.extend(place.geometry.location);
    });
    /* Once all the markers have been placed, adjust the bounds of the map to
    * show all the markers within the visible area. */
    map.fitBounds(bounds);

    
}

// clear markers for a different cuisene 
 function removeMarkers() {  
         for (var i = 0; i < markers.length; i++) {
            if (markers[i]) {
             markers[i].setMap(null);
        }
    }
    markers = [];
}

// Builds an InfoWindow to display details above the marker
function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    let placeInfowindow = new google.maps.InfoWindow();
    placeInfowindow.setContent('<div><strong>' + placeResult.name +
        '</strong><br>' + 'Rating: ' + placeResult.rating + '</div>');
    placeInfowindow.open(marker.map, marker);
    currentInfoWindow.close();
    currentInfoWindow = placeInfowindow;
    showCard(placeResult);
    } else {
    console.log('showDetails failed: ' + status);
    }
}
//display restaurant details on a bootstarp card
function showCard(placeResult){
    let infoCard  = document.getElementById('restaurantInfo');
    //if infoCard is open remove the open class.
    if(infoCard.classList.contains("open")){
    infoCard.classList.remove("open");
    }

    //clearing previous details
    while(infoCard.lastChild){
        infoCard.removeChild(infoCard.lastChild);
    }

    //Adding photo if there is one
    if(placeResult.photos){     
        let firstPhoto =placeResult.photos[0];
        photo = document.createElement('img');
        photo.classList.add('card-img-top');
        infoCard.appendChild(photo);    
    }
        let newDiv = document.createElement('div');
        newDiv.classList.add('card-body');
        infoCard.appendChild(newDiv);
        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = placeResult.name;
        newDiv.appendChild(title);
        if(placeResult.rating!=null){
           let rating=document.createElement('p');
           rating.classList.add('card-text');
           rating.textContent=`Rating: ${placeResult.rating} \u272e`;
           newDiv.appendChild(rating);           
        }
        let address=document.createElement('p');
        address.textContent =`Address: ${placeResult.formatted_address}`;
        newDiv.appendChild(address);

        let listGroup= document.createElement('ul');
        listGroup.classList.add('list-group','list-group-flush');
       
        let listItems = document.createElement('li');
        listItems.classList.add('list-group-item');
        listGroup.appendChild(listItems);
        
        
       

       infoCard.classList.add("open");

    }