"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module Requester
 * @author dylhack
 */
var http = __importStar(require("http"));
var buffer_1 = require("buffer");
exports._defaultDetails = {
    address: '127.0.0.1',
    password: '',
    port: '8080'
};
/**
 * @function fetch
 * @param {Details} details
 * @param {String} file
 * @returns {Promise<VLCStatus | VLCPlaylist>}
 * @description This function is responsible for requesting data structures that VLC provides on their HTTP endpoint.
 * These two data structures are the "status.json" and "playlist.json". For further details see the provided link
 * https://wiki.videolan.org/VLC_HTTP_requests
 */
function fetch(details, file) {
    if (details === void 0) { details = exports._defaultDetails; }
    var address = "http://" + details.address + ":" + details.port + "/requests/" + file;
    return _request(address, details);
}
exports.fetch = fetch;
/**
 * @function command
 * @param details
 * @param command
 * @param query
 * @description This function is responsible for delivering query parameters (aka "commands") to VLC's http endpoint.
 * For further details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 */
function command(details, command, query) {
    if (details === void 0) { details = exports._defaultDetails; }
    if (query === void 0) { query = undefined; }
    var address = "http://" + details.address + ":" + details.port + "/requests/status.json?command=" + command + "&" + query;
    return _request(address, details);
}
exports.command = command;
/**
 * @function _request
 * @param address
 * @param details
 * @returns {Promise<any>}
 * @private
 * @description This method handles all the http requests with VLC.
 */
function _request(address, details) {
    return new Promise(function (resolve, reject) {
        var basicAuth = buffer_1.Buffer.from(":" + details.password)
            .toString('base64');
        var str = '';
        var req = http.get(address, {
            headers: {
                'Authorization': "Basic " + basicAuth
            }
        }, function (res) {
            res.on('error', reject);
            res.on('data', function (data) {
                str += data;
            });
            res.on('end', function () {
                try {
                    var data = JSON.parse(str);
                    resolve(data);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', reject);
    });
}
exports._request = _request;
