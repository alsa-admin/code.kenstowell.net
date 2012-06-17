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
var global_id; //session value placeholder
/**********************************************************************************************************************************************************
 *	SIDE PANEL
 **********************************************************************************************************************************************************
 *
 * @desc: Main scripting resources for the kenstowell.net SidePanel
 *
 *
 *
 */
(function () {
	/**
	 * OBJECT CONSTRUCTOR
	 */
	var SidePanel = function () {
		var self = this;

		//instantiate object methods
		this.init();
	};

	/**
	 * OBJECT OBJECT METHODS
	 */
	SidePanel.prototype = {
		/**
		 * INIT
		 */
		init: function () {
			var self = this;

			//bind events
			this.bindEvents();

			//get the user identity
			this.checkIdentity();
		},
		/**
		 * BUILD PAGE
		 */
		buildPage: function (id) {
			var self = this;

			//-------------------------------------------------------------------
			// Load side panel content based on auth type before the page loads
			//-------------------------------------------------------------------
			//admin content
			if(id === 'admin') {
				$('section#control-panel').load('admin/index/index', function() {
					$('section#side-panel').addClass('admin').children().find('section#login-display').hide();
				});
			}
			//user content
			else if(id === 'user') {
				console.log('hai again')
				$('section#control-panel').load('user/index/index', function() {
					$('section#side-panel').addClass('admin').children().find('section#login-display').hide();
				});
			} else {
				console.log('no id', this);
			}

			//------------------------------
			// Document Ready
			//------------------------------
			$(document).ready(function () {
				console.log($('section#side-panel').width());
			});

			//------------------------------
			// Window Load
			//------------------------------
			$(window).load(function () {
				console.log($('section#side-panel').width());
			});
		},
		/**
		 * BIND EVENTS
		 * @desc: General Event Managment for the SidePanel object.
		 *
		 */
		bindEvents: function() {
			var self = this;

			//------------------------------
			// side panel display mechanism
			//------------------------------
			$('section#side-panel-toggle').live('click', function(e) {
				var elem = $(this).parent('section#side-panel');
				//check and see if the side panel is already shown
				if($('section#side-panel').is('.expanded')) {
					self.disposeContent(elem);
				} else {
					self.loadContent(elem);
				}
			});

			//------------------------------
			// login
			//------------------------------
			$('#login-submit').live('click', function(e) {
				if($(this).is('.disabled') == false) {
					self.login($('input#login-name').val(), $('input#login-password').val());
				} else {
					$('form#login-form input').each(function() {
						if($(this).val() == '' || $(this).val() == undefined) {
							$(this).addClass('failed-validation');
						}
					});
				}
			});

			//simulate hitting the enter button if one of the form feilds has focus and you hit enter
			$('form#login-form input').live('keypress', function(e) {
				if (e.charCode == 13 || e.keyCode == 13) {
					if($(this).is('.disabled') == false) {
						self.login($('input#login-name').val(), $('input#login-password').val());
					} else {
						$('form#login-form input').each(function() {
							if($(this).val() == '' || $(this).val() == undefined) {
								$(this).addClass('failed-validation');
							}
						});
					}
				}
			});

			//pre-validate info
			$('form#login-form input[type="text"], form#login-form input[type="password"]').live('focusout', function() {
				self.validateLogin(this);
			});


			//------------------------------
			// logout
			//------------------------------
			$('section#logout-display a').live('click', function() {
				self.logout();
			});

			//------------------------------
			// Signup
			//------------------------------
			$('input#sign-up-submit').live('click', function(e) {
				self.signup(this);
			});

			//username availability check
			$('input#sign-up-name').live('focusout', function() {
				self.check_availability(this);
			});

			//password-congruity check
			$('input#sign-up-confirm-password').live('focusout', function() {
				self.comparePasswords(this);
			});

			//back to login
			$('section#back-to-login').live('click', function(e) {
				e.preventDefault();
				//fade out signup
				$('section#sign-up-display').fadeOut(600, function() {
					//fade in login content after fadeout conplete
					$('section#login-display').fadeIn(600);
				});
			});

			//generic required field check
			$('.required').live('focusout', function() {
				if($(this).val() == '' || $(this).val() == undefined) {
					//make it red
					$(this).addClass('failed-validation').removeClass('passed-validation');
					//prevent form from being submitted
					$('input#sign-up-submit').addClass('disabled');
				} else {
					//make it red
					$(this).removeClass('failed-validation').addClass('passed-validation');
					//now check and see if there are any other required with empty values
					if($('.required').val() == '' || $('.required').val() == undefined) {
						//prevent form from being submitted
						$('input#sign-up-submit').addClass('disabled');
					} else {
						//prevent form from being submitted
						$('input#sign-up-submit').removeClass('disabled');
					}
				}
			});

			//------------------------------
			// Register
			//------------------------------
			$('section#register a').live('click', function(e) {
				//disable browser reresh
				e.preventDefault();
				//fade out login
				$('section#login-display').fadeOut(600, function() {
					//fade in sign up content after fadeout conplete
					$('section#sign-up-display, section#back-to-login').fadeIn(600);
				});
			});

			//------------------------------
			// Not-a-bot
			//------------------------------
			$('select#sign-up-bacon').live('change', function(e) {
				switch($(this).children('option:selected').val()) {
					case 'love':
						$('input#sign-up-submit').val('Admirable, sign me up!').css({
							'color' : '#98A3A8',
							'height' : '20px'
						}).removeClass('disabled');
						break;
					case 'like':
						$('input#sign-up-submit').val('As you should, good sir. Sign on up.').css({
							'color' : '#98A3A8',
							'height' : '40px'
						});
						break;
					case 'breathe':
						$('input#sign-up-submit').val('Do me the honors of signing up, fine sir.').css({
							'color' : '#98A3A8',
							'height' : '40px'
						}).removeClass('disabled');
						break;
					case 'bathe':
						$('input#sign-up-submit').val('The feeling is mutual, friend. I wo-uld be honored by your associa-tion.').css({
							'color' : '#98A3A8',
							'height' : '40px'
						}).removeClass('disabled');
						break;
					case 'dont-care-for':
						$('input#sign-up-submit').val("I'm not sure I understand.").css({
							'color' : 'yellow',
							'height' : '20px'
						}).addClass('disabled');
						break;
					case 'dont-like':
						$('input#sign-up-submit').val("I don't associate with the likes of your kind.").css({
							'color' : 'red',
							'height' : '40px'
						}).addClass('disabled');
						break;
				}
			});

		},
		/**
		 * CHECK IDENTITY
		 */
		checkIdentity: function() {
			var self = this;
			var response;

			//call the server action
			$.ajax({
				url: '/index/check-identity',
				type: 'POST',
				dataType: 'json',
				error: function(xhr) {

				},
				success: function(data) {
					self.buildPage(data);
					global_id = data;
				},
				complete: function() {
				}
			});
		},
		/**
		 * LOAD CONTENT
		 * @desc: The purpose of this object method is to
		 * 				load the appropriate side panel content based on
		 * 			  supplied parameters.
		 */
		loadContent: function(elem) {
			var self = this;
			//var speed = (global_id == 'admin' || global_id == 'user')? 1700 : 400;

			//Fix for non existent 'right' value
			$(elem).css({
				'right' : -$(elem).width()
			});

			//Open the SidePanel
			$(elem).stop().animate({
				'right' : 0
			}, 400, function() {
				if(global_id == 'admin' || global_id == 'user') {
					$('section#control-panel, section#logout-display').delay(400).fadeIn(900)
				} else {
					//do something here...maybe
				}
				//add expanded class
				$(this).addClass('expanded');
				//change direction of arror
				$(this).children().find('#arrow').addClass('right-arrow').removeClass('left-arrow');
			});
		},
		/**
		 * DISPOSE CONTENT
		 * @desc: This collapses the side panel and clears all markup.
		 * 				if an action is provided, then proceed accordingly.
		 * @param action
		 */
		disposeContent: function(elem) {
			var self = this;

			if(global_id == 'admin' || global_id == 'user') {
				$('section#control-panel, section#logout-display').fadeOut(300, function() {
					collapse();
				});
			} else {
				collapse();
			}

			function collapse() {
				$('section#side-panel').stop().animate({
					'right' : -$(elem).width()
				}, 800, function() {
					//remove expanded class
					$(this).removeClass('expanded');
					//change direction of arror
					$(this).children().find('#arrow').removeClass('right-arrow').addClass('left-arrow');
				});
			}
		},
		/**
		 * LOGOUT
		 */
		logout: function() {
			var self = this;

			$.ajax({
				url: '/side-panel/logout',
				type: 'get',
				dataType: 'json',
				beforeSend: function() {
					kts.show_loader('show');
				},
				error: function(xhr) {
					console.log(xhr)
				},
				success: function(data) {
					kts.show_loader('hide');
					if (data === true) {
						$('section#logout-display, section#control-panel').fadeOut(400, function() {
								$('section#side-panel').animate({
									'width' : '250px'
								}, 1000, function() {
									//re-load login panel
									$('section#login-display').fadeIn(900, function() {
										//reset global id
										global_id = '';
										//clear cotnrol panel DOM info.
										$('section#control-panel').children().remove();
									});
								});
						});
					}
				}
			});
		},
		/**
		 * LOGIN
		 * @desc: Logs in the user.
		 * @params: user, password
		 */
		login: function(user, password) {
			var self = this;

			console.log(user, password);
			//call the login acition
			$.ajax({
				url: '/side-panel/login',
				type: 'POST',
				dataType: 'json',
				data: {
					user: user,
					password: password
				},
				beforeSend: function() {
					kts.show_loader('show');
				},
				success: function(data) {
						if(data === 'admin'){
							$('section#login-display, section#login-failed, section#login-error').fadeOut(600, function() {
								//load admin content
								$('section#control-panel').load('admin/index/index', function() {
										kts.show_loader('hide');
										$(this).parent().parent().animate({
											'width' : '90%'
										}, 1500, function() {
											$('section#control-panel, section#logout-display').fadeIn(800, function() {
												//set global id to admin
												global_id = 'admin';
											});
										});
								});
							});
						} else if(data === 'user') {
							$('section#login-display, section#login-failed, section#login-error').fadeOut(600, function() {
								$('section#control-panel').load('user/index/index').fadeIn(800, function() {
									kts.show_loader('hide');
									$(this).parent().parent().stop().animate({
										'width' : '90%'
									}, 1500, function() {
										$('section#control-panel, section#logout-display').fadeIn(800, function() {
											//set global id to admin
											global_id = 'user';
										});
									});
								});
							});
						} else {
							//make it red
							$('form#login-form input[type="text"], form#login-form input[type="password"]').addClass('failed-validation');
							//bring in login-failed section
							$('section#login-failed').fadeIn(600);
						}
				},
				error: function() {

				}
			});
		},
		/**
		 * SIGNUP
		 */
		signup: function(elem) {
			var self = this;

			//if the elem is disabled
			if($(elem).is('.disabled')) {
				//toggle validation on all that are required but not filled
				$('.required').each(function() {
					if($(this).val() == '' || $(this).val() == undefined) {
						$(this).addClass('failed-validation');
					}
				});
			} else {
				//add user
				$.ajax({
					url: '/side-panel/sign-up',
					type: 'post',
					dataType: 'json',
					data :{
						username: $('input[name="name"]').val(),
						display_name: $('input[name="display-name"]').val(),
						email: $('input[name="email-address"]').val(),
						avatar: $('input[name="avatar"]').val(),
						password: $('input[name="password"]').val(),
						reason: $('input[name="sign-up-reason"]').val(),
						bio: $('textarea[name="sign-up-bio"]').val()
					},
					error: function(xhr) {
						console.log(xhr);
					},
					success: function(data) {
						$('section#sign-up-display').fadeOut(600, function() {
							//if the user was successfulyl added: log them in
							self.login($('input[name="name"]').val(), $('input[name="password"]').val());
							$(this).remove();
						});
					}
				});
			}
		},
		/**
		 * CHECK AVAILABILITY
		 * @param elem
		 */
		check_availability: function(elem) {
			var self = this;
			if($(elem).val() == '' || $(elem).val() == undefined) {
				$(elem).removeAttr('style');
				$('input#sign-up-submit').addClass('disabled');
			} else {
				$.ajax({
					url: '/side-panel/check-availability',
					type: 'post',
					dataType: 'json',
					data: {
						username: $(elem).val()
					},
					beforeSend: function() {
						kts.show_loader('show');
					},
					error: function(xhr) {

					},
					success: function(data) {
						var place_val  = elem.value;
						kts.show_loader('hide');
						if(data == true) {
							//change border-color
							$(elem).removeClass('failed-validation').addClass('passed-validation');
							//allow form to besubmitted
							$('input#sign-up-submit').removeClass('disabled');
						} else {
							//change border-color to red
							$(elem).removeClass('passed-validation').addClass('failed-validation').val('').attr('placeholder', place_val + ' is unavailable');
							//prevent form from being submitted
							$('input#sign-up-submit').addClass('disabled');
						}
					}
				});
			}
		},
		/**
		 * COMPARE PASSWORDS
		 * @param elem
		 */
		comparePasswords: function(elem) {
			var self = this;

			//Check the value of confirm password against
			if($(elem).val() !== $('input#sign-up-password').val() || $(elem).val() == undefined ) {
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
		},
		/**
		 * VALIDATE LOGIN.
		 * @desc: validates form fields before sending them to the application
		 */
		validateLogin: function(elem) {
			var self = this;

			if($(elem).val() !== '' && $(elem).val() !== undefined) {
				$(elem).removeClass('failed-validation').addClass('passed-validation');
				//enable login
				$('input#login-submit').removeClass('disabled');
			} else {
				$(elem).addClass('failed-validation').removeClass('passed-validation');
				//enable login
				$('input#login-submit').addClass('disabled');
			}
		}
	};

	//instantiate the object and push it to the window object
	new SidePanel();
})();


/************************************************************* END ***************************************************************************************/ 

