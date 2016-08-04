$(document).on('page:change', function(){

  $('.search-input').autocomplete({
    callback   : function(v){
      var googleLocationAutocomplete = new google.maps.places.AutocompleteService();
      var request = { input: v, types: ['address'], componentRestrictions: {country: 'ca'} };
      googleLocationAutocomplete.getPlacePredictions(request, function(predictions){
        data = predictions.map(function(prediction){ return prediction.description; });
        this.setData(data);
      }.bind(this));
    }
  });

  $('#home-search').submit(function(e){
    e.preventDefault();

    var address = $('#search').val();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(result, status) {
      if(result.length > 0){
        var latitude = result[0].geometry.location.lat();
        var longitude = result[0].geometry.location.lng();
        Turbolinks.visit("dev_sites?latitude=" + latitude + "&longitude=" + longitude);
      }else{
        Turbolinks.visit("dev_sites");
      }
    });

  });

  window.onpopstate = function(e){
    if(e.state){
      Turbolinks.visit(e.state.path);
    }
  };

  if($('#notice').length){
    Materialize.toast($('#notice').data("notice"), 3500, "teal");
  }

  if($('#alert').length){
    Materialize.toast($('#alert').data("alert"), 3500, "red darken-4");
  }

  $("#contact-councillor").on("ajax:success", function(){
    this.reset();
    Materialize.toast("Message successfully sent!", 3500, "teal");
  }).on("ajax:error", function(){
    this.reset();
    Materialize.toast("Message unsuccessfully sent!", 3500, "red darken-4");
  });

  $("#contact-file-lead").on("ajax:success", function(){
    this.reset();
    Materialize.toast("Message successfully sent!", 3500, "teal");
  }).on("ajax:error", function(){
    this.reset();
    Materialize.toast("Message unsuccessfully sent!", 3500, "red darken-4");
  });

  $("#contact-milieu").on("ajax:success", function(){
    this.reset();
    Materialize.toast("Message successfully sent!", 3500, "teal");
  }).on("ajax:error", function(){
    this.reset();
    Materialize.toast("Message unsuccessfully sent!", 3500, "red darken-4");
  });

  $("#contact-citizencity").on("ajax:success", function(){
    this.reset();
    Materialize.toast("Message successfully sent!", 3500, "teal");
  }).on("ajax:error", function(){
    this.reset();
    Materialize.toast("Message unsuccessfully sent!", 3500, "red darken-4");
  });

  $('.button-collapse').sideNav();
  $('select').material_select();
  $('.modal-trigger').leanModal();
  $('.datepicker').pickadate();

  $('.input-field').on('cocoon:after-insert', function(e, insertedItem) {
    $('select').material_select();
    $('.datepicker').pickadate();
  });

});

$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
