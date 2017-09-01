/**
 *
 * Project Name: utio-web
 * File Name: ViewConfigInterceptor.java
 * Package Name: cn.showclear.utio.interceptor
 * Description: 
 * Copyright: Copyright (c) 2017
 * Company: 杭州叙简科技股份有限公司
 * @version 1.4.0
 * @author ZHENGKAI
 * @date 2017年4月17日下午3:58:41
 */
package cn.com.showclear.interceptor;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 为 view 设置 配置 属性
 */
public class ViewConfigInterceptor extends HandlerInterceptorAdapter {
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		//设置contextPath路径
		request.setAttribute("contextPath", request.getContextPath());
		return true;
	}

}
