import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.junit.Test;

/**
 * Created by Yiyuery on 2017/8/2.
 * TODO:
 */
public class ActivitiInit {

    /**
     * 使用配置文件来创建数据库中的表
     */
    @Test
    public void createTable() {

        ProcessEngine processEngine = ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("processes/activiti.cfg.xml")
                .buildProcessEngine();
        System.out.println(processEngine);
    }

}
