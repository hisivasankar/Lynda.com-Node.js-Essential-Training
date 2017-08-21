var EventEmitter = require("events").EventEmitter,
    util = require("util");

var Person = function(sName) {
    this.name = sName;
};

util.inherits(Person, EventEmitter);

Person.prototype.on("wants", function(wants) {
    console.log(`${this.name} wants ${wants}`);
});

module.exports = Person;