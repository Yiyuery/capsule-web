package cn.com.showclear.icooper.controller.view;

import cn.com.showclear.common.CommonConstants;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    public String disPatchWebTest(Model model){
        model.addAttribute(CommonConstants.SYS_TOKEN_KEY,CommonConstants.SYS_TOKEN_VAL);
        model.addAttribute(CommonConstants.DISPATCH_URL_KEY,CommonConstants.DISPATCH_URL_VAL);
        return "/html/dispatch/dispatch-web.html";
    }

}
