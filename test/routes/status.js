const status = require('../../src/routes/status');
const details = require('../details.json');

status(details, (err, status) => {
	if (err) console.log("Failed to get status; ", err.message);
	else console.log("Status", status);
});