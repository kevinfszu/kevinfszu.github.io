
define([ 'widget', 'jquery', 'jqueryUI' ],function(widget, $, $UI) {
    function Window() {
        this.cfg = {
            width: 400,
            height: 240,
            x: null,
            y: null,
            title: '标题区域',  //弹层标题
            content: '',    //弹层内容
            textForAlertBtn: '确定',      //弹层确定按钮的文字
            hasCloseBtn: false,     //是否显示关闭按钮
            handlerForAlertBtn: null,       //确定按钮的回调函数
            handlerForCloseBtn: null,       //关闭按钮的回调函数
            skinClassName: null,        //定制弹层皮肤
            hasMask: true,       //是否启用遮罩层
            isDraggable: true       //是否可拖动弹层
        };
    }

    Window.prototype = $.extend({}, new widget.Widget(), {

        alert: function(cfg) {
            var CFG = $.extend(this.cfg, cfg);      //用后者cfg覆盖前者this.cfg，this.cfg中没有被覆盖的则继续保留。
            var boundingBox = $(
                '<div class="window_boundingBox">' +
                    '<div class="window_header">' + CFG.title + '</div>' +
                    '<div class="window_body">' + CFG.content + '</div>' +
                    '<div class="window_footer"><span class="window_alertBtn">' + CFG.textForAlertBtn + '</span></div>' +
                '</div>'
            );
            var window_header = '.window_header';
            var window_body = boundingBox.find(".window_body");
            var btn = boundingBox.find(".window_alertBtn");
            var mask = null;
            var that = this;

            //遮罩层（视频里说实现模态）
            if( CFG.hasMask ) {
                mask = $('<div class="window_mask"></div>');
                mask.appendTo("body");
            }

            //追加弹层到页面
            boundingBox.appendTo("body");

            //宽度高度、定位
            boundingBox.css({
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
            if( CFG.isDraggable ) {
                boundingBox.draggable({handle:window_header});
            }

            //确定按钮
            btn.click(function() {
                // CFG.handlerForAlertBtn && CFG.handlerForAlertBtn();
                that.fire("alert");
                boundingBox.remove();
                mask && mask.remove();
                // that.fire("alert");     //放这里则不会阻塞弹层的关闭
            });
            if (CFG.handlerForAlertBtn) {
                this.on("alert",CFG.handlerForAlertBtn);
            }

            //关闭按钮
            if( CFG.hasCloseBtn ) {
                var closeBtn = $('<span class="window_closeBtn">X</span>');
                closeBtn.appendTo(boundingBox);
                closeBtn.click(function() {
                    // CFG.handlerForCloseBtn && CFG.handlerForCloseBtn();
                    boundingBox.remove();
                    mask && mask.remove();
                    that.fire("close");
                });
            }
            if (CFG.handlerForCloseBtn) {
                this.on("close",CFG.handlerForCloseBtn);
            }

            //皮肤定制
            if( CFG.skinClassName ) {
                boundingBox.addClass(CFG.skinClassName);
            }

            return this;        //加了这个之后，在应用层调用的时候，就可以使用连缀语法了。赞
        }


    });

    return {
        Window: Window
    }
});
