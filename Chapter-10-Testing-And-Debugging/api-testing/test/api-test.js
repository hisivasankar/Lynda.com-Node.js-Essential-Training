var expect = require("chai").expect;

var api = require("../api.js");

describe("sayHello()", function() {
    it("should return `Hello, John Cena`", function() {
        var sResult = api.sayHello("John Cena");
        expect(sResult).to.equal("Hello, John Cena");
    });
});