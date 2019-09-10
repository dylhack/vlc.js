/**
 * @module Requester
 * @author dylhack
 */
import * as http from 'http';
import {IncomingMessage} from 'http';
import {Buffer} from 'buffer';
import {VLCStatus} from "./structures/VLCStatus";
import {VLCRequest} from "./structures/VLCRequest";
import {VLCError} from "./structures/VLCError";
import {VLCPlaylist} from "./structures/VLCPlaylist";

export interface Details {
    address: string,
    password: string,
    port: number | string
}

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
 * @param details
 * @param vlcCommand
 * @param query
 * @returns {Promise<VLCStatus>}
 */
export async function command(details: Details, vlcCommand: VLCCommand, query: string[] | undefined = undefined): Promise<VLCStatus> {
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

export async function getStatus(details: Details): Promise<VLCStatus> {
    let address = new URL(`http://${details.address}:${details.port}/requests/status.json`);
    const vlcRequest = await _request(address, details);
    return new VLCStatus(vlcRequest)
}

export async function getPlaylist(details: Details): Promise<VLCPlaylist> {
    let address = new URL(`http://${details.address}:${details.port}/requests/playlist.json`);
    const vlcRequest = await _request(address, details);
    return new VLCPlaylist(vlcRequest)
}

export function _request(address: URL, details: Details): Promise<VLCRequest> {
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
