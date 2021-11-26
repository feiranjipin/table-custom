
自定义表格组件，使用方法可以参见组件内app.vue演示页面

###（demo地址）http://feiranjipin.gicp.net/

###可实现功能列表如下：

1、自定义表结构（包括行、列信息，单表格大小）

2、自定义移动设置块（包括文本内容、是否缩放）

3、拖拽移动设置表格内容（将移动块拖拽至表格内可以完成表格内容设置）

4、表格内的每单元格可以相互移动替换位置

5、表格内的已经赋值单元格，可以自由上下左右复制，可以为其赋值，并且可以删除

6、表格内容可以保存（包括导出成文本），下次可以还原

7、表格内容可以打印，所见即所得

8、表格使用区域支持无限大（水平滚动垂直滚动都可以），拖拽移动时可以点选后滚动鼠标滚轮（水平移动按住shift滚动）完成移动

9、移动块进入表格完成设置后可以通过单击另其归位

10、移动块颜色每次初始化后随机生成

11、表格控件存储数据包括：行信息fTimer、列信息fCourse、移动块信息fTool、单元格宽度fWidth、单元格高度fHeight、整体表格数据fData

12、针对某项vue框架滚动条无法使用的情况也提供了处理函数

其他未尽事宜，可以联系我QQ：44822961或邮件至feiranjipin@outlook.com

###代码实现：

###html:

    <DesignVenue 

     :row-data="rowTitle" //行标题

     :del-db-cli="felDbcli" //是否启用双击删除

     :move-into="true" //表格内可拖拽

     :el-mouse="false" //是否启用缩放

     :cell-data="cellTitle" //列标题

     :tool-data="Tools" //工具栏

     :every-width="eWidth" //每单元格宽度

     :every-height="eHeight" //每单元格高度

     @onDdvMouseUp="customMouseUp" //鼠标抬起事件
     
   />
   
###method：

    createTable() 生成表格
    
    submitData() 获取表格数据
    
    doSave(value, type, name) 保存并下载数据（保存的数据，保存数据类型，存储的文件名）
    
    initData(rowData, cellData, headData, felMouse, eWidth, eHeight, felDel) 初始化数据（行标题，列标题，工具栏，是否缩放，宽度，高度，是否双击删除）
    
    clearData() 清理表格数据
    
    writeText(objData, dDvText) 写入表格设置文本（写入的对象，写入的值）
    
    resumeData(fObj) 还原数据（获取或者保存下来的表格数据）
    
    printTable() 打印表格
    
    setWbScroll(x, y) 在部分框架滚动失效时，可以手动设置滚动坐标值
    
###events：
 
    onDdvMouseUp() 在表格内匹配后释放鼠标
    
    
