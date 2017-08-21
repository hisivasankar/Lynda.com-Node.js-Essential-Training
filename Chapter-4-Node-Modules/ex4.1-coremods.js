var path = require("path"),
    util = require("util"),
    v8 = require("v8");

var sCurrentFileName = path.basename(__filename),
    sMagicFolderName = path.join(__dirname, 'magic', 'folder', Math.floor(Math.random() * 10).toString());

var oMemoryStats = v8.getHeapStatistics();

util.log(sCurrentFileName);
util.log(sMagicFolderName);
util.log(oMemoryStats);