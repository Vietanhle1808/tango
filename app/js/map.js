setMapHeight();
initMap('.map-location-data', 'tooltip-location-info', 'map-canvas');
handleGetCurrentLocation();
initMapByNearest();
doSearchAdress();
doSearchAddressWithMap();
doSearchAddressInPageMapDetails();
initDataForMapOfficeDetails();

function setMapHeight() {
  var mapContainer = document.querySelector('.section-map');
  if (globalFunction.domExists(mapContainer)) {
    var headerHeight = document.querySelector('.header').offsetHeight / 10;
    var search = document.querySelector('.section-search');
    var searchHeight = globalFunction.domExists(search) ? (search.offsetHeight / 10) : 0;
    var mapHeight = 'calc(100vh - ' + (searchHeight + headerHeight) + 'rem)';
    var mapContainer = mapContainer.querySelector('.responsive-iframe');
    mapContainer.setAttribute('style', 'padding-top: ' + mapHeight + ';');
  }
}

function initMap(objMapLocation, mapPopupClass, idMap) {
  var locationsContain = document.querySelectorAll(objMapLocation);
  if (locationsContain.length) {
    //generate locations array
    var locations = new Array();
    var a, b, c, d;
    var j = 0;

    locationsContain.forEach(function (elLocation, idLocation) {
      a = '<div class="map-content-window ' + mapPopupClass + '">' + elLocation.innerHTML + '</div>';
      b = parseFloat(elLocation.querySelector('.latlon-lat').innerHTML);
      c = parseFloat(elLocation.querySelector('.latlon-lon').innerHTML);
      j = j + 1;
      d = j;
      locations.push([a, b, c, d]);
    });

    //init map
    var ourPos = {
      lat: locations[0][1],
      lng: locations[0][2]
    };
    var map = new google.maps.Map(document.getElementById(idMap), {
      zoom: 14,
      center: ourPos,
      // disableDefaultUI: true,
      maxZoom: 25
    });

    //control marker content
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var markers = new Array();
    var bounds = new google.maps.LatLngBounds(); //(1)

    var latlng = {
      lat: parseFloat(locations[0][1]),
      lng: parseFloat(locations[0][2])
    };
    var geocoder = new google.maps.Geocoder;


    for (i = 0; i < locations.length; i++) {
      ourPos = new google.maps.LatLng(locations[i][1], locations[i][2]);
      marker = new google.maps.Marker({
        position: ourPos,
        map: map,
        // icon: markerIcon,
        zIndex: 1
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          markers.forEach(function (elMarker, idMarker) {
            infowindow.open(map, elMarker);
            // marker.setIcon(markerIcon);
            // marker.setZIndex(1);
          });
          geocoder.geocode({
            'location': latlng
          }, function (results, status) {
            if (status === 'OK') {
              if (results[0]) {
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
              }
            }
          })
          // infowindow.setContent(locations[i][0]);
          // infowindow.open(map, marker);
          // marker.setIcon(markerIconSecondary);
          marker.setZIndex(2);
        }
      })(marker, i));

      bounds.extend(marker.getPosition()); //(2)
      markers.push(marker);
    }

    map.fitBounds(bounds); //And (1), (2) => show map to cover all markers

    //overwrite zoom map option after fitbounds
    var listener = google.maps.event.addListener(map, 'idle', function () {
      map.setZoom(13);
      google.maps.event.removeListener(listener);
    });

    // disable click link company name
    document.querySelector('.card2-location-2 .card2-title').addEventListener('click', function (e) {
      e.preventDefault();
    });
  }
}

function handleGetCurrentLocation() {
  var btnGetLocation = document.querySelectorAll('.btn-get-location');
  if (btnGetLocation.length > 0) {
    btnGetLocation.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var _this = this;
        var dataUrl = _this.closest('.section-search-content').getAttribute('data-map-url');
        var cardFooter = _this.closest('.card-footer');
        var loadingBox = _this.closest('.card-search');

        cardFooter.classList.add('is-loading');
        loadingBox.querySelector('.loading-box').classList.add('is-visible');

        // check for Geolocation support
        if (navigator.geolocation) {
          // console.log('Geolocation is supported!');
        } else {
          // console.log('Geolocation is not supported for this Browser/OS.');
        }

        var startPos;

        function success(position) {
          startPos = position;
          var latitude = startPos.coords.latitude;
          var longitude = startPos.coords.longitude;
          var locationData = {};
          locationData.lat = latitude;
          locationData.lng = longitude;

          if (globalFunction.checkLocalStorageItemExisted('VSLocationData')) {
            localStorage.removeItem('VSLocationData');
            localStorage.setItem('VSLocationData', JSON.stringify(locationData));
          } else {
            localStorage.setItem('VSLocationData', JSON.stringify(locationData));
          }

          window.location.replace(dataUrl);

          cardFooter.classList.remove('is-loading');
          loadingBox.querySelector('.loading-box').classList.remove('is-visible');
        }

        function error(e) {
          console.log('no location');

          cardFooter.classList.remove('is-loading');
          loadingBox.querySelector('.loading-box').classList.remove('is-visible');
        }

        navigator.geolocation.getCurrentPosition(success, error, {
          timeout: 60000
        });

      });
    });
  }
}

function initMapByNearest() {
  var mapCanvas = document.querySelector('#map-canvas');
  var mapLocationData = document.querySelector('.map-location-data');
  var locationOfficeData;
  var nameOfficeData;
  var addressOfficeData;
  // var allLocations = [{'location': 'Hanoi', 'name': 'Vicostone Vietnam','address':'Hoa Lac Hi-tech Park, Thach Hoa Commune, Thach That District, Hanoi, Vietnam','lat': '21.0075179','lng': '105.5415755'},{'location': 'Canada','name': 'Vicostone Canada','address':'341 Edgeley Blvd, Vaughan, ON L4K 3Y2, Canada','lat': '43.8014787','lng': '-79.5335599'},{'location': 'USA','name': 'Vicostone USA','address':'11620 GOODNIGHT LANE, SUITE 100, DALLAS, TX 75229','lat': '32.9049242','lng': '-96.9016291'}];

  if (globalFunction.checkLocalStorageItemExisted('VSLocationData') && globalFunction.domExists(mapCanvas) && !globalFunction.domExists(mapLocationData)) {
    var currentLocation = JSON.parse(localStorage.getItem('VSLocationData'));

    function handleClosestLocation(closest) {
      // console.log("Closest: " + closest.coord.lat + ", " + closest.coord.lng + ", " + closest.coord.location);

      var sectionMap = document.querySelector('.section-map-content');
      var locationBox = document.createElement('div');
      var latBox = document.createElement('span');
      var lngBox = document.createElement('span');

      locationBox.classList.add('map-location-data');
      latBox.classList.add('latlon-lat');
      lngBox.classList.add('latlon-lon');
      latBox.innerHTML = closest.coord.lat;
      lngBox.innerHTML = closest.coord.lng;

      locationBox.appendChild(latBox);
      locationBox.appendChild(lngBox);

      sectionMap.insertBefore(locationBox, sectionMap.firstChild);
      // console.log(locationBox);
      // console.log(sectionMap);

      initMap('.map-location-data', 'tooltip-location-info', 'map-canvas');

      var inputSearch = document.querySelector('input.form-control-search');
      if (globalFunction.domExists(inputSearch)) {
        locationOfficeData = closest.coord.location;
        nameOfficeData = closest.coord.name;
        addressOfficeData = closest.coord.address;

        inputSearch.value = locationOfficeData;
        document.querySelector('.card2-location-2 .card2-title').innerHTML = nameOfficeData;
        document.querySelector('.card2-location-2 .card2-helper').innerHTML = addressOfficeData;
      }
    }
    globalFunction.getCloestLocation(handleClosestLocation, currentLocation);
  }
}

function doSearchAdress() {
  var btnSearchAddress = document.querySelector('.button-search-address');

  if(globalFunction.domExists(btnSearchAddress)) {
    btnSearchAddress.addEventListener('click', function (e) {
      e.preventDefault();
      var _this = this;
      var searchValue = _this.closest('.form-search-address').querySelector('input.form-control-search').value;
      var dataUrl = _this.closest('.section-search-content').getAttribute('data-map-url');

      if(globalFunction.checkValid(searchValue)) {
        function handleResultAddress(result) {
          var latitude = result.geometry.location.lat();
          var longitude = result.geometry.location.lng();
          var locationData = {};
          locationData.lat = latitude;
          locationData.lng = longitude;

          if (globalFunction.checkLocalStorageItemExisted('VSLocationData')) {
            localStorage.removeItem('VSLocationData');
            localStorage.setItem('VSLocationData', JSON.stringify(locationData));
          } else {
            localStorage.setItem('VSLocationData', JSON.stringify(locationData));
          }

          window.location.replace(dataUrl);
        }

        globalFunction.getLatitudeLongitude(handleResultAddress, searchValue);
      }
    });
  }
}

function doSearchAddressWithMap() {
  var btnSearchAddress = document.querySelector('.button-search-address-with-map');
  var locationOfficeData;
  var nameOfficeData;
  var addressOfficeData;

  if(globalFunction.domExists(btnSearchAddress)) {
    btnSearchAddress.addEventListener('click', function (e) {
      e.preventDefault();
      var _this = this;
      var searchValue = _this.closest('.form-search-address-with-map').querySelector('input.form-control-search').value;

      if(globalFunction.checkValid(searchValue)) {
        function handleResultAddress(result) {
          var latitude = result.geometry.location.lat();
          var longitude = result.geometry.location.lng();
          var locationData = {};
          locationData.lat = latitude;
          locationData.lng = longitude;

          function handleClosestLocation(closest) {
            // reinit map
            var mapData = document.querySelector('.map-location-data');
            var mapContain = document.querySelector('#map-canvas');
            mapData.querySelector('.latlon-lat').innerHTML = closest.coord.lat;
            mapData.querySelector('.latlon-lon').innerHTML = closest.coord.lng;
            mapContain.innerHTML = '';
            initMap('.map-location-data', 'tooltip-location-info', 'map-canvas');

            locationOfficeData = closest.coord.location;
            nameOfficeData = closest.coord.name;
            addressOfficeData = closest.coord.address;

            document.querySelector('.card2-location-2 .card2-title').innerHTML = nameOfficeData;
            document.querySelector('.card2-location-2 .card2-helper').innerHTML = addressOfficeData;
          }
          globalFunction.getCloestLocation(handleClosestLocation, locationData);
        }

        globalFunction.getLatitudeLongitude(handleResultAddress, searchValue);
      }
    });
  }
}

function doSearchAddressInPageMapDetails() {
  var btnSearchAddress = document.querySelector('.button-search-address-details-page');

  if(globalFunction.domExists(btnSearchAddress)) {
    btnSearchAddress.addEventListener('click', function (e) {
      e.preventDefault();
      var _this = this;
      var searchValue = _this.closest('.form-search-address-details-page').querySelector('input.form-control-search').value;
      var dataUrl = _this.closest('.form-search-address-details-page').getAttribute('data-map-url');

      if(globalFunction.checkValid(searchValue)) {
        function handleResultAddress(result) {
          var latitude = result.geometry.location.lat();
          var longitude = result.geometry.location.lng();
          var locationData = {};
          locationData.lat = latitude;
          locationData.lng = longitude;

          if (globalFunction.checkLocalStorageItemExisted('VSLocationData')) {
            localStorage.removeItem('VSLocationData');
            localStorage.setItem('VSLocationData', JSON.stringify(locationData));
          } else {
            localStorage.setItem('VSLocationData', JSON.stringify(locationData));
          }

          window.location.replace(dataUrl);
        }

        globalFunction.getLatitudeLongitude(handleResultAddress, searchValue);
      }
    });
  }
}

function initDataForMapOfficeDetails() {
  var mapData = document.querySelector('.map-location-data');
  if(globalFunction.domExists(mapData)) {
    if(globalFunction.checkLocalStorageItemExisted('VSLocationData')) {
      var dataLat = mapData.querySelector('.latlon-lat').innerHTML;
      var dataLon = mapData.querySelector('.latlon-lon').innerHTML;
      
      for(var i = 0; i < allLocations.length; i++) {
        if(allLocations[i].lat === dataLat && allLocations[i].lng === dataLon) {
          document.querySelector('.card2-location-2 .card2-title').innerHTML = allLocations[i].name;
          document.querySelector('.card2-location-2 .card2-helper').innerHTML = allLocations[i].address;
        }
      }
    } else {
      
    }
  }
  
  var noticeMap = document.querySelector('.notice-search-location');
  if(globalFunction.domExists(noticeMap)) {
    if(!globalFunction.checkLocalStorageItemExisted('VSLocationData')) {
      var linkRedirect = document.querySelector('form.form-search-address-with-map').getAttribute('data-url-no-localstorage');

      window.location.replace(linkRedirect);
    }
  }
}