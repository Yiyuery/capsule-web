package cn.com.showclear.web.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * web视图控制器
 * @author YF-XIACHAOYANG
 * @date 2017/12/15 17:33
 */
@Controller
@RequestMapping("/view/web/")
public class WebViewController {

    /*--------------------------------------------
            GIS 相关
    --------------------------------------------*/

    /**
     * GIS 浏览器定位
     * @return
     */
    @RequestMapping("gis/remoteLocationView")
    public String remoteLocationView() {
        return "/html/gis/remote-location.html";
    }

}
