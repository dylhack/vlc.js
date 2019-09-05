const http = require('http');
const {URL} = require('url');
const {Buffer} = require('buffer');
import {Details, VLCPlaylist, VLCStatus} from "../index";
import {IncomingMessage} from "http";

const _defaultDetails: Details = {
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
function fetch(details = _defaultDetails, file: string): Promise<VLCStatus | VLCPlaylist> {
    return new Promise((resolve, reject) => {
        const address = new URL(`http://${details.address}:${details.port}/requests/${file}`);
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
function command(details = _defaultDetails, command: string, query: string): Promise<VLCStatus> {
    return new Promise((resolve, reject) => {
        const address = new URL(`http://${details.address}:${details.port}/requests/status.json?command=${command}&${query}`);

        _request(address, details)
            .then((data: VLCStatus | VLCPlaylist) => {
            })
            .catch(reject);
    });
}


function _request(address: string, details: Details): Promise<VLCStatus | VLCPlaylist> {
    return new Promise((resolve, reject) => {
        const basicAuth = new Buffer.from(`:${details.password}`)
            .toString('base64');
        let str = '';
        const req = http.get(address, {
            headers: {
                'Authorization': `Basic ${basicAuth}`
            }
        }, (res: IncomingMessage) => {
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
}

module.exports = {
    fetch,
    command,
    _request,
    _defaultDetails
};
