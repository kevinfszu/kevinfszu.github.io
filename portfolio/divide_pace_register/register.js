
$(function() {
    var sum = 3;
        i = 1;
        data_flag_num = '';
        data_step_num = '';

    $(".next").click(function() {
        next();
    });
    $(".last").click(function() {
        last();
    });

    //页面初始化的时候，只有“下一步”
    function next() {
        //如果点击“下一步”按钮的时候，处于第一步
        if( 1 == i ) {
            $(".last").removeClass("hidden").addClass("normal");
            $(".next").removeAttr("id");
        }
        //进入了下一步
        i++;
        //如果下一步是 最后一步
        if( i == sum) {
            $(".next").removeClass("normal").addClass("hidden");
            $(".last").attr("id","last");
        }

        //步骤提示区的切换
        data_step_num = 'li[data-step-' + (i-1) + ']';
        $(data_step_num).removeAttr("id");
        data_step_num = 'li[data-step-' + i + ']';
        $(data_step_num).attr("id","active");
        //内容区的切换
        data_flag_num = 'div[data-flag-' + i + ']';
        $(data_flag_num).removeClass("hidden")
        data_flag_num = 'div[data-flag-' + (i-1) + ']';
        $(data_flag_num).addClass("hidden");

    }

    function last() {
        //如果点击“上一步”按钮的时候，处于最后一步
        if( sum == i ) {
            $(".next").removeClass("hidden").addClass("normal");
            $(".last").removeAttr("id");
        }
        //进入了上一步
        i--;
        //如果上一步是 第一步
        if( i == 1) {
            $(".last").removeClass("normal").addClass("hidden");
            $(".next").attr("id","next");
        }

        //步骤提示区的切换
        data_step_num = 'li[data-step-' + (i+1) + ']';
        $(data_step_num).removeAttr("id");
        data_step_num = 'li[data-step-' + i + ']';
        $(data_step_num).attr("id","active");
        //内容区的切换
        data_flag_num = 'div[data-flag-' + i + ']';
        $(data_flag_num).removeClass("hidden")
        data_flag_num = 'div[data-flag-' + (i+1) + ']';
        $(data_flag_num).addClass("hidden");
    }



});
