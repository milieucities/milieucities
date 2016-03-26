// var ready;
// ready = function() {

//   var map = L.map('ottawa-map').setView([45.4214, -75.6919], 10);

//   /////// Google maps works ///////////////
//   // googleLayer = new L.Google("ROADMAP");
//   // map.addLayer(googleLayer);

//   L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 20,
//     id: 'mapbox.emerald',
//     accessToken: 'pk.eyJ1IjoiYXNoZGFyamkiLCJhIjoiYXhOTVZrUSJ9.Ht0vEm6aRtd6nOm8ty9QuQ'
//   }).addTo(map);


//   // Add all the markers to the map

//   function loadSitesOnWardClick(wardName) {
//     $.getJSON('/loadMarkers').done(function(data) {

//         data.forEach(function(site) {
//           if (site != null) {
//             if (site['allInfo']['wardName'] == wardName){
//               if ((site['allInfo'].hasOwnProperty("lat")) && (site['allInfo'].hasOwnProperty("lon"))) {
//                 marker = L.marker([site['allInfo'].lat, site['allInfo'].lon],{
//                     opacity: 1,
//                     riseOnHover: true
//                 });
//                 marker.bindPopup(site['allInfo']['description']);
//                 marker.addTo(map);
//               }
//             }

//           }
//         });
//     });
//   }


//   // Add Wards Overlay with GeoJSON
//   colors = [  "#a6cee3",
//               "#1f78b4",
//               "#b2df8a",
//               "#33a02c",
//               "#fb9a99",
//               "#e31a1c",
//               "#fdbf6f",
//               "#ff7f00",
//               "#cab2d6",
//               "#6a3d9a",
//               "#ffff99",
//               "#b15928",
//               "#8dd3c7",
//               "#ffffb3",
//               "#bebada",
//               "#fb8072",
//               "#80b1d3",
//               "#fdb462",
//               "#b3de69",
//               "#fccde5",
//               "#d9d9d9",
//               "#bc80bd",
//               "#ccebc5",
//               "#ffed6f"
//           ];

//     function style(feature) {
//       return {
//           fillColor: feature.properties.color,
//           weight: 2,
//           opacity: 1,
//           color: 'black',
//           dashArray: '3',
//           fillOpacity: 0.7
//       };
//   }

//   function highlightFeature(e) {
//       var layer = e.target;

//       layer.setStyle({
//           weight: 5,
//           color: '#666',
//           dashArray: '',
//           fillOpacity: 0.7
//       });

//       if (!L.Browser.ie && !L.Browser.opera) {
//           layer.bringToFront();
//       }
//   }

//   function onEachFeature(feature, layer) {
//       // does this feature have a property named popupContent?
//       if (feature.properties && feature.properties.DESCRIPTIO) {
//           // layer.bindPopup(feature.properties.WARDNUMTEX+': '+feature.properties.DESCRIPTIO);
//       }
//       layer.on('click', function() {
//         loadSitesOnWardClick(feature.properties.DESCRIPTIO)
//       });
//   }

//   $.getJSON("/loadWards", function(response) {
//     // L.geoJson(response).addTo(map);
//     counter = 0;
//     response.features.forEach(function(feat) {


//       feat['properties']['color'] = colors[counter];
//       counter++;
//       // console.log(feat);
//       L.geoJson(feat, {
//           onEachFeature: onEachFeature,
//           style: style
//       }).addTo(map);
//     });


//   });

// };


// $(document).on('page:load', ready);
// $(document).on('page:change',ready);
