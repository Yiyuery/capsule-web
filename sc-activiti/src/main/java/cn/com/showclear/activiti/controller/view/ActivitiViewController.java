package cn.com.showclear.activiti.controller.view;

import cn.com.showclear.common.CommonConstants;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * activiti 视图控制
 * @author YF-XIACHAOYANG
 * @date 2017/8/31 18:36
 */
@Controller
@RequestMapping("/view/activiti/")
public class ActivitiViewController {

    /**
     * 头部导航界面
     * @return
     */
    @RequestMapping("head")
    public String disPatchWebTest(){
        return "/html/activiti/activiti-head.html";
    }

}
