//= require jquery.equalheight
//= require jquery.imagesloaded
//= require jquery.placeholder
//= require jquery.mixitup
//= require jquery.fitvids
//= require jquery.sharrre

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

  // NAVIGATION
  // ==================================================
  THEME.navigation = function(){
  	$('.navbar li').bind('click',function(event){
        var that = $(this),
            anchor = that.find('a');
	    
  	    //$('.navbar li').removeClass('active');
  	    //that.addClass('active');
	
  	    $('html, body').stop().animate({
          scrollTop: $(anchor.attr('href')).offset().top-50
  	    }, 1500,'easeInOutExpo');
	    
  	    /* If Mobile hide menu on select */
  	    //if(jQuery(window).width()<=767){	
  		  //  jQuery("#top-navigation ul").slideUp(500);
  			//jQuery('#menu-mobile').removeClass('active');
  	   // }
	    
  	   // event.preventDefault();
  	});
  }
  
  // SCROLLING ACTIONS
  // ==================================================

  THEME.scrolling = function(){
  	var didScroll = false,
        docElem = document.documentElement,
        $navbar = $('#main-menu'),
        $arrow = $('#go-up-arrow'),
        offset = 0;

  	$arrow.click(function(e) {
  		$('body, html').animate({ scrollTop: "0" }, 1500, 'easeOutExpo' );
  		e.preventDefault();
  	});

  	$(window).scroll(function() {
  		didScroll = true;
  	});

  	setInterval(function() {
  		if( didScroll ) {
  			didScroll = false;
        offset = window.pageYOffset || docElem.scrollTop;

  			if( offset > 1000 ) {
  				$arrow.css('display', 'block');
  			} else {
  				$arrow.css('display', 'none');
  			}
        
        if ( offset >= 300 ) {
          console.log(">= 300")
          $navbar.addClass( 'navbar-shrink' );
          $(".navbar-brand").css("font-size", "16px");
        }
        else {
          $navbar.removeClass( 'navbar-shrink' );
          $(".navbar-brand").css("font-size", "24px");
        }
  		}
  	}, 250);
  };

  // RESPONSIVE VIDEO
  // ==================================================

  THEME.video = function(){
  	$('.videoWrapper, .video-embed').fitVids();
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
  
  // EQUAL HEIGHT FOR COLUMNS
  // ==================================================
  
  THEME.equalHeight = function() {
    $('.js-equalHeight').find('article').uniformHeight();
  };
  
  // ON RESIZE
  // ==================================================

  THEME.resizing = function(){
    var navbarHeight = $(".navbar").height();
    $('#wrapper').css({'margin-top': navbarHeight});
    $('.carousel-fullscreen').css({
      'height': $(window).outerHeight() - navbarHeight});
    //THEME.equalHeight();
  };
  
  // INIT
  // ==================================================

  $(document).ready(function() {
    //Portfolio.init();
    THEME.fix(); 
    THEME.scrolling();
    THEME.placeholder();
    THEME.video();
    THEME.carousel();
    THEME.navigation();
    
    // add a throbber to thumbnail image while loading
    $(".js-lazyload").find("img").hide().wrap('<div class="thumbnail-throbber" />');
    
    // Check image loaded to adjust thmbnails height
    $('.js-lazyload').imagesLoaded()
    .always( function( instance ) {
      console.log('all images loaded');
      //THEME.equalHeight();
    })
    .done( function( instance ) {
      console.log('all images successfully loaded');
      
    })
    .fail( function() {
      console.log('all images loaded, at least one is broken');
    })
    .progress( function( instance, image ) {
      var result = image.isLoaded ? 'loaded' : 'broken';
      console.log( 'image is ' + result + ' for ' + image.img.src );
      $(image.img).fadeTo(500, 1).unwrap();
    });
    
    ///////////////////////////////////////////////////////
    // Creates the filter menu for mobile version
    $('#work-categories').addClass("hidden-xs").each(function() {
      var select = $(document.createElement('select')).insertBefore($(this).parent()).addClass('visible-xs');;
      $('> li', this).each(function() {
        $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html()).addClass($(this).attr('data-filter'));
      });
    });
    
    ///////////////////////////////////////////////////////
    // Enable categories filter for select in mobile version
    //$('select').on('change', function() {
    //  Portfolio.porfolioContainer.mixitup('filter', jQuery(this).find('option:selected').attr('class'));
    //});
    
    $('.thumbnails').mixItUp({
    	callbacks: {
    		onMixEnd: function(state){
    			console.log(state)
    		}	
    	}
    });

    ///////////////////////////////////////////////////////
    // navbar
    $('.navbar-collapse').on('hidden.bs.collapse', function () {
      console.log("hidden.bs.collapse " + $(this).height());
      $(this).css("height","100%");
    }).on('hide.bs.collapse', function () {
      console.log("hide.bs.collapse");
      $(this).css("height","100%");
    }).on('show.bs.collapse', function () {
      console.log("show.bs.collapse " + $(this).height());
      $(this).css("height","100%");
    }).on('shown.bs.collapse', function () {
      console.log("shown.bs.collapse " + $(this).height());
      $(this).css("height","100%");
    })


    $('.js-touchstart').on('touchstart', function(e){
      $(this).addClass('.active');
    }).on('touchend', function(e){
      $(this).removeClass('.active');
    });
    
    ///////////////////////////////////////////////////////
    // share
    /*$('#twitter').sharrre({
      share: {
        twitter: true
      },
      enableHover: false,
      enableTracking: true,
      buttons: { twitter: {via: '_JulienH'}},
      click: function(api, options){
        api.simulateClick();
        api.openPopup('twitter');
      }
    });
    $('#facebook').sharrre({
      share: {
        facebook: true
      },
      enableHover: false,
      enableTracking: true,
      click: function(api, options){
        api.simulateClick();
        api.openPopup('facebook');
      }
    });
    $('#googleplus').sharrre({
      share: {
        googlePlus: true
      },
      enableHover: false,
      enableTracking: true,
      click: function(api, options){
        api.simulateClick();
        api.openPopup('googlePlus');
      }
    });*/
    ///////////////////////////////////////////////////////
    // Handle Window Resizing
    $(window).resize(function() {
      THEME.resizing();
    })
    $( window ).trigger('resize');
  });

}); 
