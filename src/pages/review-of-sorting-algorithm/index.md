---
    title: 排序算法复习
    date: 2019-04-24
    tags: ['笔记']
    spoiler: 
---
## 介绍
对计算机中存储的数据执行最常见的操作是排序和检索，本章将复习数据排序的基本算法和高级算法，以及如何应用使操作其中的数据时更简洁高效。
## 一、基本排序算法
基本排序算法其核心思想是对一组数据按照一定顺序重新排列，核心理念是一组嵌套的for循环，外层遍历数组每一项，内循环则用于比较元素，这些算法逼真的模拟了人类在现实生活中对数据的排序。
### 1.冒泡排序
冒泡排序是最慢的排序算法之一，也是最容易实现的排序算法，之所以叫冒泡排序是因为使用这种排序算法排序时，数据值会像气泡一样从数组的一端漂到另一端，较大的值浮动到数组右侧，较小的浮动到数组的左侧，算法会多次在数组中移动，比较相邻数据，依照大小进行位置互换。
```js
function bubbleSort(arr){
    let len = arr.length
    for(let outer = len; outer > 1; --outer) {
        for(let inner = 0; inner < outer - 1; ++inner) {
            if(arr[inner] > arr[inner+1]) {
                let temp;
                temp = arr[inner]
                arr[inner] = arr[inner+1]
                arr[inner+1] = temp
            }
        }
    }
}
```

### 2.选择排序
选择排序从数组的开头开始，将第一个元素和其他元素进行比较。检查完所有元素后，最小的元素会被放到数组的第一个位置，然后算法会从第二个位置继续，当进行到数组的倒数第二个位置时，所有数据便完成了排序。
```js
function selectionSort(arr){
    let len = arr.length
    let min;
    for(let outer = 0; outer > len - 2; ++outer) {
        min = outer
    for(let inner = outer + 1; inner <= len - 1; ++inner) {
      if(arr[inner] < arr[min]) {
          min = inner
      }
          let temp;
          temp = arr[inner]
          arr[inner] = arr[inner+1]
          arr[inner+1] = temp
    }
  }
}
```

### 3.插入排序
插入排序类似于按姓氏进行排序，先拿出第一个人，把他放在表头，再拿起第二个人，比较他们的姓氏，进行排序，再拿起第三个人，假如他是姓安，那么这条必须插入到最前面，所有人为他往后移动一格，这就输插入排序的原理。
```js
function insertionSort(arr){
    let len = arr.length
    let temp, inner;
    for(let outer = 1;outer <= len - 1;++outer){
        temp = arr[outer];
        inner = outer
        while(inner > 0 && (arr[inner - 1] >= temp)){
            arr[inner] = arr[inner - 1]
            --inner;
        }
        arr[inner] = temp
    }
}
```
### 基本排序算法的计时比较
> 对于10000个元素执行冒泡排序的时间为：1096毫秒   
对于10000个元素执行选择排序的时间为：591毫秒   
对于10000个元素执行插入排序的时间为：471毫秒

对于10000个数字来说，插入排序是最快的，要比冒泡排序差不多快一倍

## 二、高级排序算法
高级排序算法通常被认为是处理大型数据集的最高效排序算法，它们处理的数据集可以达到上百万个元素，并且还能高效的完成排序。

### 1.希尔排序
希尔排序是以它的创造者(Donald Shell)命名的，希尔排序在插入排序的基础上做了很大改善，希尔排序的理念与插入排序不同的是，它会先比较距离较远的元素，而非相邻的元素，和简单的与相邻的元素相比，使用这种方法可以使离正确位置很远的元素更快的找到适合的位置，使用这个算法进行遍历时所有的元素之间的距离会不断减小，知道处理到数据集末尾，这时算法比较的就是相邻元素了。
#### 间隔序列
希尔排序的关键在于需要一个间隔序列来表示在排序过程中进行比较的元素之间有多远的间隔，我们可以动态定义间隔序列，不过对于大部分的实际应用场景，算法要用到间隔序列可以提前定义好，有些公开的定义序列，在这里我们用到了Matcin Ciura在他2001年发表的论文 "[Best Increments for the Average Caseof Shellsort](https://bitly.com/1b04YFv)"中定义的间隔序列：[701,301,132,57,23,10,4,1]
```js
function shellSort(arr,gaps = [701,301,132,57,23,10,4,1]){
    let len = arr.length
    for(let g = 0;g < gaps.length;++g){
        for(let i = gaps[g];i < len - 1;++i){
            let temp = arr[i]
            for(var j = i;j >= gaps[g] && arr[j - gaps[g]] > temp;j -= gaps[g] ){
                arr[j] = arr[j] - gaps[g]
            }
            arr[j] = temp
        }
    }
}
```
在一个长度为12的数据集中，算法在第一次处理时，会检查所有间隔为10的元素，下一次遍历会检查所有间隔为4的元素，最后一次则会对间隔为1的元素，也就是标准的插入排序，在做最后处理的时，大部分元素都将在正确的位置，算法不必对很多元素做交换，这就是希尔排序比插入排序高效的地方。
#### 动态计算间隔序列
Robert Sedgewick定义了一个希尔函数，这个函数可以通过一个公式来对希尔排序用到的间隔序列进行动态计算，让我们来改造代码把，哈哈。
```js
function dynamicShellSort(arr){
    let len = arr.length
    let h = 1
    while(h < len/3){
        h = 3 * h + 1
    }
    while(h >= 1){
        for(var i = h;i< len;i++){
            for(var j = i;j >= h && arr[j] < arr[j-h];j -=h){
                let temp;
                temp = arr[j]
                arr[j] = arr[j-h]
                arr[j-h] = temp
            }
        }
        h = (h-1)/3
    }
}
```
#### 效率比较
> 对于同样采用100000个数据进行排序的耗时为  
硬编码间隔序列的希尔排序消耗时间为：43毫秒   
动态间隔序列的希尔排序消耗时间为：43毫秒   

### 2.归并排序
归并排序的命名来自与它的实现原理：把一系列排好序的子序列合并成一个大的完整有序序列，但在一个数据集很大的场景下，需要相当大的空间来合并存储两个子数组，这是个问题。现在来探讨内存不那么昂贵，空间不是问题的场景下，去实现下归并排序
#### 自顶向下的归并排序
排序一个数组，我们先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排好序的两部分合并在一起，这样整个数组就都有序了。
#### 自底向上的归并排序
首先先将数据集分解为一组只有一个元素的数组，然后通过创建一组左右子数组将它们慢慢合并起来，每次合并都保存一部分排好的数据，直到剩下的这个数组所有的数据已完美排序

### 3.快速排序
快速排序是处理大数据集最快的排序算法之一，它是一种分而治之的算法，通过递归的方式将数据分解为包含较小的元素和较大元素的不同子序列，该算法不断重复这个步骤直到所有数据都是有序的。这个算法需要在数组中选择一个元素作为基准值(pivot)，数据排序围绕基准值进行，将列表中小于基准值的元素移动到数组的地步，将大于基准值的元素移动到数组的顶部。
```js
function qSort(arr){
    let len = arr.length
    if(len === 0){
        return []
    }
    let lesser = []
    let greater = []
    let pivot = arr[0]
    for(let i = 1;i < len;++i){
        if(arr[i] < pivot){
            lesser.push(arr[i])
        }else{
            greater.push(arr[i])
        }
    }
    return qSort(lesser).concat(pivot,qSort(greater))
}
```
快速排序非常适用于大型数据集合，在处理小数据集时性能反而会下降   
### 算法可视化工具
传送门： [algorithm-visualizer](https://github.com/algorithm-visualizer/algorithm-visualizer)

