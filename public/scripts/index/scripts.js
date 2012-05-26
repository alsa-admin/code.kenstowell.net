/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS                                                                                                                                                                                                                                                                    *
 *********************************************************************************************************************************************************/

/************************************************************* END GLOBAL VARS ***************************************************************************/


/**********************************************************************************************************************************************************
 * DOCUMENT READY                                                                                                                                                                                                                                                                              *
 *********************************************************************************************************************************************************/
$(document).ready(function () {

});

/**********************************************************************************************************************************************************
 * WINDOW LOAD                                                                                                                                                                                                                                                                              *
 *********************************************************************************************************************************************************/
$(window).load(function () {
    var idx = new Index();
});


/**********************************************************************************************************************************************************
 * INDEX Obect                                                                                                                                                                                                                                                                              *
 **********************************************************************************************************************************************************
 *
 *
 *
 *
 *
 *
 */
var Index = function() {
    var self = this;

    //start the prototype
    this.init();
};

/**
 * INDEX PROTOTYPE
 */
Index.prototype = {
    /**
     * INIT
     */
    init: function() {
        var self = this;

        //build styles
        this.loadStyles();

        //manage events
        this.bindEvents();
    },
    /**
     * LOAD STYLES
     */
    loadStyles: function() {
        var self = this;

        //we want 1140 gs on the home page
        $('div#page-wrapper').addClass('container');
//        //set up the crosshairs plugin
//        $('div#crosshairs').crosshairs({
//             width: '1100px',
//             height: '800px',
//             visible: true,
//             alignment: 'bottom-right',
//             offset: 0,
//             pathing: 'fixed',
//             speed: 'normal',
//             content: {
//                    home: {
//                        trigger: $('a#main-nav-link-home'),
//                        target: $('#position-one')
//                    },
//                    about: {
//                        trigger: $('a#main-nav-link-about'),
//                        target: $('#position-two')
//                    },
//                    services: {
//                        trigger: $('a#main-nav-link-services'),
//                        target: $('#position-three')
//                    },
//                    work: {
//                        trigger: $('a#main-nav-link-work'),
//                        target: $('#position-four')
//                    },
//                    contact: {
//                         trigger: $('a#main-nav-link-contact'),
//                         target: $('#position-five')
//                    }
//             }
//        });
    },
    /**
     * BIND EVENTS
     */
    bindEvents: function() {
        var self = this;

        //main nav event handling
        $('.main-nav-link ').bind('click', function(e) {
            //prevent any page loads from occurring
            e.preventDefault();
            //give the url the hash for the ajax content to be loaded
            window.location.hash = '/'+this.textContent;
        });
    }
}
/************************************************************* END ***************************************************************************************/

