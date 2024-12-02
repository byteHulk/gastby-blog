---
    title: 一文搞懂this指向问题
    date: 2021-01-02
    tags: ['文章']
    spoiler: 
---

```js
var bar = {
    myName:"time.geekbang.com",
    printName: function () {
        console.log(myName)
    }    
}
function foo() {
    let myName = "极客时间"
    return bar.printName
}
let myName = "极客邦"
let _printName = foo()
_printName()
bar.printName()
```

在 printName 函数里面使用的变量 myName 是属于全局作用域下面的，所以最终打印出来的值都是“极客邦”。这是因为 JavaScript 语言的作用域链是由词法作用域决定的，而词法作用域是由代码结构来确定的。

在对象内部的方法中使用对象内部的属性是一个非常普遍的需求。但是 JavaScript 的作用域机制并不支持这一点，基于这个需求，JavaScript 又搞出来另外一套 this 机制。

![](https://static001.geekbang.org/resource/image/b3/8d/b398610fd8060b381d33afc9b86f988d.png?wh=1142*615)


### arrow function的this指向
箭头函数因为其内部 this 的值无法被改变，它与 **创建** 箭头函数时上下文的this指向相同

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

### this 的设计缺陷以及应对方案
- 嵌套函数中的 this 不会从外层函数中继承
```js
var myObj = {
  name : "极客时间", 
  showThis: function(){
    console.log(this)
    function bar(){console.log(this)}
    bar()
  }
}
myObj.showThis()
```

- 普通函数中的 this 默认指向全局对象。

    - 不过这个设计也是一种缺陷，因为在实际工作中，我们并不希望函数执行上下文中的 this 默认指向全局对象，因为这样会打破数据的边界，造成一些误操作。如果要让函数执行上下文中的 this 指向某个对象，最好的方式是通过 call 方法来显示调用。

  - 这个问题可以通过设置 JavaScript 的“严格模式”来解决。在严格模式下，默认执行一个函数，其函数的执行上下文中的 this 值是 undefined，这就解决上面的问题了。

<!-- 关于this的指向问题，我通过查阅资料和阅读文章总结了判断this指向的几个优先级, 箭头函数 =》new关键字 =》 bind方法 =》apply和call方法 =》 函数作为对象的成员变量被调用，按照优先级来判断this，多个规则并用取优先级高的那个规则来判断 -->

<!-- 
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
``` -->
