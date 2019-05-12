const command = require('../workers/command');

/**
 * pl_repeat: Toggle "repeat song"
 * @param {Object} details						[Login details]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, callback) => {
	details.command = "pl_repeat";
	command(details, callback);
};