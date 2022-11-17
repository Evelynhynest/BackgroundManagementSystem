Part 5 P64-

1.数据可视化简介

2.canvas 绘制线段、矩形、圆形、画布清除与绘制文字（基本使用）
- canvas 画布基本特点：
  - 是 HTML5 中新增的一个特性，双闭合标签，
  - 有默认的宽高（300×150），
  - 浏览器认为 canvas 标签是一张图片，鼠标右键点击可以保存 canvas 图片
  - 给 canvas 标签内添加文本内容或子节点都没有任何意义
  - 对 canvas 画布的任何绘制操作都必须通过 JS 实现
  - canvas 标签的宽高必须通过 canvas 标签属性 width 和 height 设置（不能用样式）
- 使用 JS 绘制 canvas：
  - 必须通过上下文对象（ctx）绘制 canvas：`let ctx = canvas.getContext('2d');`

3.SVG 基本使用
- SVG简介
  - SVG（Scalable Vector Graphics，可缩放的矢量图形）是一种基于XML的图像文件格式
  - 有默认的宽高（300×150），可以用样式设置宽高，不能当作图片右键保存
- 基本的 SVG 元素
  - <svg>标签包裹并定义整个矢量图
  - <line>：创建一条直线
  - <polyline>：创建折线
  - <rect>：创建矩形
  - <circle>：创建圆形
  - <ellipse>：创建圆和椭圆
  - <polygon>：创建多边形
  - <path>：通过指定点以及点和点之间的线来创建任意形状

4.Home 静态组件拆分
子组件 Card、Detail...

5.完成折线图

6.完成柱状图和进度条

7.









