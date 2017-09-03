/**
 * Created by Yiyuery on 2017/9/1.
 * Dispatch Require 引用封装
 */
requirejs(dispatchRequireConfig, ['jquery', 'scooper.config', 'scooper.dispatch'], function ($, config, dispatch) {
    "use strict";
    var link = window.main.dispatch;
    /**
     * 构建API对象
     * @type {{}}
     */
    var DispatchAPI = {},
        /**
         * 默认关闭所有监听
         * @type {{CONN_CNG: boolean, CHANGE_CFG: boolean, CALL_IN: boolean, CALL_STS: boolean, MEET_STS: boolean, MEET_MEM: boolean, MEET_LST: boolean, DATA_INIT: boolean, METHOD_RT: boolean, DATE_STATE: boolean, PACK_RES_CHN: boolean}}
         */
        deafaultListener = {
            CONN_CNG: false,
            CHANGE_CFG: false,
            CALL_IN: false,  //呼入事件监听
            CALL_STS: false,
            MEET_STS: false,
            MEET_MEM: false,
            MEET_LST: false,
            DATA_INIT: false,
            METHOD_RT: false,
            DATE_STATE: false,
            PACK_RES_CHN: false
        };
    /**
     * 自定义通知函数
     * @type {null}
     */
    var dispatchNotify = function (msg) {
        console.log("未定义dispatch回调通知函数");
    };

    /**
     * 初始化
     * list: 事件集合
     * notify： 通知函数
     */
    DispatchAPI.init = function (list, notify) {
        /**
         * dispatch - server
         */
        if (!link) {
            console.log("Dispatch Link Params Error!");
            return;
        }

        /**
         * 重写通知函数
         */
        if (notify) {
            dispatchNotify = notify;
        }

        /**
         * 加载用户需要开启的dipatch事件监听
         */
        var list = $.extend(deafaultListener, list);

        /**
         * dispatch 内置初始化
         */
        config.initialize(function (conf) {
            /**
             * 初始激活dispatch
             * 初始化监听器开关
             */
            DispatchHelper.INIT.dispatch(list);

        }, link.url + '/dispatch-web/conf/data', null);
    }

    /**
     * Dispatch 辅助类
     * @type {{LISTEN: {bindListener: bindListener}, INIT: {dispatch: dispatch, active: active}, ENUMS: {EVENT_ENUM: {CONN_CNG: string, CHANGE_CFG: string, CALL_IN: string, CALL_STS: string, MEET_STS: string, MEET_MEM: string, MEET_LST: string, DATA_INIT: string, METHOD_RT: string, DATE_STATE: string, PACK_RES_CHN: string}, STATUS_ENUM: {OFFLINE: string, IDLE: string, WAITRING: string, CALLRING: string, CALLANSWER: string, CALLHOLD: string, CALLTRANSFING: string, CALLTRANSFER: string, DOUBLETALK: string, MEET: string, BREAKIN: string, MONITOR: string, CALLINWAITANSWER: string, MONITORRING: string, MONITORANSWER: string, MONITOROFFHOOK: string, POC: string, POC_GROUP: string, POC_BROADCAST: string}}}}
     */
    var DispatchHelper = {
        /**
         * 缓存
         */
        CACHE:{
            /**
             * 监听器缓存，避免重复监听
             */
            funcMap:{}
        },
        /**
         * 事件监听
         */
        LISTEN: {
            /**
             * 绑定事件监听
             * @param key
             */
            bindListener: function (key) {
                scooper.dispatch.listen(key, function (evt) {
                    /**
                     * 通知 dispatch 事件
                     */
                    dispatchNotify(evt);
                });
            },
        },
        /**
         * 初始化
         */
        INIT: {
            /**
             * 初始化
             */
            dispatch: function (evArr) {
                scooper.dispatch.setRemoteBaseUrl(link.url + '/dispatch-web/')
                scooper.dispatch.initialize();
                scooper.dispatch.loginByToken(link.token);
                scooper.dispatch.setToken(link.token);
                /**
                 * 延时确保 dispatch 初始化成功
                 */
                setTimeout(function () {
                    DispatchHelper.INIT.active(evArr);
                }, 1000);
            },
            /**
             * 事件激活: 部分必要绑定事件在初始加载时激活
             * @param arr
             */
            active: function (arr) {
                $.each(arr, function (i, isActive) {
                    if (isActive) {
                        var key = DispatchHelper.ENUMS.EVENT_ENUM[i];
                        DispatchHelper.LISTEN.bindListener(key);
                    }
                });
            }
        },
        /**
         * 参数枚举
         */
        ENUMS: {
            /**
             * 事件类型枚举
             */
            EVENT_ENUM: {
                CONN_CNG: "connectionChanged",
                CHANGE_CFG: "changeConfigNotify",               //视频监听
                CALL_IN: "callInChanged",                       //呼入监听
                CALL_STS: "telStatusChanged",                   //话机状态变更
                MEET_STS: "meetStatusChanged",
                MEET_MEM: "meetMemberChanged",
                MEET_LST: "meetListChanged",
                DATA_INIT: "dataInitailized",
                METHOD_RT: "methodResponse",
                DATE_STATE: "dateStateChanged",
                PACK_RES_CHN: "packageResult"
            },
            STATUS_ENUM: {
                OFFLINE: "callst_offline",			            //离线
                IDLE: "callst_idle",				            //空闲
                WAITRING: "callst_waitring",			        //预振铃
                CALLRING: "callst_ring",				        //振铃中
                CALLANSWER: "callst_answer",			        //应答
                CALLHOLD: "callst_hold",				        //保持中
                CALLTRANSFING: "callst_transfering",		    //转接中
                CALLTRANSFER: "callst_transfer",			    //转接
                DOUBLETALK: "callst_doubletalk",			    //双方通话
                MEET: "callst_meet",				            //在会场中
                BREAKIN: "callst_breakin",			            //强插
                MONITOR: "callst_monitor",			            //监听通话
                CALLINWAITANSWER: "callst_callinwaitanswer",	//呼入未应答
                MONITORRING: "callst_monitorring",		        //双方直接通话响铃
                MONITORANSWER: "callst_monitoranswer",		    //双方直接通话
                MONITOROFFHOOK: "callst_monitoroffhook",		//监听债基
                POC: "callst_poc",				                //对讲
                POC_GROUP: "callst_poc_group",			        //对讲组
                POC_BROADCAST: "callst_poc_broadcast"		    //对讲广播
            }
        },
        /**
         * 工具
         */
        UTIL:{
            /**
             * 判断是否为 空数据
             * @param obj
             * @returns {boolean}
             */
            isEmpty:function(obj){
                return obj == undefined || obj == "" || obj == null;
            },
            /**
             * 视屏号码转换
             * decoder_type=activeX;type=CHN;PT=98;Format=H264;addr=192.168.1.27:10378;a=sendrecv;call_number=1004;local_port=31018
             */
            parserVideoTel:function(value){
                var tel = "";
                var array = value.split(";");
                $.each(array,function(i,s){
                    var a = s.split("=");
                    if(a[0] == "call_number"){
                        tel = a[1];
                    }
                });
                return tel;
            }
        }
    }

    /**
     * 对外开放数据解析方法
     * @type {{parserVideoTel: DispatchAPI.operations.utils.parserVideoTel}}
     */
    DispatchAPI.utils={
        parserVideoTel:function(tel){
                    return DispatchHelper.UTIL.parserVideoTel(tel);
                }
    }

    /**
     * dispatch 操作
     * @type {{}}
     */
    DispatchAPI.operations = {
        /**
         * 号码呼叫
         */
        makeCall: function (tel) {
            dispatch.calls.makeCall(tel, "");
        },
        /**
         * 视频呼叫
         * parser: boolean 是否需要解析
         */
        makeVideoCall: function (tel,parser) {
            if(parser){
                tel = DispatchHelper.UTIL.parserVideoTel(tel);
            }
            dispatch.calls.makeVideoCall(tel, "");
        },
        /**
         * 挂机
         */
        hungUp: function (tel) {
            dispatch.calls.hungUp(tel);
        },
        /**
         * 选呼
         * tels var tels = new Array(3)；arr[0] = "George"
         */
        selectCall: function (tels) {
            dispatch.calls.selectCall(tels);
        },
        /**
         语音广播(广播)
         tels var tels = new Array(3)；arr[0] = "George"
         files :通知录音（notify）是直接填入service_db中的RECORD_NOTIFY上记录录音文件名称
         传入文字类型（text）是直接传文字内容字符窜
         notify : 通知音录音，call_record : 通话录音，text : TTS（playfile携带文字）。
         time ： 1
         notifyId ： ""
         confirm ： accept=1;refuse=2;
         */
        selectNotify: function (tels, files, type, times, notifyId, confirm) {
            times = DispatchHelper.UTIL.isEmpty(times) ? 1 : times;
            confirm = DispatchHelper.UTIL.isEmpty(confirm) ? "accept=1;refuse=2;" : confirm;
            dispatch.calls.selectNotify(tels, files, type, times, notifyId, confirm);
        },
        /**
         * 关闭广播
         */
        selectCancel:function(){
            dispatch.calls.selectCancel();
        },
        /**
         * 绑定dispatch监听
         * 这里需要解绑之前注册的监听方法，是为了防止出现“不能执行已释放的Script代码”错误
         * pageKey : 区分页面
         * evtType ： 区分事件类型
         */
        listen:function(evtType, func, pageKey){
            var key = evtType + "_" + pageKey;
            if(DispatchHelper.CACHE.funcMap[key] && 'function' == typeof DispatchHelper.CACHE.funcMap[key]){
                scooper.dispatch.unlisten(evtType, DispatchHelper.CACHE.funcMap[key]);
            }
            scooper.dispatch.listen(evtType, func);
            DispatchHelper.CACHE.funcMap[key] = func;
        }
    }

    window.DispatchAPI = DispatchAPI;
});