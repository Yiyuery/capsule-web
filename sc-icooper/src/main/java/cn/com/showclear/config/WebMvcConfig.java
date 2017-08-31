package cn.com.showclear.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

/**
 * Created by Yiyuery on 2017/8/31.
 * 静态资源控制
 */
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    /**
     * 配置资源映射
     * 默认的话除html外其他静态资源都放在static下
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/templates/**")
                .addResourceLocations("classpath:/templates/");
    }

    /**
     * Freemarker配置
     * @return
     */
    @Bean
    public FreeMarkerViewResolver freeMarkerViewResolver() {
        FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
        resolver.setPrefix("");
        resolver.setSuffix(".html");
        resolver.setContentType("text/html; charset=UTF-8");
        resolver.setRequestContextAttribute("");
        return resolver;
    }
}
