const mapFormOpinion = document.getElementById("crowdsourced-map_form"),
  mapOptionCar = document.getElementById("crowdsourced-map_option--car"),
  mapFormButton = document.getElementById("crowdsourced-map_form_button"),
  mapFormClose = document.getElementById("crowdsourced-map_form_close"),
  totalCarsText = document.getElementById("map-totalcars"),
  totalFordText = document.getElementById("map-totalford"),
  totalChevText = document.getElementById("map-totalchev"),
  totalDodgeText = document.getElementById("map-totaldodge"),
  totalCadText = document.getElementById("map-totalcad"),
  totalBuickText = document.getElementById("map-totalbuick"),
  totalPontText = document.getElementById("map-totalpont"),
  totalOldsText = document.getElementById("map-totalolds"),
  totalOtherText = document.getElementById("map-totalother");

// firebase
const db = firebase.database();
const carsRef = db.ref("cars");

var countedCars = new Array(),
  placingCar = false;

  var markers = [];

function myMap() {
 

  // map info and styling
  var mapProp = {
    center: new google.maps.LatLng(59.120749, 11.383609),
    zoom: 16,
    styles: [{
      featureType: "poi.business",
      elementType: "labels",
      stylers: [{
        visibility: "off"
      }]
      // },
      // {
      //   "featureType": "road",
      //   "elementType": "geometry.stroke",
      //   "stylers": [{
      //     "color": "#873B3B"
      //   }]
      // },
      // {
      //   "featureType": "water",
      //   "elementType": "geometry.fill",
      //   "stylers": [{
      //     "color": "#254576"
      //   }]
    }],
    clickableIcons: false,
    disableDoubleClickZoom: true,
    streetViewControl: false
  };

  // place map
  var map = new google.maps.Map(
    document.getElementById("ccGoogleMap"),
    mapProp
  );


  // listener for clicks on map
  google.maps.event.addListener(map, "click", function (e) {
    if (placingCar) {
      mapFormOpinion.classList.add("show");

      // sets location in car-object
      carData.lat = e.latLng.lat();
      carData.lng = e.latLng.lng();

      // centers map to postion clicked, with animation
      map.panTo(e.latLng);
    }
  });

  // listener for leaving map
  google.maps.event.addListener(map, "mouseout", function () {
    placingCar = false;
    mapOptionCar.classList.remove("active");
  });

  // listen for all cars added to database
  carsRef.on("child_added", function (data) {
    countCars(data);

    // custom icon
    var custom_icon = {
      url: 'img/icon/' + data.val().make + '.png',
      scaledSize: new google.maps.Size(60, 60), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    // makes textwindow at marker
    infowindow = new google.maps.InfoWindow({
      content: '<div class="carInfo"><p>' +
        data.val().make +
        "</p><p>" +
        data.val().model +
        "</p><p>" +
        data.val().year +
        "</p></div>"
    });

    // makes marker at position clicked
    marker = new google.maps.Marker({
      position: {
        lat: data.val().lat,
        lng: data.val().lng
      },
      icon: custom_icon,
     // content: infowindow,
      map: map
    });
    markers.push(marker);

    //infowindow.open(map, marker);

    addClickHandler(marker, infowindow, map);
  
  });

}

function addClickHandler(marker, infowindow, map) {
  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function() {
      infowindow.close(map, marker);
      });
  }


// saves car object to db
function writeUserData() {
  carsRef.push().set({
    make: carData.make,
    model: carData.model,
    year: carData.year,
    lat: carData.lat,
    lng: carData.lng
  });
}

// car object
var carData = {
  make: null,
  model: null,
  year: null,
  lat: null,
  lng: null
};

// adds carmakes and count to list
function countCars(data) {
  if (countedCars[data.val().make] == undefined) {
    countedCars[data.val().make] = 0;
  }

  countedCars[data.val().make]++;

  countCarsToHtml();
}

// updates html with car counts
function countCarsToHtml() {
  totalFordText.innerHTML = countedCars.Ford + " Ford";
  totalChevText.innerHTML = countedCars.Chevrolet + " Chevrolet";
  totalDodgeText.innerHTML = countedCars.Dodge + " Dodge";
  totalCadText.innerHTML = countedCars.Cadillac + " Cadillac";
  totalBuickText.innerHTML = countedCars.Buick + " Buick";
  totalOldsText.innerHTML = countedCars.Oldsmobile + " Oldsmobile";
  totalPontText.innerHTML = countedCars.Pontiac + " Pontiac";

  totalOtherText.innerHTML = countedCars.Annet + " Andre Merker";

  totalCarsText.innerHTML =
    countedCars.Ford +
    countedCars.Chevrolet +
    countedCars.Dodge +
    countedCars.Cadillac +
    countedCars.Buick +
    countedCars.Oldsmobile +
    countedCars.Pontiac +
    countedCars.Annet +
    " amcars";
}

// enables user placing car on click
mapOptionCar.onclick = function () {
  mapOptionCar.classList.add("active");
  placingCar = true;
};

// hides form when user confirms
mapFormButton.onclick = function () {
  mapFormOpinion.classList.remove("show");

  getForm();
};

// hides form when user cancels
mapFormClose.onclick = function () {
  mapFormOpinion.classList.remove("show");
  mapFormOpinion.reset();
};

// gets car data and places in car object, writes to db and resets form
function getForm() {
  var form = document.getElementById("crowdsourced-map_form");
  carData.make = form.elements["make"].value;
  carData.model = form.elements["model"].value;
  carData.year = form.elements["year"].value;

  mapFormOpinion.reset();
  writeUserData();
}

function validateForm() {}