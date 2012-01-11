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
            
            $('nav a').bind('click', function(e) {
                e.preventDefault();
                var href = $(this).attr('href');
                
                if(!href.match(reHash))
                    return;
                    
                var $content = $('#content'),
                    $loading = $('#loading');
                
                $loading.show();
                
                $.ajax({
                    url: 'pages/' + reHash.exec(href)[1] + '.html',
                    success: function(response) {
                        $content.html(response);
                    },
                    error: function(response) {
                        $content.html(errorTemplate({error: response.message || 'Unknown error...'}));
                    },
                    complete: function() {
                        $loading.hide();
                    }
                });
                    
                
            });
        }
    }
    
})(window.jQuery);

jQuery(App.init);