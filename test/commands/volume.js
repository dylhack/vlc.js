const volume = require('../../src/commands/volume');
const details = require('../details.json');

volume(details, 100, (err, status) => {
	if (err) console.log('Error while setting volume; ' + err.message)
	else console.log("Volume set: 100")
});