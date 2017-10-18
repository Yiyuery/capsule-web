/**
 * 自定义工具类
 */
declare interface httpUtil {
    /**
     * 获取请求参数
     */
    getUrlParaByKey(key: string): string;
    /**
     * 解析获取集合对象
     * @param url
     */
    parserUrlParas(key: string): object;
}

declare class getUrlParaByKey{
     constructor(key: string);
}

declare class parserUrlParas{
     constructor(key: string);
}


declare interface stringUtil {
    /**
     * 添加url前缀
     */
    addPreUrl(url: string, paras?: object): string;
    /**
     * 判断是否是非法字符
     * '',undefined,'null',null
     * @param val
     * @returns {boolean}
     */
    isIllegalVal(val: string,type ?: string): any;
    /**
     * 阿拉伯数字转中文
     */
    toZhDigit(num:number):string;
}

declare class addPreUrl{
     constructor(url: string, paras: object);
}
declare class isIllegalVal{
     constructor(val: string);
}

declare interface timeUtil {
    /**
     * 时间格式化
     */
    dateFmt(date:Date,fmt:string): string;    
}

declare interface commonUtil {
    /**
     * 回车搜索回调
     */
    Enter(func:Function): void;    
}

declare interface arrayUtil {
    /**
     * 回车搜索回调
     */
    contains(arr:Array<any>, obj:any, key:string): boolean;    
}

let plugin= {
        httpUtil: httpUtil,
        stringUtil: stringUtil,
        timeUtil:timeUtil,
        commonUtil:commonUtil,
        arrayUtil:arrayUtil    
    };

declare module "capsule" {  
    export = plugin 
}