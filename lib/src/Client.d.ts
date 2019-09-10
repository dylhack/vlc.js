/**
 * @module Client
 * @author dylhack
 */
import { Details, VLCCommand } from "./Requester";
import { VLCStatus } from "./structures/VLCStatus";
import { VLCPlaylist } from "./structures/VLCPlaylist";
/**
 * @class VLCClient
 * @description Promise-oriented VLC Client.
 */
export declare class VLCClient {
    private readonly details;
    /**
     * @constructor
     * @param details
     */
    constructor(details: Details);
    /**
     * @returns Promise<VLCStatus>
     */
    getStatus(): Promise<VLCStatus>;
    /**
     * @return {Promise<VLCPlaylist>}
     */
    getPlaylist(): Promise<VLCPlaylist>;
    /**
     * @param {String} mrl media resource locator
     * @param {Boolean|undefined} play Play the added media
     * @returns {Promise<VLCStatus>}
     * @desc Add song based on MRL (media resource locator) https://wiki.videolan.org/Media_resource_locator/
     */
    add(mrl: string, play?: boolean | undefined): Promise<VLCStatus>;
    /**
     * @desc Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    empty(): Promise<VLCStatus>;
    /**
     * @desc Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    fullscreen(isFullscreen: boolean): Promise<VLCStatus>;
    /**
     * @desc Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    loop(isLoop: boolean): Promise<VLCStatus>;
    /**
     * @desc Play next song
     * @returns {Promise<VLCStatus>}
     */
    next(): Promise<VLCStatus>;
    /**
     * @returns {Promise<VLCStatus>}
     * @desc Pause current song.
     * If used again it will resume the current song
     */
    pause(isPaused: true): Promise<VLCStatus>;
    /**
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     * @desc Play song based on ID
     * If no ID is provided it'll play current song (restart / unpause)
     */
    play(id: string): Promise<VLCStatus>;
    /**
     * @desc Play previous song
     * @returns {Promise<VLCStatus>}
     */
    previous(): Promise<VLCStatus>;
    /**
     * @desc Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    remove(id: string): Promise<VLCStatus>;
    /**
     * @desc Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    repeat(isRepeat: boolean): Promise<VLCStatus>;
    /**
     * @desc Shuffle playlist
     * @returns {Promise<VLCStatus>}
     */
    random(isRandom: boolean): Promise<VLCStatus>;
    /**
     * @desc Set volume
     * @param {Number|String} value
     * @returns {Promise<VLCStatus>}
     */
    volume(value: number | string): Promise<VLCStatus>;
    command(vlcCommand: VLCCommand, query?: string[] | undefined): Promise<VLCStatus>;
}
//# sourceMappingURL=Client.d.ts.map