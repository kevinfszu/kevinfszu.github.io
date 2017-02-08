require.config({
    paths: {
        jquery: 'jquery-1.12.0.min',
        jqueryUI: 'http://apps.bdimg.com/libs/jqueryui/1.9.2/jquery-ui.min'
    }
});

require([ 'jquery', 'window' ], function($, w) {
    $("#btn").click(function() {
        var win = new w.Window();

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
});
