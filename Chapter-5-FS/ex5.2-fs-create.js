var readline = require('readline');
var fs = require('fs');
var path = require('path');

var realPerson = {
    name: '',
    wants: []
};

var rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What is your name? ", function(name) {
    realPerson.name = name;
    var fileName = path.join(__dirname, "libs", name + ".md");
    fs.writeFileSync(fileName, `${name}\n========================\n\n`);
    rl.setPrompt("What do you want? ");
    rl.prompt();
    rl.on('line', function(wants) {
        wants = wants || "";
        if (wants.trim().toLowerCase() === 'exit') {
            rl.close();
        } else {
            rl.setPrompt("What else do you want ('exit' to leave)? ");
            rl.prompt();
            realPerson.wants.push(wants);
            fs.appendFile(fileName, `* ${wants}\n`);
        }
    });
});

rl.on('close', function() {
    console.log("%s is a person that wants %j", realPerson.name, realPerson.wants);
    process.exit();
});