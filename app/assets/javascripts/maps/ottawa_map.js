$(document).on("page:change", function() {
  var map = L.map('ottawa-map').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/ashdarji/ciip572jx008xzwmaknk7ei6e.html?title=true&access_token=pk.eyJ1IjoiYXNoZGFyamkiLCJhIjoiYXhOTVZrUSJ9.Ht0vEm6aRtd6nOm8ty9QuQ#0/0/0/0').addTo(map);

  var marker = L.marker([51.5, -0.09]).addTo(map);

  var circle = L.circle([51.508, -0.11], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map);

  var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
  ]).addTo(map);

  marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
  circle.bindPopup("I am a circle.");
  polygon.bindPopup("I am a polygon.");

});
