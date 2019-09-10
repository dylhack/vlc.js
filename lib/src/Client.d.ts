/**
 * @module Client
 * @author dylhack
 */
import { VLCCommand, VLCCredentials } from "./Requester";
import { VLCStatus } from "./structures/VLCStatus";
import { VLCPlaylist } from "./structures/VLCPlaylist";
/**
 * @class VLCClient
 * @description Promise-oriented VLC HTTP endpoint Client.
 */
export declare class VLCClient {
    private readonly details;
    /**
     * @constructor
     * @param {VLCCredentials} details
     */
    constructor(details: VLCCredentials);
    /**
     * @returns {Promise<VLCStatus>}
     */
    getStatus(): Promise<VLCStatus>;
    /**
     * @return {Promise<VLCPlaylist>}
     */
    getPlaylist(): Promise<VLCPlaylist>;
    /**
     * @description Add song based on MRL (media resource locator)
     * @link https://wiki.videolan.org/Media_resource_locator/
     * @param {String} mrl media resource locator
     * @param {Boolean|undefined} play Play the added media
     * @returns {Promise<VLCStatus>}
     */
    add(mrl: string, play?: boolean | undefined): Promise<VLCStatus>;
    /**
     * @description Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    empty(): Promise<VLCStatus>;
    /**
     * @description Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    fullscreen(isFullscreen: boolean): Promise<VLCStatus>;
    /**
     * @description Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    loop(isLoop: boolean): Promise<VLCStatus>;
    /**
     * @description Play next song
     * @returns {Promise<VLCStatus>}
     */
    next(): Promise<VLCStatus>;
    /**
     * @description Pause current song
     * @returns {Promise<VLCStatus>}
     */
    pause(isPaused: true): Promise<VLCStatus>;
    /**
     * @description Play song based on ID If no ID is provided it'll play current song (restart / unpause)
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    play(id: string): Promise<VLCStatus>;
    /**
     * @description Play previous song
     * @returns {Promise<VLCStatus>}
     */
    previous(): Promise<VLCStatus>;
    /**
     * @description Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    remove(id: string): Promise<VLCStatus>;
    /**
     * @description Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    repeat(isRepeat: boolean): Promise<VLCStatus>;
    /**
     * @description Randomize the playlist
     * @returns {Promise<VLCStatus>}
     */
    random(isRandom: boolean): Promise<VLCStatus>;
    /**
     * @description Set volume
     * @param {Number|String} value
     * @returns {Promise<VLCStatus>}
     */
    volume(value: number | string): Promise<VLCStatus>;
    /**
     * @description Execute a VLC HTTP endpoint command
     * @param {VLCCommand} vlcCommand
     * @param {String[] | undefined} query
     */
    command(vlcCommand: VLCCommand, query?: string[] | undefined): Promise<VLCStatus>;
}
//# sourceMappingURL=Client.d.ts.map