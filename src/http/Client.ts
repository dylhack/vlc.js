import {command, getPlaylist, getStatus, VLCCommand, VLCCredentials} from "./Requester"
import {VLCPlaylistStatus, VLCStatus} from "./classes/VLCStatus";
import {VLCPlaylist} from "./classes/VLCPlaylist";

/**
 * @class VLCClient
 * @description Promise-oriented VLC HTTP endpoint Client.
 */
export class VLCClient {
    private readonly details: VLCCredentials;

    /**
     * @constructor
     * @param {VLCCredentials} details
     */
    constructor(details: VLCCredentials) {
        this.details = details;
    }

    /**
     * @returns {Promise<VLCStatus>}
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
     * @description Add song based on MRL (media resource locator)
     * @link https://wiki.videolan.org/Media_resource_locator/
     * @param {String} mrl media resource locator
     * @param {Boolean|undefined} play Play the added media
     * @returns {Promise<VLCStatus>}
     */
    add(mrl: string, play: boolean | undefined = undefined): Promise<VLCStatus> {
        return command(this.details, play ? VLCCommand.in_play : VLCCommand.in_enqueue, [`input=${mrl}`]);
    }

    /**
     * @description Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    empty(): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_empty)
    }

    /**
     * @description Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    async fullscreen(isFullscreen: boolean): Promise<VLCStatus> {
        const status = await this.getStatus();
        if (isFullscreen == status.fullscreen) {
            return status;
        } else return command(this.details, VLCCommand.fullscreen)
    }

    /**
     * @description Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    async loop(isLoop: boolean): Promise<VLCStatus> {
        const status = await this.getStatus();
        if (status.loop == isLoop) {
            return status
        } else return command(this.details, VLCCommand.pl_loop)
    }

    /**
     * @description Play next song
     * @returns {Promise<VLCStatus>}
     */
    next(): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_next)
    }

    /**
     * @description Pause current song
     * @returns {Promise<VLCStatus>}
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
     * @description Play song based on ID If no ID is provided it'll play current song (restart / unpause)
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    play(id: string): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_play, [`id=${id}`])
    }

    /**
     * @description Play previous song
     * @returns {Promise<VLCStatus>}
     */
    previous(): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_previous)
    }

    /**
     * @description Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    remove(id: string): Promise<VLCStatus> {
        return command(this.details, VLCCommand.pl_delete, [`id=${id}`])
    }

    /**
     * @description Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    async repeat(isRepeat: boolean): Promise<VLCStatus> {
        const status = await this.getStatus();
        if (status.repeat == isRepeat) {
            return status;
        } else return command(this.details, VLCCommand.pl_repeat)
    }

    /**
     * @description Randomize the playlist
     * @returns {Promise<VLCStatus>}
     */
    async random(isRandom: boolean): Promise<VLCStatus> {
        const status = await this.getStatus();
        if (status.random == isRandom) {
            return status;
        } else return command(this.details, VLCCommand.pl_random)
    }

    /**
     * @description Set volume
     * @param {Number|String} value
     * @returns {Promise<VLCStatus>}
     */
    volume(value: number | string): Promise<VLCStatus> {
        return command(this.details, VLCCommand.volume, [`val=${value}`])
    }

    /**
     * @description Execute a VLC HTTP endpoint command
     * @param {VLCCommand} vlcCommand
     * @param {String[] | undefined} query
     */
    command(vlcCommand: VLCCommand, query: string[] | undefined = undefined): Promise<VLCStatus> {
        return command(this.details, vlcCommand, query)
    }
}
