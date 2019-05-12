const command = require('../workers/command');

/**
 * pl_delete: Delete song based on ID
 * @param {Object} details						[Login details]
 * @param {String} id 							[default: current song]
 * @param {Function<Error, Object>} callback 	[Object: VLC status]
 */
module.exports = (details, id, callback) => {
	details.command = "pl_delete";
	if (typeof id == "function") { // if no id was provided and only callback
		command(details, id);
	} else {
		if (id) details.query = {
		"id": id
		};
		command(details, callback);
	}
};