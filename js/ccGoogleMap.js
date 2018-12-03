// referanser til html-elementer
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

// referanse til firebase databasen
const db = firebase.database();
const carsRef = db.ref("cars");

// andre variabler
var countedCars = new Array(),
  placingCar = false;

// bilobjekt
var carData = {
  make: null,
  model: null,
  year: null,
  lat: null,
  lng: null
};

// google maps
function myMap() {
  // map setup og styling
  var mapProp = {
    center: new google.maps.LatLng(59.120749, 11.383609),
    zoom: 16,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e1d9d0"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4a4a4a"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#666666"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#b9b3ac"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#9b948c"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#b6d1dc"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      }
    ],
    clickableIcons: false,
    disableDoubleClickZoom: true,
    streetViewControl: false
  };

  var map = new google.maps.Map(
    document.getElementById("ccGoogleMap"),
    mapProp
  );

  // lytter etter brukerklikk på kartet hvis bruker har klikket på "plasser amcar"-knappen
  google.maps.event.addListener(map, "click", function(e) {
    if (placingCar) {
      // åpner skjema for innsending av bil-informasjon
      mapFormOpinion.classList.add("show");

      // setter posisjon bruker klikket og legger i bilobjekt
      carData.lat = e.latLng.lat();
      carData.lng = e.latLng.lng();

      // senterer kartet til der bruker klikket
      map.panTo(e.latLng);
    }
  });

  // dersom bruker beveger seg utenfor kartet kan de klikke "plasser amcar"-knappen på nytt
  google.maps.event.addListener(map, "mouseout", function() {
    placingCar = false;
    mapOptionCar.classList.remove("active");
  });

  // lytter etter bilobjekter lagt til i databasen
  carsRef.on("child_added", function(data) {
    // kjører metode for å telling av biler til html
    countCars(data);

    // lager bilmerke-ikoner til markers på kartet
    var custom_icon = {
      url: "img/icon/" + data.val().make + ".png",
      scaledSize: new google.maps.Size(60, 60),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
    };

    // lager tekstvindu med bilobjekt-informasjon ved marker
    infowindow = new google.maps.InfoWindow({
      content:
        '<div class="carInfo"><p>' +
        data.val().make +
        "</p><p>" +
        data.val().model +
        "</p><p>" +
        data.val().year +
        "</p></div>"
    });

    // lager marker på posisjonen bruker klikket
    marker = new google.maps.Marker({
      position: {
        lat: data.val().lat,
        lng: data.val().lng
      },
      icon: custom_icon,
      map: map
    });

    // kaller metode for å vise bil-informasjon ved marker
    addClickHandler(marker, infowindow, map);
  });
}

// lytter etter bruker "mouseover/hover" på marker, viser bil-informasjon i tekstvindu
function addClickHandler(marker, infowindow, map) {
  google.maps.event.addListener(marker, "mouseover", function() {
    infowindow.open(map, marker);
  });

  google.maps.event.addListener(marker, "mouseout", function() {
    infowindow.close(map, marker);
  });
}

// sjekker merke i bilobjektet og teller hver instanse
function countCars(data) {
  if (countedCars[data.val().make] == undefined) {
    countedCars[data.val().make] = 0;
  }
  countedCars[data.val().make]++;

  // kaller metode for oppdatering av antall biler og merker
  countCarsToHtml();
}

// oppdaterer html med antall biler og bilmerker
function countCarsToHtml() {
  // teller antall av hvert bilmerke
  totalFordText.innerHTML = countedCars.Ford + " Ford";
  totalChevText.innerHTML = countedCars.Chevrolet + " Chevrolet";
  totalDodgeText.innerHTML = countedCars.Dodge + " Dodge";
  totalCadText.innerHTML = countedCars.Cadillac + " Cadillac";
  totalBuickText.innerHTML = countedCars.Buick + " Buick";
  totalOldsText.innerHTML = countedCars.Oldsmobile + " Oldsmobile";
  totalPontText.innerHTML = countedCars.Pontiac + " Pontiac";
  totalOtherText.innerHTML = countedCars.Annet + " Andre Merker";

  // teller alle biler
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

// lytter etter brukerklikk på "plasser din amcar", lar bruker sette marker på kartet
mapOptionCar.onclick = function() {
  mapOptionCar.classList.add("active");
  placingCar = true;
};

// skjuler skjema når bruker klikker "send" og kaller metode for innsending av skjema
mapFormButton.onclick = function() {
  mapFormOpinion.classList.remove("show");

  getForm();
};

// skjuler skjema når bruker avbryter og resetter skjema
mapFormClose.onclick = function() {
  mapFormOpinion.classList.remove("show");
  mapFormOpinion.reset();
};

// henter skjema med bil-informasjon og setter verdier til bilobjekt,
// resetter skjema og sender kaller funksjon for å skrive til databasen
function getForm() {
  var form = document.getElementById("crowdsourced-map_form");
  carData.make = form.elements["make"].value;
  carData.model = form.elements["model"].value;
  carData.year = form.elements["year"].value;

  mapFormOpinion.reset();
  writeUserData();
}

// sender bilobjekt-info til databasen
function writeUserData() {
  carsRef.push().set({
    make: carData.make,
    model: carData.model,
    year: carData.year,
    lat: carData.lat,
    lng: carData.lng
  });
}

// UFERDIG, skulle hatt validering av skjema for å kontrolle at man får riktig informasjon
function validateForm() {}
