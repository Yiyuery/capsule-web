package cn.com.showclear.config;

import cn.com.showclear.icooper.impl.apollo.ApolloMsgListener;
import cn.com.showclear.icooper.impl.apollo.ApolloReceiver;
import cn.showclear.msg.queue.service.mqtt.IMqttReceiveEvent;
import cn.showclear.msg.queue.service.mqtt.manage.MqttManagerImpl;
import cn.showclear.msg.queue.service.vo.ConfigBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Apollo配置加载
 * @author YF-XIACHAOYANG
 * @date 2017/9/13 9:58
 */
//@Configuration
public class ApolloConfig {

    @Value("${apollo.url}")
    String apolloUrl;
    @Value("${apollo.reconnectTime}")
    int apolloReconnectTime;
    @Value("${apollo.msgQueueSize}")
    int apolloMsgQueueSize;

    /**
     * 创建配置实例
     */
    @Bean
    public ConfigBean configBean(){
        return new ConfigBean(apolloUrl, apolloReconnectTime, apolloMsgQueueSize);
    }

    @Bean
    public MqttManagerImpl mqttManagerImpl(){
        /**
         * 继承消息队列管理接口
         */
        MqttManagerImpl mqttManger = new MqttManagerImpl();

        /**
         * 添加配置
         */
        mqttManger.setConfBean(configBean());


        /**
         * 接收
         */
        IMqttReceiveEvent mqttReceiveEvent = new ApolloReceiver();
        mqttManger.setReceiveEvent(mqttReceiveEvent);


        /**
         * 动态添加消息订阅回调
         */
        mqttManger.addReciveMsgHandle(new ApolloMsgListener());

        /**
         * 批量添加消息订阅
         */
//        List<IMsgListener> msgListener = new ArrayList<IMsgListener>();
//        msgListener.add(new ApolloMsgListener());
//        mqttManger.setMsgListeners(msgListener);


            /**
             * 连接
             */
        mqttManger.connect();
        return mqttManger;
    }
}
