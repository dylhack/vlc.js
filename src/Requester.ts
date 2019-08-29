const http = require('http');
const url = require('url');
import {VLCStatus} from "./types/VLCStatus";
import {Details} from './types/Details';
import {VLCPlaylist} from "./types/VLCPlaylist";

const requester = {
    data: undefined,
    command: undefined,
    _templates: {
        query: 'http://USERNAME:PASSWORD@ADDRESS:PORT/requests/status.json?command=COMMAND&QUERY',
        file: 'http://USERNAME:PASSWORD@ADDRESS:PORT/requests/PATH'
    },
    _request: undefined,
    _defaultDetails: {
        username: '',
        password: '',
        port: ''
    }
};

/**
 * This method is responsible for requesting data structures that VLC provides on their HTTP
 * endpoint. These two data structures are the "status.json" and "playlist.json". For further
 * details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 * @method data
 * @param {Details} details
 * @param {String} file
 * @returns {Promise<VLCStatus>|Promise<VLCPlaylist>}
 */
requester.data = (details = requester._defaultDetails, file) => new Promise((resolve, reject) => {
    const requested = requester._templates.file
        .replace(/(USERNAME)/, encodeURIComponent(details.username))
        .replace(/(PASSWORD)/, encodeURIComponent(details.password))
        .replace(/(ADDRESS)/, details.address)
        .replace(/(PORT)/, details.port)
        .replace(/(PATH)/, file);

    const address = url.parse(requested);
    requester._request(address)
        .then(resolve)
        .catch(reject);
});

/**
 * This method is responsible for delivering query parameters (aka "commands") to VLC's http
 * endpoint. For further details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 * @param details
 * @param command
 * @returns {Promise<VLCStatus>}
 */
requester.command = (details = requester._defaultDetails, command) => new Promise((resolve, reject) => {
    const requested = requester._templates.query
        .replace(/(USERNAME)/, encodeURIComponent(details.username))
        .replace(/(PASSWORD)/, encodeURIComponent(details.password))
        .replace(/(ADDRESS)/, details.address)
        .replace(/(COMMAND)/, command)
        .replace(/(QUERY)/, command)
        .replace(/(PORT)/, details.port);

    const address = url.parse(requested, true);
    requester._request(address)
        .then(resolve)
        .catch(reject);
});

requester._request = (address) => new Promise((resolve, reject) => {
    let str = '';
    const req = http.get(address, (res) => {
        res.on('data', (data) => {
            str += data;
        });
        res.on('end', () => {
            if (res.statusCode === 200) {
                try {
                    const data = JSON.parse(str);
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            } else {
                reject(new Error(`Rejected request with status-code: ${res.statusCode}`));
            }
        });
    });
    req.on('error', err => reject(err));
});

module.exports = requester;
