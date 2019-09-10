import { VLCStatus } from "./structures/VLCStatus";
import { VLCRequest } from "./structures/VLCRequest";
import { VLCPlaylist } from "./structures/VLCPlaylist";
export interface Details {
    address: string;
    password: string;
    port: number | string;
}
export declare const enum VLCCommand {
    in_play = "in_play",
    addsubtitle = "addsubtitle",
    in_enqueue = "in_enqueue",
    pl_play = "pl_play",
    pl_pause = "pl_pause",
    pl_forcepause = "pl_forcepause",
    pl_forceresume = "pl_forceresume",
    pl_stop = "pl_stop",
    pl_next = "pl_next",
    pl_previous = "pl_previous",
    pl_delete = "pl_delete",
    pl_empty = "pl_empty",
    pl_sort = "pl_sort",
    pl_random = "pl_random",
    pl_loop = "pl_loop",
    pl_repeat = "pl_repeat",
    pl_sd_add = "pl_sd_add",
    pl_sd_remove = "pl_sd_remove",
    fullscreen = "fullscreen",
    snapshot = "snapshot",
    volume = "volume",
    seek = "seek",
    key = "key",
    audiodelay = "audiodelay",
    rate = "rate",
    subdelay = "subdelay",
    aspectratio = "aspectratio",
    preamp = "preamp",
    equalizer = "equalizer",
    enableeq = "enableeq",
    setpreset = "setpreset",
    title = "title",
    chapter = "chapter",
    audio_track = "audio_track",
    video_track = "video_track",
    subtitle_track = "subtitle_track"
}
/**
 * @param details
 * @param vlcCommand
 * @param query
 * @returns {Promise<VLCStatus>}
 */
export declare function command(details: Details, vlcCommand: VLCCommand, query?: string[] | undefined): Promise<VLCStatus>;
export declare function getStatus(details: Details): Promise<VLCStatus>;
export declare function getPlaylist(details: Details): Promise<VLCPlaylist>;
export declare function _request(address: URL, details: Details): Promise<VLCRequest>;
//# sourceMappingURL=Requester.d.ts.map