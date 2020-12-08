 const ws = require('nodejs-websocket')

 //记录当前连接上来的总的用户数量
 let count = 0 
 //conn每个连接到服务器的用户，都会有一个conn
 const server = ws.createServer(conn=>{
    console.log("新的连接")
    count++
    conn.userName = `用户${count}`
    //1.告诉所有用户，有人加入了聊天室
    broadcast(`${conn.userName}进入了聊天室`)
    //接收浏览器数据
    conn.on('text',data=>{
        //2.当我们接收到某个用户的信息时候，告诉所有用户，发送的信息
        broadcast(data)
    })
    //关闭连接
    conn.on('close',data=>{
        count--
        //3.告诉所有用户，有人离开了聊天室
        broadcast(`${conn.userName}离开了聊天室`)
    })
    //发送异常
    conn.on('error',data=>{
        console.log("发送异常")
    })
 })

 //广播给所有用户发送消息
 function broadcast(msg){
    server.connections.forEach(item=>{
        item.send(msg)
    })
 }

 server.listen(3000,()=>{
     console.log('监听端口3000')
 })