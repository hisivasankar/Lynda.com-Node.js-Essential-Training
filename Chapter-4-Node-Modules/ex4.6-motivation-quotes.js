var aQuotes = [
    "You are a loser",
    "Learn more, otherwise you will end up being horse shit",
    "Focus on you career, otherwise you will be fucked up",
    "Give priority to yourself first. Others comes next",
    "Family comes first, others are next",
    "If you don't work hard today, you never gonna make it",
    "Believe in yourself, you don't need others opinions",
    "Love yourself"
];

var intervalTimer = setInterval(function(){
    var iMagicNumber = Math.floor(Math.random() * aQuotes.length);
    process.stdout.write(aQuotes[iMagicNumber] + '\n\n');
}, 1000);

process.stdin.on('data', function(data) {
    console.log(`STDIN ${data.toString()} Received`);
    clearInterval(intervalTimer);
    process.exit();
});
