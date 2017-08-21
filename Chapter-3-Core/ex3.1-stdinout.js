var aQuestions = [
    "What's your name?",
    "What do you want in Life?"
];
var aAnswers = [];

function ask(iIndex) {
    process.stdout.write(`${aQuestions[iIndex]} > `);
}

process.stdout.write("Welcome to Node.js!\n\n");

process.stdin.on("data", function(oData) {
    aAnswers.push(oData.toString());
    if (aAnswers.length < aQuestions.length) {
        ask(aAnswers.length);
    } else {
        process.exit();
    }
});

ask(0);

process.on("exit", function() {
    process.stdout.write(`\n\nHello, ${aAnswers[0]}, You will have your wishes granted ${aAnswers[1]}\n\n`);
});