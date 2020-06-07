var places, infoWindow, map, service;
var marker=[];
//I want to create default lat lng so I can assign the current location using google geolocation function
var coords={
    lat:0,
    lng:0
};

var autocomplete;
//initilizing the map
 function initMap() {
    var nearme = { lat:52.205337,lng:0.12181699999996454}
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center:nearme          
        
    });      
//informing the user if the geolocation is not supported
    if (navigator.geolocation) {
    console.log('Geolocation is supported!');
    }
    else {
    alert('Geolocation is not supported for this Browser/OS.');
    }
//try to use autocomplete keeps throwing me error
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-90,-180),
      new google.maps.LatLng(90,180)
        
    );
    var options={
        bounds:defaultBounds
    }
    var geocoder= new google.maps.Geocoder();
    
    var input =document.getElementById('autocomplete');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')), 
        nearme);
    

    function addMarker(coords){
        var marker = new google.maps.Marker({
            position: coords,
            map:map,
            
        });
        
        }
}