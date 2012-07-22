/* Javascript document
 *
 * @Author:	Ken Stowell
 * @Date: 5/28/12
 *
 * @Description: 
 */

/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS																																  *
 *********************************************************************************************************************************************************/

/************************************************************* END GLOBAL VARS ***************************************************************************/

/**********************************************************************************************************************************************************
 * KENSTOWELL.NET OBJECT																																  *
 **********************************************************************************************************************************************************
 * @desc: Main application scripting resource for kenstowell.net. This is script is ever present as it is directly injected into the DOM from the
 *		  bootstrap.
 *
 *
 */
(function() {

  /**
   * KENSTOWELL.NET CONSTRUCTOR
   */
  var Kenstowell_Net = function() {
		var self = this;

		//init object methods
		this.init();
  };

  /**
   * KENSTOWELL.NET PROTOTYPE OBJECT METHODS
   */
  Kenstowell_Net.prototype = {
		init: function() {

			//load styles
			this.loadStyles();

			//bind events
			this.bindEvents();

		},
		loadStyles: function() {
			/**
			* WINDOW LOAD
			*/
			$(window).load(function () {

				//------------------------------
				// Crosshairs Element
				//------------------------------
				$('div#crosshairs').crosshairs({
					width: '1100px',
					height: '800px',
					visible: false,
					show_in_url: true,
					alignment: 'center',
					offset: 0,
					pathing: 'fixed',
					content: {
						home: {
							trigger: $('a#main-nav-link-home'),
							target: $('section#home-wrapper')
						},
						services: {
							trigger: $('a#main-nav-link-services'),
							target: $('section#services-wrapper')
						},
						work: {
							trigger: $('a#main-nav-link-work'),
							target: $('section#work-wrapper')
						},
						blog: {
							trigger: $('a#main-nav-link-blog'),
							target: $('section#blog-wrapper')
						},
						tutorials: {
							trigger: $('a#main-nav-link-tutorials'),
							target: $('section#tutorials-wrapper')
						},
						code: {
							trigger: $('a#main-nav-link-code'),
							target: $('section#code-wrapper')
						},
						contact: {
							trigger: $('a#main-nav-link-contact'),
							target: $('section#contact-wrapper')
						}
					},
					wrapper: $('#page-wrapper')
				});
			});
			/**
			* DOCUMENT READY
			*/
			$(document).ready(function () {

				//load gutters
				$('.gutter').each(function() {
					$(this).height($(this).parent('section').height());
				});

				//set each pane's h & w
				$('.slide').css({
					'width' : $(window).width(),
					'height' : $(window).height()
				});

				//------------------------------
				// epicHelp Elements
				//------------------------------
				$('section#avatar-url-help').epicHelp({
					trigger : $('span.avatar')
				});
			});
		},
		/**
		 * BIND EVENTS
		 */
		bindEvents: function() {
			var self = this;
		},
		/**
		 * SHOW LOADER
		 * @param action
		 */
		show_loader: function(action) {
			var self = this;

			if(action == 'show') {
				$('section#loader').fadeIn(600, function() {

				});
			} else {
				$('section#loader').fadeOut(400, function() {

				});
			}
		}
	};

	//Instantiate Object
	var kts = new Kenstowell_Net();
	window.kts = kts;
})(jQuery);

/************************************************************* END ***************************************************************************************/ 

