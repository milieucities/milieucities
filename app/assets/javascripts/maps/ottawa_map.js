var ready;
ready = function() {
  var map = L.map('ottawa-map').setView([45.4214, -75.6919], 10);


  /////// Google maps works ///////////////
  // googleLayer = new L.Google("ROADMAP");
  // map.addLayer(googleLayer);

  L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.emerald',
    accessToken: 'pk.eyJ1IjoiYXNoZGFyamkiLCJhIjoiYXhOTVZrUSJ9.Ht0vEm6aRtd6nOm8ty9QuQ'
  }).addTo(map);

  markers = $.getJSON('/loadMarkers').done(function(data) {
      console.log(data);
      data.forEach(function(site) {
        if (site != null) {
          if ((site['allInfo'].hasOwnProperty("lat")) && (site['allInfo'].hasOwnProperty("lon"))) {
            marker = L.marker([site['allInfo'].lat, site['allInfo'].lon]);
            marker.bindPopup(site['allInfo']['description']);
            marker.addTo(map);
          }
        }
      });



  });



  // Add Wards Overlay with GeoJSON
  function onEachFeature(feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties && feature.properties.DESCRIPTIO) {
          layer.bindPopup(feature.properties.WARDNUMTEX+': '+feature.properties.DESCRIPTIO);
      }
  }

  $.getJSON("/loadWards", function(response) {
    // L.geoJson(response).addTo(map);

    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#fff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    response.features.forEach(function(feat) {
      L.geoJson(feat, {
          onEachFeature: onEachFeature
      }).addTo(map);
    });


  });




  // map.locate({setView: true, maxZoom: 16});
  // map.on('locationfound', onLocationFound);
  // map.on('locationerror', onLocationError);
  //
  // function onLocationFound(e) {
  //     var radius = e.accuracy / 2;
  //
  //     L.marker(e.latlng).addTo(map)
  //         .bindPopup("You are within " + radius + " meters from this point").openPopup();
  //
  //     L.circle(e.latlng, radius).addTo(map);
  // }
  //
  // function onLocationError(e) {
  //     alert(e.message);
  // }
};



$(document).ready(ready);
$(document).on('page:load', ready);
$(document).on('page:change',ready);
