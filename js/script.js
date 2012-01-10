var App = (function($, undefined) {
    
    var handleSubmenu = function(e) {
        e.stopPropagation();
        
        var $this = $(this),
            $siblings = $this.siblings('li');
        
        $siblings.children('ul').hide(); // hide any other submenus that may be open
        
        $this.children('ul').toggle(); // toggle the clicked submenu
    };
    
    var handleCloseMenu = function() {
        $('.has-submenu > ul').hide();
    };
    
    return {
        init: function() {            
            $('.has-submenu').bind('click', handleSubmenu);
            
            $(window).bind('click', handleCloseMenu);
        }
    }
    
})(window.jQuery);

jQuery(App.init);