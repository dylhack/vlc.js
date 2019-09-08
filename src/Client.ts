import {Details, VLCPlaylist, VLCStatus} from "./index";
import {command, fetch} from "./Requester"

/**
 * @class VLCClient
 * @constructor
 * @param {Details} details
 * @desc Promise-oriented VLC Client. This Client uses everything in src/commands & src/routes.
 * Every command resolves with VLC's status.json. All the actual communication with VLC is done in
 * src/workers
 */
export class VLCClient {
    private readonly details: Details;

    constructor(details: Details) {
        this.details = details;
    }

    /**
     * @method getStatus
     * @return {Promise<VLCStatus>}
     */
    getStatus(): Promise<VLCStatus> {
        return fetch(this.details, 'status.json')
    }

    /**
     * @method getPlaylist
     * @return {Promise<VLCPlaylist>}
     */
    getPlaylist(): Promise<VLCPlaylist> {
        return fetch(this.details, 'playlist.json')
    }

    /**
     * @method add
     * @param {String} mrl media resource locator
     * @returns {Promise<VLCStatus>}
     * @desc Add song based on MRL (media resource locator)
     */
    add(mrl: string): Promise<VLCStatus> {
        return command(this.details, 'in_enqueue', mrl)
    }

    /**
     * @method empty
     * @desc Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    empty(): Promise<VLCStatus> {
        return command(this.details, 'pl_empty')
    }

    /**
     * @method fullscreen
     * @desc Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    fullscreen(): Promise<VLCStatus> {
        return command(this.details, 'pl_fullscreen')
    }

    /**
     * @method loop
     * @desc Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    loop(): Promise<VLCStatus> {
        return command(this.details, 'pl_loop')
    }

    /**
     * @method next
     * @desc Play next song
     * @returns {Promise<VLCStatus>}
     */
    next(): Promise<VLCStatus> {
        return command(this.details, 'pl_next')
    }

    /**
     * @method pause
     * @returns {Promise<VLCStatus>}
     * @desc Pause current song.
     * If used again it will resume the current song
     */
    pause(): Promise<VLCStatus> {
        return command(this.details, 'pl_pause')
    }

    /**
     * @method play
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     * @desc Play song based on ID
     * If no ID is provided it'll play current song (restart / unpause)
     */
    play(id: string): Promise<VLCStatus> {
        return command(this.details, 'pl_play', id)
    }

    /**
     * @method previous
     * @desc Play previous song
     * @returns {Promise<VLCStatus>}
     */
    previous(): Promise<VLCStatus> {
        return command(this.details, 'pl_previous')
    }

    /**
     * @method remove
     * @desc Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    remove(id: string): Promise<VLCStatus> {
        return command(this.details, 'pl_delete', id)
    }

    /**
     * @method repeat
     * @desc Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    repeat(): Promise<VLCStatus> {
        return command(this.details, 'pl_repeat')
    }

    /**
     * @method shuffle
     * @desc Shuffle playlist
     * @returns {Promise<VLCStatus>}
     */
    shuffle(): Promise<VLCStatus> {
        return command(this.details, 'pl_random')
    }

    /**
     * @method volume
     * @desc Set volume
     * @param {Number} value
     * @returns {Promise<VLCStatus>}
     */
    volume(value: number): Promise<VLCStatus> {
        return command(this.details, 'volume', value.toString())
    }
}
