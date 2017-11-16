package cn.com.showclear.mybatis;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * 数据源拦截器 根据路径自动切换
 * 使用Spring AOP 来指定 dataSource 的 key
 * 从而dataSource会根据key选择 dataSourceCapsule 和 dataSourceActiviti
 * @author YF-XIACHAOYANG
 * @date 2017/8/29 14:54
 */
@Aspect    // for aop
@Component // for auto scan
@Order(0)  // execute before @Transactional
public class DataSourceInterceptor {

    @Pointcut("execution( * cn.com.showclear.*.service.web.*.*(..))")
    public void dataSourceCapsule(){};

    @Before("dataSourceCapsule()")
    public void beforeCapsule(JoinPoint jp) {
        DataSourceTypeManager.set(DataSources.CAPSULE);
    }

    @Pointcut("execution( * cn.com.showclear.*.service.activiti.*.*(..))")
    public void dataSourceActiviti(){};

    @Before("dataSourceActiviti()")
    public void beforeActiviti(JoinPoint jp) {
        DataSourceTypeManager.set(DataSources.ACTIVITI);
    }
}
