const shuffle = require('../../src/commands/shuffle');
const details = require('../details.json');

shuffle(details, (err, status) => {
	if (err) console.log('Error while toggling shuffle; ' + err.message)
	else console.log("Toggled shuffle")
});