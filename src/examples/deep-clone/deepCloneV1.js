const deepClone = source => {
  if (typeof source !== "object" || source === null) return source

  let targetObj = Array.isArray(source) ? [] : {}

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      targetObj[key] = deepClone(source[key])
    }
  }

  return targetObj
}
