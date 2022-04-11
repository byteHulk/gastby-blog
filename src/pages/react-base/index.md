---
    title: React 原理系列
    date: 2022-03-14
    tags: ['文章']
    spoiler: dddddd
---
## JSX 的本质是什么？与 JS 有什么联系
React 官网给出的描述
> JSX 是 JavaScript 的一种语法扩展，它和模板语言很接近，但是它充分具备 JavaScript 的能力。

React 通过 Babel 将 JSX 转换为 React.createElement 的调用，React.createElement 里进行了属性的处理（格式化数据），并发起了 ReactElement 的调用

## 不用 JSX 可不可以

JSX 语法糖允许前端开发者使用我们最为熟悉的类 HTML 标签语法来创建虚拟 DOM，所以相比较 React.createElement 而言 JSX 也使得代码层次分明、嵌套关系清晰，在降低学习成本的同时，也提升了研发效率与研发体验。

## JSX 是如何变成 DOM 的？

通过 ReactDOM.render 方法来进行虚拟 DOM 到 真实 DOM 的转化


### React 15 的生命周期



```js
//    组件挂载初始化渲染                 组件更新：由父组件触发
//           ⇩                               ⇩ 
//      constructor()                 componentWillReceiveProps()
//           ⇩                               ⇩ 
//      componentWillMount()          shouldComponentUpdate() ⇦ 由子组件触发
//           ⇩                               ⇩ 
//           ⇩                        componentWillUpdate()
//           ⇩
//      [                      render()                         ]
//           ⇩                             ⇩ 
//      componentDidMount()              componentDidUpdate()

//                     [       组件卸载       ]
//                               ⇩
//                     componentWillUnmount()

```
*** 值得注意的是 *** ：componentReceiveProps 并不是由 *** props *** 的变化触发的，而是由父组件的*** 更新 ***触发的,这可能会导致意外的问题！


### React 16 的生命周期

React 15 生命周期和 React 16.3 生命周期在挂载阶段的主要差异在于，废弃了 componentWillMount，新增了 getDerivedStateFromProps。

getDerivedStateFromProps 不是 componentWillMount 的替代品

## getDerivedStateFromProps

- 是一个静态方法，在里面是访问不到 this 的，可以理解为 React 团队在设计时将这一生命周期专注于通过 props 派生 state 这一理念，无法在这一声明周期里做 this.fetch() this.state() 等操作，从根源上帮开发者避免不合理的编程方式

- 原则上是通过 props 来派生 state 

- 需要返回一个对象或者 null ，且对 state 不是覆盖式的更新，而是针对某个属性的定向更新
  
# 16.3 16.4

- 在 React 16.4 中，任何因素触发的组件更新流程（包括由 this.setState 和 forceUpdate 触发的更新流程）都会触发 getDerivedStateFromProps；
  
- 而在 v 16.3 版本时，只有父组件的更新会触发该生命周期。

## componentWillMount 几宗"罪"



### 为什么要修改声明周期

React 15里一些声明周期会有额外的效果产生，也会有一些不规范的用法，从而导致一些意外的 bug，在 React 16里官方通过一两个生命周期涵盖了全部的场景，从根源上帮开发者避免了不合理的编程方式。同时也为了 Fiber 架构进行铺路。

### Fiber 架构简析
Fiber 会使原本同步的渲染过程变成异步的

“任务拆解”和“可打断”

### React 版本发布时间