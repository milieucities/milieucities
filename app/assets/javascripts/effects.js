$(function(){
  $('.overshadow').mouseenter(function(){
    var $this = $(this);
    var $siblings = $this.siblings();
    $this.css({ 'opacity': 1 });
    $siblings.velocity("stop").velocity({ 'opacity': 0.4}, {duration: 200});
  });

  $('.overshadow').mouseleave(function(){
    var $this = $(this);
    var $siblings = $this.siblings();
    $siblings.velocity({ 'opacity': 1}, {duration: 200});
  });

  $('.modal-trigger').click(function(){
    $this = $(this);
    var id = $this.attr('href');
    $(id).velocity({ 'opacity': 1, 'zIndex': 1 }, {duraction: 500});

    $(id).find('modal-content').focus();
  });

  $('.close-modal').click(function(e){
    e.preventDefault();
    $this = $(this);
    var id = $this.attr('href');
    $(id).closeModal();
    $(id).velocity({ 'opacity': 0, 'zIndex': -1 }, {duraction: 500});
  });
});
