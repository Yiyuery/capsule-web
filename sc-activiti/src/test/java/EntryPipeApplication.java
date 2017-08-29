import org.activiti.engine.*;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.task.Task;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 入廊申请测试
 *
 * @author YF-XIACHAOYANG
 * @date 2017/8/3 17:13
 */
public class EntryPipeApplication {

    /**
     * RepositoryService是管理流程定义的仓库服务的接口。
     */
    private static RepositoryService repositoryService;
    /**
     * RuntimeService是activiti的流程执行服务类。可以从这个服务类中获取很多关于流程执行相关的信息，如执行管理，包括启动、推进、删除流程实例等操作。
     */
    private static RuntimeService runtimeService;
    /**
     * TaskService是activiti的任务服务类。可以从这个类中获取任务的信息
     */
    private static TaskService taskService;
    /**
     * HistoryService 是activiti的查询历史信息的类。在一个流程执行完成后，这个对象为我们提供查询历史信息。
     */
    private static HistoryService historyService;
    /**
     * 工作流核心引擎对象
     */
    private static ProcessEngine processEngine;

    @Before
    public void init() {
        createProcessEngine();
    }

    private static String BPMN_XML_NAME = "EntryPipeApplication.bpmn20.xml";

    private static String BPMN_XML_DESC = "入廊申请工作流";


    /**
     * 创建一个单例的ProcessEngine
     */
    public void createProcessEngine() {
        processEngine = ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("processes/activiti.cfg.xml")
                .buildProcessEngine();
        System.out.println("Activiti ProcessEngine Build Success!");
        getActivitiService();
    }

    /**
     * 获取activiti相关的service服务
     */
    public void getActivitiService() {
        repositoryService = processEngine.getRepositoryService();
        runtimeService = processEngine.getRuntimeService();
        taskService = processEngine.getTaskService();
        historyService = processEngine.getHistoryService();
    }

    /**
     * 部署流程定义
     */
    @Test
    public void deploymentProcessDefinition() {

        Deployment deployment = repositoryService// 与流程定义和部署对象相关的service
                .createDeployment()// 创建一个部署对象
                .name(BPMN_XML_DESC)// 添加部署的名称
                .addClasspathResource("processes/" + BPMN_XML_NAME)// classpath的资源中加载，一次只能加载
                .deploy();// 完成部署
        System.out.println("部署ID:" + deployment.getId());
        System.out.println("部署名称：" + deployment.getName());
    }

    /**
     * 启动一个入廊申请流程
     */
    @Test
    public void start() {
        Map<String, Object> variables = new HashMap<String, Object>();
        //启动流程参数设置
        String processId = runtimeService.startProcessInstanceByKey("entryPipeApplication", variables).getId();
        System.out.println("***************启动一个入廊申请流程完成***************" + processId);
        //17501
    }

    /**
     * 审核请假申请工作流查询
     */
    @Test
    public void queryRunTaskByTaskId() {

        List<Task> list = processEngine.getTaskService()// 与正在执行的认为管理相关的Service
                .createTaskQuery()// 创建任务查询对象
                .list();
        if (list != null && list.size() > 0) {
            for (Task task : list) {
                String procId = task.getProcessInstanceId();
                if (procId.equals("17501")) {
                    System.out.println("#----------------------------------------#");
                    System.out.println("任务ID:" + task.getId());
                    System.out.println("任务名称:" + task.getName());
                    System.out.println("任务的创建时间" + task);
                    System.out.println("任务的办理人:" + task.getAssignee());
                    System.out.println("流程实例ID:" + task.getProcessInstanceId());
                    System.out.println("执行对象ID:" + task.getExecutionId());
                    System.out.println("流程定义ID:" + task.getProcessDefinitionId());
                    System.out.println("#----------------------------------------#");
                }
            }
        }

    }

    /**
     * 发起入廊申请[填写表单]
     */
    @Test
    public void startApplyTask() {
        String taskId = "17505";  //任务Id
        Map<String, Object> taskVariables = new HashMap<String, Object>();
        taskVariables.put("applyUserId", 123);
        taskVariables.put("utId", 12);
        taskVariables.put("deptUserId", 31);
        //完成
        processEngine.getTaskService()//与正在执行的认为管理相关的Service
                .complete(taskId, taskVariables);
        System.out.println("完成任务:任务ID:" + taskId);
    }


    /**
     * 部门领导审核
     */
    @Test
    public void deptVerifyTask() {
        String taskId = "20008";  //任务Id
        Map<String, Object> taskVariables = new HashMap<String, Object>();
        taskVariables.put("applyDeptApproved", 1);
        taskVariables.put("deptOpinion", "通过！");
        taskVariables.put("opcUserId", 32);
        //完成
        processEngine.getTaskService()//与正在执行的认为管理相关的Service
                .complete(taskId, taskVariables);
        System.out.println("完成任务:任务ID:" + taskId);
    }

    /**
     * 运维中心审核
     */
    @Test
    public void opcVerifyTask() {

        String taskId = "22509";  //任务Id
        Map<String, Object> taskVariables = new HashMap<String, Object>();
        taskVariables.put("applyOpcApproved", 1);
        taskVariables.put("deptOpinion", "通过！");
        taskVariables.put("adminUserId", 33);
        //完成
        processEngine.getTaskService()//与正在执行的认为管理相关的Service
                .complete(taskId, taskVariables);
        System.out.println("完成任务:任务ID:" + taskId);
    }


    /**
     * 行政部门审核
     */
    @Test
    public void adminVerifyTask() {

        String taskId = "25008";  //任务Id
        Map<String, Object> taskVariables = new HashMap<String, Object>();
        taskVariables.put("applyAdminApproved", 1);
        taskVariables.put("deptOpinion", "通过！");

        //完成
        processEngine.getTaskService()//与正在执行的认为管理相关的Service
                .complete(taskId, taskVariables);
        System.out.println("完成任务:任务ID:" + taskId);
    }

/*
    任务ID:2505
    任务名称:发起入廊申请
    任务的创建时间Task[id=2505, name=发起入廊申请]
    任务的办理人:null
    流程实例ID:2501
    执行对象ID:2502
    流程定义ID:entryPipeApplication:1:4

    完成任务:任务ID:2505

    再次查询：
    任务ID:5006
    任务名称:部门领导审核
    任务的创建时间Task[id=5006, name=部门领导审核]
    任务的办理人:null
    流程实例ID:2501
    执行对象ID:2502
    流程定义ID:entryPipeApplication:1:4

    任务ID:7505
    任务名称:发起入廊申请
    任务的创建时间Task[id=7505, name=发起入廊申请]
    任务的办理人:null
    流程实例ID:2501
    执行对象ID:2502
    流程定义ID:entryPipeApplication:1:4


    完成任务:任务ID:7505

    任务ID:10006
    任务名称:部门领导审核
    任务的创建时间Task[id=10006, name=部门领导审核]
    任务的办理人:null
    流程实例ID:2501
    执行对象ID:2502
    流程定义ID:entryPipeApplication:1:4


    完成任务:任务ID:10006

    任务ID:12505
    任务名称:运维中心审核
    任务的创建时间Task[id=12505, name=运维中心审核]
    任务的办理人:null
    流程实例ID:2501
    执行对象ID:2502
    流程定义ID:entryPipeApplication:1:4
#-----------------------------------
 */


}
