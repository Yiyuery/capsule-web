package cn.com.showclear.apollo;

import java.util.ArrayList;
import java.util.List;

import cn.showclear.msg.queue.service.mqtt.IMqttReceiveEvent;
import cn.showclear.msg.queue.service.mqtt.IMsgListener;
import cn.showclear.msg.queue.service.mqtt.manage.MqttManagerImpl;
import cn.showclear.msg.queue.service.vo.ConfigBean;
import cn.showclear.msg.queue.service.vo.MessageModel;

//\\192.168.100.61\共享\1、消息服务队列\1、Apollo服务器软件\apollo服务器搭建
public class testMqtt {

	public static void main(String[] args) {

		/**
		 * 创建配置实例
		 */
		ConfigBean configBean = new ConfigBean("tcp://192.168.101.29:61613", 10, 2);

		/**
		 * 继承消息队列管理接口
		 */
		MqttManagerImpl mqttManger = new MqttManagerImpl();

		/**
		 * 添加配置
		 */
		mqttManger.setConfBean(configBean);


		/**
		 * 接收
		 */
		IMqttReceiveEvent mqttReceiveEvent = new Receive();
		mqttManger.setReceiveEvent(mqttReceiveEvent);


		/**
		 * 动态添加消息订阅回调
		 */
		mqttManger.addReciveMsgHandle(new SubEvent());

		/**
		 * 批量添加消息订阅
		 */
		List<IMsgListener> msgListener = new ArrayList<IMsgListener>();
		msgListener.add(new SubEvent());
		msgListener.add(new SubEvent());
		msgListener.add(new SubEvent());
		mqttManger.setMsgListeners(msgListener);

		/**
		 * 连接
		 */
		mqttManger.connect();
		
//		mqttManger.subscribe("/call/status1");
		
		
//		Timer timer = new Timer();
//
//		sendMsg operateScreen = new sendMsg();
//		operateScreen.setMqttManger(mqttManger);
//		timer.schedule(operateScreen, 0, 100);

		/**
		 * 发布主题：提供他人订阅
		 */
		MessageModel messageModel = new MessageModel(1, "add", "lalal", "我就是我");
		mqttManger.publish("/alarm/meet/join", messageModel);
		
	}
	
}
