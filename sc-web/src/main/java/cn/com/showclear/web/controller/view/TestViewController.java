package cn.com.showclear.web.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 测试类试图
 * @author YF-XIACHAOYANG
 * @date 2017/12/15 17:32
 */
@Controller
@RequestMapping("/view/test")
public class TestViewController {


    /**
     * 知乎 > jQuery
     * @return
     */
    @RequestMapping("/zhihu/jquery")
    public String jqueryTestView() {
        return "/html/zhihu/jquery-test.html";
    }

}
