var util = require('util'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    aDictionaryData = require('./DictionaryData.json');

var SERVER_PORT = 3000;

var server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(function(req, res, next) {
    util.log(`${req.method} -> ${req.url}`);
    next();
});

server.use(cors());

server.get('/dictionary-api', function(req, res) {
    res.json(aDictionaryData);
});

server.post('/dictionary-api', function(req, res) {
    var word = {
        'term': req.body.term,
        'definition': req.body.definition
    };
    aDictionaryData.push(word);
    res.json(word);
    console.log(`New Word: %J`, word);
});

server.delete("/dictionary-api/:term", function(req, res) {
    var sWordToBeDeleted = req.params.term;
    aDictionaryData = aDictionaryData.filter(function(word) {
        return word.term !== sWordToBeDeleted;
    });
    res.json(aDictionaryData);
});

server.use(express.static('./public'));

server.listen(SERVER_PORT);

util.log(`Server started ${SERVER_PORT}`);