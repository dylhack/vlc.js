const command = require('../workers/command');

/**
 * pl_fullscreen: Toggle fullscreen (pretty useless)
 * @param {Object} details						[Login details]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, callback) => {
	details.command = "pl_fullscreen";
	command(details, callback);
};