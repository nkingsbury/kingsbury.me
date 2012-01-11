app.nav = function(spec) {
    var that = {},
        ONE_SECOND = 1000 * 1,
        ONE_MINUTE = ONE_SECOND * 60,
        ONE_HOUR = ONE_MINUTE * 60,
        $nav = $(spec.selector);

    var createUrl = function(href) {
        return spec.directory + href.replace(/#/,'') + spec.fileExtension;
    }

    var loadPage = function(pushState, data) {
        var now = Date.now();
        
        if(data.cache && data.cache.expires > now && data.cache.content) {
            that.updateHistory(pushState, data.cache.content, data, 200);
            return;
        }
        
        $(spec.loading).show();

        $.ajax({
            url: createUrl(data.href),
            success: function(response) {
                that.updateHistory(pushState, response, data, 200);
            },
            error: function(response) {
                that.updateHistory(pushState, spec.errorTemplate({error: response.message || 'Unknown error...'}), data, 404);
            },
            complete: function() {
                $(spec.loading).hide();
            }
        });
    }

    var handleClick = function(e) {
        e.preventDefault();

        loadPage(true, e.data);
    };
    
    var handlePop = function(e) {
        e.preventDefault();
        
        if(e.state) {
            that.updateHistory(false, e.state.cache.content, e.state, null);
            return;
        }
        
        var hash = window.location.hash;
        if(hash) {
            loadPage(false, {
                href: hash,
                cache: {
                    expires: (Date.now() + (spec.expires || ONE_MINUTE * 2)),
                    content: null,
                    status: null
                }
            });
        }
    };
    
    _.each($nav.find('a'), function(a) {
        var $a = $(a),
            href = $a.attr('href');
            
        if(href && href.match(/^#([a-z\-_\/]+)$/i)) {
            var data = {
                href: href,
                cache: {
                    expires: (Date.now() + (spec.expires || ONE_MINUTE * 2)),
                    content: null,
                    status: null
                }
            };
            
            $a.bind('click', data, handleClick);
        }
    });
    
    window.onpopstate = handlePop;
    
    if(!window.location.hash) {
        loadPage(false, {
            href: spec.defaultPage,
            cache: {
                expires: (Date.now() + (spec.expires || ONE_MINUTE * 2)),
                content: null,
                status: null
            }
        });
    }
    
    that.updateHistory = function(pushState, content, data, status) {
        $(spec.target).html(content);
        
        // update cache
        data.cache.content = content;
        data.cache.status = status;
        
        if(pushState)
            history.pushState(data, null, data.href);
    }
    
    
    
    /*
    // events
    app.objects.eventually(that);
    
    that.on('change', updateHistory)
    */
    
    return that;
}