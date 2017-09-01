package cn.com.showclear.config;

import cn.com.showclear.common.ScooperFreeMarkerView;
import cn.com.showclear.interceptor.LoginInterceptor;

import cn.com.showclear.interceptor.ViewConfigInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactory;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import java.util.Properties;

/**
 * Created by Yiyuery on 2017/8/31.
 * 静态资源控制
 */
@Configuration
@ComponentScan(basePackages = "cn.com.showclear")
@EnableScheduling
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    public void configurePathMatch(PathMatchConfigurer configurer) {
        super.configurePathMatch(configurer);
    }
    /**
     * 配置资源映射
     * 默认的话除html外其他静态资源都放在static下
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/html/**").addResourceLocations("classpath:/templates/html/");
        registry.addResourceHandler("/js/**").addResourceLocations("classpath:/templates/js/");
        registry.addResourceHandler("/lib/**").addResourceLocations("classpath:/templates/lib/");
        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/templates/css/");
        registry.addResourceHandler("/plugin/**").addResourceLocations("classpath:/templates/plugin/");
        registry.addResourceHandler("/image/**").addResourceLocations("classpath:/templates/image/");
        registry.addResourceHandler("/resource/**").addResourceLocations("classpath:/templates/resource/");
        registry.addResourceHandler("/component/**").addResourceLocations("classpath:/templates/component/");
    }

    /**
     * Freemarker配置
     * @return
     */
    @Bean
    public ViewResolver viewResolver() {
        FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
        resolver.setViewClass(ScooperFreeMarkerView.class);
        resolver.setViewNames("*.html","*.ftl","*.djs");
        resolver.setExposeRequestAttributes(true);
        resolver.setContentType("text/html; charset=UTF-8");
        resolver.setOrder(1);
        return resolver;
    }

    /**
     * Freemarker 模板配置
     * @return
     */
    @Bean
    public FreeMarkerConfigurer freeMarkerViewResolver() throws Exception{
        FreeMarkerConfigurationFactory factory = new FreeMarkerConfigurationFactory();
        factory.setTemplateLoaderPaths("classpath:templates", "src/main/resource/templates");
        factory.setDefaultEncoding("UTF-8");
        FreeMarkerConfigurer result = new FreeMarkerConfigurer();
        result.setConfiguration(factory.createConfiguration());
        Properties properties = new Properties();
        properties.put("classic_compatible",true);
        properties.put("whitespace_stripping",true);
        properties.put("template_update_delay",0);
        properties.put("datetime_format","yyyy-MM-dd HH:mm:ss");
        properties.put("time_format","HH:mm:ss");
        properties.put("date_format","yyyy-MM-dd");
        properties.put("default_encoding","UTF-8");
        properties.put("number_format","#.");
        result.setFreemarkerSettings(properties);
        return result;
    }

    @Bean
    public LoginInterceptor newLoginInterceptor(){
        return new LoginInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new ViewConfigInterceptor()).addPathPatterns("/view/**");
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**").
                excludePathPatterns("/js/**","/css/**","/plugin/**","/image/**","/resource/**","/component/**");
        super.addInterceptors(registry);
    }
}
