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
    
    var reHash = /^#([a-z]+)$/i;
    
    return {
        init: function() {     
            var errorTemplate = _.template($('#error-template').html());
                   
            $('.has-submenu').bind('click', handleSubmenu);
            
            $(window).bind('click', handleCloseMenu);
            
            app.nav({
                defaultPage: 'home',
                selector: 'nav',
                target: '#content',
                fileExtension: '.html',
                directory: 'pages/',
                loading: '#loading',
                errorTemplate: _.template($('#error-template').html())
            });
        }
    }
    
})(window.jQuery);

jQuery(App.init);