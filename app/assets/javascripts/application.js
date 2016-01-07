// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//
//
//= require jquery
//= require jquery_ujs

//= require jquery.turbolinks
//= require jquery.raty
//= require ratyrate
//
//  VENDOR PACKAGES
//= require jquery-comments/js/jquery-comments.min.js
//= require leaflet-google
//= require_tree .

$(document).on("page:change", function() {
  // $('#comments-container').comments({
  //     profilePictureURL: 'https://app.viima.com/static/media/user_profiles/user-icon.png',
  //     getComments: function(success, error) {
  //         var commentsArray = [{
  //             id: 1,
  //             created: '2015-10-01',
  //             content: 'Lorem ipsum dolort sit amet',
  //             fullname: 'Simon Powell',
  //             profile_picture_url: 'https://app.viima.com/static/media/user_profiles/user-icon.png',
  //             upvote_count: 2,
  //             user_has_upvoted: false
  //         }];
  //         success(commentsArray);
  //     }
  // });



});
