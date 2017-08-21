var iWaitTime = 5000,
    iWaitInterval = 500,
    iCurrentTime = 0;


function writePercentage(p) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Waiting... ${p}%`);
}
var intervalTimer = setInterval(function() {
	iCurrentTime += iWaitInterval;
    var p = Math.floor((iCurrentTime / iWaitTime) * 100);
    writePercentage(p);
}, iWaitInterval);

setTimeout(function(){
	clearInterval(intervalTimer);
	writePercentage(100);
	console.log("\n\nDone!\n\n");
}, iWaitTime);
writePercentage(0);