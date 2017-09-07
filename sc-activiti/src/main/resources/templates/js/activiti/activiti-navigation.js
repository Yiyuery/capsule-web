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
         * 当前选中标识
         */
        current: 0,
        /**
         * 当前选中模块对应的子模块首页
         */
        url: './form-manager/form-main.html',
        /**
         * 导航Items数组
         */
        navs: [
            {
                text: "表单管理",
                nav_key: "form-manager",
                url: "./form-manager/form-main.html"
            },
            {
                text: "流程管理",
                nav_key: "proc-manager",
                url: "./proc-manager/proc-manager.html"
            },
            {
                text: "流程中心",
                nav_key: "proc-center",
                url: "./proc-manager/proc-manager.html"
            },
            {
                text: "统计报表",
                nav_key: "stat-report",
                url: "./proc-manager/proc-manager.html"
            }
        ],
        /**
         * 头部导航点击事件
         */
        go: function (index) {
            var nav_key = this.navs[index]['nav_key'];
            this.current = index;
            this.url = this.navs[index]['url'];
            console.log(nav_key);
        }
    });
    avalon.ready(function () {
        avalon.scan(document.body);
    });
});
//# sourceMappingURL=activiti-navigation.js.map