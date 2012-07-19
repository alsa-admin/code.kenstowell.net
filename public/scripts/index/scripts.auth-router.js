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
	var Auth_Router = function () {
		var self = this;

		//instantiate object methods
		this.init();
	};

	/**
	 * OBJECT OBJECT METHODS
	 */
	Auth_Router.prototype = {
		/**
		 * INIT
		 */
		init:function () {
			var self = this;

			//load dynamic page elements
			this.buildPage();

			//events
			this.bindEvents();
		},
		/**
		 * BUILD PAGE
		 */
		buildPage:function () {
			/**
			 * Document Ready
			 */
			$(document).ready(function () {
				console.log(this);
			});

			/**
			 * Window Load
			 */
			$(window).load(function () {
				console.log(window);
			});
		},
		bindEvents: function() {
			var self = this;

			$('input[type=button]').live('click', function() {
				self.updatePassword();
			});
		},
		updatePassword: function() {
			$.ajax({
				url: '/side-panel/update-password',
				dataType: 'json',
				type: 'post',
				data: {
					token: $('input[name=token]').val(),
					id: $('input[name=id]').val(),
					new_password: $('input[name=new-password]').val()
				},
				beforeSend: function() {
					kts.show_loader('show');
				},
				success: function(data) {
					kts.show_loader('hide');
					if(data === true) {
						//TODO: obvisouly change this URL for production
						window.location.href = "http://code.kenstowell.local";
					}
				}
			});
		},
		/**
		 * COMPARE PASSWORDS
		 * @param elem
		 */
		comparePasswords: function(elem) {
			var self = this;

			//first check to see if it's empty
			if($(elem).val() !== '' && $(elem).val() !== undefined) {
				//Check the value of confirm password against
				if($(elem).val() !== $('input#sign-up-password').val()) {
					//toggle classes
					$('fieldset#sign-up-password-elements input').removeClass('passed-validation').addClass('failed-validation');
					//prevent form from being submitted
					$('input#sign-up-submit').addClass('disabled');
				} else {
					//toggle classes
					$('fieldset#sign-up-password-elements input').addClass('passed-validation').removeClass('failed-validation');
					//allow form to besubmitted
					$('input#sign-up-submit').removeClass('disabled');
				}
			} else {
				//toggle classes
				$('fieldset#sign-up-password-elements input').removeClass('passed-validation').addClass('failed-validation');
				//prevent form from being submitted
				$('input#sign-up-submit').addClass('disabled');
			}
		}
	};

	//instantiate the object and push it to the window object
	new Auth_Router();
})(window);


/************************************************************* END ***************************************************************************************/ 

