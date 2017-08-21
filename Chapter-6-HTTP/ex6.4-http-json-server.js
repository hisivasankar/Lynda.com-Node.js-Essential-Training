var http = require("http"),
    util = require("util");

var data = [{
    name: "Jon Snow",
    type: ["good"]
}, {
    name: "Ned Stark",
    type: ["good"]
}, {
    name: "Arya Stark",
    type: ["good"]
}, {
    name: "Missandei",
    type: ["hot"]
}, {
    name: "Tyrion Lannister",
    type: ["good"]
}, {
    name: "Cersi Lannister",
    type: ["bitch", "badass"]
}, {
    name: "Tywin",
    type: ["badass"]
}, {
    name: "The mountain",
    type: ["badass"]
}];

function getData(sType) {
    var aFound = data.filter(function(oCharacter) {
        return oCharacter.type.indexOf(sType) !== -1;
    });
    return aFound;
}

var server = http.createServer(function(req, res) {
    util.log(`Method: ${req.method} -> URL: ${req.url}`);
    if (req.url === "/" || req.url === "/got") {
        res.writeHead(200, {
            "Content-Type": "text/json"
        });
        res.end(JSON.stringify(data));
    } else if (req.url.match(/got\/\w+/gi)) {
        var type = req.url.split("/")[2];
        var found = getData(type);
        if (found.length > 0) {
            res.writeHead(200, {
                "Content-Type": "text/json"
            });
            found = JSON.stringify(found);
        } else {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            found = "404, No characters found"
        }
        res.end(found);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        found = "404, Not found"
        res.end(found);
    }
});

server.listen(3000);
console.log("Server Started at 3000...");