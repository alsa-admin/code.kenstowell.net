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
 *	OBJECT
 **********************************************************************************************************************************************************
 *
 * @desc: Main scripting resources for audio page types
 *
 *
 *
 *
 */
(function (global) {
	/**
	 * OBJECT CONSTRUCTOR
	 */
	var _Admin = function () {
		var self = this;

		//instantiate object methods
		this.init();
	};

	/**
	 * _Admin OBJECT METHODS
	 */
	_Admin.prototype = {
		/**
		 * INIT
		 */
		init:function () {
			var self = this;

			//load dynamic page elements
			this.buildPage();

			//Bind events
			this.bindEvents();
		},
		/**
		 * BUILD PAGE
		 */
		buildPage:function () {
			var self = this;
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
		},
		/**
		 * BIND EVENTS
		 */
		bindEvents: function() {
			var self = this;

			//current password focus out
			$('input[name=current-password]').live('focusout', function() {
				SP.checkCurrentPassword(this);
			});

			//update button
			$('input[type=button]').live('click', function() {
				SP.updateUserInfo(this);
			});

			$('input[name=password-confirmation]').live('keyup', function() {
				SP.comparePasswords($('.update-password'), $(this), $(this).closest('section').children().find('.profile-update'));
			});
		}
	};
	new _Admin();
})(window);

/************************************************************* END ***************************************************************************************/ 

