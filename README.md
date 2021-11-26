# table-custom

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
自定义表格组件，使用方法可以参见组件内app.vue演示页面

可实现功能列表如下：

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
