---
    title: JavaScript模块化总结
    date: 2020-10-07
    tags: ['文章']
    spoiler: 
---
## 什么是模块化？
模块化是以提高代码复用率、减少代码管理的成本为核心思想的开发方式，一个模块有自己的私有作用域，只向外部暴露一些接口(方法，变量)，借此和其他模块进行通信，目前比较热门的js模块化规范：CommonJS、AMD、CMD以及ES6 Module。
## CommonJS
Node.js应用就是采用CommonJS规范组成的，它有四个环境变量为模块化的实现提供支持：global、require、module、exports。在模块中定义的变量、方法都是私有的，外部模块需要使用，需在模块内部用exports暴露。
### CommonJS运行时
- 模块加载的顺序，按照该模块在代码中出现的顺序(运行时加载)
- 所有代码都运行在模块私有作用域，不会污染全局作用域。
- 加载模块时会缓存运行结果，后续的加载会直接读取缓存，想要模块再次运行，需要清楚缓存
### CommonJS使用
1. module.exports属性   
module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。
```js
function example(a, b) {
  return a + b;
}
module.exports = {
  add:example
}
```
2. exports变量  
exports变量指向module.exports，这相当于在每个模块中都加入var exports = module.exports，也就是对外输出时可以在这个变量上添加方法， 
```js
exports.example = example
```

**注意**,不能把exports直接指向一个值，这样就相当于切断了exports和module.exports的关系
```js
// 例：
exports = 'dd' 
```  

3. require命令  
require命令用于加载模块文件，相当于读入并执行一个js文件，然后返回该模块的exports对象，没有发现指定模块，则就会报错。
基本使用：  
```js
// 引用自定义的模块时，参数包含路径，可省略.js
let example = require('./example')
example.add(2,3)
// 引用核心模块时，不需要带路径
var http = require('http')
http.createService(...).listen(3000)
```
加载规则：   
引用阮老师的博客  
> - 如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件。比如，require('/home/marco/foo.js')将加载/home/marco/foo.js。
> - 如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。比如，require('./circle')将加载当前脚本同一目录的circle.js。
> - 如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）
> - 如果参数字符串不以“./“或”/“开头，而且是一个路径，比如require('example-module/path/to/file')，则将先找到example-module的位置，然后再以它为参数，找到后续路径。
> - 如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node后，再去搜索。.js件会以文本格式的JavaScript脚本文件解析，.json文件会以JSON格式的文本文件解析，.node文件会以编译后的二进制文件解析。
> - 如果想得到require命令加载的确切文件名，使用require.resolve()方法。

4. 注意   
    - (加载方式)：在服务端CommonJS用同步的方式加载模块。
    - (加载方式)：在浏览器端，限于网络原因，更合理的方案是使用异步加载。
    - (加载机制)：输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值，想要影响到外面的值，需要把值暴露写成一个函数形式。

```js
let count = 0
function add(a, b) {
  ++count
}
module.exports = {
  get count(){
    return count
  },
  add:add
}
```

## ES6 Module
ES6 在语言标准的层面上，实现了模块功能，旨在成为浏览器和服务器通用的模块解决方案。主要由两个命令实现：export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
```js
//定义模块example
let count = 10
let add = function (a, b) {
    return a + b
}
export { count,add }
//引用模块
import { count,add } from './example'
function math() {
    return add(99,count)
}
```

使用import命令的时候，用户需要知道所要加载的变量名或函数名。ES6还提供了export default命令，为模块指定默认输出，对应的import语句不需要使用大括号。这也更趋近于ADM的引用写法。
```js
//定义输出
export default ( count,add )
//引入
import example from './example'
//调用
example.add(99,count)
```
**注意**：ES6的模块不是对象，import命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能，webpack也可以进行Tree-Sharking
## AMD
AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。允许指定回调函数，所有依赖这个模块的语句，都定义在这个回调函数中，等到加载完成之后，回调函数才会运行。  
基本使用：
- require.config()指定引用路径等
- define()定义模块
- require()加载模块
```js
//定义没有依赖的模块
define(function(){
   return 模块
})
定义有依赖的模块
define(['module1', 'module2'], function(m1, m2){
   return 模块
})
// require.config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib"，
  paths: {
    "jquery": "jquery.min",
    "underscore": "underscore.min"
  }
})
// 执行基本操作
require(['jquery', 'underscore'], function(m1, m2){
   使用模块
})
```

## CMD
CMD规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD规范整合了CommonJS和AMD规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。
基本使用：
```js
//定义模块
define(function(require, exports, module){
  exports.add = ...
  module.exports = ...
})
//引入模块
define(function (require) {
  var m1 = require('./m1')
  var m2 = require('./m2')
})
```

## 总结
主要总结下CommonJS和es module的区别：  
1. CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用。
  - CommonJS 模块输出的是值的拷贝，一旦输出一个值，模块内部的变化就影响不到这个值，会将结果进行缓存。
  - ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。因此ES6模块是动态引用，并且不会缓存值，对此webpack可以做tree-sharking处理。
2. CommonJS模块是运行时加载，ES6模块是编译时输出接口
  - CommonJS是运行时进行加载：模块就是对象，即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
  - ES6是编译时加载：模块不是对象，而是通过export命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。
