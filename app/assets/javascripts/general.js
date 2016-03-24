$(document).ready(function() {

  if($("#map").length > 0) {

    L.mapbox.accessToken = 'pk.eyJ1IjoiYXNoZGFyamkiLCJhIjoiYXhOTVZrUSJ9.Ht0vEm6aRtd6nOm8ty9QuQ';

    var map = L.mapbox.map('map', 'mapbox.streets');

    var myLayer = L.mapbox.featureLayer().addTo(map);

    map.locate();


    map.on('locationfound', function(e) {
      map.fitBounds(e.bounds);

      myLayer.setGeoJSON({
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [e.latlng.lng, e.latlng.lat]
          },
          properties: {
              'title': 'Here I am!',
              'marker-color': '#ff8888',
              'marker-symbol': 'star'
          }
      });

    });

  }

});