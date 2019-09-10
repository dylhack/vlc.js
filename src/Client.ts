/**
 * @module Client
 * @author dylhack
 */
import {command, Details, getPlaylist, getStatus, VLCCommand} from "./Requester"
import {VLCPlaylistStatus, VLCStatus} from "./structures/VLCStatus";
import {VLCPlaylist} from "./structures/VLCPlaylist";

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
        return getStatus(this.details)
    }

    /**
     * @return {Promise<VLCPlaylist>}
     */
    getPlaylist(): Promise<VLCPlaylist> {
        return getPlaylist(this.details)
    }

    /**
     * @param {String} mrl media resource locator
     * @param {Boolean|undefined} play Play the added media
     * @returns {Promise<VLCStatus>}
     * @desc Add song based on MRL (media resource locator) https://wiki.videolan.org/Media_resource_locator/
     */
    add(mrl: string, play: boolean | undefined = undefined): Promise<VLCStatus> {
        return command(this.details, play ? VLCCommand.in_play : VLCCommand.in_enqueue, [`input=${mrl}`]);
    }

    /**
     * @desc Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    empty(): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_empty)
    }

    /**
     * @desc Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    async fullscreen(isFullscreen: boolean): Promise<VLCStatus> {
        const status = await this.getStatus();
        if (isFullscreen == status.fullscreen) {
            return status;
        } else return command(this.details, VLCCommand.fullscreen)
    }

    /**
     * @desc Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    async loop(isLoop: boolean): Promise<VLCStatus> {
        const status = await this.getStatus();
        if (status.loop == isLoop) {
            return status
        } else return command(this.details, VLCCommand.pl_loop)
    }

    /**
     * @desc Play next song
     * @returns {Promise<VLCStatus>}
     */
    next(): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_next)
    }

    /**
     * @returns {Promise<VLCStatus>}
     * @desc Pause current song.
     * If used again it will resume the current song
     */
    async pause(isPaused: true): Promise<VLCStatus> {
        const status = await this.getStatus();
        if (isPaused && status.state == VLCPlaylistStatus.paused) {
            return status
        } else if (!isPaused && status.state != VLCPlaylistStatus.paused) {
            return status
        } else return command(this.details, VLCCommand.pl_pause)
    }

    /**
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     * @desc Play song based on ID
     * If no ID is provided it'll play current song (restart / unpause)
     */
    play(id: string): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_play, [`id=${id}`])
    }

    /**
     * @desc Play previous song
     * @returns {Promise<VLCStatus>}
     */
    previous(): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_previous)
    }

    /**
     * @desc Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    remove(id: string): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_delete, [`id=${id}`])
    }

    /**
     * @desc Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    async repeat(isRepeat: boolean): Promise<VLCStatus> {
        const status = await this.getStatus();
        if (status.repeat == isRepeat) {
            return status;
        } else return command(this.details, VLCCommand.pl_repeat)
    }

    /**
     * @desc Shuffle playlist
     * @returns {Promise<VLCStatus>}
     */
    async random(isRandom: boolean): Promise<VLCStatus> {
        const status = await this.getStatus();
        if (status.random == isRandom) {
            return status;
        } else return command(this.details, VLCCommand.pl_random)
    }

    /**
     * @desc Set volume
     * @param {Number|String} value
     * @returns {Promise<VLCStatus>}
     */
    volume(value: number | string): Promise<VLCStatus> {
        return command(this.details, VLCCommand.volume, [`val=${value}`])
    }

    command(vlcCommand: VLCCommand, query: string[] | undefined = undefined): Promise<VLCStatus> {
        return command(this.details, vlcCommand, query)
    }
}
