---
    title: 理解css的z-index属性(层叠上下文)
    date: 2019-10-10
    tags: ['文章']
    spoiler: 
---
## 简介
在MDN中层叠上下文的定义如下：
> 我们假定用户正面向（浏览器）视窗或网页，而 HTML 元素沿着其相对于用户的一条虚构的 z 轴排开，层叠上下文就是对这些 HTML 元素的一个三维构想。众 HTML 元素基于其元素属性按照优先级顺序占据这个空间。
## 层叠上下文
我们知道某些元素的渲染顺序是由z-index的值影响，这其实是因为这些元素具有能够使他们形成一个层叠上下文的特殊属性。  
元素具有层叠上下文特性的触发条件：
- 文档根元素(html)
- position值为absolute(绝对定位)或relative(相对定位)且z-index值不为auto的元素
- position值为fixed(固定定位)或sticky(粘滞定位)的元素（沾滞定位适配所有移动设备上的浏览器，但老的桌面浏览器不支持)
- flex(flexbox)容器的子元素，且z-index值不为auto
- grid (grid) 容器的子元素，且z-index值不为auto
- opacity: 属性值小于1的元素
- mix-blend-mode 属性值不为normal的元素
- 以下任意属性值不为none的元素：
    - transform
    - filter
    - perspective
    - clip-path
    - mask / mask-image / mask-border
- isolation 属性值为 isolate 的元素
- -webkit-overflow-scrolling 属性值为 touch 的元素
- will-change 值设定了任一属性而该属性在 non-initial 值时会创建层叠上下文的元素
- contain属性值为 layout、paint  

在层叠上下文中，子元素同样也按照上面的规则进行层叠。 重要的是，其子级层叠上下文的 z-index 值只在父级中才有意义。子级层叠上下文被自动视为父级层叠上下文的一个独立单元。
## 总结
- 层叠上下文可以包含在其他层叠上下文中，并且一起创建一个层叠上下文的层级。
- 每个层叠上下文都完全独立于它的兄弟元素：当处理层叠时只考虑子元素。
- 每个层叠上下文都是自包含的：当一个元素的内容发生层叠后，该元素将被作为整体在父级层叠上下文中按顺序进行层叠。