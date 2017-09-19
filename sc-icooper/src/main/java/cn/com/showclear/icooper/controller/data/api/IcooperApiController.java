package cn.com.showclear.icooper.controller.data.api;
import cn.showclear.msg.queue.service.mqtt.manage.MqttManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 接口测试
 * @author YF-XIACHAOYANG
 * @date 2017/8/29 12:58
 */
@RestController
@RequestMapping("/data/icooper/api/")
public class IcooperApiController {
    /**
     * http://192.168.100.18:8080/sc-web/data/activiti/api/hello
     * @return
     */
    @RequestMapping("hello")
    public String hello(){
        return "Hello Master! Here is sc-icooper";
    }
}
