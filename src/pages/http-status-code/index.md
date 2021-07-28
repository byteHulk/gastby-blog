---
    title: http状态码
    date: 2019-04-27
    tags: ['笔记']
    spoiler: 
---
## 2XX
2XX的响应结果表明请求被正常处理了
- 200 正确的执行了请求
- 204 正确的执行了请求，但没有资源可返回
- 206 正确的执行了范围请求 (HTTP 1.1新)

## 3XX
- 301 
永久性重定向
- 302
临时重定向
- 303
临时重定向，并希望将POST方法改为GET去请求 (HTTP 1.1新)
- 304
文件未被修改，使用未过期的缓存即可
- 305 客户请求的文档应该通过Location头所指明的代理服务器提取（HTTP 1.1新）
- 307
遵守浏览器标准，不会将POST方法改为GET去请求 (HTTP 1.1新)

## 4XX
- 401
表示请求的发送需要有HTTP认证(BASIC认证、DIGEST认证)
- 403
服务器拒绝访问请求资源，
- 404
请求资源找不到
- 405 请求方法（GET、POST、HEAD、DELETE、PUT、TRACE等）对指定的资源不适用（HTTP 1.1新）
- 406 指定的资源已经找到，但它的MIME类型和客户在Accpet头中所指定的不兼容（HTTP 1.1新）

## 5XX
- 500
服务器内部错误
- 503
服务器可能正在维护
- 505 HTTP Version Not Supported 服务器不支持请求中所指明的HTTP版本。（HTTP 1.1新）


[被记录在RFC2616的状态码](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10)