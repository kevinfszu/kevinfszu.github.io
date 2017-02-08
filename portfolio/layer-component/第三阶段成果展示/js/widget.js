define(function() {
    function Widget() {
        this.handlers = {

        };
    }

    Widget.prototype = {
        //自定义事件的绑定
        on: function(type, handler) {
            if( typeof this.handlers[type] == "undefined") {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;        //加了这个之后，在应用层调用的时候，就可以使用连缀语法了。赞
        },
        //自定义事件的触发
        fire: function(type, data) {
            if(this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](data);
                }
            }
        }
    }

    return {
        Widget: Widget
    }
});
