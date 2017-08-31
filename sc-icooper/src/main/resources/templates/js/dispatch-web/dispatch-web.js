/**
 * Created by Yiyuery on 2017/8/31.
 */
require(["capsule","avalon","layer"],function(CapUtils){

    layer.config({
        path: contextPath+'/js/lib/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });

    function init(){
        $('body').html('<h4>Hello SpringBoot!</h4>')
    }

    $(document).ready(function(){
        init();
    });
});

