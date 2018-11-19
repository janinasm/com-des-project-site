var mapFormOpinion = document.getElementById("crowdsourced-map_form"),
  mapOptionCar = document.getElementById("crowdsourced-map_option--car"),
  placingCar = false,
  mapFormButton = document.getElementById("crowdsourced-map_form_button"),
  mapFormClose = document.getElementById("crowdsourced-map_form_close"),
  mapCars = new Array();

mapOptionCar.onclick = function() {
  mapOptionCar.classList.add("active");
  placingCar = true;
};

mapFormButton.onclick = function() {
  mapFormOpinion.classList.remove("show");

  //writeUserData();
};

mapFormClose.onclick = function() {
  mapFormOpinion.classList.remove("show");
};

function myMap() {
  var clickedPos;
  var marker;
  var infowindow;

  // map options
  var mapProp = {
    center: new google.maps.LatLng(59.120749, 11.383609),
    zoom: 16,
    stylers: [
      {
        featureType: "poi.business",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ],
    clickableIcons: false,
    disableDoubleClickZoom: true,
    streetViewControl: false
  };

  // places map with options in page
  var map = new google.maps.Map(
    document.getElementById("ccGoogleMap"),
    mapProp
  );

  // infowindow
  infowindow = new google.maps.InfoWindow({
    content: document.getElementById("crowdsourced-map_message")
  });

  // listener for clicks on map
  google.maps.event.addListener(map, "click", function(event) {
    if (placingCar) {
      clickedPos = event.latLng;

      data.lat = e.latLng.lat();
      data.lng = e.latLng.lng();

      // makes marker with position clicked
      marker = new google.maps.Marker({
        position: event.latLng,
        map: map
      });

      mapFormOpinion.classList.add("show");

      // centers map to postion clicked, with animation
      map.panTo(clickedPos);

      // opens infowindow
      //infowindow.open(map, marker);
    }
  });

  // listener for leaving map
  google.maps.event.addListener(map, "mouseout", function(event) {
    placingCar = false;
    mapOptionCar.classList.remove("active");
  });
}

function addToMap() {
  var ref = firebase.child('cars/');

  ref.once('value', function(snap) {
    add(snap.val());
  })
}

function addToFirebase(data) {
  var ref = firebase.child(cars).push(data, function(err) {
    if(err) {
      console.log(err);
    }
  })
}

// firebase
var db = firebase.database();

var data = {
  name: null,
  make: null,
  model: null,
  lat: null,
  lng: null
};

function writeUserData() {
  db.ref("cars/" + "carId3").set({
    name: "name",
    make: "email",
    model: "imageUrl",
    lat: "location",
    lng: "location"
  });
}

function initFirebase() {
  var cars = firebase.child('cars');




  console.log(cars);
}


formToJson()

function formToJson() {
  var form = document.getElementById("crowdsourced-map_form");
  formData = new FormData(form);

  
  console.log(formData);
}
