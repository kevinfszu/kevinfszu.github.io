
define([ 'widget', 'jquery', 'jqueryUI' ],function(widget, $, $UI) {
    function Window() {
        this.cfg = {
            width: 400,
            height: 240,
            x: null,
            y: null,
            title: '标题区域',  //弹层标题
            content: '',    //弹层内容

            //按钮文字
            textForAlertBtn: '确定',      //弹层确定按钮的文字
            textForConfirmBtn: '确定',
            textForCancelBtn: '取消',

            //按钮的回调函数
            handlerForAlertBtn: null,       //确定按钮的回调函数
            handlerForCloseBtn: null,       //关闭按钮的回调函数
            handlerForConfirmBtn: null,
            handlerForCancelBtn: null,

            skinClassName: null,        //定制弹层皮肤
            hasCloseBtn: false,     //是否显示关闭按钮
            hasMask: true,       //是否启用遮罩层
            isDraggable: true       //是否可拖动弹层
        };
    }

    Window.prototype = $.extend({}, new widget.Widget(), {

        renderUI: function() {
            var footerContent = "";

            switch (this.cfg.winType) {
                case "alert":
                    footerContent = '<span class="window_alertBtn">' +
                                        this.cfg.textForAlertBtn +
                                    '</span>';
                    break;
                case "confirm":
                    footerContent = '<span class="window_confirmBtn">' +
                                        this.cfg.textForConfirmBtn +
                                    '</span><span class="window_cancelBtn">' +
                                        this.cfg.textForCancelBtn +
                                    '</span>';
                    break;
                default:
                    break;

            }
            this.boundingBox = $(
                '<div class="window_boundingBox">' +
                    '<div class="window_header">' + this.cfg.title + '</div>' +
                    '<div class="window_body">' + this.cfg.content + '</div>' +
                    '<div class="window_footer">' + footerContent + '</div>' +
                '</div>'
            );

            //追加弹层到页面
            this.boundingBox.appendTo("body");

            //是否追加遮罩层（视频里说实现模态）到页面
            if( this.cfg.hasMask ) {
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo("body");
            }

            //是否追加关闭按钮到this.boundingBox
            if( this.cfg.hasCloseBtn ) {
                this.boundingBox.append('<span class="window_closeBtn">X</span>');
            }
        },

        bindUI: function() {
            var that = this;

            //绑定DOM层事件
            this.boundingBox.delegate(".window_alertBtn", "click", function() {
                that.fire("alert");
                that.destroy();
            }).delegate(".window_closeBtn", "click", function() {
                that.fire("close");
                that.destroy();
            }).delegate(".window_confirmBtn", "click", function() {
                that.fire("confirm");
                that.destroy();
            }).delegate(".window_cancelBtn", "click", function() {
                that.fire("cancel");
                that.destroy();
            });

            //绑定自定义事件
            if (this.cfg.handlerForAlertBtn) {
                this.on("alert",this.cfg.handlerForAlertBtn);
            }
            if (this.cfg.handlerForCloseBtn) {
                this.on("close",this.cfg.handlerForCloseBtn);
            }
            if (this.cfg.handlerForConfirmBtn) {
                this.on("confirm",this.cfg.handlerForConfirmBtn);
            }
            if (this.cfg.handlerForCancelBtn) {
                this.on("cancel",this.cfg.handlerForCancelBtn);
            }
        },

        syncUI: function() {
            var window_header = '.window_header';
            var window_body = this.boundingBox.find(".window_body");

            //宽度高度、定位
            this.boundingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                //this.cfg.x由应用层自定义，或window.innerWidth - this.cfg.width / 2 默认居中
                left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
            });

            //这是我自己加的。根据弹层高度计算（假设window_header和window_footer高度已定）内容区域高度（当内容很多时，使内容区域出现滚动条）
            window_body.css({
                height: this.cfg.height - 20 - 69 + 'px',
            });

            //拖动
            if( this.cfg.isDraggable ) {
                this.boundingBox.draggable({handle:window_header});     //我把拖动的handle写死为标题区域
            }

            //皮肤定制
            if( this.cfg.skinClassName ) {
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
        },

        destructor: function() {
            this._mask && this._mask.remove();
        },

        //最终要实现的几个方法
        alert: function(cfg) {
            //用后者cfg覆盖前者this.cfg，this.cfg中没有被覆盖的则继续保留。最终得到被覆盖过的加强版的前者this.cfg
            $.extend(this.cfg, cfg, {winType:"alert"});
            this.render();
            return this;        //加了这个之后，在应用层调用的时候，就可以使用连缀语法了。赞
        },

        confirm: function(cfg) {
            //用后者cfg覆盖前者this.cfg，this.cfg中没有被覆盖的则继续保留。最终得到被覆盖过的加强版的前者this.cfg
            $.extend(this.cfg, cfg, {winType:"confirm"});
            this.render();
            return this;        //加了这个之后，在应用层调用的时候，就可以使用连缀语法了。赞
        }

    });

    return {
        Window: Window
    }
});
