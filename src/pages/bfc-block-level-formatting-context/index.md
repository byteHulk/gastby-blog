---
    title: 什么是BFC ？
    date: 2019-09-09
    tags: ['文章']
    spoiler: dddddd
---
## 基本概念
块格式化上下文（BlockFormattingContext，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域   
简单来说：`BFC`是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。  
如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响

## 触发条件
> W3C对BFC的定义如下： 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为"visiable"的块级盒子，都会为他们的内容创建新的BFC（Block Fromatting Context， 即块级格式上下文

- 根元素或包含根元素的元素(\<html>)
- 浮动元素：float：**left|right**或**inherit**（≠none）
- 绝对定位元素：position：**absolute**或**fixed**
- display：**inline-block | flex | inline-flex | table-cell**或**table-caption**
- overflow：**hidden|auto**或**scroll**(≠visible)
- 弹性元素（display为**flex**或**inline-flex**元素的直接子元素）
- 网格元素（display为**grid**或**inline-grid**元素的直接子元素）
- contain 值为**layout**、**content**或**paint**的元素

### 渲染规则
- BFC边距不会合并
- BFC的区域不会与浮动元素的box重叠
- BFC是一个独立的容器，外面的元素不会影响里面的元素
- 计算BFC高度的时候浮动元素也会参与计算

### 应用场景
- 让浮动内容和周围的内容等高(overflow: auto)
- 防止浮动导致父元素高度塌陷
- 外边距塌陷(创建新的BFC避免两个相邻\<div>之间的 外边距合并问题)