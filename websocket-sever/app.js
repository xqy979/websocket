//1.导入node.Js-websocket
const ws = require('nodejs-websocket')
const PORT = 3000

//2.创建一个serve
// 2.1如果处理用户的请求

//每次只要有用户连接，函数就会被执行，函数会被执行，会给当前连接的用户创建
const server =  ws.createServer(connect=>{
    console.log('有用户连接上来了?')
    connect.on('text',data=>{
        console.log('接收到了用户的数据',data)
        //给用户一个响应的数据
        connect.send(data)
    })
    //连接断开
    connect.on('close',()=>{
        console.log('连接断开了')
    })
    //处理用户的错误信息
    connect.on('error',()=>{
        console.log('用户连接异常')
    })
})

server.listen(PORT,() => {
    console.log("websocket服务启动成功了,监听端口"+PORT)
})