/**
 * @module Requester
 * @description This module handles ALL the HTTP interactions with VLCs' HTTP server. All the commands can be found
 * here.
 * @author dylhack
 */
import * as http from 'http';
import {IncomingMessage} from 'http';
import {Buffer} from 'buffer';
import {VLCStatus} from "./structures/VLCStatus";
import {VLCRequest} from "./structures/VLCRequest";
import {VLCError} from "./structures/VLCError";
import {VLCPlaylist} from "./structures/VLCPlaylist";

/**
 * @interface VLCCredentials
 * @property {String} address
 * @property {String} password
 * @property {String|Number} port
 * @description This is standard login credentials for accessing VLCs' HTTP endpoint.
 */
export interface VLCCredentials {
    address: string,
    password: string,
    port: number | string
}

/**
 * @enum VLCCommand
 * @description These are all the available commands that the HTTP server can take. These commands were pulled from the
 * source code and was last updated September 10th, 2019.
 * @link https://github.com/videolan/vlc/blob/master/share/lua/intf/modules/httprequests.lua
 * @property {String} in_play
 * @property {String} addsubtitle
 * @property {String} in_enqueue
 * @property {String} pl_play
 * @property {String} pl_pause
 * @property {String} pl_forcepause
 * @property {String} pl_forceresume
 * @property {String} pl_stop
 * @property {String} pl_next
 * @property {String} pl_previous
 * @property {String} pl_delete
 * @property {String} pl_empty
 * @property {String} pl_sort
 * @property {String} pl_random
 * @property {String} pl_loop
 * @property {String} pl_repeat
 * @property {String} pl_sd_add
 * @property {String} pl_sd_remove
 * @property {String} fullscreen
 * @property {String} snapshot
 * @property {String} volume
 * @property {String} seek
 * @property {String} key
 * @property {String} audiodelay
 * @property {String} rate
 * @property {String} subdelay
 * @property {String} aspectratio
 * @property {String} preamp
 * @property {String} equalizer
 * @property {String} enableeq
 * @property {String} setpreset
 * @property {String} title
 * @property {String} chapter
 * @property {String} audio_track
 * @property {String} video_track
 * @property {String} subtitle_track
 */
export const enum VLCCommand {
    in_play = 'in_play',
    addsubtitle = 'addsubtitle',
    in_enqueue = 'in_enqueue',
    pl_play = 'pl_play',
    pl_pause = 'pl_pause',
    pl_forcepause = 'pl_forcepause',
    pl_forceresume = 'pl_forceresume',
    pl_stop = 'pl_stop',
    pl_next = 'pl_next',
    pl_previous = 'pl_previous',
    pl_delete = 'pl_delete',
    pl_empty = 'pl_empty',
    pl_sort = 'pl_sort',
    pl_random = 'pl_random',
    pl_loop = 'pl_loop',
    pl_repeat = 'pl_repeat',
    pl_sd_add = 'pl_sd_add',
    pl_sd_remove = 'pl_sd_remove',
    fullscreen = 'fullscreen',
    snapshot = 'snapshot',
    volume = 'volume',
    seek = 'seek',
    key = 'key',
    audiodelay = 'audiodelay',
    rate = 'rate',
    subdelay = 'subdelay',
    aspectratio = 'aspectratio',
    preamp = 'preamp',
    equalizer = 'equalizer',
    enableeq = 'enableeq',
    setpreset = 'setpreset',
    title = 'title',
    chapter = 'chapter',
    audio_track = 'audio_track',
    video_track = 'video_track',
    subtitle_track = 'subtitle_track'
}

/**
 * @param {VLCCredentials} details
 * @param {VLCCommand} vlcCommand
 * @param {String[]} query
 * @returns {Promise<VLCStatus>}
 */
export async function command(details: VLCCredentials, vlcCommand: VLCCommand, query: string[] | undefined = undefined): Promise<VLCStatus> {
    let address = new URL(`http://${details.address}:${details.port}/requests/status.json?command=${vlcCommand}`);
    if (query) query.forEach((queue: string) => {
        if (queue.includes('=')) {
            const key = queue.split('=')[0];
            const value = queue.split('=')[1];
            address.searchParams.append(key, value)
        } else address.searchParams.append(queue, '')
    });
    const vlcRequest = await _request(address, details);
    if (vlcRequest.data.includes('<title>Error loading /requests/status.json</title>')
        || vlcRequest.data.includes('<title>Client error</title>')) throw new VLCError(vlcRequest);
    else return new VLCStatus(vlcRequest);
}

/**
 * @param {VLCCredentials} details
 * @returns {Promise<VLCStatus>}
 */
export async function getStatus(details: VLCCredentials): Promise<VLCStatus> {
    let address = new URL(`http://${details.address}:${details.port}/requests/status.json`);
    const vlcRequest = await _request(address, details);
    return new VLCStatus(vlcRequest)
}

/**
 * @param {VLCCredentials} details
 * @returns {Promise<VLCPlaylist>}
 */
export async function getPlaylist(details: VLCCredentials): Promise<VLCPlaylist> {
    let address = new URL(`http://${details.address}:${details.port}/requests/playlist.json`);
    const vlcRequest = await _request(address, details);
    return new VLCPlaylist(vlcRequest)
}

/**
 * @param {URL} address
 * @param {VLCCredentials} details
 * @returns {VLCRequest}
 * @private
 */
export function _request(address: URL, details: VLCCredentials): Promise<VLCRequest> {
    return new Promise((resolve, reject) => {
        let data = '';
        const basicAuth = Buffer.from(`:${details.password}`)
            .toString('base64');
        const req = http.get(address.toString(), {
            headers: {
                'Authorization': `Basic ${basicAuth}`
            }
        });
        req.on('response', (res: IncomingMessage) => {
            req.on('error', reject);
            res.on('data', (chunk: Buffer) => data += chunk);
            res.on('end', () => {
                const vlcRequest = new VLCRequest(req, res, Buffer.from(data));
                resolve(vlcRequest);
            });
        });
    })
}
