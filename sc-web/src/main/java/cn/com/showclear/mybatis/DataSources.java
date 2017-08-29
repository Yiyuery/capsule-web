package cn.com.showclear.mybatis;

/**
 *
 * 基于 AbstractRoutingDataSource 和 AOP 的多数据源的配置
 * 基本原理是，我们自己定义一个DataSource类ThreadLocalRountingDataSource，来继承AbstractRoutingDataSource，
 * 然后在配置文件中向ThreadLocalRountingDataSource注入 CAPSULE 和 ACTIVITI 的数据源，
 * 再通过 AOP 来灵活配置，在哪些地方选择  CAPSULE 数据源，在哪些地方需要选择 ACTIVITI 数据源
 * @author YF-XIACHAOYANG
 * @date 2017/8/29 14:51
 */
public enum DataSources {
    /**
     * 数据源的类别：CAPSULE / ACTIVITI
     */
    CAPSULE,ACTIVITI
}
