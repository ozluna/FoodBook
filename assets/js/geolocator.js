  var x = document.getElementById("demo");
  function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    var userLat
    var userLng
    function showPosition(position) {
        document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
        userLat =parseInt(position.coords.latitude,10);
        userLng =parseInt(position.coords.longitude,10);
        console.log(userLat+"  "+ userLng);
    }
    

    function initMap() {
    var nearme = { lat:52.205337,lng:0.12181699999996454}
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center:nearme
           
        
    });
   
    
   
function addMarker(coords){
    var marker = new google.maps.Marker({
        position: coords,
        map:map,
        icon: "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-70.png" 
     });
    
}
addMarker({ lat:52.205337,lng:0.12181699999996454})
}