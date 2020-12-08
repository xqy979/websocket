 const ws = require('nodejs-websocket')
 const TYPE_ENTER = 0 //进入
 const TYPE_LEAVE = 1 //离开
 const TYPE_MSG = 2 //正常
 const  myDate = new Date(); 
/**
 * 分析：
 * 消息不应该是简单的字符串
 * 这个消息应该是一个对象
 * type：消息的类型. 0:标识聊天室的消息 1.用户离开聊天室的消息 2.正常的聊天消息
 * msg:消息内容
 * time 聊天的具体时间
 */

 //记录当前连接上来的总的用户数量
 let count = 0 
 //conn每个连接到服务器的用户，都会有一个conn
 const server = ws.createServer(conn=>{
    console.log("新的连接")
    count++
    conn.userName = `用户${count}`
    //1.告诉所有用户，有人加入了聊天室
    broadcast({
            type:TYPE_ENTER,
            msg:`${conn.userName}进入了聊天室`,
            time:myDate.toLocaleTimeString(),
    })
    //接收浏览器数据
    conn.on('text',data=>{
        //2.当我们接收到某个用户的信息时候，告诉所有用户，发送的信息
        //聊天的消息
        broadcast({
            type:TYPE_MSG,
            msg:data,
            time:myDate.toLocaleTimeString(),
        })
    })
    //关闭连接
    conn.on('close',data=>{
        count--
        //3.告诉所有用户，有人离开了聊天室
        broadcast({
            type:TYPE_LEAVE,
            msg:`${conn.userName}离开了聊天室`,
            time:myDate.toLocaleTimeString(),
        })
    })
    //发送异常
    conn.on('error',data=>{
        console.log("发送异常")
    })
 })

 //广播给所有用户发送消息
 function broadcast(msg){
    server.connections.forEach(item=>{
        item.send(JSON.stringify(msg))
    })
 }

 server.listen(3000,()=>{
     console.log('监听端口3000')
 })