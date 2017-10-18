import $ = require("jquery");
import avalon = require("avalon");

declare var BMap: any;
let mapVM = avalon.define({
    '$id': 'mapVMC',
    /**
     * 定时器对象
     * window.clearInterval(timerKey); 
     */
    timerKey: '',
    /**
     * 位置信息
     */
    location: {
        lng: 0,
        lat: 0
    },
    /**
     * 链接地址（遮罩）
     */
    linkSrc: "#",
    /**
     * 动态加载 baidu-map js资源
     */
    load: function () {
        var $this = this;        
        _privUtils.MAP.init();
        $this.createTimer(3000, function () {
            _privUtils.MAP.regRemoteLocation(function () {
                $this.notify()
            });
        });
    },
    /**
     * 定时器
     * @period 周期 sec/1000
     * @func 回调函数
     */
    createTimer: function (period: number, func: Function) {
        var $this = this;
        $this.timerKey = window.setInterval(func, 3000);
    },
    /**
     * 添加遮罩
     */
    overlay: function () {

    },
    /**
     * 通知后台位置信息
     */
    notify: function () {
        console.log(mapVM.location.lng+","+mapVM.location.lat);
    }
});

let ENUMS = {
    BMAP: {
        //检索成功。对应数值“0”。
        BMAP_STATUS_SUCCESS: 0,
        //城市列表。对应数值“1”。
        BMAP_STATUS_CITY_LIST: 1,
        //位置结果未知。对应数值“2”。
        BMAP_STATUS_UNKNOWN_LOCATION: 2,
        //导航结果未知。对应数值“3”。
        BMAP_STATUS_UNKNOWN_ROUTE: 3,
        //非法密钥。对应数值“4”。
        BMAP_STATUS_INVALID_KEY: 4,
        //非法请求。对应数值“5”。
        BMAP_STATUS_INVALID_REQUEST: 5,
        //没有权限。对应数值“6”。(自 1.1 新增)
        BMAP_STATUS_PERMISSION_DENIED: 6,
        //服务不可用。对应数值“7”。(自 1.1 新增)
        BMAP_STATUS_SERVICE_UNAVAILABLE: 7,
        //	超时。对应数值“8”。(自 1.1 新增)
        BMAP_STATUS_TIMEOUT: 8
    }
}



/**
 * 私有方法集合
 */
var _privUtils = {

    CACHE: {
        geolocation: {},
        map: {}
    },

    /**
     * 公用部分
     */
    COMMON: {
        /**
        * 动态加载js
        */
        loadScript: function (url: string, callback: Function) {
            var script: any = document.createElement("script")
            script.type = "text/javascript";
            if (script.readyState) { //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else { //Others
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    },

    /**
     * 资源加载
     */
    MAP: {
        /**
         * 初始化地图容器对象
         */
        init: function () {
            // 百度地图API功能
            var map = new BMap.Map("mapArea");
            var point = new BMap.Point(116.331398, 39.897445);
            map.centerAndZoom(point, 12);
            _privUtils.CACHE.geolocation = new BMap.Geolocation();
            _privUtils.CACHE.map = map;
        },
        /**
         * 注册远程位置监听
         */
        regRemoteLocation: function (notify: Function) {
            var geolocation: any = _privUtils.CACHE.geolocation;
            var map: any = _privUtils.CACHE.map;
            geolocation.getCurrentPosition(function (r: any) {
                if (geolocation.getStatus() == ENUMS.BMAP.BMAP_STATUS_SUCCESS) {
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    mapVM.location.lng = r.point.lng;
                    mapVM.location.lat = r.point.lat;
                    notify();
                }
                else {
                    console.log('failed' + geolocation.getStatus());
                }
            }, { enableHighAccuracy: true })
        }
    },
    /**
     * 后台接口通知
     */
    REST: {
        /**
         * 通知
         */
        notify: function (lng: number, lat: number) {

        }
    },
    /**
     * 核心管理
     */
    BASE: {
        init: function () {
            mapVM.load();
        }
    }

}

/**
 * 初始化
 */
avalon.ready(function () {
    _privUtils.BASE.init();
});

avalon.scan(document.body);

/**
 * 20171117
 * 只能获取省市信息
 */