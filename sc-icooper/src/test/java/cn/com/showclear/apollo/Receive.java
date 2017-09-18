package cn.com.showclear.apollo;

import cn.showclear.msg.queue.service.mqtt.IMqttReceiveEvent;
import cn.showclear.msg.queue.service.vo.MessageModel;


public class Receive implements IMqttReceiveEvent{

	public Object doReceiveEvent(String topic, MessageModel message){
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("回调方法获取"+topic+"   "+message.getData().toString());
		return 0;
	}
}
