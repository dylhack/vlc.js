const loop = require('../../src/commands/loop');
const details = require('../details.json');

loop(details, (err, status) => {
	if (err) console.log('Error while toggling loop; ' + err.message)
	else console.log("Looping playlist")
});