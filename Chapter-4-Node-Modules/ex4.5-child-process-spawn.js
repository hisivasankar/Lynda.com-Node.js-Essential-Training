var spawn = require('child_process').spawn;

var cp = spawn("node", ["ex4-motivation-quotes"]);

cp.stdout.on("data", function(data) {
    console.log(`CP STDOUT says: ${data.toString()}`);
});

cp.on('close', function() {
    console.log("Child process ended");
});

setTimeout(function() {
    cp.stdin.write("stop");
}, 5000);