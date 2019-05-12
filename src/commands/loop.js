const command = require('../workers/command');

/**
 * pl_loop: Toggle "loop playlist"
 * @param {Object} details						[Login details]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, callback) => {
	details.command = "pl_loop";
	command(details, callback);
};