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
