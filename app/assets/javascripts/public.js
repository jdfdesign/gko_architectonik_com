//= require jquery_ujs
//= require jquery.imagesloaded
//= require jquery.placeholder

// make console.log safe to use
window.console || (console = { 
  log: function() {}
});

jQuery(function($){
  'use strict';
  var THEME = window.THEME || {};

  // BOOTSTRAP FIX
  // ==================================================

  THEME.fix = function(){
    // fix for ie device_width bug 
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style");
      msViewportStyle.appendChild(
      document.createTextNode("@-ms-viewport{width:auto!important}"));
      document.getElementsByTagName("head")[0].
      appendChild(msViewportStyle);
    }
  };
  
  // RESPONSIVE VIDEO
  // ==================================================

  THEME.placeholder = function(){
    // enable placeholder fix for old browsers
    $('input, textarea').placeholder();
  };

  // CAROUSEL
  // ==================================================
  
  THEME.carousel = function() {
    
  	$('.carousel img').each(function() {
  		var imgSrc = $(this).attr('src');
  		$(this).parent().css({'background-image': 'url('+ imgSrc +')'});
  		$(this).remove();
  	});
    
    // Start the carousel if there is more than one image else hide controls
    $('.carousel').each(function(index) {
      var _self = $(this);
      if (_self.find('.item').length > 1) {
        _self.carousel({
          pause: "false",
          interval: 7000
        });
      	
      } else {
        _self.find('.carousel-control').each(function(index) {
          $(this).css({
            display: 'none'
          })
        })
        _self.find('.carousel-indicators').each(function(index) {
          $(this).css({
            display: 'none'
          })
        })
      }
    })
  };

  
  // INIT
  // ==================================================

  $(document).ready(function() {
    THEME.fix(); 
    THEME.placeholder();
    THEME.carousel();
    
    // LAZY LOAD
    // ==================================================
    
    // add a throbber to thumbnail image while loading
    $(".js-lazyload").find("img").hide().wrap('<div class="thumbnail-throbber" />');
    
    // Check image loaded to adjust thmbnails height
    $('.js-lazyload').imagesLoaded()
    .progress( function( instance, image ) {
      var result = image.isLoaded ? 'loaded' : 'broken';
      //console.log( 'image is ' + result + ' for ' + image.img.src );
      $(image.img).fadeTo(500, 1).unwrap();
    });

    // CONTACT FORM
    // ==================================================
    
    $('#contact-form').find('.alert').hide();
    
    $('#contact-form')
    .on("ajax:beforeSend", function(evt, xhr, settings) {
      
      $(this).find('.alert').hide();

      var error = false;

      var name = $('#inquiry_name').val();
      if (name == "" || name == " ") {
        error = true;
      }
      
      var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var email = $('#inquiry_email').val();
      if (email == "" || email == " ") {
        error = true;
      } else if (!checkEmail.test(email)) {
        error = true;
      }

      var message = $('#inquiry_message').val();
      if (message == "" || message == " ") {
        error = true;
      }
      console.log(error)
      if (error == true) {
        $('#error').fadeIn('slow');
        setTimeout(function() {
          $('#error').fadeOut('slow');
        }, 3000);
        return false;
      }
    })
    .on("ajax:error", function(evt, xhr, status, error) {
      
      $(this).find('.alert').hide();
      
      if (error == "timeout") {
        $('#timeout').fadeIn('slow');
        setTimeout(function() {
          $('#timeout').fadeOut('slow');
        }, 3000);
      } else {
        $('#state').fadeIn('slow');
        $("#state").html('The following error occured: ' + error + '');
        setTimeout(function() {
          $('#state').fadeOut('slow');
        }, 3000);
      }
  	})
  	.on("ajax:success", function(evt, data, status, xhr) {

      $(this).find('.alert').hide();
            
      $('#thanks').fadeIn('slow');
      setTimeout(function() {
        $('#thanks').fadeOut('slow');
      }, 3000);
      
      $('input, textarea').not(':input[type=submit]').val('');
    })

  });

}); 
