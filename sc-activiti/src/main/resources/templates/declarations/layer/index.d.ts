/**
 * Layer TS接口定义
 */
declare interface msg{     
}

declare interface config{     
}

let layer = {
        msg: msg,
        config:config       
};

declare module "layer" {  
    export = layer 
}