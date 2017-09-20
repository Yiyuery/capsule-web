/**
 * Created by Yiyuery on 2017/8/31.
 */
var rootPath = window.top.main.contextPath;
(function () {
    requirejs.config({
        baseUrl: rootPath + '/js/',
        paths: {
            text: 'lib/require/text',
            css: 'lib/require/css',

            /**
             * third-part
             */
            layer: 'lib/layer/layer',
            jquery: "lib/jquery/jquery-1.9.1",            
            jcookie: 'lib/jquery/jquery.cookie',
            avalon: "lib/avalon/avalon",
            vue:'lib/vue/vue',

            /**
             * DIY
             */
            capsule: 'lib/capsule/capsule.util',        
        },

        shim: {            

            layer: {
                deps: ['jquery']
            }, /*定义layer.js依赖于jquery*/
            /**
             * 补充依赖，避免 TS模块化引入
             */
            capsule: {
                deps: ['jquery', 'layer']
            }            
        }
    });
})();
