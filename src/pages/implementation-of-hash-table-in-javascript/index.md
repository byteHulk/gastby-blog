---
    title: JavaScript的哈希表实现
    date: 2019-05-05
    tags: ['笔记']
    spoiler: 
---
## hashMap的数据结构的组成  
数组、链表、红黑树
## 哈希函数的实现  
```js
class HashMap{
    constructor(size){
        this.table = new Array(size)
        this.simpleHash()
    }
    simpleHash(data){
        return data % this.table.length
    }
    put(data){
        let pos = this.simpleHash(data)
        this.table[pos] = data
    }
    get(data){
        let pos = this.simpleHash(data)
        return this.table[pos]
    }
    show(){
        console.log(this.table)
    }
}
module.exports = HashMap
```

## 冲突|碰撞的解决方法
- 1.开链法   
如果pos冲突,即在此位置创建二维数组或者链表？
- 2.线性探测法  
由于hashMap散列表是不规则的,冲突后查询下一个位置是否为空,直至结束,返回undefined
- 3.红黑树?  
当某个节点后出现过多的链表节点的时候,就会转化为红黑树以提升查询效率