var mapFormOpinion = document.getElementById("crowdsourced-map_form"),
  mapOptionCar = document.getElementById("crowdsourced-map_option--car"),
  placingCar = false,
  mapFormButton = document.getElementById("crowdsourced-map_form_button"),
  mapFormClose = document.getElementById("crowdsourced-map_form_close"),
  mapCars = new Array();

function myMap() {
  var clickedPos;

  // map options
  var mapProp = {
    center: new google.maps.LatLng(59.120749, 11.383609),
    zoom: 16,
    clickableIcons: false
  };

  // places map
  var map = new google.maps.Map(
    document.getElementById("ccGoogleMap"),
    mapProp
  );

  // listener for clicks on map
  google.maps.event.addListener(map, "click", function(e) {
    if (placingCar) {
      mapFormOpinion.classList.add("show");

      carData.lat = e.latLng.lat();
      carData.lng = e.latLng.lng();

      console.log(carData.lng);

      // centers map to postion clicked, with animation
      map.panTo(e.latLng);
    }
  });

  // listener for leaving map
  google.maps.event.addListener(map, "mouseout", function(event) {
    placingCar = false;
    mapOptionCar.classList.remove("active");
  });

  // listen for all cars added
  carsRef.on("child_added", function(data) {
    // makes marker with position clicked
    marker = new google.maps.Marker({
      position: { lat: data.val().lat, lng: data.val().lng },
      map: map,
      icon: 
        '../img/icon/_ionicons_svg_ios-car.svg',
      
    });

    infowindow = new google.maps.InfoWindow({
      content: '<div class="carInfo"><p>' + data.val().make + '</p><p>' + data.val().model + '</p><p>' + data.val().year + '</p></div>'
      
    })
    infowindow.open(map, marker);
  });
}

// firebase
var db = firebase.database();
var carsRef = db.ref("cars");

function writeUserData() {
  carsRef.push().set({
    make: carData.make,
    model: carData.model,
    year: carData.year,
    lat: carData.lat,
    lng: carData.lng
  });
}

var carData = {
  make: null,
  model: null,
  year: null,
  lat: null,
  lng: null
};

mapOptionCar.onclick = function() {
  mapOptionCar.classList.add("active");
  placingCar = true;
};

mapFormButton.onclick = function() {
  mapFormOpinion.classList.remove("show");

  getForm();
};

mapFormClose.onclick = function() {
  mapFormOpinion.classList.remove("show");
};

function getForm() {
  var form = document.getElementById("crowdsourced-map_form");
  carData.make = form.elements["make"].value;
  carData.model = form.elements["model"].value;
  carData.year = form.elements["year"].value;

  console.log(carData);
  form.reset();

  writeUserData();
}

function validateForm() {}

//getUserData();

// get data once
function getUserData() {
  carsRef.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      console.log(childData);
    });
  });
}

carsRef.once("value", function(snap) {
  console.log(snap.numChildren());
})
