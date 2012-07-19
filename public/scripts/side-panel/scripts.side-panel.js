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
(function (global) {
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

				$('section#control-panel').load('user/index/index', function() {
					$('section#side-panel').addClass('admin').children().find('section#login-display').hide();
				});
			} else {

			}

			//------------------------------
			// Document Ready
			//------------------------------
			$(document).ready(function () {

			});

			//------------------------------
			// Window Load
			//------------------------------
			$(window).load(function () {

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
			// Global SidePanel events
			//------------------------------

			// '.required' validation
			$('.required').live('focusout', function() {
				self.validateElement($(this).closest('section'), $(this));
			});

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
			// Forgot Login
			//------------------------------
			$('a#forgot-username').live('click', function() {
				self.recover_username();
			});

			$('a#forgot-password').live('click', function() {
				self.recover_password();
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

				//------------------------------
				// Profile Admin
				//------------------------------
				$('input[name=current-password]').live('focusout', function() {
					self.checkCurrentPassword(this);
				});

				//update button
				$('input.profile-update').live('click', function() {
					self.updateUserInfo(this);
				});
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
				'right' : -$(elem).width() // TODO: this is kind an ugly hack - find a better way to do this.
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
		 *
		 * @param elem
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

			if((user == '' || user == undefined) || (password == '' || password == undefined)) {
				$('form#login-form input').each(function() {
					//loop through each one to check the value
					if($(this).val() == '' || $(this).val() == undefined) {
						//set some reminder placeholder text
						$(this).addClass('failed-validation').attr('placeholder', 'forget something?');
					}
				});
			} else {
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
						//need to do this to accommodate for previously failed logins.
						$('section#login-failed, section#login-error').fadeOut(400);
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
							kts.show_loader('hide');
							//make it red
							$('form#login-form input[type="text"], form#login-form input[type="password"]').addClass('failed-validation').val('')
								.attr('placeholder', 'incorrect :(');
							//bring in login-failed section
							$('section#login-failed').fadeIn(600);
						}
					},
					error: function() {

					}
				});
			}
		},
		/**
		 * SIGNUP
		 */
		signup: function(elem) {
			var self = this;

			//if the elem is disabled
			if($(elem).is('.disabled')) {

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
					beforeSend: function() {
						kts.show_loader('show');
					},
					error: function(xhr) {
					},
					success: function(data) {
						kts.show_loader('hide');
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
		comparePasswords: function(elem, comparator, submit) {
			var self = this;

			//first check to see if it's empty
			if($(elem).val() !== '' && $(elem).val() !== undefined) {
				//Check the value of confirm password against
				if($(elem).val() !== $(comparator).val()) {
					//toggle classes
					$(elem).removeClass('passed-validation').addClass('failed-validation');
					$(comparator).removeClass('passed-validation').addClass('failed-validation');
					//prevent form from being submitted
					$(submit).addClass('disabled');
				} else {
					//toggle classes
					$(elem).addClass('passed-validation').removeClass('failed-validation');
					$(comparator).addClass('passed-validation').removeClass('failed-validation');
					//allow form to besubmitted
					$(submit).removeClass('disabled');
				}
			} else {
				//toggle classes
				$(elem).removeClass('passed-validation').addClass('failed-validation');
				$(comparator).removeClass('passed-validation').addClass('failed-validation');
				//prevent form from being submitted
				$(submit).addClass('disabled');
			}
		},
		/**
		 * VALIDATE LOGIN.
		 * @desc: validates form fields before sending them to the application
		 */
		validateElement: function(container, elem) {
			var self = this;

			if($(elem).val() !== '' && $(elem).val() !== undefined) {
				$(elem).removeClass('failed-validation').addClass('passed-validation');
			} else {
				$(elem).addClass('failed-validation').removeClass('passed-validation');
			}

			//final check required elements' form submission
			(function() {
				$(container).children().find('.required').each(function() {
					if($(this).val() == '' || $(this).val() == undefined) {
						$(container).children().find('input[type=button]').addClass('disabled')
					} else {
						$(container).children().find('input[type=button]').removeClass('disabled');
					}
				});
			})();
		},
		/**
		 * RECOVER USERNAME
		 */
		recover_username: function() {
			var self = this;

			$('section#login-display').fadeOut(600, function() {
				$('section#login-failed').fadeOut(600, function() {
					$('section#forgot-username').fadeIn(600, function() {
						$('input[name=forgot-username-submit]').click(function() {
							$.ajax({
								url: '/side-panel/recover-login',
								type: 'post',
								dataType: 'json',
								data : {
									type: 'username',
									email: $('input[name=forgot-username]').val()
								},
								beforeSend: function() {
									kts.show_loader('show');
								},
								success: function() {
									kts.show_loader('hide');
									$('section#forgot-username').fadeOut(600, function() {
										$('section#login-recovered').fadeIn(600);
									});
								}
							});
						});
					});
				});
			});
		},
		/**
		 * RECOVER PASSWORD
		 */
		recover_password: function() {
			var self = this;

			$('section#login-display').fadeOut(600, function() {
				$('section#login-failed').fadeOut(600, function() {
					$('section#forgot-password').fadeIn(600, function() {
						$('input[name=forgot-password-submit]').click(function() {
							$.ajax({
								url: '/side-panel/recover-login',
								type: 'post',
								dataType: 'json',
								data : {
									type: 'password',
									email: $('input[name=forgot-password]').val()
								},
								beforeSend: function() {
									kts.show_loader('show');
								},
								success: function() {
									kts.show_loader('hide');
									$('section#forgot-password').fadeOut(600, function() {
										$('section#login-recovered').fadeIn(600);
									});
								}
							});
						});
					});
				});
			});
		},
		/**
		 * CHECK CURRENT PASSWORD
		 *
		 */
		checkCurrentPassword: function(elem) {
			var self = this;

			$.ajax({
				url: '/side-panel/confirm-password',
				dataType: 'json',
				type: 'post',
				data: {
					password: $(elem).val(),
					name: $('input[name=credential]').val()
				},
				beforeSend: function() {
					kts.show_loader('show');
				},
				success: function(data) {
					kts.show_loader('hide');
					if(data == true) {
						$(elem).addClass('passed-validation').removeClass('failed-validation');
						$(elem).closest('section').children().find('.profile-update').removeClass('disabled');
					} else {
						$(elem).addClass('failed-validation').removeClass('passed-validation');
						$(elem).closest('section').children().find('.profile-update').addClass('disabled');
					}
				}
			});
		},
		/**
		 * UPDATE USER INFO
		 */
		updateUserInfo: function(elem) {
			var self = this;
			var container = $(elem).closest('section');

			//object to send to controller action
			method_data = {
				credential: $('input[name=credential]').val(),
				name: null,
				display_name: null,
				email_address: null,
				password: null,
				avatar_url: null,
				bio: null
			};

			if($(elem).is('.disabled') == false && $(container).children().find('.failed-validation').length <= 0) {
				//iterate through child input/text area elemnts
				$(container).children().find('input, textarea').not('input[type=button]').each(function() {
					var base = this;
					//element specification
					var name = $(this).attr('name');
					//Object corroboration
					if (method_data.hasOwnProperty(name)) {
						if($(base).val() != null && $(base).val() != undefined) {
							method_data[name] = $(base).val();
						}
					}
				});

				//make the ajax call
				$.ajax({
					url: '/side-panel/update-user-info',
					dataType: 'json',
					type: 'POST',
					data: method_data,
					beforeSend: function() {
						kts.show_loader('show');
						console.log(method_data)
						$('.passed-validation').removeClass('passed-validation');
					},
					error: function(xhr) {

					},
					success: function(data) {
						kts.show_loader('hide');
						if(data[0] == true) {

							$.each(data[1], function(key, val) {
								var updated = $(container).children().find('input, textarea');
								$(updated).each(function(idx, itm) {
									if($(this).attr('name') == key) {
										$(this).addClass('passed-validation');
										self.updateInterface(data[1])
									}
								});
							});
						}
					}
				});
			}
		},
		/**
		 * UPDATE INTERFACE
		 */
		updateInterface: function(obj) {
			var self = this;

			//loop through each object property to find correlating DOM elements
			$.each(obj, function(key, val) {
				var elem = $('section#control-panel').find('.'+key);
				if($(elem).is('img')) {
					if(val == '' || val == undefined || val == null) {
						$.ajax({
							url: '/side-panel/build-avatar-url',
							type: 'post',
							dataType: 'json',
							data: {
								email: $('section#control-panel input[name=email_address]').val()
							},
							success: function(data) {
								$(elem).attr('src', data);
								$('input[name=current-avatar-url]').val(data);
							}
						})
					} else {
						console.log(val);
						$(elem).attr('src', val);
						$('input[name=current-avatar-url]').val(val);
						$('input[name=avatar_url]').val('');
					}
				} else if($(elem).is('input')) {
					$(elem).val(val);
				} else {
					$(elem).html(val);
				}
			});
		}
	};

	//instantiate the object and push it to the window object
	var SP = new SidePanel();
	window.SP = SP;
})(window);
/************************************************************* END ***************************************************************************************/