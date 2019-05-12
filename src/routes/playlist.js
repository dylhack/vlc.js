const request = require('../workers/request.js');

/**
 * @param {Object} details [see src/workers/request]
 * @param {function} callback<Error, Object>
 */
module.exports = (details, callback) => {
	details.pathname = "playlist.json";
	return request(details, callback);
};
