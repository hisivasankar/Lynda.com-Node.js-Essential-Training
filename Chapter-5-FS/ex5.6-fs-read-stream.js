var fs = require("fs"),
    path = require("path");

function createDummyFile() {
    var sFolder = "chat",
        sFolderToCreate = path.join(__dirname, sFolder);

    var sFileNameToBeCreated = "stupid.log",
        sFileContent = `This is something stupid.\n`;

    if (!fs.existsSync(sFolderToCreate)) {
        fs.mkdirSync(sFolderToCreate);
    }

    var sFilePath = path.join(sFolderToCreate, sFileNameToBeCreated);

    if (fs.existsSync(sFilePath)) {
        fs.unlinkSync(sFilePath);
    }

    var writeStream = fs.createWriteStream(sFilePath);
    var sContent = "";
    for (var i = 0; i < 1000; i++) {
         sContent += sFileContent.repeat(100);
    }
    writeStream.write(sContent);
    writeStream.close();

    console.log(`${sFileNameToBeCreated} File created`);
    return sFilePath;
}

var sFilePath = createDummyFile();

var stream = fs.createReadStream(sFilePath, "UTF-8");

var sFileContent = "";

stream.once("data", function() {
    console.log("Reading Data...");
});
stream.on("data", function(data) {
    sFileContent += data;
    console.log(`Chunk Size: ${data.length}`);
});
stream.on("end", function() {
    console.log(`Data Read: ${sFileContent.length}`);
});