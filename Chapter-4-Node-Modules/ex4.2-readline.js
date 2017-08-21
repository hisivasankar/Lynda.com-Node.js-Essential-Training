var readline = require('readline');

var realPerson = {
    name: '',
    wants: []
};

var rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What is your name? ", function(name) {
    realPerson.name = name;
    rl.setPrompt("What do you want? ");
    rl.prompt();
    rl.on('line', function(wants) {
        wants = wants || "";
        if (wants.trim().toLowerCase() === 'exit') {
            rl.close();
        } else {
            rl.setPrompt("What else do you want ('exit' to leave)");
            rl.prompt();
            realPerson.wants.push(wants);
        }
    });
});

rl.on('close', function() {
    console.log("%s is a person that wants %j", realPerson.name, realPerson.wants);
    process.exit();
});