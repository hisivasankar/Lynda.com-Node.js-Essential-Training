var expect = require("chai").expect,
    rewire = require("rewire");

var songs = rewire("../songs.js");

describe("Songs Spec", function() {
    describe("addToPlaylist()", function() {
        beforeEach(function() {
            this._songs = ["AAA", "BBB"];
            songs.__set__("songs", this._songs);
        });

        it("should add 'AAA' to playlist", function() {
            var bResult = songs.addToPlaylist('AAA');
            expect(bResult).to.be.true;
        });

        it("shouldn't add 'CCC' to playlist", function() {
            var bResult = songs.addToPlaylist('CCC');
            expect(bResult).to.be.false;
        });
    });
});