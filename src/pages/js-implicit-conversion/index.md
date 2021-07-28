---
    title: js隐式转换
    date: 2020-11-22
    tags: ['文章']
    spoiler: 
---
在判断是否为空数组时，一种是对数组的length属性进行判断即可，第二种进行下图的判断
```js
arr == false
```
这就是js的隐式转换，但存在很多摸不清楚的状况，进行今天的学习，希望对js的隐式转换有所了解。
## Js隐式转换规则
## ToBoolean
- 只有false、null、undefined、空字符、0和NaN，其它值转为布尔型都为true。
## ToPrimitive
- 当对象类型需要被转为原始类型时，它会先查找对象的valueOf方法，valueOf方法会返回原始类型的值
- 如果valueOf不存在或者返回的不是原始类型的值，就会尝试调用对象的toString方法，也就是会遵循对象的ToString规则，然后使用toString的返回值作为ToPrimitive的结果。   
比如经典的一道题：如何让if(a == 1 && a == 2)条件成立？
```js
var a = {
  value: 0,
  valueOf: function() {
    this.value++
    return this.value
  }
}
console.log(a == 1 && a == 2)//true
```

### ToString
- null：转为"null"
- undefined：转为"undefined"
- 布尔类型：true和false分别被转为"true"和"false"
- 数字类型：转为数字的字符串形式，如10转为"10"， 1e21转为"1e+21"
- 数组：转为字符串是将所有元素按照","连接起来，相当于调用数组的Array.prototype.join()方法，如[1, 2, 3]转为"1,2,3"，空数组[]转为空字符串，数组中的null或undefined，会被当做空字符串处理
- 普通对象：转为字符串相当于直接使用Object.prototype.toString()，返回"[object Object]"
## ToNumber
- null： 转为0
- undefined：转为NaN
- 字符串：如果是纯数字形式，则转为对应的数字，空字符转为0, 否则一律按转换失败处理，转为NaN
- 布尔型：true和false被转为1和0
- 数组/对象：数组首先会被转为原始类型，也就是ToPrimitive，然后根据原始类型按照上面的规则处理
## 布尔类型参与比较
- 布尔类型参与比较，该布尔类型的值首先会被转换为数字类型
- 根据布尔类型的ToNumber规则，true转为1，false转为0
```js
  let a = 2
  if (a == true) {
  }
```
a == true 布尔值true会转换为数字类型1，即2==1，所以不会执行if里面的语句
## 数字类型和字符串类型参与比较
- 当数字类型和字符串类型做相等比较时，字符串类型会被转换为数字类型
- 根据字符串的ToNumber规则，如果是纯数字形式的字符串，则转为对应的数字，空字符转为0, 否则一律按转换失败处理，转为NaN
## 对象类型和原始类型参与比较
- 当对象类型和原始类型做相等比较时，对象类型会依照ToPrimitive规则转换为原始类型
## null、undefined特殊的转换规则
null和undefined==的结果为true
```js
null == false // false
undefined == false // false
```
ECMAScript规范中规定null和undefined之间互相宽松相等（==），并且也与其自身相等，但和其他所有的值都不宽松相等（==）。

## ==的转换规则
- 两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false
- 判断的是否是null和undefined，是的话就返回true
- 判断的类型是否是String和Number，是的话，把String类型转换成Number，再进行比较
- 判断其中一方是否是Boolean，是的话就把Boolean转换成Number，再进行比较
- 如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较
