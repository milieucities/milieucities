// $(document).ready(function() {
//
//   var subscribeButton = function() {
//
//       var docElem = window.document.documentElement, didScroll, scrollPosition;
//
//       // trick to prevent scrolling when opening/closing button
//       function noScrollFn() {
//         window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
//       }
//
//       function noScroll() {
//         window.removeEventListener( 'scroll', scrollHandler );
//         window.addEventListener( 'scroll', noScrollFn );
//       }
//
//       function scrollFn() {
//         window.addEventListener( 'scroll', scrollHandler );
//       }
//
//       function canScroll() {
//         window.removeEventListener( 'scroll', noScrollFn );
//         scrollFn();
//       }
//
//       function scrollHandler() {
//         if( !didScroll ) {
//           didScroll = true;
//           setTimeout( function() { scrollPage(); }, 60 );
//         }
//       };
//
//       function scrollPage() {
//         scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
//         didScroll = false;
//       };
//
//       scrollFn();
//
//       new UIMorphingButton( document.querySelector( '.morph-button' ) );
//
//       [].slice.call( document.querySelectorAll( '.morph-button' ) ).forEach( function( bttn ) {
//         new UIMorphingButton( bttn, {
//           closeEl: '.icon-close',
//           closeEl: '.subscribe',
//           onBeforeOpen : function() {
//             // don't allow to scroll
//             noScroll();
//           },
//           onAfterOpen : function() {
//             // can scroll again
//             canScroll();
//           },
//           onBeforeClose : function() {
//             // don't allow to scroll
//             noScroll();
//           },
//           onAfterClose : function() {
//             // can scroll again
//             canScroll();
//           }
//         } );
//       } );
//
//       function checkEmail() {
//
//         var email = document.getElementById('email');
//         var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//
//         if (!filter.test(email.value)) {
//           alert('Please provide a valid email address');
//           email.focus;
//           return false;
//         } else {
//           return true;
//         }
//       };
//
//       [].slice.call( document.querySelectorAll( 'form button' ) ).forEach( function( bttn ) {
//         bttn.addEventListener( 'click', function( ev ) { ev.preventDefault();
//           if (checkEmail()) {
//             var emailText = $('#email').val();
//
//             $.getJSON('/demo?email='+emailText, function(success) {
//               // Do something on successful email sent
//               alert('Thank you. We will get in touch shortly.');
//             }).fail(function(error) {
//               // Do something on error
//               alert('This email already exists, try another email address');
//             });
//           }
//         } );
//       } );
//     }
//
//     // Init
//     subscribeButton();
//
// });
