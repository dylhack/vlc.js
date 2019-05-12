const fullscreen = require('../../src/commands/fullscreen');
const details = require('../details.json');

fullscreen(details, (err, status) => {
	if (err) console.log('Error while toggling fullscreen; ' + err.message)
	else console.log("Fullscreen toggled")
});