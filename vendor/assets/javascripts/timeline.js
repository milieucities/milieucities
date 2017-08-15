      $.fn.timeline = function( data ) {
      return this.each(function() {

        $el = $(this);
        $el.addClass('tl');

        var statuses = {
          'Application Received': { position: 0},
          'Open': { position: 0},
          'Application Complete, Comment Period Open': { position: 1},
          'Review': { position: 2},
          'Planning Review Stage': { position: 2},
          'Revision': { position: 3},
          'Decision': { position: 4},
        }

        var $eventTmpl = $('<div class="checkoutwrap"><ul class="checkoutbar"><li><span><a href="#">Comment Period</a></span></li><li><span>Public Meeting</span></li><li><span>Revision Changes</span></li><li><span>Decision Meeting</span></li><li><span>Decision Made</span></li></ul></div>')

        var status = statuses[data];
        var statusPosition = status ? status.position : 0;

        $eventTmpl.find('li:nth-of-type(' + statusPosition + ')').addClass('active');
        $eventTmpl.find('li:nth-of-type(' + statusPosition + ')').prevAll().addClass('visited');

        $el.html($eventTmpl);
      });
    };