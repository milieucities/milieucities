// (function($) {
//   "use strict";
//
//   function Autocomplete(options){
//     options = $.extend({
//       multiple  : false,
//       value     : [],
//       data      : [],
//       result    : null
//     }, options);
//
//     $(this).each(function(){
//
//       var $autocomplete = $(this);
//
//       //deep copy the options object for every element
//       $autocomplete.options = $.extend(true, {}, options);
//
//       var onKeyDown = function(e){
//         $autocomplete.selected = $autocomplete.selected || $autocomplete.dropdown.find('.selected');
//
//         // TAB
//         if(e.which === 9){
//           $autocomplete.trigger('close');
//           $autocomplete.set();
//         }
//
//         // ENTER
//         if(e.which === 13){
//           e.preventDefault();
//           $autocomplete.trigger('close');
//           if($autocomplete.selected.length !== 0) $autocomplete.set($autocomplete.selected.text());
//         }
//
//         // ESC
//         if(e.which === 27){
//           $autocomplete.trigger('close');
//         }
//
//         // ARROW DOWN
//         if(e.which === 40){
//           if($autocomplete.selected.length === 0){
//             $autocomplete.selected = $autocomplete.dropdown.children().first();
//             $autocomplete.selected.toggleClass("selected");
//             return;
//           }
//
//           $autocomplete.selected.toggleClass("selected");
//           $autocomplete.selected = $autocomplete.selected.next().toggleClass("selected");
//         }
//
//         // ARROW UP
//         if(e.which === 38){
//           if($autocomplete.selected.length === 0){
//             $autocomplete.selected = $autocomplete.dropdown.children().last();
//             $autocomplete.selected.toggleClass("selected");
//             return;
//           }
//
//           $autocomplete.selected.toggleClass("selected");
//           $autocomplete.selected = $autocomplete.selected.prev().toggleClass("selected");
//         }
//       }
//
//       $autocomplete.on({
//         'keyup focus click' : function(e){
//           if([9,13,27,38,40].indexOf(e.which) !== -1 || $autocomplete.val() === "") return;
//           var autocompleteValue = $autocomplete.input.val();
//           $autocomplete.options.result.call($autocomplete, autocompleteValue);
//           if(!$autocomplete.active) $autocomplete.trigger('open');
//         },
//         'open' : function(){
//           $autocomplete.wrapper.toggleClass('active');
//           $autocomplete.active = true;
//           console.log('open');
//           $(document).on('click.close-autocomplete', function(e){
//             console.log('hit');
//             if(e.target !== $autocomplete[0] && e.target !== $autocomplete.dropdown[0]) $autocomplete.trigger('close');
//           });
//         },
//         'close' : function(){
//           $autocomplete.wrapper.toggleClass('active');
//           $autocomplete.active = false;
//           $autocomplete.dropdown.empty();
//           $(document).off('click.close-autocomplete');
//         },
//         'init' : function(){
//           $autocomplete.wrap('<div class="autocomplete-wrapper">');
//           $autocomplete.wrapper = $autocomplete.parent();
//
//           if($autocomplete.options.multiple){
//             var uuid = (function() {
//                           function s4() {
//                             return Math.floor((1 + Math.random()) * 0x10000)
//                               .toString(16)
//                               .substring(1);
//                           }
//                           return function() {
//                             return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//                                    s4() + '-' + s4() + s4() + s4();
//                           };
//                         })()();
//             $autocomplete.hide();
//             $autocomplete.wrapper.append('<input type="text" class="autocomplete-textfield" id="multiple-autocomplete-'+ uuid +'"/>'+
//                                          '<ul class="autocomplete-dropdown"></ul>' +
//                                          '<div class="autocomplete-tag-container"></div>')
//             $autocomplete.wrapper.find('label').attr('for', 'multiple-autocomplete-'+uuid);
//             $autocomplete.dropdown = $autocomplete.wrapper.find('.autocomplete-dropdown');
//             $autocomplete.input = $autocomplete.wrapper.find('.autocomplete-textfield');
//             $autocomplete.tagContainer = $autocomplete.wrapper.find('.autocomplete-tag-container');
//           }else{
//             $autocomplete.addClass('autocomplete-textfield');
//             $autocomplete.wrapper.append('<ul class="autocomplete-dropdown">');
//             $autocomplete.dropdown = $autocomplete.wrapper.find('.autocomplete-dropdown');
//             $autocomplete.input = $autocomplete;
//           }
//         },
//         'populate:dropdown' : function(){
//           var dropdownOptions = "";
//           $.each($autocomplete.options.data, function(){
//             dropdownOptions += '<li>'+ this +'</li>';
//           });
//           $autocomplete.dropdown
//           .html(dropdownOptions)
//           .find('li').click(function(){
//             $autocomplete.trigger('close');
//             $autocomplete.set(this.innerText);
//           });
//         },
//         'keydown' : onKeyDown
//       });
//
//       $autocomplete.set = function(value){
//         value = typeof value == 'undefined' ? $autocomplete.input.val() : value
//
//         if($autocomplete.options.multiple){
//           $autocomplete.val('');
//           $autocomplete.options.values.push(value);
//
//         }else{
//           $autocomplete.val(value);
//         }
//
//         // Trigger change event for React input autocomplete fields
//         var event = new Event('input', { bubbles: true });
//         $autocomplete.input[0].dispatchEvent(event);
//       }
//
//       $autocomplete.parseData = function(data){
//         $autocomplete.options.data = data;
//         $autocomplete.trigger('populate:dropdown');
//       }
//
//       $autocomplete.trigger('init');
//
//     });
//
//   }
//
//   $.fn.autocomplete = function(method){
//     if ( typeof method === 'object' ) {
//       return Autocomplete.apply(this, arguments );
//     } else {
//       $.error('An object for instantiation is needed.');
//     }
//   };
//
// })(jQuery);
