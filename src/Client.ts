/**
 * @module Client
 * @author Dylan Hackworth <https://github.com/dylhack>
 * @LICENSE
 * Copyright 2019 Dylan Hackworth
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of
 * conditions and the following disclaimer in the documentation and/or other materials provided
 * with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
import { Buffer }                                         from 'buffer';
import * as http                                          from 'http';
import { IncomingMessage }                                from 'http';
import { VLCPlaylist, VLCRequest, VLCError, VLCStatus }   from './classes';


/**
 * @type Credentials
 * @property {String} address
 * @property {String} password
 * @property {String|Number} port
 */
type Credentials = {
    address: string,
    password: string,
    port: number
}

/**
 * Promise-oriented VLC HTTP client.
 * @class Client
 */
export class Client {
    private details: Credentials;

    public static validRatios = ['1:1', '4:3','5:4', '16:9', '16:10', '221:100', '235:100', '239:100'];

    public static mindB = -20;

    public static maxdB = 20;

    constructor(details: Credentials) { this.details = details; }

    /**
     * updates the credentials
     * @param details
     */
    public update(details: Credentials) {
        this.details = details;
    }

    /**
     * This method handles *all* the requests to the VLC HTTP server.
     * @private
     * @static
     * @param {URL} address
     * @param {Credentials} details
     * @returns {VLCRequest}
     */
    private static request(address: URL, details: Credentials): Promise<VLCRequest> {
        return new Promise((resolve, reject) => {
            let data = '';
            // noinspection ChainedFunctionCallJS
            const basicAuth = Buffer.from(`:${details.password}`)
                .toString('base64');
            const url = address.toString();
            const req = http.get(url, {
                headers: {
                    'Authorization': `Basic ${basicAuth}`
                }
            });
            req.on('response', (res: IncomingMessage) => {
                res.on('data', (chunk: Buffer) => { data += chunk });
                res.on('end', () => {
                    const toBuffer = Buffer.from(data);
                    const vlcRequest = new VLCRequest(req, res, toBuffer);
                    resolve(vlcRequest);
                });
            });
            req.on('error', reject);
        })
    }

    /**
     * This sends commands to the HTTP server to control VLC. See the provided link for all the commands. For more
     * query options (provided in the second parameter) make each property equal a value.
     * @example
     * command("volume", ["val=50%"])
     * @param {String} vlcCommand
     * @param {String[]} options
     * @returns {Promise<VLCStatus>}
     * @link https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt
     */
    public command(vlcCommand: string, options: string[] = []): Promise<VLCStatus> {
        const details = this.details;

        return new Promise((resolve, reject) => {
            let request: Promise<VLCRequest>;
            // Point to the commands endpoint (currently /requests/status.json)
            let address = new URL(`http://${details.address}:${details.port}/requests/status.json?command=${vlcCommand}`);

            // If query options were provided iterate through them
            if (options.length > 0) {
                options.forEach((queue: string) => {
                    let key: string;
                    let value: string;
                    if (queue.includes('=')) {
                        key = queue.split('=')[0];
                        value = queue.split('=')[1];
                        address.searchParams.append(key, value);
                    } else {
                        address.searchParams.append(queue, '')
                    }
                });
            }
            // Send the request
            request = Client.request(address, details);
            request.then((vlcRequest: VLCRequest) => {
                let error: VLCError;
                let status: VLCStatus;
                // VLC currently doesn't have any specifications in the HTTP packet headers or
                // status code whether or not an error had a occurred so this is a hack to
                // account for the errors that may appear while
                // executing a command.
                if (vlcRequest.data.includes('<title>Error loading /requests/playlist.json</title>')
                        || vlcRequest.data.includes('<title>Client error</title>')) {
                        // If anything provided in the condition appears reject with a VLCError
                        error = new VLCError(vlcRequest);
                        reject(error);
                    } else {
                        // Otherwise provide the status.json which is the same as BEFORE the command was executed.
                        status = JSON.parse(vlcRequest.data.toString());
                        resolve(status);
                    }
                });
            request.catch(reject);
        });
    }

    /**
     * Returns status.json /requests/status.json
     * @returns {Promise<VLCStatus>}
     */
    public getStatus(): Promise<VLCStatus> {
        const details = this.details;

        return new Promise((resolve, reject) => {
            // Point to the status endpoint (currently /requests/status.json)
            const address = new URL(`http://${details.address}:${details.port}/requests/status.json`);
            // Send the request
            const request = Client.request(address, details);

            request.then((vlcRequest: VLCRequest) => {
                let error: VLCError;
                let status: VLCStatus;

                // VLC currently doesn't have any specifications in the HTTP packet headers or
                // status code whether or not an error had a occurred so this is a hack to
                // account for the errors that may appear while getting the status.json.
                if (vlcRequest.data.includes('<title>Error loading /requests/status.json</title>')
                    || vlcRequest.data.includes('<title>Client error</title>')) {
                    // If anything provided in the condition appears reject with a VLCError
                    error = new VLCError(vlcRequest);
                    reject(error);
                } else {
                    // Otherwise provide the status.json
                    status = JSON.parse(vlcRequest.data.toString());
                    resolve(status);
                }
            });
            request.catch(reject);
        });
    }

    /**
     * Returns the playlist.json /requests/playlist.json
     * @return {Promise<VLCPlaylist>}
     */
    public getPlaylist(): Promise<VLCPlaylist> {
        const details = this.details;

        return new Promise((resolve, reject) => {
            // Point to the playlist endpoint (currently /requests/playlist.json)
            const address = new URL(`http://${details.address}:${details.port}/requests/playlist.json`);
            // Send the request
            const request = Client.request(address, details);
            request.then((vlcRequest: VLCRequest) => {
                let error: VLCError;
                let playlist: VLCPlaylist;

                // VLC currently doesn't have any specifications in the HTTP packet headers or
                // status code whether or not an error had a occurred so this is a hack to
                // account for the errors that may appear while getting the playlist.json
                if (vlcRequest.data.includes('<title>Error loading /requests/playlist.json</title>')
                    || vlcRequest.data.includes('<title>Client error</title>')) {
                    // If anything provided in the condition appears reject with a VLCError
                    error = new VLCError(vlcRequest);
                    reject(error);
                } else {
                    // Otherwise provide the playlist.json
                    playlist = JSON.parse(vlcRequest.data.toString());
                    resolve(playlist);
                }
            });
            request.catch(reject);
        });
    }

    /**
     * Add <uri> to playlist
     * @param {string} uri
     * @returns {Promise<VLCStatus>}
     */
    public queue(uri: string): Promise<VLCStatus> {
        return this.command('in_enqueue', [`input=${uri}`]);
    }

    /**
     * Add subtitle to currently playing file
     * @param {string} uri
     * @returns {Promise<VLCStatus>}
     */
    public addSubtitles(uri: string): Promise<VLCStatus> {
        return this.command('addsubtitle', [`val=${uri}`]);
    }

    /**
     * Play an item based on ID. If an ID isn't provided the last item will play.
     * @param {number|string} id
     * @returns {Promise<VLCStatus>}
     */
    public resume(id?: number | string): Promise<VLCStatus> {
        let query = id === undefined ? undefined : [`id=${id}`];
        return this.command('pl_play', query);
    }

    /**
     * Toggle pause
     * @returns {Promise<VLCStatus>}
     */
    public pause(): Promise<VLCStatus> {
        return this.command('pl_pause')
    }

    /**
     * Resume playback
     * @returns {Promise<VLCStatus>}
     */
    public forceResume(): Promise<VLCStatus> {
        return this.command('pl_forceresume');
    }

    /**
     * Pause playback
     * @returns {Promise<VLCStatus>}
     */
    public forcePause(): Promise<VLCStatus> {
        return this.command('pl_forcepause');
    }

    /**
     * Stop playback
     * @returns {Promise<VLCStatus>}
     */
    public stop(): Promise<VLCStatus> {
        return this.command('pl_stop');
    }

    /**
     * Play next item
     * @returns {Promise<VLCStatus>}
     */
    public next(): Promise<VLCStatus> {
        return this.command('pl_next');
    }

    /**
     * Jump to previous item
     * @returns {Promise<VLCStatus>}
     */
    public previous(): Promise<VLCStatus> {
        return this.command( 'pl_previous');
    }

    /**
     * Remove media based on ID. If an ID isn't provided it'll remove the current item
     * @param {string} id
     * @returns {Promise<VLCStatus>}
     */
    public remove(id?: string): Promise<VLCStatus> {
        let query = id === undefined ? undefined : [`id=${id}`];
        return this.command( 'pl_delete', query);
    }

    /**
     * Empty the playlist
     * @returns {Promise<VLCStatus>}
     */
    public empty(): Promise<VLCStatus> {
        return this.command('pl_empty');
    }

    /**
     * Set audio delay
     * @param {number} seconds
     * @returns {Promise<VLCStatus>}
     */
    public setDelay(seconds: number): Promise<VLCStatus> {
        return this.command('audiodelay', [`val=${seconds}`]);
    }

    /**
     * Set subtitle delay
     * @param {number} seconds
     * @returns {Promise<VLCStatus>}
     */
    public setSubtitleDelay(seconds: number): Promise<VLCStatus> {
        return this.command('subdelay', [`val=${seconds}`]);
    }

    /**
     * Set playback rate it must be greater than zero
     * @param {number} newRate
     * @returns {Promise<VLCStatus>}
     */
    public setRate(newRate: number): Promise<VLCStatus> {
        if (newRate > 0) {
            return this.command('rate', [`val=${newRate}`]);
        } else {
            throw new Error(`Expected new playback rate to be greater than zero, got: ${newRate}`);
        }
    }

    /**
     * Set aspect ratio, Valid ratios:
     * 1:1 , 4:3 , 5:4 , 16:9 , 16:10 , 221:100 , 235:100 , 239:100
     * @param {number} newRatio
     * @returns {Promise<VLCStatus>}
     */
    public aspectRatio(newRatio: string): Promise<VLCStatus> {
        if (Client.validRatios.includes(newRatio)) {
            return this.command('aspectratio', [`val=${newRatio}`])
        } else {
            throw new Error('Expected new aspect ratio to be valid. ' + Client.validRatios);
        }
    }

    /**
     * Sort the playlist based on mode and order
     * - 0 Id
     * - 1 Name
     * - 3 Author
     * - 5 Random
     * - 7 Track number
     * @param {number} mode
     * @param {number} order
     * @returns {Promise<VLCStatus>}
     */
    public sort(mode: 0 | 1 | 3 | 5 | 7, order: 0 | 1): Promise<VLCStatus> {
        return this.command('pl_sort', [`id=${mode}`, `val=${order}`]);
    }

    /**
     * Random playback
     * @returns {Promise<VLCStatus>}
     */
    public random(): Promise<VLCStatus> {
        return this.command('pl_random');
    }

    /**
     * Toggle repeat (current item)
     * @returns {Promise<VLCStatus>}
     */
    public repeat(): Promise<VLCStatus> {
        return this.command('pl_repeat');
    }

    /**
     * Toggle loop (current playlist)
     * @returns {Promise<VLCStatus>}
     */
    public loop(): Promise<VLCStatus> {
        return this.command('pl_loop');
    }

    /**
     * Toggle fullscreen
     * @returns {Promise<VLCStatus>}
     */
    public fullscreen(): Promise<VLCStatus> {
        return this.command('fullscreen');
    }

    /**
     * Enable services discovery module
     * @param {string} val
     * @returns {Promise<VLCStatus>}
     */
    public sdAdd(val: string): Promise<VLCStatus> {
        return this.command('pl_sd_add', [`val=${val}`]);
    }

    /**
     * Disable services discovery module
     * @param {string} val
     * @returns {Promise<VLCStatus>}
     */
    public sdRemove(val: string): Promise<VLCStatus> {
        return this.command('pl_sd_remove', [`val=${val}`]);
    }

    /**
     * Seek to provided value.
     * Acceptable forms: [+ or -][<int><H or h>:][<int><M or m or '>:][<int><nothing or S or s or ">]
     * or [+ or -]<int>%
     * @param {string|number} val
     * @returns {Promise<VLCStatus>}
     */
    public seek(val: string|number): Promise<VLCStatus> {
        return this.command('seek', [`val=${val}`]);
    }

    /**
     * Sets the preamp value, must be >=-20 and <=20
     * @param {number} dB
     * @returns {Promise<VLCStatus>}
     */
    public preamp(dB: number): Promise<VLCStatus> {
        if (dB >= Client.mindB && dB <= Client.maxdB) {
            return this.command('preamp', [`val=${dB}`])
        } else {
            throw new Error(`Expected to new preamp value to be less than ${Client.mindB} and greater than ${Client.maxdB}`);
        }
    }

    /**
     * set the gain for a specific band, must be >=-20 and <=20
     * @param {string} band
     * @param {number} gain
     * @returns {Promise<VLCStatus>}
     */
    public equalizer(band: string, gain: number): Promise<VLCStatus> {
        if (gain >= Client.mindB && gain <= Client.maxdB) {
            return this.command('equalizer', [`band=${band}`, `val=${gain}`]);
        } else {
            throw new Error(`Expected gain value to be less than ${Client.mindB} and greater than ${Client.maxdB}`);
        }
    }

    /**
     * Toggle the equalizer
     * @param {boolean} on
     * @returns {Promise<VLCStatus>}
     */
    public toggleEqualizer(on: boolean): Promise<VLCStatus> {
        let val = on ? 1 : 0;
        return this.command('enableeq', [`val=${val}`]);
    }

    /**
     * set the equalizer preset as per the id specified
     * @param {string|number} id
     * @returns {Promise<VLCStatus>}
     */
    public setPreset(id: string | number): Promise<VLCStatus> {
        return this.command('setpreset', [`val=${id}`])
    }

    /**
     * Select an item based on title
     * @param {string} title
     * @returns {Promise<VLCStatus>}
     */
    public title(title: string): Promise<VLCStatus> {
        return this.command('title', [`val=${title}`]);
    }

    /**
     * Select an item based on chapter
     * @param {string} chapter
     * @returns {Promise<VLCStatus>}
     */
    public chapter(chapter: string): Promise<VLCStatus> {
        return this.command('chapter', [`val=${chapter}`]);
    }

    /**
     * Select the audio track (use the number from the stream)
     * @param {number} id
     * @returns {Promise<VLCStatus>}
     */
    public selAudioTrack(id: number): Promise<VLCStatus> {
        return this.command('audio_track', [`val=${id}`]);
    }

    /**
     * Select the video track (use the number from the stream)
     * @param {number} id
     * @returns {Promise<VLCStatus>}
     */
    public selVideoTrack(id: number): Promise<VLCStatus> {
        return this.command('video_track', [`val=${id}`]);
    }

    /**
     * Select the subtitle track (use the number from the stream)
     * @param {number} id
     * @returns {Promise<VLCStatus>}
     */
    public selSubtitleTrack(id: number): Promise<VLCStatus> {
        return this.command('subtitle_track', [`val=${id}`]);
    }

    /**
     * Set volume
     * @param {number|string} value
     * @returns {Promise<VLCStatus>}
     */
    public volume(value: number | string): Promise<VLCStatus> {
        return this.command( 'volume', [`val=${value}`])
    }
}
