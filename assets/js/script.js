var map, infoWindow, services, keyWord;
var userPosition;
var markers = [];
let currentInfoWindow;

function initMap() {
  bounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow();

  currentInfoWindow = infoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map = new google.maps.Map(document.getElementById("map"), {
          center: pos,
          zoom: 14,
        });
        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
        //getNearbyPlaces(pos);
      },
      function () {
        handleLocationError(true, infoWindow);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow);
  }
}
// Handle a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow) {
  // Set default location to Cambridge, United Kingdom
  pos = { lat: 52.2141579, lng: 0.147892 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: pos,
    zoom: 14,
  });

  // Display an InfoWindow at the map center
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Geolocation permissions denied. Using default location."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
  currentInfoWindow = infoWindow;
}
//add event listener for the buttons for different restaurants

document.getElementById("british").addEventListener("click", British);
document.getElementById("indian").addEventListener("click", Indian);
document.getElementById("japanese").addEventListener("click", Japanese);
document.getElementById("mediterranean").addEventListener("click", Mediterranean);
document.getElementById("middle-eastern").addEventListener("click", MiddleEastern);
document.getElementById("chinese").addEventListener("click", Chinese);

function British() {
  let request = {
    bounds: map.getBounds(),
    keyword: "fishandchips",
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}
function Chinese() {
  let request = {
    bounds: map.getBounds(),
    keyword: "chinese+restaurant",
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}
function Indian() {
  let request = {
    bounds: map.getBounds(),
    keyword: "indian+restaurant",
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}
function Japanese() {
  let request = {
    bounds: map.getBounds(),
    keyword: "japanese+restaurant",
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}
function Mediterranean() {
  let request = {
    bounds: map.getBounds(),
    keyword: "mediterranean+restaurant",
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}
function MiddleEastern() {
 cuisine('middleEastern');
}
function cuisine(keyWord){
 let request = {
    bounds: map.getBounds(),
    keyword: "middle eastern+restaurant",
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}
//adding markers for the restaurants
function nearbyCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results);
  }
}
function createMarkers(places) {
  removeMarkers();
  places.forEach((place) => {
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
      animation: google.maps.Animation.DROP,
    });

    markers.push(marker);
    //showing the place details on demand
    google.maps.event.addListener(marker, "click", function () {
        let request = {
        placeId: place.place_id,
        fields: [
          "name",
          "formatted_address",
          "geometry",
          "rating",
          "website",
          "photos",
          "reviews",
        ],
      };

      /* Only fetch the details of a place when the user clicks on a marker.*/

      service.getDetails(request, function (placeResult, status) {
        showDetails(placeResult, marker, status);
      });
    });
    // Adjust the map bounds to include the location of this marker
    bounds.extend(place.geometry.location);
  });
  /* Once all the markers have been placed, adjust the bounds of the map to
   * show all the markers within the visible area. */
  map.fitBounds(bounds);
}

// clear markers for a different cuisine
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
    placeInfowindow.setContent(
      "<div><strong>" +
        placeResult.name +
        "</strong><br>" +
        "Rating: " +
        placeResult.rating +
        "</div>"
    );
    placeInfowindow.open(marker.map, marker);
    currentInfoWindow.close();
    currentInfoWindow = placeInfowindow;
    showCard(placeResult);
  } else {
    console.log("showDetails failed: " + status);
  }
}
//display restaurant details on a bootstarp card
function showCard(placeResult) {
  let infoCard = document.getElementById("restaurantInfo");
  //if infoCard is open remove the open class.
  if (infoCard.classList.contains("open")) {
    infoCard.classList.remove("open");
  }

  //clearing previous details
  while (infoCard.lastChild) {
    infoCard.removeChild(infoCard.lastChild);
  }

  //Adding photo if there is one
  if (placeResult.photos) {
    let firstPhoto = placeResult.photos[0];
    photo = document.createElement("img");
    photo.classList.add("card-img-top");
    photo.src = firstPhoto.getUrl();
    infoCard.appendChild(photo);
  }
  //new div created for card body
  var newDiv = document.createElement("div");
  newDiv.classList.add("card-body");
  infoCard.appendChild(newDiv);
  let title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = placeResult.name;
  newDiv.appendChild(title);
  //add rationg if there is one
  if (placeResult.rating != null) {
    let rating = document.createElement("p");
    rating.classList.add("card-text");
    rating.textContent = `Rating: ${placeResult.rating} \u272e`;
    newDiv.appendChild(rating);
  }
  let address = document.createElement("p");
  address.textContent = `Address: ${placeResult.formatted_address}`;
  newDiv.appendChild(address);
  if (placeResult.website) {
    let websiteBut = document.createElement('button');
    let websiteLink = document.createElement('a');
    let websiteUrl = document.createTextNode(placeResult.website);
    websiteLink.appendChild(websiteUrl);
    websiteLink.textContent= "Go to the website";
    websiteLink.href = placeResult.website;
    websiteLink.classList.add("websiteLink");
    websiteBut.classList.add("btn","btn-primary");
    websiteBut.appendChild(websiteLink);
    newDiv.appendChild(websiteBut);
    console.log("this website have a link");
    } 
  
  //Getting first 5 reviews reviews if there is one
  if (placeResult.reviews && placeResult.reviews.length) {
    let reviewDiv = document.createElement("div");
    //create a new div for reviews to added to card body
    newDiv.appendChild(reviewDiv);
    reviewDiv.classList.add("review");
    var contentStr =
      +"<li>Reviews:" +
      (function (rs, fx) {
        var list = document.createElement("ul");
        reviewDiv.appendChild(list);
        rs.forEach(function (r) {
          list.appendChild(fx(r));
        });
        return "<ul>" + list.innerHTML + "</ul>";
        return list;
      })(placeResult.reviews, function (r) {
        console.log(r.aspect);
        var item = document.createElement("li");

        review = item.appendChild(document.createElement("ul"));
        props = {
          author_name: "author",
          rating: "rating",
          text: "text",
        };
        item.appendChild(document.createElement("h6"));
        item.lastChild.appendChild(document.createElement("a"));
        item.lastChild.lastChild.appendChild(
          document.createTextNode(r.author_name)
        );
        item.lastChild.appendChild(
          document.createTextNode("(" + r.rating + ")")
        );
        if (r.aspect && r.aspect.length) {
          item.appendChild(document.createElement("ul"));
          r.aspect.forEach(function (a) {
            item.lastChild.appendChild(document.createElement("li"));
            item.lastChild.lastChild.appendChild(
              document.createElement.TextNode(a.type + ":" + a.rating)
            );
          });
        }
        item.appendChild(document.createElement("p"));
        item.lastChild.appendChild(document.createTextNode(r.text));
        return item;
      }) +
      "</li>";
    contentStr = +"</ul>";
    console.log(contentStr);
    infoWindow.setContent(contentStr);
  } else {
    var contentStr = "<h5>No Result, status=" + status + "</h5>";
  }

  infoCard.classList.add("open");
}
