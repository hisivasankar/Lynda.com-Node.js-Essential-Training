var expect = require("chai").expect,
    nock = require("nock");

var api = require("../api.js");

describe("API Testing Suite", function() {
    describe("sayHello()", function() {
        it("should return `Hello, John Cena`", function() {
            var sResult = api.sayHello("John Cena");
            expect(sResult).to.equal("Hello, John Cena");
        });
    });

    describe("loadWiki()", function() {

        before(function() {
            nock("https://en.wikipedia.org")
                .get("/wiki/John_Cena")
                .reply(200, "Mock - John Cena Wiki Page");
        });

        it("should load John Cena's Wiki", function(done) {
            api.loadWiki({
                first: "John",
                last: "Cena"
            }, function(html) {
                expect(html).to.equal("Mock - John Cena Wiki Page");
                done();
            });
        });
    });
});