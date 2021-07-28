---
    title: 了解console家族
    date: 2019-05-23
    tags: ['笔记']
    spoiler: 
---
## console.log()
经典的调试的代码，用来调试程序，看是否会准确的输出你所预期的东西
## console.dir()
当你用'正常'的值去测试这两个的，会发现没什么不同，但当你用元素节点来作为参数时，会发现不一样的东西，这是一种更对象化的方式去观察元素节点。当你想监测元素节点的时候，就可以用console.dir()
## console.table()
以列表做为展示数据的形式，更整洁的输出对象数组
## console.count()
作为计数器使用，可传入标签，在调用时会将数字（调用次数）写入到控制台。
## console.assert()
assert()在第一个参数是falsely变量时和log()一样。当第一个参数为真值时也什么都不做。
## console.trace()
这应该是个比较实用的方法，用于在混乱的依赖中寻找问题所在，console.log() 只能知道执行了哪一个库，并不知道执行的具体位置。但是，堆栈轨迹会清楚的告诉我们具体为止。
## console.time()
我经常用于测试算法的时间复杂度，在开始执行时，调用console.time();,结束运算时调用console.timeEnd();就可以完美显示了，执行时间，无需其他的变量和算法
## console.group()
它擅长展示代码中存在的结构关系，是个有意思的方法。
## console.warn()
当用相同的‘角度’去使用 console.warn()。就会发现区别在于输出是一抹黄色。确切的说，输出是一个warn级别而不是一个info级别的信息，因此浏览器的处理稍稍有些不同。在一堆杂乱的输出中高亮你的输出是很有效果的。