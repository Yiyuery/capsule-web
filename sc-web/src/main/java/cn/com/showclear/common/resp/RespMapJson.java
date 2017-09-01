package cn.com.showclear.common.resp;
import java.util.HashMap;
import java.util.Map;
/**
 * Created by Yiyuery on 2017/6/18.
 * TODO:
 */
public class RespMapJson {

    private Map<String,Object> resp = new HashMap<String,Object>();
    private int code;
    private Object data;
    private String msg;


    public RespMapJson(int code) {
        this.code = code;
    }

    public RespMapJson(int code, Object obj) {
        this.data = obj;
        this.code = code;
    }

    public RespMapJson put (String key, Object obj){
        resp.put(key,obj);
        return this;
    }

    public RespMapJson setResp(Map<String, Object> resp) {
        this.resp = resp;
        return this;
    }

    public RespMapJson setCode(int code) {
        this.code = code;
        return this;
    }

    public RespMapJson setData(Object data) {
        this.data = data;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public RespMapJson setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public int getCode() {
        return code;
    }

    public Object getData() {
        return data;
    }

    public Map<String, Object> getResp() {
        return resp;
    }

    public static boolean isBaseType(Object obj) {
        return obj instanceof Integer || obj instanceof String || obj instanceof Character || obj instanceof Boolean || obj instanceof Byte || obj instanceof Long || obj instanceof Float || obj instanceof Double;
    }
}
