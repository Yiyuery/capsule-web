/**
 * 表单管理 菜单栏
 * Name     : form-main
 * Author   : Mitsuha
 * Date     : 2017-09-03
 */

import avalon = require('avalon');

/**
 * 核心模块
 */
let coreModule = avalon.define({
    '$id': 'coreModuleVMC',
    /**
     * 模块定义
     */
    modules: [
        {
            title: '在线设计表单',
            desc: '在这里，您可以设计流程节点中的表单，主要用来动态管理流程中每个节点需要提交的数据定义。',
            url: './form-create.html'
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
    ],
    /**
     * 页面跳转
     */
    go:function(url:string){
        window.location.href = url;
    }
})


avalon.ready(function () {
    avalon.scan(document.body);
});




