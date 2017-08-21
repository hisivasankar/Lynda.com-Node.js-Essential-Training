var fs = require("fs"),
    path = require("path"),
    child_process = require("child_process");

var sFolderToCheck = "temp-folder";

var sPathToCheck = path.join(__dirname, sFolderToCheck);

if (!fs.existsSync(sPathToCheck)) {
    console.log("Folder doesn't exist. Trying to create folder and files");
    console.log("use ex5.3 to create temp folders and files");
    child_process.execSync("node ex5.3-fs-create-dir.js");
}

fs.readdir(sPathToCheck, function(err, aFiles) {
    if (err) {
        console.log(err);
    }

    var sNewDirName = "files",
        sNewDirPath = path.join(sPathToCheck, sNewDirName);
    if (!fs.existsSync(sNewDirPath)) {
        fs.mkdirSync(sNewDirPath);
    }

    var aFiles = aFiles.filter(function(sFile) {
        return fs.statSync(path.join(sPathToCheck, sFile)).isFile();
    });

    aFiles.forEach(function(sFileName) {
        var sNewName = sFileName.replace(/dummy/gi, "temp-file"),
            sFilePath = path.join(sPathToCheck, sFileName),
            sNewFileName = path.join(sPathToCheck, sNewDirName, sNewName);
        fs.renameSync(sFilePath, sNewFileName);
    });

    console.log("Files are renamed and moved to new directory called 'files'");
});