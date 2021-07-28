---
    title: 浏览器缓存
    date: 2020-06-21
    tags: ['文章']
    spoiler: 
---
## 概念扫盲：
* 1.浏览器缓存分为三个部分：强缓存 协商缓存 缓存位置
* 2.浏览器缓存分为两种情况：需要发送HTTP请求 不需要发送HTTP请求

## 强缓存
强缓存是不需要发送HTTP请求的，可通过相应的字段来进行：HTTP/1.0时期使用的是Expires，而HTTP/1.1使用的是Cache-Control

### Expires
Expires即过期时间，存在于服务端返回的响应头中，用以告诉浏览器在这个过期时间内可以直接从缓存里面获取数据，无需再次请求，例：

    Expires: Wed, 22 Nov 2019 08:41:00 GMT

表示资源在这段时间后过期，过期后就需要从新向服务端发请求

**然而服务器和浏览器的时间可能不一致，那这个过期时间就是不准确的，因此这种方式很快在后来的HTTP1.1中被抛弃来了**

### Cache-Control
Cache-Control没有采取过期时间的方式，而采用了过期时长来控制缓存，对应字段是max-age=3600

    Cache-Control: max-age=3600

代表在这段时间内，可以直接使用缓存

Cache-Control可以组合很多的命令，如： 
public：代理服务器和浏览器都可以进行缓存  
private： 仅浏览器可缓存  
no-cache：跳过强缓存，直接进入协商缓存阶段  
no-store：不进行任何形式的缓存  
s-maxage： 针对代理服务器的缓存时间  
must-revalidate：一旦过期，必须回到源服务器验证  

<font color=red>Cache-Control比Expires的优先级高</font>  
缓存时间超时了，进入协商缓存

## 协商缓存
强缓存失效后，浏览器在请求头中携带相应的缓存tag来向服务器发请求，服务器根据tag来决定是否使用缓存，缓存tag分为两种：Last-Modified和ETag

### Last-Modified
即最后修改时间，浏览器第一次给服务器发送请求后，服务器会在相应头中加上这个字段。  
浏览器接受后，如果再次请求，会在请求头中携带If-Modified-Since字段，值也就是服务器传来的最后修改时间，例：  

    If-Modified-Since: Sat, 29 Feb 2020 10:02:10 GMT

服务器拿到请求头的If-Modified-Since后，会和服务器中该资源的最后修改时间对比：
- 这个值小于最后修改时间，说明是时候更新了，返回新的资源，跟常规的HTTP请求响应的流程一样
- 否则返回304，告诉浏览器直接用缓存

### ETag
ETag是服务器根据当前文件的内容，给文件生成的唯一标识，服务器通过相应头把这个值给浏览器  
浏览器接受后，如果再次请求，会将这个值作为If-None-Match的内容，放到请求头中，例：  

    If-None-Match: W/"69d9-17090656aef"

服务器拿到请求头的If-None-Match后，会和服务器中该资源的ETag进行对比：
- 两者不一样，说明是时候更新了，返回新的资源，跟常规的HTTP请求响应的流程一样
- 否则返回304，告诉浏览器直接用缓存

### 两者对比
1.精准度上，ETag优于Last-Modified，上标识要比修改时间能更准确的感知资源的变化，例：
- 编辑了文件，内容未更改，这样也会造成缓存失效
- Last-Modified能够感知的单位时间是秒，如果文件在1秒内改变多次，那么这时候就体现不出修改了

2.性能上反而是Last-Modified优于ETag，一个是记录时间，一个是生成哈希值  
两种方式都支持的话，服务器会优先考虑ETag

## 缓存位置
当强缓存命中或者协商缓存命中，服务器返回304的时候，我们直接从缓存中获取资源，但这些资源缓存在哪里呢？  
浏览器中的缓存位置一共有四种，按优先级从高到低排列分别是：  
- Service Worker
- Memory Cache
- Disk Cache
- Push Cache

### Service Worker
Service Worker借鉴了Web Worker的思路，即让JS运行在主线程之外，由于它脱离了浏览器的窗体，无法直接访问DOM，可完成的功能，比如：离线缓存、消息推送、网络代理等，Service Worker同时也是PWA的重要实现机制

### Memory Cache和Disk Cache
Memory Cache就是在内存缓存，存取效率最快，存活时间最短，当渲染进程结束后，内存缓存就不存在了  
Disk Cache是指存储在磁盘中的缓存，存取要比内存缓存慢，但它的优势在于存储容量和存储时长  
浏览器缓存资源策略：  
- 比较大的Js、CSS文件会放进磁盘，反之丢进内存
- 内存使用率比较高的时候，文件优先进入磁盘

### Push Cache
[扩展链接](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)

## 总结
浏览器的缓存机制为：先通过Cache-Control监测强缓存是否可用：
- 可用，直接使用强缓存
- 否则进入协商缓存，即发送HTTP请求，服务器通过请求头中的If-Modified-Since或者If-None-Match这些字段请求检查资源是否更新：
- 若资源更新，返回资源和200状态码
- 否则，返回304，告诉浏览器直接从缓存获取资源即可
