/**
 * 头部导航 Activiti 表单管理、流程管理、流程中心、统计报表
 * Name     : activti-navigation
 * Author   : Mitsuha
 * Date     : 2017-09-03
 */

import avalon = require('avalon');

var topNav = avalon.define({
    '$id': 'topNavVMC',
    /**
     * 当前选中标识
     */
    current: 0,
    /**
         * 导航Items数组
         */
    navs: [
        {
            text: "表单管理",
            nav_key: "form-manager",
            url: "#"
        },
        {
            text: "流程管理",
            nav_key: "proc-manager",
            url: "#"
        },
        {
            text: "流程中心",
            nav_key: "proc-center",
            url: "#"
        },
        {
            text: "统计报表",
            nav_key: "stat-report",
            url: "#"
        }
    ],
    /**
     * 头部导航点击事件
     */
    clickNavItem: function (index:number) {
        let nav_key = this.navs[index]['nav_key'];
        this.current = index;
        console.log(nav_key);
    }
});

/**
 * 核心模块
 */
let coreModule = avalon.define({
    '$id': 'coreModuleVMC',
    modules: [
        {
            title: '在线设计表单',
            desc: '在这里，您可以设计流程节点中的表单，主要用来动态管理流程中每个节点需要提交的数据信息。',
            url: '#'
        },
        {
            title: '表单管理',
            desc: '在这里，您可以对表单进行增删查改操作，动态改变节点提交的表单参数定义，也可以预览表单效果。',
            url: '#'
        },
        {
            title: '表单映射',
            desc: '在这里，你可以看到一个部署后的工作流中使用到了哪些表单，并在流程节点中通过点击节点直接预览该节点的表单配置信息。',
            url: '#'
        }
    ]
})


avalon.ready(function () {
    avalon.scan(document.body);
});




