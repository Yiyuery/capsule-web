package cn.com.showclear.activiti.controller.data.api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;

/**
 * 接口测试
 * @author YF-XIACHAOYANG
 * @date 2017/8/29 12:58
 */
@RestController
@RequestMapping("/data/activiti/api/")
public class ActivitiApiController {

    @Autowired
    @Qualifier("activiti")
    private DataSource dataSource1;

    /**
     * http://192.168.100.18:8080/sc-web/data/activiti/api/hello
     * @return
     */
    @RequestMapping("hello")
    public String hello(){
        return "Hello Master! Here is sc-activiti";
    }

    @RequestMapping("/get")
    public String get(){
        //观察控制台的打印信息.
        System.out.println(dataSource1);
        return"ok";
    }
}
