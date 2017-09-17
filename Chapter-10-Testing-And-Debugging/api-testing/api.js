var https = require("https");

module.exports = {
    sayHello(sName) {
        return `Hello, ${sName}`;
    },

    loadWiki(person, callback) {
        var sUrl = `https://en.wikipedia.org/wiki/${person.first}_${person.last}`;
        https.get(sUrl, function(res) {
            var body = "";
            res.setEncoding("UTF-8");
            res.on("data", function(chunk) {
                body += chunk;
            });
            res.on("end", function() {
                callback(body);
            });
        })
    }
}