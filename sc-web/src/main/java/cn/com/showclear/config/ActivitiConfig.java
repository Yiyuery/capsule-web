package cn.com.showclear.config;

import org.activiti.spring.SpringAsyncExecutor;
import org.activiti.spring.SpringProcessEngineConfiguration;
import org.activiti.spring.boot.AbstractProcessEngineAutoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.io.IOException;

/**
 * 工作流引擎对象创建
 * @author YF-XIACHAOYANG
 * @date 2017/8/29 17:16
 */
@Configuration
public class ActivitiConfig  extends AbstractProcessEngineAutoConfiguration {

    /**
     * 工作流数据库
     */
    @Autowired
    @Qualifier("activiti")
    private DataSource activitiDataSource;

    /**
     * 工作流 引擎对象创建
     * @param transactionManager
     * @param springAsyncExecutor
     * @return
     * @throws IOException
     */
    @Bean
    public SpringProcessEngineConfiguration springProcessEngineConfiguration(
            PlatformTransactionManager transactionManager,
            SpringAsyncExecutor springAsyncExecutor) throws IOException {

        return baseSpringProcessEngineConfiguration(
                activitiDataSource,
                transactionManager,
                springAsyncExecutor);
    }
}
