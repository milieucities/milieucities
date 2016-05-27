$(document).on('page:change', function(){

  if($("#home-map").length > 0) {

    mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc2FseWppIiwiYSI6ImNpZWh2NGFvczAwZjVzM20xdTc0OTZleTEifQ.Bm-MoyW0uby7pInuUzbVGw';

    var map = new mapboxgl.Map({
        container: 'home-map',
        style: 'mapbox://styles/luisalyji/cioqcmbm30000bpnke827qw3u',
        center: [-75.694, 45.426],
        zoom: 15,
        interactive: false
    });

  }

});
