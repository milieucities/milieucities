var map, geojsonData;

$(document).on('ready page:load', function(){


  if($("#main-map").length > 0) {

    function wheel(event) {
        var delta = 0;
        if (event.wheelDelta) {(delta = event.wheelDelta / 60);}
        else if (event.detail) {(delta = -event.detail / 3);}

        handle(delta);
        if (event.preventDefault) {(event.preventDefault());}
        event.returnValue = false;
    }

    function handle(delta) {
        var time = 500;
        var distance = 300;

        $('html, body').stop().animate({
            scrollTop: $(window).scrollTop() - (distance * delta)
        }, time );
    }

    if (window.addEventListener) {window.addEventListener('DOMMouseScroll', wheel, false);}
      window.onmousewheel = document.onmousewheel = wheel;

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

    $(".filter-item").click(function(){
      var $filter = $(this);
      var filter_by = $filter.data("filter");

      if($filter.hasClass("selected")){
        $filter.removeClass("selected");
        filter_by = "nothing";
      }else{
        $(".filter-item").removeClass("selected");
        $filter.addClass("selected");
      }

      $.getJSON("/dev_sites?filter=" + filter_by, function(data){
        geojsonData = data;
        html = HandlebarsTemplates['maps/dev_site_info'](data);
        $("#dev-site-profile").html(html); 
      });


      $.getJSON("/dev_sites/geojson?filter=" + filter_by, function(data){


        map.removeSource("devSites");
        map.removeLayer("devSites");

        if(data.length !== 0){
          var firstPoint = data[0];
          map.flyTo({center: [firstPoint.geometry.coordinates[0], firstPoint.geometry.coordinates[1]], zoom: 15 });
        }

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
                "icon-image": "{marker-symbol}",
                "icon-size": 1,
                "icon-offset": [20,-70],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-size": 12,
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        });

      });

    });

    map.on('style.load', function () {

      $.getJSON("/dev_sites/geojson", function(data){

        if(data.length !== 0){
          var firstPoint = data[0];
          map.flyTo({center: [firstPoint.geometry.coordinates[0], firstPoint.geometry.coordinates[1]], zoom: 15 });
        }

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
                "icon-image": "{marker-symbol}",
                "icon-size": 1,
                "icon-offset": [20,-70],
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
