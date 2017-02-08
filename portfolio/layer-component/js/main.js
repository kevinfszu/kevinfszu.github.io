require.config({
    paths: {
        jquery: 'jquery-1.12.0.min',
        jqueryUI: 'http://apps.bdimg.com/libs/jqueryui/1.9.2/jquery-ui.min'
    }
});

require([ 'jquery', 'window' ], function($, w) {
    $(function() {

    });

    $("#btn").click(function() {
        var win = new w.Window();

        //alert
        win.alert({
            y: 150,
            title: '这里是标题区域',
            content: "hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~hello world~",
            handlerForAlertBtn: function() {
                alert("确定按钮回调函数");
            },
            handlerForCloseBtn: function() {
                alert("关闭按钮回调函数");
            },
            hasCloseBtn: true,
            // skinClassName: "window_skin_a",
            textForAlertBtn: '朕知道了'
        //这里试一下连缀语法
        }).on("alert",function() {
            alert("确定按钮回调函数444");
        });
        win.on("alert",function() {
            alert("确定按钮回调函数222");
        });
        win.on("alert",function() {
            alert("确定按钮回调函数333");
        });
        win.on("close",function() {
            alert("关闭按钮回调函数222");
        });

    });

    $("#btn_2").click(function() {
        var win = new w.Window();

        //confirm
        win.confirm({
            y: 150,
            title: '系统消息',
            content: "朕再问你一遍，你确定要删除这个文件？？？",
            handlerForConfirmBtn: function() {
                alert("确定按钮回调函数：胆子真大！");
            },
            handlerForCancelBtn: function() {
                alert("关闭按钮回调函数：是个管孩子~");
            },
            handlerForCloseBtn: function() {
                alert("关闭按钮回调函数：是个管孩子~");
            },
            hasCloseBtn: true,
            // skinClassName: "window_skin_a",
            textForConfirmBtn: 'yes'
        //这里试一下连缀语法
        }).on("alert",function() {
            alert("确定按钮回调函数444");
        });
    });
});
