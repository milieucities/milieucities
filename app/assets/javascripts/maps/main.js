var map, geojsonData;

$(document).on('ready page:load', function(){


  if($("#main-map").length > 0) {

    $.getJSON("/dev_sites", function(data){
      geojsonData = data;
      html = HandlebarsTemplates['maps/dev_site_info'](data);
      $("#dev-site-profile").append(html); 
    });

    mapboxgl.accessToken = 'pk.eyJ1IjoibXR1Y2swNjMiLCJhIjoiY2ltNXA0OHZhMDFub3RzbTR5b3NmbTR4bCJ9.WDWrgehrJIsDpt1BX5IASQ';

    map = new mapboxgl.Map({
        container: 'main-map',
        // style: 'mapbox://styles/mapbox/street-v8',
        style: 'mapbox://styles/mtuck063/cim8gs43500449lm1hv082tp2',
        center: [-75.7, 45.42],
        zoom: 15
    });

    map.scrollZoom.disable();

    map.on('style.load', function () {

      $.getJSON("/dev_sites/geojson", function(data){

        if(data.length === 0){
          return false;
        }


        var firstPoint = data[0];

        map.setCenter([firstPoint.geometry.coordinates[0], firstPoint.geometry.coordinates[1]]);

        map.addSource("devSites", {
            "type": "geojson",
            "data": { "type": "FeatureCollection",
                      "features": data
                    }
        });

        map.addLayer({
            "id": "devSites",
            "type": "symbol",
            "source": "devSites",
            "layout": {
                "icon-image": "{marker-symbol}-15",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-size": 12,
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        });

      });

    });


    map.on('click', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['devSites'] });
      if (features.length) {

        map.flyTo({center: features[0].geometry.coordinates});
        $("html, body").animate({ scrollTop: $("#dev-site-" + features[0].properties.id).offset().top }, 1000);
      }
    });

    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['symbols'] });
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mousemove', function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['devSites'] });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (!features.length) {
            popup.remove();
            return;
        }

        var feature = features[0];

        popup.setLngLat(feature.geometry.coordinates)
            .setHTML(feature.properties.description)
            .addTo(map);
    });

  window.onscroll = function() {
    if($("#main-map").length > 0) {
      for (var i = 0; i < geojsonData.length; i++) {
          var id = geojsonData[i].dev_site.id;
          if (isElementOnScreen(id)) {
              setActiveChapter(geojsonData[i].dev_site);
              break;
          }
      }
    }
  };

  var activeDataPoint;
  function setActiveChapter(dataPoint) {
      if (dataPoint === activeDataPoint) return;

      map.flyTo({center: [dataPoint.longitude, dataPoint.latitude], zoom: 15 });

      activeDataPoint = dataPoint;
  }

  function isElementOnScreen(id) {
      var element = document.getElementById("dev-site-" + id);
      var bounds = element.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 400;
  }


  var geocoder = new mapboxgl.Geocoder({
      container: 'geocoder-container'
  });

  map.addControl(geocoder);

  }


});
