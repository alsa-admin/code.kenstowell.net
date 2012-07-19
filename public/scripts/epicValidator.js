/* Javascript document
 *
 * @Author:	Ken Stowell
 * @Date:		
 *
 * @Description: 
 */

/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS																																																																	*
 *********************************************************************************************************************************************************/

/**********************************************************************************************************************************************************
 *	EPIC VALIDATOR jQUERY PLUGIN
 **********************************************************************************************************************************************************
 *
 * Planning:
 * 		General requirements:
 * 			1. be able to automatically detect input type.
 * 			2. have a set of options for each input type.
 * 			3. allow the user to add their own functions - or at least
 * 				 create a custom wrapper for them throw their own functionality at.
 * 			4. Allow for custom return values.
 * 		  5. Should be able to call on a group of input elements - like in a form
 * 		  	 and specfiy options for each type - so the user would only have to
 * 		  	 instantiate this once
 *
 *
 *
 *
 */
(function ($) {

	//Instantiate as a jQuery plugin and create a new Crosshairs object
	jQuery.fn.epicValidator = function(options) {
		return this.each(function() {
			new epicValidator(this, options);
		});
	};
	
	/**
	 * epicValidator CONSTRUCTOR
	 */
	var epicValidator = function (ev, options) {
		var self = this;

		this.$ev = $(ev);
		this.options = $.extend({}, epicValidator.defaults, options);

		//instantiate object methods
		this.init();
	};

	/**
	 * EPIC VALIDATOR DEFAULTS
	 */
	epicValidator.defaults = {
		generic: {
			onFocusOut: function() {

			},
			onFocusIn: function() {

			},
			onEnterKey: function() {

			}
		},
		text : {
			required: true,
			triggers: {
				keypress: false,
				focusOut: true,
				focusIn: false,
				pasteIn: false
			},
			onPassedValidation: function() {

			},
			onFailedValidation: function() {

			}
		},
		checkbox : {

		},
		select: {

		},
		email: {

		},
		password: {

		},
		button: {

		},
		submit: {

		}
	};

	/**
	 * epicValidator epicValidator METHODS
	 */
	epicValidator.prototype = {
		/**
		 * INIT
		 */
		init:function () {
			var self = this;

			//load dynamic page elements
			this.buildPage();
		},
		/**
		 * BUILD PAGE
		 */
		buildPage:function () {
			/**
			 * Document Ready
			 */
			$(document).ready(function () {

			});

			/**
			 * Window Load
			 */
			$(window).load(function () {

			});
		}
	};

	//instantiate the object and push it to the window object
	var Obj = new epicValidator();
	window.O = window.Obj = Obj;
})(jQuery);


/************************************************************* END ***************************************************************************************/ 

