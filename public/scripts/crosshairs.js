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
 * CROSSHAIRS jQUERY PLUGIN																																																																*
 **********************************************************************************************************************************************************
 *
 * @desc:
 *
 *
 *
 *
 */
(function() {

	//Instantiate as a jQuery plugin and create a new Crosshairs object
	jQuery.fn.crosshairs = function(options) {
		return this.each(function() {
			new Crosshairs(this, options);
		});
	};

	/************************
	 * CROSSHAIRS CONSTRUCTOR
	 */
	var Crosshairs = function(crosshair, options) {
		this.$ch = $(crosshair);
		this.options = $.extend({}, Crosshairs.defaults, options);

		//option specific shortcuts
		this.$w = this.width = this.options.width;//width option
        this.$h = this.height = this.options.height;//height option
        this.$vis = this.visible = this.options.visible;
		this.$align = this.alignment = this.options.alignment;//alignment option
		this.$off = this.offset = this.options.offset;//Offset option
		this.$pth = this.pathing = this.options.pathing;//pathing option
        this.$spd = this.speed = this.options.speed;//width option
		this.$cont = this.content = this.options.content;//content object

		//Init object methods
		this.init();
	};

	/************************
	 * CROSSHAIRS DEFAULTS
	 * @desc: default options for plugin behavior
	 *
	 */
	Crosshairs.defaults = {
        width: '20px', //width
        height: '20px',//height
        visible: false,
        alignment: 'center', //portion of the box the content is aligned to upon moving
        offset: 0, //margin from the box - integer only
        pathing: 'fixed', //pathing type
        speed: 'normal',
        content: {}//trigger and targets for content moving
	};

	/************************
	 * CROSSHAIRS PROTOTYPE
	 * @desc: object methods for the Crosshairs object
	 */
	Crosshairs.prototype = {
		/**
		 * INIT
		 * @desc: first things first :)
		 */
		init: function() {
			var self = this;

            //Init the actual crosshairs
            this.buildCrossHairs();

            //Set up target event handling
            this.bindEvents();
		},
		/**
		 * BIND EVENTS
		 * @desc: build the event handlers for the targets
		 */
		bindEvents: function() {
			var self = this;

			//build the trigger event handler
			$.each(self.$cont, function(key, val) {
				$(val.trigger.selector).bind('click', function(e) {
					//for each object in content, bind it's 'trigger' to a method call for the appropriate target content
					self.pathToTarget(val.target.selector);
				});
			});
		},
		/**
		 * BUILD CROSSHAIRS
		 * @desc: style the crosshairs
		 */
		buildCrossHairs: function() {
            var self = this;

            //First set display, width and height values
            $('#crosshairs').css({
  					'visibility' : (self.$vis == true) ? 'visible' :  'hidden',
                    'width': self.$w,
                    'height': self.$h,
                    'border' : '1px solid black'
            });

            //Now adjust position
            $('#crosshairs').css({
                    'position': 'fixed',
                    'top' : (($(window).height() - $('#crosshairs').height()) /2) + 'px',
                    'left': ($(window).width() - $('#crosshairs').width()) /2+ 'px'
            });
		},
		/**
		 * PATH TO TARGET
		 * @param trgt
		 */
		pathToTarget: function(target) {
			var self = this;
            var o = parseInt(this.$off);//offset

			/**
			 * 1. get current position relative to alignment
			 * 2. get position of target element relative to alignment
			 * 3. calculate difference
			 * 4. plot trajectory accounting for offset and pathing type
			 * 5. path to target
			 */
			console.log(self.getItemCoordinates(this.$ch));

			//get the current position
            var c = current_position = self.getItemCoordinates(this.$ch);//current crosshair location based on ch settings, alignment and offset
            var c_left, c_top;//final coords for current position.

			switch(self.$align) {
				case 'center':
                    c_left = c.TL.x + (this.$ch.width() /2) + o;
                    c_top = c.TL.y + (this.$ch.height() / 2) + o;
                    console.log(c_left, c_top)
					break;
                case 'top-left':
                    c_left = c.TL.x + o;
                    c_top = c.TL.y + o;
                    console.log(c_left, c_top)
                    break;
                case 'top-right':
                    c_left = c.TR.x + o;
                    c_top = c.TR.y + o;
                    console.log(c_left, c_top)
                    break;
                case 'bottom-left':
                    c_left = c.BL.x + o;
                    c_top = c.BL.y + o;
                    console.log(c_left, c_top)
                    break;
                case 'bottom-right':
                    c_left = c.BR.x + o;
                    c_top = c.BR.y + o;
                    console.log(c_left, c_top)
                    break;
                default:
                    c_left = c.TL.x + (this.$ch.width() /2) + o;
                    c_top = c.TL.y + (this.$ch.height() / 2) + o;
                    console.log(c_left, c_top)
                    break;
			}

            //get the target position
            var t = self.getItemCoordinates($(target));
            var t_left, t_top;

            switch(self.$align) {
                case 'center':
                    t_left = t.TL.x + ($(target).width() /2) + o;
                    t_top = t.TL.y + ($(target).height() / 2) + o;
                    console.log(t_left, t_top)
                    break;
                case 'top-left':
                    t_left = t.TL.x + o;
                    t_top = t.TL.y + o;
                    console.log(t_left, t_top)
                    break;
                case 'top-right':
                    t_left = t.TR.x + o;
                    t_top = t.TR.y + o;
                    console.log(t_left, t_top)
                    break;
                case 'bottom-left':
                    t_left = t.BL.x + o;
                    t_top = t.BL.y + o;
                    console.log(t_left, t_top)
                    break;
                case 'bottom-right':
                    t_left = t.BR.x + o;
                    t_top = t.BR.y + o;
                    console.log(t_left, t_top)
                    break;
                default:
                    t_left = t.TL.x + ($(target).width() /2) + o;
                    t_top = t.TL.y + ($(target).height() / 2) + o;
                    console.log(t_left, t_top)
                    break;
            }

            //Animate content
            var dist_left, dist_top;
            //if pathing type is fixed, calculate distance from CH
            if(this.$pth === 'fixed') {
                dist_left = t_left - c_left;
                dist_top = t_top - c_top;

                //animate the path to the new coords
                $('#page-wrapper').animate({
                    top: -dist_top +'px',
                    left: -dist_left+'px'
                }, 5000)
            }
		},
		/**
		 * UPDATE CROSSHAIRS
		 * @param delta
		 */
		updateCrossHairs: function(delta) {

		},
		/**
		 * GET ITEM COORDIATES
		 * @desc: gets item coordiantes for each x,y intersection
		 * @param elem
		 */
		getItemCoordinates: function(elem) {
			var self = this;
			var $elem = $(elem);
			var pos = $elem.position();

			//return an obecjt with the coords of each point
			return {
				TL: {
					x:pos.left,
					y:pos.top
				},
				TR: {
					x: pos.left+$elem.width(),
					y: pos.top
				},
				BL: {
					x: pos.left,
					y: pos.top+$elem.height()
				},
				BR: {
					x: pos.left+$elem.width(),
					y: pos.top+$elem.height()
				}
			};
		}
	};
})(jQuery);

/************************************************************* END ***************************************************************************************/ 

