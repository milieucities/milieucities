$(document).on("page:change", function() {
  var map = L.map('ottawa-map').setView([45.4214, -75.6919], 13);


  /////// Google maps works ///////////////
  // googleLayer = new L.Google("ROADMAP");
  // map.addLayer(googleLayer);

  L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox.emerald',
    accessToken: 'pk.eyJ1IjoiYXNoZGFyamkiLCJhIjoiYXhOTVZrUSJ9.Ht0vEm6aRtd6nOm8ty9QuQ'
  }).addTo(map);

  // Add Wards Overlay with GeoJSON
  wards2010URL = "http://data.ottawa.ca/dataset/13deeed4-1cd5-4a68-a10d-9839d3677446/resource/39333199-c9b5-4dc8-bb59-0a9422c23f63/download/wards-2010-2.json";
  $.getJSON("/loadWards", function(response) {
    L.geoJson(response).addTo(map);
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

});
