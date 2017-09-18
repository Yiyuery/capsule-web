package cn.com.showclear.apollo;

import cn.showclear.msg.queue.service.mqtt.IMsgListener;
import cn.showclear.msg.queue.service.mqtt.Subscribe;
import cn.showclear.msg.queue.service.vo.MessageModel;

public class SubEvent implements IMsgListener{

	/**
	 * 自定义注解完成消息订阅
	 * @param topic
	 * @param message
	 */
	@Subscribe("/call/status1")
	public void alarmEvent(String topic, MessageModel message){
		try {
			Thread.sleep(15000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("注解获取/call/status：主题【" + topic + "】:" + message.getData().toString());
	}
	
	
	@Subscribe("/alarm/meet/#")
	public void alarmAdd(String topic, MessageModel message){
		System.out.println("注解获取/alarm/meet/#：主题【" + topic + "】:" + message.toString());
	}
}
