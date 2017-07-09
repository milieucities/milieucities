      $.fn.timeline = function( data ) {
      return this.each(function() {
      
        $el = $(this);
        $el.addClass('timeline');


        // calc ratio for event positions
        var ratio = 100/(data.stop_time - data.start_time)
        
        $.each(data.lines, function(i,line){
          var lineTmpl = $('<div class="line"><div class="events"></div></div>').addClass("line "+ line.css).appendTo($el);
          
          $.each(line.events, function(index,event){
            var position = ((event.time - data.start_time)*ratio).toFixed(2);

            var eventTmpl = $('<div class="event"><div class="circle"><div class="circle-inner"></div><div class="label"><text>'+event.title+'</text><time>'+(new Date(event.time).toLocaleString())+'</time></div></div></div>').appendTo($('.events', lineTmpl)).css('left',position+'%');
          });
        });

        var timeTmpl = $('<div class="time">').appendTo($el);
        var periodTmpl = $('<div class="period"><div class="label last">'+(new Date(data.stop_time).toLocaleString())+'</div><div class="label first">'+(new Date(data.start_time).toLocaleString())+'</div></div>').css({left:"0%", width:"100%"}).appendTo(timeTmpl);
        
      });
    };