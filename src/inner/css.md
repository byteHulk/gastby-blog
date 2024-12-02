### BFC
区块格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域，有自己的一套渲染规则。

#### 特性
- 同一个 BFC 外边距会重叠
- 浮动元素也参与父元素高度计算
- BFC 里面不会影响外面， 反之亦然
- 每个元素左边都和 BFC 左边贴合
- BFC 的区域和浮动元素不会重叠

#### 触发条件
- 根元素
- 浮动元素
- overflow 值不为 visible 或 clip 的块级元素
- position 为 absolute 或 fixed
- display 为 inline-block、table 等
- 弹性元素（display 值为 flex 或 inline-flex 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器
  
