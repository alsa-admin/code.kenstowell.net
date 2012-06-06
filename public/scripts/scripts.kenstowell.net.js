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

			//check for login
			this.checkIdentity();

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
				//set up the crosshairs plugin
				$('div#crosshairs').crosshairs({
					width: '1100px',
					height: '800px',
					visible: false,
					show_in_url: true,
					alignment: 'center',
					offset: 0,
					pathing: 'fixed',
					speed: 'normal',
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
					}
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

				//side panel stylings
				$('section#side-panel').css({
					'height' : $(window).height()
				});
			});
		},
		/**
		 * BIND EVENTS
		 */
		bindEvents: function() {
			var self = this;

			//side panel display mechanism
			$('section#side-panel-toggle').live('click', function(e) {
				var elem = this;

				//check and see if the side panel is already shown
				if($('section#side-panel').is('.expanded')) {
					//close it
					$('section#side-panel').stop().animate({
						'right' : -$(this).parent().width()
					}, 400, function() {
						//remove expanded class
						$('section#side-panel').removeClass('expanded');
						//change direction of arror
						$(elem).children('#arrow').removeClass('right-arrow').addClass('left-arrow');
					});
				} else {
					//if not expanded - expand it
					$('section#side-panel').stop().animate({
						'right' : 0
					}, 800, function() {
						//add expanded flag
						$('section#side-panel').addClass('expanded');
						//change direction of arror
						$(elem).children('#arrow').removeClass('left-arrow').addClass('right-arrow');
					});
				}
			});

			//logout
			$('section#logout-display a').live('click', function() {
				$.ajax({
					url: '/side-panel/logout',
					type: 'post',
					dataType: 'json',
					error: function(xhr) {

					},
					success: function(data) {

					}
				});
			});
		},
		/**
		 * CHECK IDENTITY
		 */
		checkIdentity: function() {
			var self = this;

			//call the server action
			$.ajax({
				url: '/index/check-identity',
				type: 'POST',
				dataType: 'json',
				error: function(xhr) {
					console.log('error: ',xhr);
				},
				success: function(data) {
					console.log(data);
					self.sidePanel(data);
				}
			});
		},
		/**
		 * SIDE PANEL
		 * @desc side panel processing. Handles server-side communication and nested events
		 */
		sidePanel: function(id) {
			var self = this;

			//admin content
			if(id === 'admin') {
				$('section#control-panel').load('admin/index/index', function() {
					$(this).show().parent().css({
						'width' : '70%',
						'right' : '-70%'
					});
				});
			}
				//user content
				else if(id === 'user') {
				console.log('hai again')
			}
				// not logged in
				else {
				console.log('no id');
				//set it's styles
				$(this).show().parent().css({
					'width' : '20%',
					'right' : '-20%'
				});

				//if not logged in - load the login stuff
				$('section#side-panel section#login-display').show();

				//Login
				$('#login-submit').live('click', function(e) {
					//call the login acition
					$.ajax({
						url: '/side-panel/login',
						type: 'POST',
						dataType: 'json',
						data: {
							user: $('input#login-name').val(),
							password: $('input#login-password').val()
						},
						success: function(data) {
							$('section#login-display').fadeOut(400,function() {
								if(data === 'admin'){
									console.log(self.id);
									$('section#control-panel').load('admin/index/index').fadeIn(800, function() {
										$(this).parent().stop().animate({
											'width' : '70%'
										}, 1000);
									});
								} else if(data === 'user') {
									$('section#control-panel').load('user/index/index').fadeIn(400);
								}
							});
						},
						error: function() {
							$('section#login-display').fadeOut(400,function() {
								$('section#login-error').fadeIn(400);
							});
						}
					});
				});

				//The login is displayed by default - so hide/show content if signup link is clicked
				$('section#register a').live('click', function(e) {
					//disable browser reresh
					e.preventDefault();
					//fade out login
					$('section#login-display').fadeOut(600, function() {
						//fade in sign up content after fadeout conplete
						$('section#sign-up-display').fadeIn(600);
					});
				});

				//handle signup button based on 'bacon worship'
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
			}
		}
	};

	//Instantiate Object
	new Kenstowell_Net();
})(jQuery);

/************************************************************* END ***************************************************************************************/ 

