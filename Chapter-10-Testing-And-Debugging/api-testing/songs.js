var songs = require("./songs.json"),
	playlist = [];

module.exports = {
	addToPlaylist(sSongName) {
		var bIsPresent = songs.indexOf(sSongName) !== -1;
		if(bIsPresent) {
			playlist.push(sSongName);
			console.log(`${sSongName} added to playlist`);
		} else {
			console.log(`${sSongName} is not part of library`);
		}
		return bIsPresent;
	}
}