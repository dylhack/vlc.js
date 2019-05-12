const request = require('../workers/request.js');

/**
 * Method for requesting /requests/status.json endpoint
 * @param {Object} details [see src/workers/request]
 * @param {function} callback<Error, Object>
 */
module.exports = (details, callback) => {
	details.pathname = "status.json";
	return request(details, callback);
};
