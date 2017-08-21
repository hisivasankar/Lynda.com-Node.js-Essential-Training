var http = require("http"),
	fs = require("fs"),
    path = require("path"),
    util = require("util");


function handleGETRequest(req, res) {
    if (req.url === "/") {
        var sFilePath = path.join(__dirname, "public", "index.html");
        var stream = fs.createReadStream(sFilePath, "UTF-8");
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        stream.pipe(res);
    } else if(req.url.match(/.css$/)) {
        var sFilePath = path.join(__dirname, "public", req.url);
        var stream = fs.createReadStream(sFilePath, "UTF-8");
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        stream.pipe(res);
    } else if(req.url.match(/.jpg$/)) {
        var sFilePath = path.join(__dirname, "public", req.url);
        var stream = fs.createReadStream(sFilePath);
        res.writeHead(200, {
            "Content-Type": "image/jpg"
        });
        stream.pipe(res);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.end("404 - File not found dog!");
    }
}

function getGoalFormData(sFormData) {
    var oFormData = {};
    sFormData.split("&").forEach(function(sParam){
        var aData = sParam.split("=");
        oFormData[aData[0]] = decodeURIComponent(aData[1]);
    })
    return oFormData;
}

function handleGoalFormPOSTRequest(req, res) {
    var formBody = "";
    req.on("data", function(chunk){
        formBody += chunk;
    })
    req.on("end", function(){
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        var oFormData = getGoalFormData(formBody);

        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Dream Goal</title>
                <link rel="stylesheet" type="text/css" href="./styles.css">
            </head>
            <body>
                <h1>Welcome ${oFormData.username}!</h1></br></br>
                <h2>All the best for your goal! You will achieve your ${oFormData.dreamgoal} goal <3</h2>
                <p><a href="/">Click here to go back</a></p>
            </body>
            </html>
        `);
    });
}

function handlePOSTRequest(req, res) {
    if(req.url === "/goalform") {
        handleGoalFormPOSTRequest(req, res);
    } else {
        res.writeHead("404", {
            "Content-Type": "text/plain"
        });
        res.end("Unsupported form request");
    }
}

function handleRequest(req, res) {
    util.log(`Method: ${req.method} -> URL: ${req.url}`);
    if(req.method === "GET") {
        handleGETRequest(req, res);
    } else if(req.method === "POST") {
        handlePOSTRequest(req, res);
    } else {
        res.writeHead(500, "Can't handle this type of request at the moment");
        res.end("This type of request is not supported yet!");
    }
};

var server = http.createServer(handleRequest);

server.listen(3000);
console.log("Server Started at 3000...");