var express = require("express"),
    WebsocketServer = require("ws").Server;

var server = express(),
    wss = new WebsocketServer({
        port: 3500
    });

wss.on("connection", function(ws) {
    ws.send("Welcome to super chat");
    ws.on("message", function(message) {
        wss.clients.forEach(function(client) {
            client.send(message);
        });
    });
});

server.use(express.static("public"));
server.listen(3000);

console.log("Server started @ http://locahost:3000");