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
});
