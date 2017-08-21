var fs = require("fs"),
    path = require("path");

var sFolderName = "temp-folder";

function createDummyFiles(sFolderName) {
    var sFileNamePrefix = "Dummy-";
    for (var i = 1; i < 10; i++) {
        var sPathToCreate = path.join(__dirname, sFolderName, sFileNamePrefix + i + ".txt");
        fs.writeFileSync(sPathToCreate, "Somthing stupid - " + sFileNamePrefix + i);
    }
}

var sFolderToCreate = path.join(__dirname, sFolderName);
if (fs.existsSync(sFolderToCreate)) {
    console.log("Folder already exists");
} else {
    fs.mkdir(sFolderToCreate, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Folder created");
        }
        createDummyFiles(sFolderName);
    });
}

