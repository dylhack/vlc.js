const command = require('../workers/command');

/**
 * pl_previous: Play previous song
 * @param {Object} details						[Login details]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, callback) => {
	details.command = "pl_previous";
	command(details, callback);
};