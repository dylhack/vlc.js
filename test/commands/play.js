const play = require('../../src/commands/play');
const details = require('../details.json');

play(details, undefined, (err, status) => {
	if (err) console.log('Error while playing song; ' + err.message)
	else console.log("Playing song")
});