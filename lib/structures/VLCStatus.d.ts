import {VLCRequest} from "./VLCRequest";

/**
 * @class VLCStatus
 * @description Current status about VLC.
 */
export declare class VLCStatus {
    readonly fullscreen: boolean;
    readonly stats: {
        [key: string]: number;
    } | undefined;
    readonly audiodelay: number;
    readonly apiversion: number;
    readonly currentplid: number;
    readonly time: number;
    readonly volume: number;
    readonly length: number;
    readonly random: boolean;
    readonly audiofilters: AudioFilters;
    readonly rate: number;
    readonly videoeffects: VideoEffects;
    readonly state: VLCPlaylistStatus;
    readonly loop: boolean;
    readonly version: string;
    readonly position: number;
    readonly information: Information | undefined;
    readonly repeat: boolean;
    readonly subtitledelay: number;
    readonly equalizer: Equalizer[];
    /**
     * @constructor
     * @param {VLCRequest} vlcRequest
     */
    constructor(vlcRequest: VLCRequest);
}
export declare enum VLCPlaylistStatus {
    stopped = "stopped",
    playing = "playing",
    paused = "paused",
    unknown = "unknown"
}
export interface AudioFilters {
    filter_0: string | undefined;
    filter_1: string | undefined;
    filter_2: string | undefined;
    filter_3: string | undefined;
    filter_4: string | undefined;
}
export interface Equalizer {
    presets: Presets;
    bands: {
        [key: string]: number;
    };
    preamp: number;
}
export interface Presets {
    "preset id=\"8\"": string | undefined;
    "preset id=\"4\"": string | undefined;
    "preset id=\"17\"": string | undefined;
    "preset id=\"10\"": string | undefined;
    "preset id=\"9\"": string | undefined;
    "preset id=\"15\"": string | undefined;
    "preset id=\"14\"": string | undefined;
    "preset id=\"16\"": string | undefined;
    "preset id=\"11\"": string | undefined;
    "preset id=\"13\"": string | undefined;
    "preset id=\"5\"": string | undefined;
    "preset id=\"7\"": string | undefined;
    "preset id=\"12\"": string | undefined;
    "preset id=\"2\"": string | undefined;
    "preset id=\"6\"": string | undefined;
    "preset id=\"3\"": string | undefined;
    "preset id=\"1\"": string | undefined;
    "preset id=\"0\"": string | undefined;
}
export interface Information {
    chapter: number;
    chapters: any[];
    title: number;
    category: Category;
    titles: any[];
}
export interface Category {
    meta: Meta;
    "Stream 0": Stream0;
}
export interface Stream0 {
    Bitrate: string;
    Codec: string;
    Channels: string;
    Bits_per_sample: string;
    Type: string;
    Sample_rate: string;
}
export interface Meta {
    description: string | undefined;
    date: string | undefined;
    genre: string | undefined;
    track_total: string | undefined;
    album: string | undefined;
    track_number: string | undefined;
    filename: string;
    now_playing: string | undefined;
    publisher: string | undefined;
    copyright: string | undefined;
    artist: string | undefined;
    language: string | undefined;
    title: string | undefined;
}
export interface VideoEffects {
    hue: number;
    saturation: number;
    contrast: number;
    brightness: number;
    gamma: number;
}
//# sourceMappingURL=VLCStatus.d.ts.map
