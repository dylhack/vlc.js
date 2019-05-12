const command = require('../workers/command');

/**
 * in_enqueue: Add a song based on mrl (media resource locator)
 * @param {Object} details						[Login details]
 * @param {String} mrl							[required]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, mrl, callback) => {
	details.command = "in_enqueue";
	details.query = {
		"mrl": mrl
	};
	command(details, callback);
};