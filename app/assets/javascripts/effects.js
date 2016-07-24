$(function(){
  $('.overshadow').mouseenter(function(){
    $(this).css({ 'opacity': 1 });
    $(this).siblings().velocity("stop").velocity({ 'opacity': 0.4}, {duration: 200});
  });

  $('.overshadow').mouseleave(function(){
    $(this).siblings().velocity({ 'opacity': 1}, {duration: 200});
  });
});
