var path = require("path");

console.log('Hello World!');

var sDirName = __dirname,
    sFileName = path.basename(__filename);

console.log(sDirName);

console.log(`Hello there, ${sFileName}`);