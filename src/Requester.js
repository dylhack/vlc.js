"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var URL = require('url').URL;
var Buffer = require('buffer').Buffer;
var _defaultDetails = {
    address: '127.0.0.1',
    password: '',
    port: '8080'
};
/**
 * This method is responsible for requesting data structures that VLC provides on their HTTP
 * endpoint. These two data structures are the "status.json" and "playlist.json". For further
 * details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 * @method fetch
 * @param {Details} details
 * @param {String} file
 * @returns {Promise<VLCStatus | VLCPlaylist>}
 */
function fetch(details, file) {
    if (details === void 0) { details = _defaultDetails; }
    return new Promise(function (resolve, reject) {
        var address = new URL("http://" + details.address + ":" + details.port + "/requests/" + file);
        _request(address, details)
            .then(resolve)
            .catch(reject);
    });
}
/**
 * This method is responsible for delivering query parameters (aka "commands") to VLC's http
 * endpoint. For further details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 * @param {Details} details
 * @param {String} command
 * @param {String} query
 * @returns {Promise<VLCStatus>}
 */
function command(details, command, query) {
    if (details === void 0) { details = _defaultDetails; }
    return new Promise(function (resolve, reject) {
        var address = new URL("http://" + details.address + ":" + details.port + "/requests/status.json?command=" + command + "&" + query);
        _request(address, details)
            .then(function (data) {
        })
            .catch(reject);
    });
}
function _request(address, details) {
    return new Promise(function (resolve, reject) {
        var basicAuth = new Buffer.from(":" + details.password)
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
module.exports = {
    fetch: fetch,
    command: command,
    _request: _request,
    _defaultDetails: _defaultDetails
};
