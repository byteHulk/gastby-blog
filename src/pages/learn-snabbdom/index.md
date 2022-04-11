---
    title: snabbdom 学习
    date: 2022-01-09
    tags: ['文章']
    spoiler: 
---

关于this的指向问题，我通过查阅资料和阅读文章总结了判断this指向的几个优先级, 箭头函数 =》new关键字 =》 bind方法 =》apply和call方法 =》 函数作为对象的成员变量被调用，按照优先级来判断this，多个规则并用取优先级高的那个规则来判断

### arrow function的this指向
箭头函数因为其内部 this 的值无法被改变，它与 **创建** 箭头函数时上下文的this指向相同

```js