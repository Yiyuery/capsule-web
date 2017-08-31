package cn.com.showclear.icooper.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * icooper 相关测试
 * @author YF-XIACHAOYANG
 * @date 2017/8/31 18:36
 */
@Controller
@RequestMapping("/view/icooper/")
public class IcooperViewController {

    /**
     * disaptch-web 测试界面
     * @return
     */
    @RequestMapping("dispatch-web")
    public String disPatchWebTest(){
        return "/html/dispatch/dispatch-web";
    }

}
