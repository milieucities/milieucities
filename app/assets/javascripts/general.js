$(document).on('turbolinks:load', function(){

  $('.search-input').autocomplete({
    callback: function(v){
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
        Turbolinks.visit('dev_sites?latitude=' + latitude + '&longitude=' + longitude);
      }else{
        Turbolinks.visit('dev_sites');
      }
    });

  });

  window.onpopstate = function(e){
    if(e.state){
      Turbolinks.visit(e.state.path);
    }
  };

  if($('#notice').length){
    window.flash('notice',  $('#notice').data('notice'));
  }

  if($('#alert').length){
    window.flash('alert', $('#alert').data('alert'));
  }

  $('#contact-councillor').on("ajax:success", function(){
    this.reset();
    window.flash('notice', 'Message successfully sent!');
  }).on('ajax:error', function(){
    this.reset();
    window.flash('alert', 'Message unsuccessfully sent!');
  });

  $('#contact-file-lead').on('ajax:success', function(){
    this.reset();
    window.flash('notice', 'Message successfully sent!');
  }).on('ajax:error', function(){
    this.reset();
    window.flash('alert', 'Message unsuccessfully sent!');
  });

  $('#contact-milieu').on('ajax:success', function(){
    this.reset();
    window.flash('notice', 'Message successfully sent!');
  }).on('ajax:error', function(){
    this.reset();
    window.flash('alert', 'Message unsuccessfully sent!');
  });

  $('#contact-citizencity').on('ajax:success', function(){
    this.reset();
    window.flash('notice', 'Message successfully sent!');
  }).on('ajax:error', function(){
    this.reset();
    window.flash('alert', 'Message unsuccessfully sent!');
  });

  $('.modal-trigger').leanModal();

  $('.input-field').on('cocoon:after-insert', function(e, insertedItem) {
    $('select').material_select();
  });

});

$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});

$(document).on('click', 'a',function(e) {
  this.blur();
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
