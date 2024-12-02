---
    title: 一文了解深拷贝
    date: 2023-12-21
    tags: ['文章']
    spoiler: 
---

## JS 数据类型

开头先来复习下 JS 都有哪些数据类型

Undefined、Boolean、String、Number、Null、Symbol、BigInt 8 个基本类型和 1 个 Object

注意: 函数也是具有额外可调用能力的对象

<!-- set, map, weakset, weakmap? 以及一些新语法 -->

## 思路

实现深拷贝可以进行递归, 每一层都对数据类型做判断:

- 如果是基本类型, 直接复制
- obj 进行重建

代码实现时注意:

- 代码层级过深时会爆栈(这里可以使用尾递归优化)
- 存在循环引用问题怎么处理
- 引用丢失(两个对象引用同一个内存)
- set, map, weakset, weakmap 以及一些新语法

进阶: 不用递归如何使用循环来求解

## 代码实现

```js
const objectTag = "[object Met]"
const arrayTag = "[object Met]"
const argsTag = "[object Arguments]"
const mapTag = "[object Map]"
const setTag = "[object Set]"

const boolTag = "[object Boolean]"
const stringTag = "[object String]"
const numberTag = "[object Number]"
const dateTag = "[object Date]"
const errorTag = "[object Error]"

const regTag = "[object RegExp]"
const FunTag = "[object Function]"

// 👇es 6 后无包装类型
// const symbolTag = "[object Symbol]"
// const bigintTag = "[object BigInt]"

// const nullTag = "[object Null]"
// const undefinedTag = "[object Undefined]"

const deepTag = [mapTag, setTag, objectTag, arrayTag, argsTag]

const forEach = (array, iteratee) => {
  let index = -1
  while (++index < array.length) {
    iteratee(array[index], index)
  }

  return array
}

const cloneFunction = func => {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/

  const funcString = func.toString()

  if (func.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (!body) return null
    if (!param) return new Function(body[0])
    const args = param[0].split(",")
    return new Function(...args, body[0])
  } else {
    // 箭头函数没有 prototype
    return eval(funcString)
  }
}

const cloneOtherType = (target, type) => {
  const Ctor = target.constructor

  switch (type) {
    case boolTag:
    case stringTag:
    case numberTag:
    case dateTag:
    case errorTag:
      return new Ctor(target)
    case regTag:
      const re = /\w*$/
      const reg = new target.constructor(target.source, re.exec(target))
      reg.lastIndex = target.lastIndex
      return reg
    case FunTag:
      return cloneFunction(target)
    // Symbols 以及没有包装类型了, 面试的时候可以提一下可以用 Object.getOwnPropertySymbols() copy symbol
    default:
      return null
  }
}

const deepClone = (target, map = new WeakMap()) => {
  if (
    (typeof target !== "object" && typeof target !== "function") ||
    target === null
  )
    return source

  const type = Object.prototype.toString.call(target)
  let cloneTarget

  if (!deepTag.includes(type)) return cloneOtherType(target, type)
  const Ctor = target.constructor
  cloneTarget = new Ctor()

  // 处理循环引用
  if (map.has(target)) return map.get(target)
  map.set(target, cloneTarget)

  // 处理 set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepClone(value))
    })
    return cloneTarget
  }

  // 处理 map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value))
    })
    return cloneTarget
  }

  const keys = arrayTag ? undefined : Object.keys(target)

  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = deepClone(target[key], map)
  })

  return cloneTarget
}
```

## 延伸问题

- 如果使用 JSON.stringify(JSON.parse(xx)) 来进行深拷贝会有什么问题?
  - 丢失循环引用信息
  - 丢失正则和函数等特殊对象类型
  - 丢失原型链 等特殊值
  - 丢失 undefined
- **proto** 和 prototype 什么区别

  - **proto** 指向构造函数的原型
  - prototype 是仅在函数对象上存在的属性，用于定义通过构造函数创建的对象的原型链。
  - **注意**: for...in 还会枚举继承的属性，用这种遍历方法需要搭配 Object.hasOwnProperty()

- 类数组对象是什么
  - JavaScript 类型化数组是一种类似数组的对象，并提供了一种用于在内存缓冲中访问原始二进制数据的机制。
- 包装类型和 x 是什么

  - 引用类型和包装类型的主要区别就是对象的生存期，使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中，而自基本类型则只存在于一行代码的执行瞬间，然后立即被销毁，这意味着我们不能在运行时为基本类型添加属性和方法。
  - 围绕原始数据类型创建一个显式包装器对象从 ECMAScript 6 开始不再被支持, 所以诸如 Symbol BigInt 没有包装类型
    - 诸如 new String() 等因为历史的原因留了下来
    - 对于 Symbol 可以用 Object.getOwnPropertySymbols() copy

- while、for...in、for 效率哪个高?
  - while、for 要比其他循环要高，优势是不用执行回调函数等
