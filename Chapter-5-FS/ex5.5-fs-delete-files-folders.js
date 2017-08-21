var fs = require("fs"),
    path = require("path"),
    child_process = require("child_process");

var sFolderToCheck = "temp-folder";


function deleteEntry(sFilePath) {
    var stat = fs.statSync(sFilePath);
    console.log("Path: ", sFilePath);
    if (stat.isFile()) {
        fs.unlinkSync(sFilePath);
    } else {
        removeFiles(sFilePath);
    }
}

function removeFiles(sFolderPath) {
    if (!fs.existsSync(sFolderPath)) {
        return;
    }
    console.log("Folder to delete: ", sFolderPath);
    fs.readdir(sFolderPath, function(err, aFiles) {
        aFiles.forEach(function(sFile) {
            var sPath = path.join(sFolderPath, sFile);
            deleteEntry(sPath);
        });
    });
}

var sFolderToDelete = path.join(__dirname, sFolderToCheck);
if (!fs.existsSync()) {
    console.log("creating dummpy folder and files to perform delete action");
    child_process.execSync("node ex5.3-fs-create-dir.js");
}
console.log("Deleting files recursively");
removeFiles(sFolderToDelete);
fs.rmdir(sFolderToDelete);
console.log("Folder deleted");