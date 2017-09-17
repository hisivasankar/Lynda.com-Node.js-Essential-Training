var expect = require("chai").expect,
    rewire = require("rewire"),
    sinon = require("sinon");

var songs = rewire("../songs.js");

describe("Songs Spec", function() {
    describe("addToPlaylist()", function() {
        beforeEach(function() {
            this._songs = ["AAA", "BBB"];
            this.console = {
            	log: sinon.spy()
            };
            songs.__set__("songs", this._songs);
            songs.__set__("console", this.console);
        });

        it("should add 'AAA' to playlist", function() {
            var bResult = songs.addToPlaylist('AAA');
            expect(bResult).to.be.true;
            expect(this.console.log.callCount).to.equal(1);
        });

        it("shouldn't add 'CCC' to playlist", function() {
            var bResult = songs.addToPlaylist('CCC');
            expect(bResult).to.be.false;
            expect(this.console.log.callCount).to.equal(1);
        });
    });
});