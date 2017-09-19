package cn.com.showclear.activiti.controller.view;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * activiti 视图控制
 * @author YF-XIACHAOYANG
 * @date 2017/8/31 18:36
 */
@Controller
@RequestMapping("/view/activiti")
public class ActivitiViewController {

    /**
     * 头部导航界面
     * @return
     */
    @RequestMapping("/")
    public String index(){
        return "/html/activiti/activiti-test.html";
    }

}
