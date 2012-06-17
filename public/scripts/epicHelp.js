/* Javascript document
 *
 * @Author:	Ken Stowell
 * @Date:		
 *
 * @Description: tooltip modal plugin
 *
 * @Usage: following the following markup structure is highly recommended
  *
  * 				<section> //wrapper
  *						<header> //epic help header
  *						</header>
  *						<section> //epic help body
  * 					</section>
  *					</section>
  *
  *					The plugin will inject all the necessary class names it needs to maintain styling.
  *					The plugin is free of any indentifying dependencies. This means however that you have to
  *					specify what element the plugin gets called on. For example, to invoke the plugin:
  *
  *					<script>
  *						(function(){
  *						 $('.whatever-i-called-the-element-i-want-to-be-an-epic-help-popup').epicHelp();
  *						})();
  *					</script>
  *
  *
 */

/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS																																																																	*
 *********************************************************************************************************************************************************/

/**********************************************************************************************************************************************************
 *	EPIC HELP
 **********************************************************************************************************************************************************
 *
 * @desc: Tooltip - descriptive text popup plugin.
 *
 *
 *
 *
 */
(function () {

	//Instantiate as a jQuery plugin and create a new Crosshairs object
	jQuery.fn.epicHelp = function(options) {
		return this.each(function() {
			new epicHelp(this, options);
		});
	};

	/**
	 * EPIC HELP CONSTRUCTOR
	 */
	var epicHelp = function (elem, options) {
		var self = this;

		this.$eh = $(elem); //jQuery object of the epicHelp content
		this.options = $.extend({}, epicHelp.defaults, options); //combine plugin defaults with user specs

		//shorthand options
		this.$trgr = this.trigger = this.options.trigger;
		this.w = this.width = this.options.width;
		this.h = this.height = this.options.height;
		this.hc = this.header_color = this.options.header_color;
		this.bc = this.body_color = this.options.body_color;
		this.ov_close = this.close_on_overlay = this.options.close_on_overlay_click;
		this.ov = this.show_overlay = this.options.show_overlay;
		this.ov_clr = this.overlay_color = this.options.overlay_color;
		this.ov_o = this.overlay_opacity = this.options.overlay_opacity;

		//instantiate object methods
		this.init();
	};

	/**
	 * EPIC HELP DEFAULT OPTIONS
	 * @desc: default options for style and behavior
	 */
	epicHelp.defaults = {
		width: '350px', //box width
		height: '250px', //box height
		header_color: 'blue', //header color
		body_color: 'white', //content color
		overlay_color: '#000', //default color for the overlay
		overlay_opacity: .70 //how transparent the overlay is
	};


	/**
	 * EPIC HELP OBJECT METHODS
	 */
	epicHelp.prototype = {
		/**
		 * INIT
		 */
		init:function () {
			var self = this;

			//load dynamic page elements
			this.bindEvents();

			//Build the modal
			this.buildModal();
		},
		/**
		 * BUILD MODAL
		 * @desc: before tieing the modal to a specific event - contruct it's appearance
		 */
		buildModal: function() {
			var self = this;

			//Inject necessry class names for the stles to be valid
			this.$eh.addClass('epic-help-wrapper');

			//inject close button
			this.$eh.children('header').append('<span class="close"></span>');

			//set position
			this.$eh.css({
				'top' : ($(window).height() - this.$eh.height()) /2,
				'left': ($(window).width() - this.$eh.width()) /2
			});
		},
		/**
		 * BIND EVENTS
		 * @desc: general epicHelp event management
		 */
		bindEvents: function() {
			var self = this;

			//Event to open the modal
			this.$trgr.live('click', function(e) {
				self.open();
			});

			//Events to close the modal
			$('span.close, #overlay').live('click', function(e) {
				self.close();
			});
		},
		/**
		 * OPEN
		 * @desc: mechanism for opening the modal and related components
		 */
		open: function() {
			var self = this;

			//first show the overlay
			$('#overlay').stop().fadeIn('600', function() {
				self.$eh.stop().fadeIn(900);
			});
		},
		/**
		 * CLOSE
		 * @desc: mechanism for closing the modal and related components
		 */
		close: function() {
			var self = this;

			//kill the overlary and modal
			self.$eh.stop().fadeOut('600', function() {
				$('#overlay').stop().fadeOut(900);
			});
		}
	};
})();


/************************************************************* END ***************************************************************************************/ 

