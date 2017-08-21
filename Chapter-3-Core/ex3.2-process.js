function getFlagValue(sFlagName) {
    var iIndex = process.argv.indexOf(sFlagName);
    return (iIndex === -1) ? null : process.argv[iIndex + 1];
}

var sUser = getFlagValue('--user'),
    sGreetings = getFlagValue('--greetings');

if (!sUser || !sGreetings) {
    console.log("Dude, give proper parameters");
} else {
    console.log(`Welcome ${sUser}, ${sGreetings}`);
}