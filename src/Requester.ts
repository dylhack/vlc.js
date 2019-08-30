const http = require('http');
const url = require('url');
const buffer = require('buffer');
import {VLCStatus} from "./types/VLCStatus";
import {Details} from './types/Details';
import {VLCPlaylist} from "./types/VLCPlaylist";

const requester = {
    fetch: undefined,
    command: undefined,
    _request: undefined,
    _defaultDetails: {
        password: '',
        port: '8080'
    }
};

/**
 * This method is responsible for requesting data structures that VLC provides on their HTTP
 * endpoint. These two data structures are the "status.json" and "playlist.json". For further
 * details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 * @method fetch
 * @param {Details} details
 * @param {String} file
 * @returns {Promise<VLCStatus>|Promise<VLCPlaylist>}
 */
requester.fetch = (details = requester._defaultDetails, file: string) => new Promise((resolve, reject) => {
    const address = new url.URL(`http://${details.address}:${details.port}/requests/${file}`);

    requester._request(address, details)
        .then(resolve)
        .catch(reject);
});

/**
 * This method is responsible for delivering query parameters (aka "commands") to VLC's http
 * endpoint. For further details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 * @param {Details} details
 * @param {String} command
 * @param {String} query
 * @returns {Promise<VLCStatus>}
 */
requester.command = (details = requester._defaultDetails, command: string, query: string) => new Promise((resolve, reject) => {
    const address = new url.URL(`http://${details.address}:${details.port}/requests/status.json?command=${command}&${query}`);

    requester._request(address, details)
        .then(resolve)
        .catch(reject);
});

/**
 * @param {String} address
 * @param {Details} details
 * @private
 * @return {Promise<VLCStatus>|Promise<VLCPlaylist>}
 */
requester._request = (address: string, details: Details) => new Promise((resolve, reject) => {
    const basicAuth = new buffer.Buffer.from(`:${details.password}`)
        .toString('base64');
    let str = '';
    const req = http.get(address, {
        headers: {
            'Authorization': `Basic ${basicAuth}`
        }
    }, (res) => {
        res.on('error', reject);
        res.on('data', (data) => {
            str += data;
        });
        res.on('end', () => {
                try {
                    const data = JSON.parse(str);
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
        });
    });
    req.on('error', reject);
});

module.exports = requester;
