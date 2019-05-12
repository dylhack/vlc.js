const command = require('../workers/command');

/**
 * pl_next: Plays next song
 * @param {Object} details						[Login details]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, callback) => {
	details.command = "pl_next";
	command(details, callback);
};