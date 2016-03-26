$(document).on('page:change', function(){

  if($("#home-map").length > 0) {

    mapboxgl.accessToken = 'pk.eyJ1IjoibXR1Y2swNjMiLCJhIjoiY2ltNXA0OHZhMDFub3RzbTR5b3NmbTR4bCJ9.WDWrgehrJIsDpt1BX5IASQ';

    var map = new mapboxgl.Map({
        container: 'home-map',
        style: 'mapbox://styles/mtuck063/cim8gs43500449lm1hv082tp2',
        center: [-75.694, 45.426],
        zoom: 15,
        interactive: false
    });

  }

});
