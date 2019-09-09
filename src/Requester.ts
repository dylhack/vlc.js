/**
 * @module Requester
 * @author dylhack
 */
import * as http from 'http';
import {IncomingMessage} from 'http';
import {Buffer} from 'buffer';
import {Details, VLCPlaylist, VLCStatus} from "./index";

export const _defaultDetails: Details = {
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
export function fetch(details = _defaultDetails, file: string): Promise<any> {
    const address = `http://${details.address}:${details.port}/requests/${file}`;
    return _request(address, details)
}

/**
 * @function command
 * @param details
 * @param command
 * @param query
 * @description This function is responsible for delivering query parameters (aka "commands") to VLC's http endpoint.
 * For further details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 */
export function command(details = _defaultDetails, command: string, query: string | undefined = undefined): Promise<VLCStatus> {
    const address = `http://${details.address}:${details.port}/requests/status.json?command=${command}&${query}`;
    return _request(address, details);
}

/**
 * @function _request
 * @param address
 * @param details
 * @returns {Promise<any>}
 * @private
 * @description This method handles all the http requests with VLC.
 */
export function _request(address: string, details: Details): Promise<any> {
    return new Promise((resolve, reject) => {
        const basicAuth = Buffer.from(`:${details.password}`)
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
