---
    title: 手画深拷贝
    date: 2019-07-12
    tags: ['文章']
    spoiler: 
---

```js
function clone(target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target
  }

  const type = getType(target)

  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target)
  } else {
    cloneOtherType(target, type)
  }

  // 克隆set类型
  if (type == setTag) {
    target.forEach(value => {
      cloneTarget.add(clone(value, map))
    })
    return cloneTarget
  }

  // 克隆map类型
  if (type == mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map))
    })
    return cloneTarget
  }
  
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = clone(target[key], map)
  })
  return cloneTarget
}
```
