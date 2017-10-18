package cn.com.showclear.web.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Yiyuery on 2017/10/18.
 */
@Controller
@RequestMapping("/view/web/")
public class WebViewController {

    @RequestMapping("remoteLocationView")
    public String remoteLocationView(){
        return "/html/gis/remote-location.html";
    }

}
