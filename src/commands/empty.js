const command = require('../workers/command');

/**
 * pl_empty: Empty playlist
 * @param {Object} details						[Login details]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, callback) => {
	details.command = "pl_empty";
	command(details, callback);
};