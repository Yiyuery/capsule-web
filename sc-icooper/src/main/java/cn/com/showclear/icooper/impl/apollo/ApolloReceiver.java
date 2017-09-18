package cn.com.showclear.icooper.impl.apollo;

import cn.showclear.msg.queue.service.mqtt.IMqttReceiveEvent;
import cn.showclear.msg.queue.service.vo.MessageModel;

/**
 * 消息队列接收器
 * @author YF-XIACHAOYANG
 * @date 2017/9/13 11:24
 */
public class ApolloReceiver implements IMqttReceiveEvent {

    /**
     * 接收所有消息推送
     * @param topic
     * @param message
     * @return
     */
    @Override
    public Object doReceiveEvent(String topic, MessageModel message) {
        System.out.println("回调方法获取"+topic+"   "+message.getData().toString());
        return 0;
    }
}
