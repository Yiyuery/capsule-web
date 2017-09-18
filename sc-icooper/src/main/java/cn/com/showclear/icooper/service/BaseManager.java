package cn.com.showclear.icooper.service;

/**
 * 基础管理器
 * @author YF-XIACHAOYANG
 * @date 2017/9/13 9:19
 */
public interface BaseManager {
    /**
     * 启动管理器
     */
    void startup();

    /**
     * 关闭管理器
     */
    void shutdown();
}
