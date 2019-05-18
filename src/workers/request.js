/**
 * This module is responsible
 * for requesting data structures
 * that VLC delivers on their HTTP
 * endpoint. These two data structures
 * are the "status.json" and "playlist.json".
 * For further details see the provided link below
 * {@link} https://wiki.videolan.org/VLC_HTTP_requests
 */
const http = require("http");
const URL = require("url");
const template = "http://USERNAME:PASSWORD@ADDRESS:PORT/requests/PATH";

/**
 * @param {Object} details
 * - @prop {String} username [default: ""]
 * - @prop {String} password [default: ""]
 * - @prop {String} address  [default: "127.0.0.1"]
 * - @prop {Number} port     [default: "9090"]
 * - @prop {String} pathname [default: ""]
 * @param {Function} callback<Error, Object>
 */
module.exports = (details, callback) => {
	let requested = template
		.replace(/(USERNAME)/, details.username ? encodeURIComponent(details.username) : "")
		.replace(/(PASSWORD)/, details.password ? encodeURIComponent(details.password) : "")
		.replace(
			/(ADDRESS)/,
			details.address ? details.address : "127.0.0.1"
		)
		.replace(/(PORT)/, details.port ? details.port : "9090")
		.replace(/(PATH)/, details.pathname ? details.pathname : " ");

	let url = URL.parse(requested);
	let str = "";
	let req = http.get(url, res => {
		res.on("data", data => (str += data));
		res.on("end", () => {
			if (res.statusCode == 200) {
				try {
					let data = JSON.parse(str);
					callback(undefined, data);
				} catch (e) {
					callback(e);
				}
			} else
				callback(
					new Error(
						"Rejected request with status-code: " +
							res.statusCode
					)
				);
		});
	});
	req.on("error", err => callback(err));
};
