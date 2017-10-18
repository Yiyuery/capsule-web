interface vm {
    $id: string;
    $model?: any;
}

interface avalonStatic {
    
    /**
     * define controller
     */
    log(obj1: any, obj2: any, obj3?: any, obj4?: any, obj5?: any, obj6?: any, obj7?: any);
    
    parsers: any;
    filters: any;
    vmodels: any;
    ui: any;
    errors(s: string);
    define(obj: any): any;
    scan(obj?: any);
    config(cfg:any);
    height(ele: any): number;
    width(ele: any): number;
    mix(obj1: any, obj2: any, obj3?: any, obj4?: any, obj5?: any, obj6?: any, obj7?: any): any
    isFunction(s: any): boolean;

    noop: Function;

    ready(fn: Function);

    css(node: any, name: string, value?: string): string;
    nextTicket(fn: Function);
    oneObject(obj: any, val?: any);
    typeof(obj: any);
    isWindow(obj: any);
    isPlainObject(obj: any);
    slice(obj: any, start?: number, end?: number);
    range(start: number, end: number, step: number);
    each(obj: any, fn: Function);
    parseHTML(str): any;
    innerHTML(node: any, str: string);
    clearHTML(node);
    
    // for mmRouter
    router?:any;
    history?:any;
}



declare module "avalon" {
    export = avalon;
}
declare var avalon: avalonStatic;