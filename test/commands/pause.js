const pause = require('../../src/commands/pause');
const details = require('../details.json');

pause(details, (err, status) => {
	if (err) console.log('Error while toggling pause; ' + err.message)
	else console.log("Toggled pause")
});