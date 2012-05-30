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
   * KENSTOWELL.NET OBJECT DECLARATION
   */
  var Kenstowell_Net = function() {
	console.log('INIT', new Date().getTime());
	this.init();
  };

  /**
   * KENSTOWELL.NET PROTOTYPE OBJECT METHODS
   */
  Kenstowell_Net.prototype = {
	init: function() {
	  console.log('INIT');

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
             visible: true,
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
		$('.slide').css({
		  'width' : $(window).width(),
		  'height': $(window).height()
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

  //Instantiate Object
  new Kenstowell_Net();
})(jQuery);

/************************************************************* END ***************************************************************************************/ 

