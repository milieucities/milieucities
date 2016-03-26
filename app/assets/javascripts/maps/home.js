$(document).on('page:change', function(){

  if($("#home-map").length > 0) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoZGFyamkiLCJhIjoiYXhOTVZrUSJ9.Ht0vEm6aRtd6nOm8ty9QuQ';

    var map = new mapboxgl.Map({
        container: 'home-map',
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [-75.7, 45.42],
        zoom: 12,
        interactive: false
    });

    map.addControl(new mapboxgl.Geolocate());

  }

});
