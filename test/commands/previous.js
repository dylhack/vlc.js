const previous = require('../../src/commands/previous');
const details = require('../details.json');

previous(details, (err, status) => {
	if (err) console.log('Error while playing previous song; ' + err.message)
	else console.log("Playing previous song")
});