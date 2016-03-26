$(document).on('page:change', function(){

  if($('#notice').length){
    Materialize.toast($('#notice').data("notice"), 3500, "teal");
  }

  if($('#alert').length){
    Materialize.toast($('#alert').data("alert"), 3500, "red darken-4");
  }

  $('.button-collapse').sideNav();
  $('select').material_select();
  $('.modal-trigger').leanModal();
  $('.datepicker').pickadate();

  $('.input-field').on('cocoon:after-insert', function(e, insertedItem) {
    $('select').material_select();
    $('.datepicker').pickadate();
  });

  // if($("#map").length > 0) {

  //   L.mapbox.accessToken = 'pk.eyJ1IjoiYXNoZGFyamkiLCJhIjoiYXhOTVZrUSJ9.Ht0vEm6aRtd6nOm8ty9QuQ';

  //   var map = L.mapbox.map('map', 'mapbox.streets');

  //   var myLayer = L.mapbox.featureLayer().addTo(map);

  //   map.locate();

  //   map.on('locationfound', function(e) {

  //     map.setView([e.latlng.lat, e.latlng.lng], 16);
  //     // map.fitBounds(e.bounds);

  //     // myLayer.setGeoJSON({
  //     //     type: 'Feature',
  //     //     geometry: {
  //     //         type: 'Point',
  //     //         coordinates: [e.latlng.lng, e.latlng.lat]
  //     //     },
  //     //     properties: {
  //     //         'title': 'Here I am!',
  //     //         'marker-color': '#ff8888',
  //     //         'marker-symbol': 'star'
  //     //     }
  //     // });

  //   });

  // }

});