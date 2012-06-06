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
(function () {
	/**
	 * OBJECT CONSTRUCTOR
	 */
	var Object = function () {
		var self = this;

		//instantiate object methods
		this.init();
	};

	/**
	 * OBJECT OBJECT METHODS
	 */
	Object.prototype = {
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
	var Obj = new Object();
	window.O = window.Obj = Obj;
})();


/************************************************************* END ***************************************************************************************/ 

