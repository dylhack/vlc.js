/**
 * This module is responsible
 * for delivering query parameters
 * (aka "commands") to VLC's http
 * endpoint. For further details see
 * the provided link below
 * {@link} https://wiki.videolan.org/VLC_HTTP_requests
 */
const http = require("http");
const querystring = require('querystring');
const URL = require("url");
const template = "http://USERNAME:PASSWORD@ADDRESS:PORT/requests/status.json?command=COMMAND&QUERY";

/**
 * @param {Object} details
 * - @prop {String} username	[default: ""]
 * - @prop {String} password	[default: ""]
 * - @prop {String} address  	[default: "127.0.0.1"]
 * - @prop {Number} port     	[default: "9090"]
 *   @prop {String} command  	[default: ""]
 * - @prop {Object} query    	[default: ""] 
 * @parma {Function} callback<Error, a> [a: will very]
 */
module.exports = (details, callback) => {
	let requested = template
		.replace(/(USERNAME)/, details.username ? encodeURIComponent(details.username) : "")
		.replace(/(PASSWORD)/, details.password ? encodeURIComponent(details.password) : "")
		.replace(
			/(ADDRESS)/,
			details.address ? details.address : "127.0.0.1"
		)
		.replace(/(COMMAND)/, details.command ? details.command : "")
		.replace(/(QUERY)/, details.query ? querystring.stringify(details.query) : "")
		.replace(/(PORT)/, details.port ? details.port : "9090");
	let url = URL.parse(requested, true);
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
