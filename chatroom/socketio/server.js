/**
 * Created by Administrator on 2016/3/30.
 */
var express= require('express');
var path= require('path');
var app = new express();
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});
var server =require('http').createServer(app);
server.listen('8080');
var io = require('socket.io')(server);
io.on('connection',function(socket){
   socket.on('message',function(msg){
        socket.send('server:'+msg);
   });
});





