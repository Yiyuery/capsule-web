# capsule-web 
### 编译环境  
      1. JDK 1.8
      2. Tomcat 7.0.41
      3. Activiti 6.0.0
      
### Github 

>项目导出

    1. 新建文件夹 sc-workspace
    2. Idea 打开文件夹 sc-workspace
    3. VCS -> Checkout from Version Control -> GitHub
    4. 浏览器打开github，复制项目路径（ssh）git@github.com:Yiyuery/capsule-web.git
    5. 输入该路径 -> parent directory 为sc-workspace
    6. 不选择任何模块，创建新的额Project
    7. File -> new -> Module from Existing Sources -> 选择clone下来的模块导入即可

> commit / push

    1、 失败：无法链接远端资源
        先update资源，再push
 
    
### 常见问题

> java.lang.Exception: Socket bind failed:

      重新配置Tomcat
   
> socket 127.0.0.1 端口占用

    netstat -ano|findstr "8080"
    taskkill /pid 14276 /f

> IDEA 控制台中文乱码 / Tomcat 转发到前端数据乱码
        
    ```
    <Connector port="8080" protocol="HTTP/1.1" 
                   connectionTimeout="20000" 
                   redirectPort="8443" URIEncoding="UTF-8" />
    ```
    
    
# Lemon OA
   
### 项目启动 

> Tomcat 内存溢出
  
    -Xms1024M -Xmx1024M -XX:PermSize=256M -XX:MaxPermSize=256M

> mysql 数据库配置

    ```
    db.default.driverClassName=com.mysql.jdbc.Driver
    db.default.url=jdbc:mysql://localhost:3306/DB_LEMON?zeroDateTimeBehavior=convertToNull&useUnicode=true&characterEncoding=utf-8
    db.default.username=root
    db.default.password=showclear
    db.default.validationQuery=select 1
    
    db.default.defaultAutoCommit=false
    db.default.initialSize=1
    db.default.maxActive=60
    db.default.minIdle=1
    db.default.maxIdle=20
    db.default.maxWait=3000
    db.default.removeAbandoned=true
    db.default.removeAbandonedTimeout=180
    db.default.testWhileIdle=true
    db.default.testOnBorrow=false
    db.default.testOnReturn=false
    #db.default.validationQuery=SELECT * FROM INFORMATION_SCHEMA.SYSTEM_SCHEMAS
    db.default.timeBetweenEvictionRunsMillis=30000
    db.default.numTestsPerEvictionRun=100
    ```
    
> 登陆界面
    http://localhost:8080/lemon/common/login.jsp