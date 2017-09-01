/**
 *
 * Project Name: utio-web
 * File Name: ScooperFreeMarkerView.java
 * Package Name: cn.showclear.utio.web.config
 * Description: 
 * Copyright: Copyright (c) 2017
 * Company: 杭州叙简科技股份有限公司
 * @version 1.4.0
 * @author ZHENGKAI
 * @date 2017年4月17日下午3:28:42
 */
package cn.com.showclear.common;

import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.servlet.view.freemarker.FreeMarkerView;


/**
 * FreeMarket视图配置
 */
public class ScooperFreeMarkerView extends FreeMarkerView {
	
	private static final String CONTEXT_PATH = "contextPath";

	@Override
	protected void exposeHelpers(Map<String, Object> model, HttpServletRequest request) throws Exception {
		String scheme = request.getScheme();
		String serverName = request.getServerName();
		int port = request.getServerPort();
		String path = request.getContextPath();
		String basePath = scheme + "://" + serverName + ":" + port + path;
		model.put(CONTEXT_PATH, basePath);
		super.exposeHelpers(model, request);
	}
}


