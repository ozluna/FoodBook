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
    

   
