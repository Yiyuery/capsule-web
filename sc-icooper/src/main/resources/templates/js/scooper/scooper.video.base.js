/**
 * Created by Yiyuery on 2017/7/18.
 * TODO:视频 OCX插件
 * Author: Yiyuery
 * Version: 1.0.0.1
 *
 * 未完成：
 * 1. 链式调用closeVideo方法
 * 2. 设置分屏
 *
 *
 * 调用方式：

 打开：（自动）
  $(document).ScVideo({
                    autoPlay:true,
                    devId:'6000',
                    user: 'test',
                    password: '1',
                    server: '192.168.106.45',
                    port:'25100'
                });

 打开：非自动
     $(document).ScVideo({
                        devId:'6000',
                        user: 'test',
                        password: '1',
                        server: '192.168.106.45',
                        port:'25100'
                    });

    $(document).ScVideo({
        method : 'playVideo',
        args:[6000]
    });

 关闭：
    $(document).ScVideo('closeVideo');

 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define(["jquery"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {

    /**
     * 插件主体
     * @param ele
     * @param opts
     */
    var videoPlugin = function (ele, opts) {
        this._init(ele, opts);
    };

    /**
     * 参数容器缓存
     * @type {{}}
     */
    var defaults={

    };

    /**
     * 默认配置项
     * @type {{cutNumber: number, user: string, password: string, ip: string, port: string, container: string, path: string, name: string}}
     */
    videoPlugin.SETTINGS = {
        /**
         * 默认分屏数
         */
        cutNumber: 1,
        /**
         * 操作员账号和密码
         */
        user: 'test',
        password: '123456',
        /**
         * video-server
         */
        server: '192.168.106.45',
        /**
         * 端口号
         */
        port: '25100',
        /**
         * 容器
         */
        container: '',
        /**
         * 插件下载路径
         */
        path: '/utio-web/videoData/video/load/activeX.zip',
        /**
         * Object Name
         */
        name: 'NvrTest',
        /**
         * 初始化后自动播放
         */
        autoPlay:false,
        /**
         * 模式 1 、2
         * 1. 初始化一次
         * 2. 每次都初始化
         */
        mode:1,
        /**
         * 是否完成容器内视频插件初始化
         */
        isInit:false
    };

    /**
     * 私有方法
     * @type {{}}
     */
    var privUtils = {

        /**
         * 检查是否是IE浏览器
         */
        isIE: function () {
            var s = navigator.userAgent;
            return  s.indexOf('MSIE') > 0 || s.indexOf('.NET') > 0;
        },
        /**
         * 检查插件安装
         * @returns
         */
        checkSetup: function (func) {
            try {
                var ax = new ActiveXObject("SCOOPERWEBVIDEO.ScooperWebVideoCtrl.1");
                console.info("ActiveX已安装！");
            } catch (e) {
                console.log(e);
                if (e.name == 'TypeError') {
                    console.info("ActiveX需要升级！");
                    $('#' + defaults.name).hide();
                } else {
                    console.info("ActiveX未安装！");
                    $('#' + defaults.name).hide();
                }
                privUtils.confirmSetup();
            }
            func();
        },
        /**
         * 验证插件安装
         * @returns
         */
        confirmSetup: function () {
            layer.confirm("视频ActiveX插件未安装，是否安装？", {
                btn: ['安装', '取消']
            }, function (index, layero) {
               privUtils.downloadFile();
                layer.close(index);
            }, function (index) {
                layer.close(index);
            });
        },
        /**
         * 提示
         * @param msg
         */
        alert: function (msg) {
            if (window.layer != undefined || layer != undefined) {
                layer.msg(msg);
            } else {
                window.alert(msg);
            }
        },
        downloadFile: function () {
            if (defaults.path == "") {
                return;
            }
            var downloadFrame = $('#downloadFrame');
            if (downloadFrame.length == 0) {
                downloadFrame = $('<iframe id="downloadFrame" src="" style="display:none"></iframe>');
                $('body').append(downloadFrame);
            }
            downloadFrame.attr('src', defaults.path);
        },
        /**
         * 原生方法 getElementById
         * @private
         */
        _:function(id){
            if (typeof(id) == 'string') return document.getElementById(id);
            return id;
        }

    }

    /**
     * 插件方法扩充
     * @type {{}}
     */
    videoPlugin.prototype = {
        /**
         * 初始化
         */
        _init: function (ele,opts) {
            this.element = ele;
            var opts = typeof opts === "object" ? opts : {};
            this.options = $.extend({}, videoPlugin.SETTINGS, opts);
            defaults = this.options;

            var $this = $(this.element),
                _this = this;
            _this.options.container = $this;

            _this.pluginStateCheck(function () {
                _this.createActiveObject();
                /**
                 * 初始化延迟 [初始化OCX控件时间]
                 * 解决视频流正常获取无法展示的问题
                 */
                setTimeout(function(){
                    _this.initLogin();
                    _this.initScreenMode();
                    if(_this.options.autoPlay){
                        _this.playVideo(_this.options.devId);
                    }
                },1000);
            });

        },
        /**
         * 初始化分屏
         */
        initScreenMode:function(){
            var resp = privUtils._(defaults.name).SCWebDecoderSetScreenMode(defaults.cutNumber);
            console.log("[ ScVideo ] - screen mode -----> " + resp);
        },
        /**
         * 创建 Active-Object 对象
         */
        createActiveObject: function () {
            if (!defaults.isInit) {
                /**
                 *  遮罩隐藏
                 */
                this.options.container.children().not('.sc-video-ocx').hide();
                /**
                 * 创建OCX
                 */
                this.options.container.append('<OBJECT class="sc-video-ocx" style="position:relative;top:0px;" id="' + defaults.name + '" name="' + defaults.name + '" classid="clsid:5D62BFBF-7B2D-4E9E-A359-5228400C77BC" width=100% height=100% ></OBJECT>')
                defaults.isInit = true;
            }

            /**
             * 内置初始化方法
             */
            privUtils._(defaults.name).ScWebDecoderInit(0);
        },
        /**
         * 插件运行环境检查
         * @param func
         */
        pluginStateCheck: function (func) {
            if (!privUtils.isIE()) {
                privUtils.alert("不支持非IE环境!");
            } else {
                privUtils.checkSetup(func);
            }
        },
        /**
         * 向 video-server 注册登录信息
         */
        initLogin: function () {
            var _this = this;
            var obj = privUtils._(defaults.name);
            try {
                var login = obj.SCWebDecoderLoginInVs(defaults.user, defaults.password, defaults.server, defaults.port);
                var setinit = obj.SCWebSetPtzButtonLayout("");
                console.log("[ ScVideo ] - login succ:" + login);
            } catch (e) {
                console.log("[ ScVideo ] - ocx register fail！-----> " + e);
            }
        },
        /**
         * 播放视频
         */
        playVideo: function (devId) {
            try {
                var obj = privUtils._(defaults.name);
                this.initScreenMode();
                var freeWindow = obj.SCWebGetFreeWindows();
                if (freeWindow == "") {
                    obj.SCWebSetCurrentWindow(0);
                } else {
                    var win = freeWindow.split(",")[0];
                    obj.SCWebSetCurrentWindow(parseInt(win));
                }
                if(devId instanceof Array){
                    devId = devId[0];
                }
                var play = obj.SCWebRealPlay(devId, 0);
                console.log("[ ScVideo ] - play: " + play);
            } catch (e) {
                console.log("[ ScVideo ] - play fail！------> " + e);
            }
        },
        /**
         *关闭视频
         */
        closeVideo: function () {
            var obj = privUtils._(defaults.name);
            var win = obj.SCWebGetCurrentPlayID();
            if (win > 0) {
                var close = obj.SCWebStopRealPlay(win);
                console.log("[ ScVideo ] - close:" + close);

                if(this.options.mode == 2){
                    /**
                     * 销毁当前Object对象 降低内存占用效果不明显
                     */
                    obj.SCWebDecoderDestroy();
                    setTimeout(function(){
                        /**
                         * 遮罩开启
                         */
                        $(obj).parent().children().show();
                        /**
                         * 清除 Dom
                         */
                        $(obj).remove();

                    },1000);
                }


            } else {
                return false;
            }
        }
    }

    //可扩展
    $.fn.ScVideo = function (options) {

        return this.each(function () {
            //提示当前对象的dom节点名称,这里的this关键字都指向一个不同的DOM元素（每次都是一个不同的匹配元素）。
            var $this = $(this);
            //获取缓存数据
            var plugin = $this.data("ScVideo");
            if (!plugin) {
                plugin = new videoPlugin(this, options);
                // 缓存插件
                $this.data("ScVideo", plugin);
            }else{

                if(options.mode && options.mode == 2){
                    /**
                     * 利用插件缓存对象重新向VideoServer 注册登录并获取视频流
                     */
                    plugin._init(this,options);
                }

            }
            // 调用方法
            if (typeof options['method'] === "string" && typeof plugin[options['method']] == "function") {
                // 执行插件的方法
                plugin[options['method']].call(plugin, options['args']);
            }
        });
    };

    //暴露类名, 可以通过这个为插件做自定义扩展
    $.fn.ScVideo.Constructor = videoPlugin.prototype;

}));
