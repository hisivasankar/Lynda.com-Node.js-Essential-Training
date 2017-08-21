var http = require("http"),
	util = require("util");

var server = http.createServer(function(req, res){
	util.log(`Method: ${req.method} -> URL: ${req.url}`);
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("Something Stupid");
});

server.listen(3000);
console.log("Server Started at 3000...");