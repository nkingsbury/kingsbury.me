var App = (function($, undefined) {
    
    var handleSubmenu = function(e) {
        e.preventDefault();
        
        var $this = $(this),
            $siblings = $this.siblings('li');
        
        $siblings.children('ul').hide(); // hide any other submenus that may be open
        
        $this.children('ul').toggle(); // toggle the clicked submenu
    }
    
    return {
        init: function() {
            var $submenu = $('.has-submenu');
            
            $submenu.bind('click', handleSubmenu);
        }
    }
    
})(window.jQuery);

jQuery(App.init);