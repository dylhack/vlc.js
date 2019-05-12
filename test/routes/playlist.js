const playlist = require('../../src/routes/playlist');
const details = require('../details.json');

playlist(details, (err, playlist) => {
	if (err) console.log("Failed to get playlist; ", err.message);
	else console.log("Playlist", playlist);
});