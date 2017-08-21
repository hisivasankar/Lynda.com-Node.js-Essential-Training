var exec = require('child_process').exec;

exec("git version", function(err, stdout) {
    if (err) {
        throw err;
    }
    console.log('Git version command executed');
    console.log(stdout);
});