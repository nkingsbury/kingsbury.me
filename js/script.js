var App = (function($, undefined) {
    
    var handleMenu = function(e) {
        e.preventDefault();
        
        var $this = $(this),
            $submenu = $this.children('ul');
            
        $submenu.toggle();
    }
    /*
    var Menu = function(selector) {
        this.$menu = $(selector);
    }
    
    Menu.prototype = {
        var menu = this,
            $open;
        
        return: {
            handleClick: function(e) {
                var $li = $(this);
                e.preventDefault();

                if($li.hasClass('has-submenu')) {
                    $li.toggle();

                }
            },
            
        }
        
        
        
    }
    */
    
    return {
        init: function() {
            var $sub = $('.has-submenu');
            
            $sub.bind('click', handleMenu);
        }
    }
    
})(window.jQuery);

jQuery(App.init);