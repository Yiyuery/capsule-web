/**
 * Created by Yiyuery on 2017/8/31.
 */
(function () {
    requirejs.config({
        baseUrl: window.top.main.contextPath,
        paths: {
            text: 'js/lib/require/text',
            css: 'js/lib/require/css',

            /**
             * third-part
             */
            layer: 'js/lib/layer/layer',
            jquery: "js/lib/jquery/jquery-1.9.1",
            avalon: "js/lib/avalon/avalon",

            /**
             * DIY
             */
            capsule: 'js/lib/capsule/capsule.util'
        },

        shim: {
            tree: {
                deps: ['jquery']
            },

            layer: {
                deps: ['jquery']
            }, /*定义layer.js依赖于jquery*/
            /**
             * 补充依赖，避免 TS模块化引入
             */
            capsule: {
                deps: ['jquery', 'layer', 'tree'],
            }
        }
    });
})();
