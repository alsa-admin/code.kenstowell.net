/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS                                                                                                                                                                                                                                                                    *
 *********************************************************************************************************************************************************/

/************************************************************* END GLOBAL VARS ***************************************************************************/

/**********************************************************************************************************************************************************
 * INDEX Obect                                                                                                                                                                                                                                                                              *
 **********************************************************************************************************************************************************
 *
 *
 *
 *
 *
 *
 */
(function() {
  var Index = function() {
	var self = this;

	//start the prototype
	this.init();
  };

  /**
   * INDEX PROTOTYPE
   */
  Index.prototype = {
	/**
	 * INIT
	 */
	init: function() {
	  var self = this;

	  //load styles
	  this.loadStyles();

	  //manage events
	  this.bindEvents();
	},
	/**
	 * LOAD STYLES
	 */
	loadStyles: function() {
	  var self = this;

	  /**
	   * WINDOW LOAD
	   */
	  $(window).load(function () {
			//position the hover-images
			$('.image-on-hover').bind('mouseenter', function(e) {
				if($(this).is('#interwebs')) {
				$('#interwebs-img').css({
					'visibility': 'visible'
				});
				}

				if($(this).is('#hostbaby')) {
				$('#hostbaby-img').css({
					'visibility': 'visible'
				});
				}

				if($(this).is('#enthusiasm')) {
				$('#enthusiasm-img').css({
					'visibility': 'visible'
				});
				}
			}).bind('mouseleave', function(e) {
				$('.pop-up-image').css({
					'visibility': 'hidden'
				})
			});
	  });

	  /**
	   * DOCUMENT READY
	   */
	  $(document).ready(function () {
			//position the main intro block
			$('section#home').css({
				'margin-top' : ($(window).height() - $('section#home').height()) /2 -32
			});
	  });
	},
	/**
	 * BIND EVENTS
	 */
	bindEvents: function() {
	  var self = this;
	}
  };
  //instantiate object
  new Index();
})(jQuery);

/************************************************************* END ***************************************************************************************/

