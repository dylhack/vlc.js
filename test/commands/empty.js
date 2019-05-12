const empty = require('../../src/commands/empty');
const details = require('../details.json');

empty(details, (err, status) => {
	if (err) console.log('Error while clearing playlist; ' + err.message)
	else console.log("Cleared playlist")
});