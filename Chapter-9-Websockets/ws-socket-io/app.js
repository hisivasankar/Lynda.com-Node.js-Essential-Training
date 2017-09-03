var express = require("express"),
    http = require("http");

var server = express(),
    httpServer = http.createServer(server).listen(3000),
    sio = require('socket.io')(httpServer);

server.use(express.static("./public"));

sio.on("connection", function(socket){
    socket.emit("message", "Welcome to Socket.io Chat");

    socket.on("chat", function(message){
        socket.broadcast.emit("message", message);
    });
});

console.log("Server started @ http://locahost:3000");