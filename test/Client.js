const vlc = require('../index.js');
const Client = new vlc.Client({
	"password": "password",
	"address": "127.0.0.1",
	"port": 9090
});

Client.getStatus()
.then(status => {
	console.log("Successfully acquired status..");
	console.log("Status", status);
})
.catch(console.log);

Client.getPlaylist()
.then(pl => {
	console.log("Got the playlist");
	console.log("Playlist", pl);
})
.catch(console.log);

