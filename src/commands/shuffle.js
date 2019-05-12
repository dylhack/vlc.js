const command = require('../workers/command');

/**
 * pl_random: Toggle shuffle
 * @param {Object} details						[Login details]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, callback) => {
	details.command = "pl_random";
	command(details, callback);
};