package cn.com.showclear.apollo;

import java.util.TimerTask;

import cn.showclear.msg.queue.service.mqtt.manage.MqttManagerImpl;
import cn.showclear.msg.queue.service.vo.MessageModel;

public class sendMsg extends TimerTask {

	MqttManagerImpl mqttManger;
	
	static int i=0;
	
	public  void setMqttManger(MqttManagerImpl mqttManger) {
		this.mqttManger = mqttManger;
	} 
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		MessageModel messageModel = new MessageModel(1, "add", "lalal"+ ++i, "我就是我");
		mqttManger.publish("/call/status1", messageModel);
	}


}
