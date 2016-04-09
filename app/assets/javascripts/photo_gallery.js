var gallery, imageArray;

$(document).on('ready page:load', function(){

  if( $("#slides").length > 0 ){

    var url = location.pathname + "/images";

    $.getJSON(url, function(data){
      imageArray = data.images;
    });
  }

});

$(document).on('click', "#slides .display-image",function(){
  gallery = photoSwipe(imageArray);
  gallery.init();
});

function photoSwipe(images){
  var pswpElement = document.querySelectorAll('.pswp')[0];

  var items = images;
  var options = {
      index: 0
  };

  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

  return gallery;
}