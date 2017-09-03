/**
 * 头部导航 Activiti 表单管理、流程管理、流程中心、统计报表
 * Name     : activti-navigation
 * Author   : Mitsuha
 * Date     : 2017-09-03
 */
define(["require", "exports", "avalon"], function (require, exports, avalon) {
    "use strict";
    exports.__esModule = true;
    var topNav = avalon.define({
        '$id': 'topNavVMC',
        /**
         * 导航Items数组
         */
        navs: [
            {
                text: "表单管理",
                url: "#"
            },
            {
                text: "流程管理",
                url: "#"
            },
            {
                text: "流程中心",
                url: "#"
            },
            {
                text: "统计报表",
                url: "#"
            }
        ]
    });
    avalon.ready(function () {
        avalon.scan(document.body);
    });
});
//# sourceMappingURL=activiti-navigation.js.map