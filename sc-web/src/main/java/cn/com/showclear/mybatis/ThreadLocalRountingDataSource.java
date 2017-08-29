package cn.com.showclear.mybatis;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/**
 * 定义 ThreadLocalRountingDataSource，继承AbstractRoutingDataSource
 * @author YF-XIACHAOYANG
 * @date 2017/8/29 15:01
 */
public class ThreadLocalRountingDataSource extends AbstractRoutingDataSource {

    /**
     * 实现其抽象方法protected abstract Object determineCurrentLookupKey(); 从而实现对不同数据源的路由功能
     * @return
     */
    @Override
    protected Object determineCurrentLookupKey() {
        return DataSourceTypeManager.get();
    }
}
