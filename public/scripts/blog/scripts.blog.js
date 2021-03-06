/* Javascript document
 *
 * @Author:	Ken Stowell
 * @Date:		
 *
 * @Description: BLOGS JS
 */

/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS																																																																	*
 *********************************************************************************************************************************************************/

/**********************************************************************************************************************************************************
 * BLOG OBJECT																																																																						*
 **********************************************************************************************************************************************************
 *
 *
 *
 *
 *
 *
 */
(function() {
	/**
	 * BLOG OBJECT
	 */
	var Blog = function() {
		//init object methods
		this.init();
	};

	/**
	 * BLOG OBJECT METHODS
	 */
	Blog.prototype = {
		/**
		 * INIT
		 */
		init: function() {
			//load styles
			this.loadStyles();
		},
		/**
		 * LOAD STYLES
		 */
		loadStyles: function() {
			var self = this;

			/**
			 * WINDOW LOAD
			 */
			$(window).load(function () {

			});
			/**
			 * DOC READY
			 */
			$(document).ready(function () {

			});
		}
	};
	//instantiate object
	new Blog();
})();





/************************************************************* END ***************************************************************************************/ 

