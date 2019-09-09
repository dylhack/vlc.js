/**
 * @module Client
 * @author dylhack
 */

import {Details, VLCPlaylist, VLCStatus} from "./index";
import {command, fetch} from "./Requester"

/**
 * @class VLCClient
 * @description Promise-oriented VLC Client.
 */
export class VLCClient {
    private readonly details: Details;

    /**
     * @constructor
     * @param details
     */
    constructor(details: Details) {
        this.details = details;
    }

    /**
     * @returns Promise<VLCStatus>
     */
    getStatus(): Promise<VLCStatus> {
        return fetch(this.details, 'status.json')
    }

    /**
     * @return {Promise<VLCPlaylist>}
     */
    getPlaylist(): Promise<VLCPlaylist> {
        return fetch(this.details, 'playlist.json')
    }

    /**
     * @param {String} mrl media resource locator
     * @returns {Promise<VLCStatus>}
     * @desc Add song based on MRL (media resource locator)
     */
    add(mrl: string): Promise<VLCStatus> {
        return command(this.details, 'in_enqueue', mrl)
    }

    /**
     * @desc Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    empty(): Promise<VLCStatus> {
        return command(this.details, 'pl_empty')
    }

    /**
     * @desc Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    fullscreen(): Promise<VLCStatus> {
        return command(this.details, 'pl_fullscreen')
    }

    /**
     * @desc Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    loop(): Promise<VLCStatus> {
        return command(this.details, 'pl_loop')
    }

    /**
     * @desc Play next song
     * @returns {Promise<VLCStatus>}
     */
    next(): Promise<VLCStatus> {
        return command(this.details, 'pl_next')
    }

    /**
     * @returns {Promise<VLCStatus>}
     * @desc Pause current song.
     * If used again it will resume the current song
     */
    pause(): Promise<VLCStatus> {
        return command(this.details, 'pl_pause')
    }

    /**
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     * @desc Play song based on ID
     * If no ID is provided it'll play current song (restart / unpause)
     */
    play(id: string): Promise<VLCStatus> {
        return command(this.details, 'pl_play', id)
    }

    /**
     * @desc Play previous song
     * @returns {Promise<VLCStatus>}
     */
    previous(): Promise<VLCStatus> {
        return command(this.details, 'pl_previous')
    }

    /**
     * @desc Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    remove(id: string): Promise<VLCStatus> {
        return command(this.details, 'pl_delete', id)
    }

    /**
     * @desc Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    repeat(): Promise<VLCStatus> {
        return command(this.details, 'pl_repeat')
    }

    /**
     * @desc Shuffle playlist
     * @returns {Promise<VLCStatus>}
     */
    shuffle(): Promise<VLCStatus> {
        return command(this.details, 'pl_random')
    }

    /**
     * @desc Set volume
     * @param {Number} value
     * @returns {Promise<VLCStatus>}
     */
    volume(value: number): Promise<VLCStatus> {
        return command(this.details, 'volume', value.toString())
    }
}
