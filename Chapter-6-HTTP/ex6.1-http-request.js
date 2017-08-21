var https = require("https");

var options = {
    hostname: "www.google.com",
    port: 443,
    method: "vGET"
};

var req = https.request(options, function(res) {
    var responseBody = "";

    res.setEncoding("UTF-8");

    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${res.headers}`);

    res.once("data", function(chunk) {
        console.log(chunk);
    });

    res.on("data", function(chunk) {
        console.log(`--chunk-- ${chunk.length}`);
        responseBody += chunk;
    });

    res.on("end", function() {
        console.log(responseBody.length);
    });
});

req.on("error", function(err) {
    console.log(err);
});

req.end();