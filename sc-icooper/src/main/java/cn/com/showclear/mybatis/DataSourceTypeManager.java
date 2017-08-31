package cn.com.showclear.mybatis;

/**
 * 数据源切换控制器
 * 通过 TheadLocal 来保存每个线程选择哪个数据源的标志(key)
 * @author YF-XIACHAOYANG
 * @date 2017/8/29 14:51
 */
public class DataSourceTypeManager {

    private static final ThreadLocal<DataSources> dataSourceTypes = new ThreadLocal<DataSources>(){
        @Override
        protected DataSources initialValue(){
            return DataSources.CAPSULE;
        }
    };

    public static DataSources get(){
        return dataSourceTypes.get();
    }

    public static void set(DataSources dataSourceType){
        dataSourceTypes.set(dataSourceType);
    }

    public static void reset(){
        dataSourceTypes.set(DataSources.CAPSULE);
    }
}
