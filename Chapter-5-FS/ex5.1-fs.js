var fs = require("fs"),
    path = require("path"),
    sFolderToSearch = "libs";

fs.readdir("./" + sFolderToSearch, function(err, aFiles) {
    if (err) {
        console.log(err);
    }
    aFiles.forEach(function(sFileName) {
        var fileName = path.join(__dirname, sFolderToSearch, sFileName),
            fileStats = fs.statSync(fileName);
        if (fileStats.isFile()) {
            var contents = fs.readFileSync(fileName, "UTF-8");
            console.log(contents);
        }
    });
});