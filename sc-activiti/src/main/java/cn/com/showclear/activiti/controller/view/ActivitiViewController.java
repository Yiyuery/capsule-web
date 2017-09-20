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
        return "/html/activiti/activiti-navigation.html";
    }

    /**
     * 表单管理主界面
     * @return
     */
    @RequestMapping("/formMainView")
    public String formMainView(){
        return "/html/activiti/form-manager/form-main.html";
    }

    /**
     * 在线设计表单
     * @return
     */
    @RequestMapping("/formCreateView")
    public String formCreateView(){
        return "/html/activiti/form-manager/form-create.html";
    }

    /**
     * 表单列表界面
     * @return
     */
    @RequestMapping("/formListView")
    public String formListView(){
        return "/html/activiti/form-manager/form-list.html";
    }

    /**
     * 表单映射界面
     * @return
     */
    @RequestMapping("/formMapperView")
    public String formMapperView(){
        return "/html/activiti/form-manager/form-mapper.html";
    }


    /**
     * 流程管理主界面
     * @return
     */
    @RequestMapping("/procMainView")
    public String procMainView(){
        return "/html/activiti/proc-manager/proc-main.html";
    }


}
