const next = require('../../src/commands/next');
const details = require('../details.json');

next(details, (err, status) => {
	if (err) console.log('Error while playing next song; ' + err.message)
	else console.log("Playing next song")
});