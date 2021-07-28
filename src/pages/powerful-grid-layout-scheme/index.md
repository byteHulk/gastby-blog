---
    title: 强大的grid网格布局方案
    date: 2020-01-04
    tags: ['文章']
    spoiler: 
---
## 概述
grid网格布局擅长将页面分为不同区域(网格)，控制各部分之间在大小，位置和层的不同方面的联系，可以做出各种各样的布局。  
## Grid布局与Flex布局 ？
> Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。 Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。   -阮一峰老师博客    

**注意:设置网格布局后容器子元素的 float display:inline-block | table-cell vertical-align column将失效**
- display : grid | inline-grid  
默认容器为块级元素 可设置为行内元素
- grid-template-columns: 100px 100px 100px  
列宽
- grid-template-rows: 10% 10% 10%  
行高
- grid-template-areas  : "a a a"  " b b b"  "c c c"
以上三个属性可简写为grid-template  
grid是 grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow的简写
- grid-template-columns: repeat(3,100px)  
repeat()函数可以简化重复的值,第一个参数是重复的次数,第二个参数为重复的值
也可重复某种模式: repeat(3,100px 100px)
- auto-fill: grid-template-columns: repeat(auto-fill,100px)  
当单元格的大小是固定的,容器的大小不固定时,使用auto-fill关键字自动填充
- fr: grid-template-columns: 100px 2fr 1fr  
fraction的缩写,意为片段 , 2fr 1fr 表示前者是后者的二倍
- grid-template-columns: minmax(100px, 1fr)  
表示一个长度范围
- grid-template-columns: 100px auto 100px  
长度由浏览器决定
- 网格线名称: grid-template-columns: [c1] 100px [fifth c2] 100px  
可以指定网格线名称,方便以后引用,一个网格线可以有多个名字
- grid-row-gap: 20px | grid-column-gap: 20px 
(根据新的标准改写为:row-gap column-gap gap)  
单元格之间的空隙,可以合并为 grid-gap: 20px 20px
- grid-auto-flow: row | column  
单元格填充顺序 默认为row:先行后列, row dense尽量填满空格
- justify-items: start | end | center | stretch  
单元格内容的水平位置
- align-items: start | end | center | stretch  
单元格内容的垂直位置
- place-items: start end   
justify-items 和 align-items 的合并方式
- justify-content: start | end | center | stretch | space-around | space-between | space-evenly  
单元格内容区域在容器里的水平位置
- align-content: start | end | center | stretch | space-around | space-between | space-evenly  
单元格内容区域在容器里的垂直位置
- place-content: start end   
justify-content 和 align-content 的合并方式
- grid-auto-rows | grid-auto-columns  
自动产生的单元格的大小
- grid-column-start:2 | grid-column-end | grid-row-start | grid-row-end  
项目的位置是可以指定的(也可指定网格线的名字)
- grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式
- grid-area：  
    指定项目放在哪一个区域
- grid-area属性还可用作grid-row-start、         grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置
- justify-self | align-self | place-self  
    单个项目的位置