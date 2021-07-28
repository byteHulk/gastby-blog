---
    title: 一文搞懂this指向问题
    date: 2021-01-02
    tags: ['文章']
    spoiler: 
---

关于this的指向问题，我通过查阅资料和阅读文章总结了判断this指向的几个优先级, 箭头函数 =》new关键字 =》 bind方法 =》apply和call方法 =》 函数作为对象的成员变量被调用，按照优先级来判断this，多个规则并用取优先级高的那个规则来判断

### arrow function的this指向
箭头函数因为其内部 this 的值无法被改变，它与** 创建** 箭头函数时外层的this指向相同

```js
const fun = () => {
  console.log(this);
};
fun();

// Window {window: Window, self: Window, document: document, name: "", location: Location, …}
```

### new 关键字
使用 new 关键字调用函数时，函数中的 this 指向为 JS 创建的新对象

```js
function func(){
    console.log(this);
    this.name = 'news';
    console.log(this);
};
new func();

// func {}
// func {name: 'news'}
```

### bind方法
使用 bind 方法可将函数绑定到其外部的 this

**注意**
- 避免使用 bind 将函数绑定到其外部的 this。使用箭头函数替代，因为这样 this 可以在函数声明就能清楚地看出来，而非在后续代码中看到。   
- 不要使用 bind 设置 this 为与父对象无关的值；这通常是出乎意料的，这也是 this 获得如此糟糕名声的原因。考虑将值作为参数传递；它更加明确，并且可以使用箭头函数

```js
function func() {
    console.log(this);
}

let o = {
    name: 'bind'
};

func.bind(o)();

// { name: 'bind' }
```

### apply和call方法
使用 apply 和 call 方法可将this绑定到传入函数的第一个参数。两个方法区别在于通过 apply 调用时实参是放到数组中的，而通过 call 调用时实参是逗号分隔的。

```js
function func() {
    console.log(this,a);
}

let o = {
    name: 'bind'
};

func.call(o,5, 6, 2, 3, 7);
func.apply(o,[5, 6, 2, 3, 7]);

// {name: "bind"} Arguments(5) [5, 6, 2, 3, 7, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {name: "bind"} Arguments(5) [5, 6, 2, 3, 7, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

### 函数作为对象的成员变量被调用
函数作为对象的成员变量被调用时，this的指向为调用函数的对象

```js
let obj = {
    name: 'obj',
    func: function (){
        console.log(this)
    }
};


obj.func();
// {name: "obj", func: ƒ}
```

当函数没有作为**方法**被调用，而是被赋值给另一个变量时，则根据那个变量来判断this指向

```js
let obj = {
    name: 'obj',
    func: function (){
        console.log(this)
    }
};

let func = obj.func;
func();
// Window {window: Window, self: Window, document: document, name: "", location: Location, …}
```

### 浏览器和node环境下
在浏览器和node环境下全局this的指向会有所不同

- 在浏览器里，this 指向 Window。
- 在 Node.js 里，this指向 Global


### 非/严格模式
在**严格模式**下，this 可以是 undefined 或 null。而在**非严格模式**下，如果 this 指向是 undefined 或 null，那么 this 会指向全局对象。

```js
'use strict';
let obj = {
    name: 'obj',
    func: function (){
        console.log(this)
    }
};

let func = obj.func;
func();

// undefined
```
