/**
 * 自定义常用工具组件
 * 此处只管理一些基础方法[静态]
 * if 需要实例化对象
 *      请使用工厂类来管理
 */
define(['jquery'], function ($) {

    var Plugin = {},
        //参数缓存对象
        defaults = {};
    var contextPath = window.top.main.contextPath;
    /**
     * 网络请求相关
     */
    Plugin.httpUtil = {
        getUrlParaByKey: function (key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return '';
            }
        },
        /**
         * 解析获取集合对象
         * @param url
         */
        parserUrlParas: function (url) {
            var paras = [];
            if (url.indexOf('?') > 0) {
                var index = url.indexOf('?');
                var str = url.substring(index + 1);
                var sArr = str.split('&');
                for (var i = 0; i < sArr.length; i++) {
                    var kv = sArr[i].split("=");
                    paras[kv[0]] = unescape(kv[1]);
                }
            }
            return paras;
        }
    };

    /**
     * String操作相关
     */
    Plugin.stringUtil = {

        /**
         * 添加url前缀
         * @param url
         * @returns {string}
         */
        addPreUrl: function (url, paras) {
            var baseUrl = contextPath + url;
            if (paras) {
                var p = [];
                for (var key in paras) {
                    p.push(key + "=" + paras[key]);
                }
                baseUrl += "?" + p.join("&");
            }
            return baseUrl;
        },

        /**
         * 判断是否是非法字符
         * '',undefined,'null',null
         * @param val
         * @returns {boolean}
         */
        isIllegalVal: function (val, type) {
            var illegal = ['', undefined, null, 'null'];
            var rel = false;
            for (var i in illegal) {
                if (illegal[i] == val) {
                    rel = true;
                }
            }
            switch (type) {
                case 'boolean': break;
                case 'string': rel = rel ? '' : val; break;
                case 'number': rel = rel ? -1 : val;
                    break;
                default: break;
            }
            return rel;
        },
        /**
         * 阿拉伯数字转中文数字,
         * 如果传入数字时则最多处理到21位，超过21位js会自动将数字表示成科学计数法，导致精度丢失和处理出错
         * 传入数字字符串则没有限制
         * @param {number|string} digit
         */
        toZhDigit: function (digit) {
            digit = typeof digit === 'number' ? String(digit) : digit;
            const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            const unit = ['千', '百', '十', ''];
            const quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];

            let breakLen = Math.ceil(digit.length / 4);
            let notBreakSegment = digit.length % 4 || 4;
            let segment;
            let zeroFlag = [], allZeroFlag = [];
            let result = '';

            while (breakLen > 0) {
                if (!result) { // 第一次执行
                    segment = digit.slice(0, notBreakSegment);
                    let segmentLen = segment.length;
                    for (let i = 0; i < segmentLen; i++) {
                        if (segment[i] != 0) {
                            if (zeroFlag.length > 0) {
                                result += '零' + zh[segment[i]] + unit[4 - segmentLen + i];
                                // 判断是否需要加上 quot 单位
                                if (i === segmentLen - 1 && breakLen > 1) {
                                    result += quot[breakLen - 2];
                                }
                                zeroFlag.length = 0;
                            } else {
                                result += zh[segment[i]] + unit[4 - segmentLen + i];
                                if (i === segmentLen - 1 && breakLen > 1) {
                                    result += quot[breakLen - 2];
                                }
                            }
                        } else {
                            // 处理为 0 的情形
                            if (segmentLen == 1) {
                                result += zh[segment[i]];
                                break;
                            }
                            zeroFlag.push(segment[i]);
                            continue;
                        }
                    }
                } else {
                    segment = digit.slice(notBreakSegment, notBreakSegment + 4);
                    notBreakSegment += 4;

                    for (let j = 0; j < segment.length; j++) {
                        if (segment[j] != 0) {
                            if (zeroFlag.length > 0) {
                                // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
                                if (j === 0) {
                                    result += quot[breakLen - 1] + zh[segment[j]] + unit[j];
                                } else {
                                    result += '零' + zh[segment[j]] + unit[j];
                                }
                                zeroFlag.length = 0;
                            } else {
                                result += zh[segment[j]] + unit[j];
                            }
                            // 判断是否需要加上 quot 单位
                            if (j === segment.length - 1 && breakLen > 1) {
                                result += quot[breakLen - 2];
                            }
                        } else {
                            // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
                            if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
                                result += quot[breakLen - 1];
                                zeroFlag.length = 0;
                                zeroFlag.push(segment[j]);
                            } else if (allZeroFlag.length > 0) {
                                // 执行到最后
                                if (breakLen == 1) {
                                    result += '';
                                } else {
                                    zeroFlag.length = 0;
                                }
                            } else {
                                zeroFlag.push(segment[j]);
                            }

                            if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
                                // 如果执行到末尾
                                if (breakLen === 1) {
                                    allZeroFlag.length = 0;
                                    zeroFlag.length = 0;
                                    result += quot[breakLen - 1];
                                } else {
                                    allZeroFlag.push(segment[j]);
                                }
                            }
                            continue;
                        }
                    }


                    --breakLen;
                }

                return result;
            }
        }
    }

    /**
     * 延时等基本操作
     * @type {{}}
     */
    Plugin.baseUtil = {
        /**
         * 延迟执行函数
         * @param sec
         * @param func
         */
        delay: function (sec, func) {
            setTimeout(function () {
                func();
            }, sec * 1000);
        },
        /**
         * 判断是不是空对象
         */
        isEmptyObject: function (e) {
            var t;
            for (t in e)
                return !1;
            return !0
        }
    }

    /**
     * 时间相关
     */
    Plugin.timeUtil = {
        /**
         * 时间格式化
         */
        dateFmt: function (date, fmt) {

            function lessTenFmt(n) {
                return n < 10 ? ("0" + n) : n;
            }

            var dateTemp = new Date();
            if (date instanceof Date) {
                dateTemp = date;
            } else if (date != "") {
                dateTemp = new Date(date.replace(/-/g, "/"));
            }
            var year = dateTemp.getFullYear();
            var month = dateTemp.getMonth() + 1;
            var day = dateTemp.getDate();
            var hour = dateTemp.getHours();
            var min = dateTemp.getMinutes();
            var sec = dateTemp.getSeconds();
            var week = dateTemp.getDay();
            var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            var fmt = fmt;
            if (fmt == undefined) {
                fmt = 'yyyy/MM/dd HH:mm:ss';
            }
            if (fmt == 'yyyy-MM-dd') {
                var rel = year + "-" + lessTenFmt(month) + "-" + lessTenFmt(day);
                return rel;
            }
            if (fmt == 'yyyy/MM/dd HH:mm:ss') {
                var rel = year + "/" + lessTenFmt(month) + "/" + lessTenFmt(day) + " " + lessTenFmt(hour) + ":" + lessTenFmt(min) + ":" + lessTenFmt(sec);
                return rel;
            }
            if (fmt == 'yyyy/MM/dd HH:mm') {
                var rel = year + "/" + lessTenFmt(month) + "/" + lessTenFmt(day) + " " + lessTenFmt(hour) + ":" + lessTenFmt(min);
                return rel;
            }
            if (fmt == 'yyyy-MM-dd HH:mm:ss') {
                var rel = year + "-" + lessTenFmt(month) + "-" + lessTenFmt(day) + " " + lessTenFmt(hour) + ":" + lessTenFmt(min) + ":" + lessTenFmt(sec);
                return rel;
            }
            if (fmt == 'yyyy/MM/dd') {
                var rel = year + "/" + lessTenFmt(month) + "/" + lessTenFmt(day);
                return rel;
            }
            if (fmt == 'HH:mm:ss') {
                var rel = lessTenFmt(hour) + ":" + lessTenFmt(min) + ":" + lessTenFmt(sec);
                return rel;
            }
            if (fmt == 'HH:mm') {
                var rel = lessTenFmt(hour) + ":" + lessTenFmt(min);
                return rel;
            }
            if (fmt == 'week') {
                var rel = weekArr[parseInt(week)];
                return rel;
            }
            if (fmt == 'MM/dd HH:mm:ss') {
                var rel = lessTenFmt(month) + "/" + lessTenFmt(day) + " " + lessTenFmt(hour) + ":" + lessTenFmt(min) + ":" + lessTenFmt(sec);
                return rel;
            }
            if (fmt == 'yyyyMMdd') {
                var rel = year + lessTenFmt(month) + lessTenFmt(day);
                return rel;
            }
            if (fmt == 'yyyyMMddHHmmss') {
                var rel = "" + year + lessTenFmt(month) + lessTenFmt(day) + lessTenFmt(hour) + lessTenFmt(min) + lessTenFmt(sec);
                return rel;
            }

            if (fmt == 'yyMMddHHmmss') {
                var rel = ("" + year).substring(2) + lessTenFmt(month) + lessTenFmt(day) + lessTenFmt(hour) + lessTenFmt(min) + lessTenFmt(sec);
                return rel;
            }

            if (fmt == '天小时') {
                var rel = lessTenFmt(day) + "天" + lessTenFmt(hour) + "小时";
                return rel;
            }
            return '';
        },

        /**
         * 获取时间戳
         */
        getTimeStamp: function () {
            return this.dateFmt(new Date(), 'yyMMddssHHmm');
        },
        /**
         * 获取diffNum天后的日期 [diffNum>0]
         * 获取diffNum天前的日期 [diffNum<0]
         */
        getDiffDate: function (keyTime, diffNum, fmt) {
            var diffDate = new Date(keyTime);
            diffDate.setDate(diffDate.getDate() + diffNum);//获取AddDayCount天后的日期
            if (!fmt) {
                fmt = 'yyyy/MM/dd ss:HH:mm';
            }
            return this.dateFmt(diffDate, fmt);
        },
        /**
         * 计算时间差 time1>time2
         * @param time2
         * @param time1
         * @returns {string}
         */
        calculateTime: function (time2, time1) {
            var t1 = new Date(time1);
            var t2 = new Date(time2);
            var s1 = t1.getTime();
            var s2 = t2.getTime();
            var total = (s1 - s2) / 1000;
            var day = parseInt(total / (24 * 60 * 60));
            var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
            var hour = parseInt(afterDay / (60 * 60))
            var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
            var min = parseInt(afterHour / 60);//计算整数分
            var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数

            var rel = "";
            if (day != 0) {
                rel += day + '天';
            }
            if (hour != 0) {
                rel += hour + '小时';
            }
            if (min != 0) {
                rel += min + '分';
            }
            if (afterMin != 0) {
                rel += afterMin + '秒';
            }
            if (rel == "") {
                rel = "0秒";
            }
            return rel;
        },
        /**
         * t2 > t1 返回 true
         * @param t1
         * @param t2
         * @returns {boolean}
         */
        isBefore: function (ta, tb) {
            var t1 = new Date(ta);
            var t2 = new Date(tb);
            var s1 = t1.getTime();
            var s2 = t2.getTime();
            return (s2 - s1) > 0;
        }

    }

    /**
     * 暂未分类
     * @type {{}}
     */
    Plugin.commonUtil = {
        /**
         * enter键 回调函数
         * @param func
         * @constructor
         */
        Enter: function (func) {
            document.onkeydown = function (e) {
                var ev = document.all ? window.event : e;
                if (ev.keyCode == 13) {
                    if (func != undefined)
                        func();
                }
            };
        }
    }

    /**
     * 验证
     * @type {{}}
     *
     * {"required":false, "format":"string"}
     * {"required":false, "format":"cust","regexp":""}
     */
    Plugin.validateUtil = {
        /**
         * 初始化
         * @param containerID
         * @returns {boolean}
         */
        init: function (containerID) {
            var objArr = $("#" + containerID + " .sc_validate");
            for (var i = 0; i < objArr.length; i++) {
                var obj = objArr[i];
                if (!this.validateObj(obj)) {
                    return false;
                }
            }
            return true;
        },
        /**
         * 验证
         * @param obj
         * @returns {boolean}
         */
        validateObj: function (obj) {
            var objName = $(obj).attr("title");
            var objVal = $(obj).val();
            var validateStr = $(obj).attr("scvalidate");
            if (this.isEmpty(validateStr)) {
                validateStr = '{"required":false, "format":"string"}';
            }
            var validateObj = $.parseJSON(validateStr);
            var required = validateObj.required;
            if (this.isEmpty(objVal)) {
                if (required) {
                    this.msgNotify(obj, '请输入' + objName);
                    return false;
                }
            } else {
                var format = validateObj.format ? validateObj.format : "string";
                if (format == 'custom') {
                    var regexp = validateObj.regexp ? validateObj.regexp : "\w+";
                    if (this.isEmpty(regexp)) {
                        regexp = "\w+";
                    }
                    if (!this.isValid(objVal, regexp)) {
                        this.msgNotify(obj, '您输入的' + objName + '格式错误，请重新输入！');
                        return false;
                    }
                } else {
                    if (!this.validateValue(format, objVal)) {
                        this.msgNotify(obj, '您输入的' + objName + '格式错误，请重新输入！');
                        return false;
                    }
                }
            }
            return true;
        },

        /**
         * 自定义正则
         * @param s
         * @param regexp
         * @returns {boolean}
         */
        isValid: function (s, regexp) {
            var model = new RegExp('^' + regexp + '$');
            return model.test(s);
        },

        isPassword: function (s) {
            var model = /^([0-9a-zA-Z]|_){6,16}$/;
            return model.test(s);
        },

        isString: function (s) {
            var model = /^.+$/; 	//RegExp
            var rel = model.test(s);
            //非法字符校验
            if (rel) {
                var illegal = /[^%&'?$\x22]+$/;
                rel = illegal.test(s);
            }
            return rel;
        },

        /**
         * 数字
         * @param s
         * @returns {boolean}
         */
        isDigits: function (s) {
            var model = /^\d+$/;
            return model.test(s);
        },

        //验证数字
        isNumber: function (s) {
            var model = /^[0-9]\d*$/;
            var rel = model.test(s);
            return rel;
        },

        //验证IP
        isIp: function (s) {
            var ip = '(25[0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})';
            var ipdot = ip + '\\.';
            var model = new RegExp('^' + ipdot + ipdot + ipdot + ip + '$');
            return model.test(s);
        },

        //验证端口
        isPort: function (s) {
            return this.isDigits(s) && parseInt(s) < 65535;
        },

        //验证经度
        isLongitude: function (s) {
            var model = /^-?((0|[1-9]\d?|1[1-7]\d)(\.\d{1,6})?|180(\.0{1,6})?)?$/;
            var rel = model.test(s);
            return rel;
        },

        //验证纬度
        isLatitude: function (s) {
            var model = /^-?((0|[1-8]\d|)(\.\d{1,6})?|90(\.0{1,6})?)?$/;
            var rel = model.test(s);
            return rel;
        },

        //验证11位手机号
        isPhone: function (s) {
            var model = this.regexpFmt(2);
            var rel = model.test(s);
            return rel;
        },

        //是否为空
        isEmpty: function (s) {
            return s == undefined || s == '' || s == null;
        },

        /**
         * 常用正则库
         */
        regexpFmt: function (key) {
            /**
             * 1、非法字符校验 [单引号] <防止入侵，数据泄露>
             * 2、11位手机号
             * 3、0/00-23小时
             * 4、0/00-59分钟
             */
            var model = /^.+$/;
            switch (key) {
                case 1: model = /[^%&'?$\x22]$/; break;
                case 2: model = /^1\d{10}$/; break;
                case 3: model = /^(0?[0-9]|1[0-9]|2[0-3])$/; break;
                case 3: model = /^(0?[0-9]|[1-5][0-9])$/; break;
                default: break;
            }
            return model;
        },

        msgNotify: function (obj, msg) {
            layer.tips(msg, obj, {
                style: ['background-color:#78BA32; color:#fff', '#78BA32'],
                maxWidth: 185,
                time: 2000
            });
        },

        validateValue: function (format, value) {
            switch (format) {
                case 'string': return this.isString(value);
                case 'digits': return this.isDigits(value);
                case 'number': return this.isNumber(value);
                case 'ip': return this.isIp(value);
                case 'port': return this.isPort(value);
                case 'lng': return this.isLongitude(value);
                case 'lat': return this.isLatitude(value);
                case 'phone': return this.isPhone(value);
                case 'password': return this.isPassword(value);
                default: return false;
            }
        }

    }

    /**
     * map等集合对象 辅助方法
     * @type {{}}
     */
    Plugin.mapUtils = {
        /**
         * 递归遍历获取属性值
         * @param obj
         * @param key
         * @param type 0/1 -> string/int 默认为string
         */
        getValBykeyInObj: function (obj, key, type) {
            var val = "";
            for (var ele in obj) {
                if (ele == key && obj[ele].length == 1) {
                    val = obj[key];
                    break;
                } else if (ele.length > 1) {
                    val = arguments.callee(ele, key);
                }
            }
            switch (type) {
                case 0: break;
                case 1:
                    val = parseInt(val);
                    break;
                default: break;
            }
            return val;
        },
        isValid: function (obj) {
            if (obj) {
                return obj;
            } else {
                return "";
            }
        }

    }

    /**
     * 数组工具
     * @type {{contains: contains}}
     */
    Plugin.arrayUtil = {
        /**
         * arr中是否包含obj 自定义主键key
         */
        contains: function (arr, obj, key) {
            var rel = false;
            if (arr.length == 0) {
                return rel;
            } else {
                $.each(arr, function (i, item) {
                    if (item[key] == undefined || obj[key] == undefined) {
                        return rel;
                    } else if (item[key] == obj[key]) {
                        rel = true;
                    }
                });
            }
            return rel;
        }
    }

    /**
     * 获取登录用户 cookie 信息
     * @type {{}}
     */
    Plugin.sessionUtil = {
        /**
         * get cookie by key
         * @param key
         * @returns {*}
         */
        cookie: function (key) {
            var map = document.cookie;
            if (map == "") {
                return "";
            }
            map = map.split("; ");
            var set = [];
            $.each(map, function (i, obj) {
                var temp = obj.split("=");
                set[temp[0]] = temp[1];
            });

            if (set[key] == undefined) {
                return "";
            } else {
                return set[key];
            }
        },
        /**
         * 添加Cookie
         * @param cname
         * @param cvalue
         * @param exdays
         */
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires;
        }
    }

    /**
     * 对于非 AMD 规范提供的接口
     * @type {{}}
     */
    window.capsule = window.capsule || {};
    if (Plugin.baseUtil.isEmptyObject(window.capsule)) window.capsule = Plugin;

    return Plugin;
});