define([ 'jquery'], function($) {
    function Widget() {
        this.boundingBox = null;        //属性（最外层容器）
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
        },

        render: function(container) {       //方法（渲染组件）
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },

        destroy: function() {       //销毁组件
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        },

        //四个接口都是空的，需要由具体的子类实现它们
        renderUI: function() {},        //接口（添加DOM节点）
        bindUI: function() {},      //接口（监听事件）
        syncUI: function() {},      //接口（初始化组件属性）
        destructor: function() {}      //接口（销毁组件前要执行的处理函数）
    }

    return {
        Widget: Widget
    }
});
