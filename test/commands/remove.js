const remove = require('../../src/commands/remove');
const details = require('../details.json');

remove(details, undefined, (err, status) => {
	if (err) console.log('Error while removing song; ' + err.message)
	else console.log("Removed song")
});