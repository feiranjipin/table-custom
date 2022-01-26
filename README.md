# 自定义表格组件，使用方法可以参见组件内app.vue演示页面
For the user-defined table component, please refer to the app.vue demo page in the component
## （demo地址）
    * http://101.42.233.16/
    * http://www.table-custom.cn/
    (该演示网址一直会实时更新，The demo web site is always updated in real time)
![5](https://github.com/feiranjipin/table-custom/blob/main/abc.png)
## The list of realizable functions is as follows:
    * 1. User defined table structure (including row and column information and single table size)
    * 2. Custom move setting block (including text content, zoom or not)
    * 3. Drag and move to set the table content (drag the moving block into the table to complete the table content setting)
    * 4. Each cell in the table can move and replace each other
    * 5. The assigned cells in the table can be copied up, down, left, right, assigned values, and deleted
    * 6. Table contents can be saved (including exported to text) and restored next time
    * 7. The contents of the form can be printed and what you see is what you get
    * 8. The use area of the table supports infinity (horizontal and vertical scrolling). When dragging and moving, you can click and scroll the mouse wheel (move horizontally and press shift to scroll) to complete the movement
    * 9. Move the block into the table. After setting, you can return it by clicking another
    * 10. The mobile block color is generated randomly after each initialization
    * 11. The data stored by the table control includes: row information ftimer, column information fcourse, moving block information ftool, cell width fwidth, cell height fheight, and overall table data fdata
    * 12. A processing function is also provided when the scroll bar of a Vue frame cannot be used
    * 13. Column information can be dynamically added to the header, and event operations can be performed at the same time
    * 14. All cells in the table can perform event operations
    * 15、Click the blank space to set the shortcut
    * 16、Support title column drag and replace
    * 17、Supports drag and drop replacement of the left column
    * 18、Cell hovering display properties are supported
    * 19、It supports adding new attributes to cells in a certain format
### For other matters not covered, please contact me at QQ: 44822961 or email to feiranjipin@outlook.com
## 可实现功能列表如下：
    * 1、自定义表结构（包括行、列信息，单表格大小）
    * 2、自定义移动设置块（包括文本内容、是否缩放）
    * 3、拖拽移动设置表格内容（将移动块拖拽至表格内可以完成表格内容设置）
    * 4、表格内的每单元格可以相互移动替换位置
    * 5、表格内的已经赋值单元格，可以自由上下左右复制，可以为其赋值，并且可以删除
    * 6、表格内容可以保存（包括导出成文本），下次可以还原
    * 7、表格内容可以打印，所见即所得
    * 8、表格使用区域支持无限大（水平滚动垂直滚动都可以），拖拽移动时可以点选后滚动鼠标滚轮（水平移动按住shift滚动）完成移动
    * 9、移动块进入表格完成设置后可以通过单击另其归位
    * 10、移动块颜色每次初始化后随机生成
    * 11、表格控件存储数据包括：行信息fTimer、列信息fCourse、移动块信息fTool、单元格宽度fWidth、单元格高度fHeight、整体表格数据fData
    * 12、针对某项vue框架滚动条无法使用的情况也提供了处理函数
    * 13、表头可以动态添加列信息，同时可以进行事件操作
    * 14、表内的单元格都可以进行事件操作
    * 15、空白格单击可以快捷设置
    * 16、支持标题列拖拽替换
    * 17、支持左侧列拖拽替换
    * 18、支持单元格悬停展示属性
    * 19、支持按一定格式给单元格添加新属性
### 其他未尽事宜，可以联系我QQ：44822961或邮件至feiranjipin@outlook.com
## 代码实现：
### html:
    `<DesignVenue
        * :row-data="fTimer" //行标题
        * move-into //是否启用表格内区块移动功能
        * :el-mouse="felMouse" //是否启用缩放(废弃，已改为是否启用工具栏，默认false)
        * :cell-data="fCourse" //列标题
        * :dis-w="disWindow" //是否启用提示
        * :dis-op="disOperation" //是否禁用编辑工具栏
        * :tool-data="fTool" //自定义工具栏
        * ref="dv" //表格名称
        * :every-width="eWidth" //每单元格宽度
        * :every-height="eHeight" //每单元格高度
        * @onDdvMouseUp="setPj" //单元格单击事件
        * @onDdvRowDown="setRowTitle" //行标题单击
        * @onDdvCellDown="setCellTitle" //列标题单击
        * :html-template="htmlTemp"> //单元格自定义模板(水印)
    </DesignVenue>`
### method：
    * createTable() 生成表格
    * submitData() 获取表格数据
    * doSave() 保存并下载数据
    * initData() 初始化数据
    * clearData() 清理表格数据
    * writeText() 写入表格设置文本
    * resumeData() 还原数据
    * printTable() 打印表格
    * setWbScroll() 在部分框架滚动失效时，可以手动设置滚动坐标值
### events：
    * @onDdvMouseUp 单元格点击事件
    * @onDdvRowDown 标题单击事件
    * @onDdvCellDown 行单击事件
