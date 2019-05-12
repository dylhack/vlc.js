const command = require('../workers/command');

/**
 * pl_pause: Toggle pause
 * @param {Object} details						[Login details]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, callback) => {
	details.command = "pl_pause";
	command(details, callback);
};