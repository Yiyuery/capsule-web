/**
 * Created by Yiyuery on 2017/8/31.
 */
(function () {
    requirejs.config({
        baseUrl: window.top.main.contextPath+'/js/',
        paths: {
            text: 'lib/require/text',
            css: 'lib/require/css',

            /**
             * third-part
             */
            layer: 'lib/layer/layer',
            jquery: "lib/jquery/jquery-1.9.1",
            avalon: "lib/avalon/avalon",
            'jquery.cookie': 'lib/jquery/jquery.cookie',

            /**
             * DIY
             */
            capsule: 'lib/capsule/capsule.util',
            'dispatch-api':'dispatch-web/dispatch-api',

            /**
             * Scooper
             */
            'scooper.config':window.main.dispatch.url+'/dispatch-web/js/scooper.config',
            'scooper.dispatch':window.main.dispatch.url + '/dispatch-web/js/scooper.dispatch',
            'scooper.sse': window.main.dispatch.url + '/dispatch-web/js/scooper.sse',
            'scooper.util': window.main.dispatch.url + '/dispatch-web/js/scooper.util',
            'respond':  window.main.dispatch.url + '/dispatch-web/js/lib/respond.min',
            'org':  window.main.dispatch.url + '/dispatch-web/org', // for CometD
            'jquery.cometd':  window.main.dispatch.url + '/dispatch-web/js/lib/jquery.cometd',
            'jquery.cometd-ack':  window.main.dispatch.url + '/dispatch-web/js/lib/jquery.cometd-ack',
            'jquery.cometd-reload':  window.main.dispatch.url + '/dispatch-web/js/lib/jquery.cometd-reload',
            'jquery.cometd-timestamp':  window.main.dispatch.url + '/dispatch-web/js/lib/jquery.cometd-timestamp',
            'jquery.cometd-timesync':  window.main.dispatch.url + '/dispatch-web/js/lib/jquery.cometd-timesync',
            'jquery.cookie':  window.main.dispatch.url + '/dispatch-web/js/lib/jquery.cookie',
            'ztree':  window.main.dispatch.url + '/dispatch-web/js/lib/jquery.ztree.all',
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
                deps: ['jquery', 'layer']
            },
            /**
             * 添加 dispatch-api 依赖
             */
            'dispatch-api':{
                deps: ['jquery','scooper.config','scooper.dispatch']
            }
        }
    });
})();
