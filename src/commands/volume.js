const command = require('../workers/command');

/**
 * volume: Set volume based on value
 * @param {Object} details						[Login details]
 * @param {String} value						[required]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, value, callback) => {
	details.command = "volume";
	details.query = {
		"val": value
	};
	command(details, callback);
};