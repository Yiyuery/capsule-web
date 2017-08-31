/**
 * Created by Yiyuery on 2017/8/31.
 */
require(["capsule","avalon","layer"],function(CapUtils){

    layer.config({
        path: window.top.main.contextPath+'/js/lib/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    console.log("contextPath:"+window.top.main.contextPath);

});

