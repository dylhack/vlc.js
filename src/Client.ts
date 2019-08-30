/**
 * @module Client
 * @author dylhack
 * @desc Promise-oriented VLC Client. This Client uses everything in src/commands & src/routes.
 * Every command resolves with VLC's status.json. All the actual communication with VLC is done in
 * src/workers
 */
import {VLCPlaylist} from "./types/VLCPlaylist";
import {VLCStatus} from "./types/VLCStatus";

const {
    command,
    fetch
} = require('./Requester');

/**
 * @class Client
 * @constructor
 * @param {Details} details
 * @example
 * const client = new Client({
 *  password: 'rosebud',
 *  port: 9090
 * });
 * client.getStatus()
 * .then((status) => {
 *  console.log("Got the status! ", status);
 * });
 */
class Client {
    private details: object;

    constructor(details) {
        this.details = details;
    }

    /**
     * @method getStatus
     * @return {Promise<VLCStatus>}
     */
    getStatus(): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            fetch(this.details, 'status.json')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method getPlaylist
     * @return {Promise<VLCPlaylist>}
     */
    getPlaylist(): Promise<VLCPlaylist> {
        return new Promise((resolve, reject) => {
            fetch(this.details, 'playlist.json')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method add
     * @param {String} mrl media resource locator
     * @returns {Promise<VLCStatus>}
     * @desc Add song based on MRL (media resource locator)
     */
    add(mrl: string): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            if (mrl) {
                command(this.details, 'in_enqueue', mrl)
                    .then(resolve)
                    .catch(reject);
            } else reject(new Error('Did not provide a MRL'));
        });
    }

    /**
     * @method empty
     * @desc Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    empty(): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_empty')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method fullscreen
     * @desc Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    fullscreen(): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_fullscreen')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method loop
     * @desc Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    loop(): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_loop', undefined)
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method next
     * @desc Play next song
     * @returns {Promise<VLCStatus>}
     */
    next(): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_next')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method pause
     * @desc Pause current song.
     * If used again it will resume the current song
     * @returns {Promise<VLCStatus>}
     */
    pause(): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_pause')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method play
     * @desc Play song based on ID
     * If no ID is provided it'll play current song (restart / unpause)
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    play(id: string): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_play', id)
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method previous
     * @desc Play previous song
     * @returns {Promise<VLCStatus>}
     */
    previous(): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_previous')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method remove
     * @desc Remove song based on ID
     If an ID is provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    remove(id: string): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_delete', id)
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method repeat
     * @desc Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    repeat(): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_repeat')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method shuffle
     * @desc Shuffle playlist
     * @returns {Promise<VLCStatus>}
     */
    shuffle(): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'pl_random')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * @method volume
     * @desc Set volume
     * @param {Number} value
     * @returns {Promise<VLCStatus>}
     */
    volume(value: number): Promise<VLCStatus> {
        return new Promise((resolve, reject) => {
            command(this.details, 'volume', value)
                .then(resolve)
                .catch(reject);
        });
    }
}

module.exports = Client;
