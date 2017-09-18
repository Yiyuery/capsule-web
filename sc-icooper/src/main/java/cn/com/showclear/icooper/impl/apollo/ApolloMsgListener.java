package cn.com.showclear.icooper.impl.apollo;

import cn.showclear.msg.queue.service.mqtt.IMsgListener;
import cn.showclear.msg.queue.service.mqtt.Subscribe;
import cn.showclear.msg.queue.service.vo.MessageModel;

/**
 * 指定频道监听 消息队列监听器
 * @author YF-XIACHAOYANG
 * @date 2017/9/13 11:30
 */
public class ApolloMsgListener implements IMsgListener {

    /**
     * 推送
     * @param topic
     * @param message
     */
    @Subscribe("/utio/app/main/publish")
    public void receiveEvent(String topic, MessageModel message){
        System.out.println("注解获取/utio/app/publish：主题【" + topic + "】:" + message.toString());
    }

    /**
     * 上报人接收  xyc
     * @param topic
     * @param message
     */
    @Subscribe("/utio/app/7c76a9d548f7445e992ab892454a0992_8/publish")
    public void reportUserEvent(String topic, MessageModel message){
        System.out.println("注解获取/utio/app/publish：主题【" + topic + "】:" + message.toString());
    }

    /**
     * 上报人接收  test
     * @param topic
     * @param message
     */
    @Subscribe("/utio/app/33934e7ffc3640059784a14f1c925710_2/publish")
    public void reportUser1Event(String topic, MessageModel message){
        System.out.println("注解获取/utio/app/publish：主题【" + topic + "】:" + message.toString());
    }
}
