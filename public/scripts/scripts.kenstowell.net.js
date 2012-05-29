/**
 * Created by JetBrains PhpStorm.
 * User: kstowell
 * Date: 5/28/12
 * Time: 3:48 PM
 * To change this template use File | Settings | File Templates.
 */

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

/************************************************************* END GLOBAL VARS ***************************************************************************/

/**********************************************************************************************************************************************************
 *																																																																							   *
 **********************************************************************************************************************************************************
 *
 *
 *
 *
 *
 *
 */
(function() {

  var Kenstowell_Net = function() {
	console.log('INIT', new Date().getTime());
	this.init();
  };

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

	  //disable nav links from actually navigating - and add them to the hash
//	  $('.main-nav-link').live('click', function(e) {
//
//		return false;
//	  });
	}
  };

  //Instantiate Object
  new Kenstowell_Net();
})(jQuery);

/************************************************************* END ***************************************************************************************/ 

