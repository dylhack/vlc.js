const repeat = require('../../src/commands/repeat');
const details = require('../details.json');

repeat(details, (err, status) => {
	if (err) console.log('Error while toggling repeat; ' + err.message)
	else console.log("Repeating song")
});