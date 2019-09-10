import { VLCRequest } from "./VLCRequest";
export declare class VLCStatus {
    fullscreen: boolean;
    stats: {
        [key: string]: number;
    } | undefined;
    audiodelay: number;
    apiversion: number;
    currentplid: number;
    time: number;
    volume: number;
    length: number;
    random: boolean;
    audiofilters: AudioFilters;
    rate: number;
    videoeffects: VideoEffects;
    state: VLCPlaylistStatus;
    loop: boolean;
    version: string;
    position: number;
    information: Information | undefined;
    repeat: boolean;
    subtitledelay: number;
    equalizer: any[];
    request: VLCRequest;
    constructor(vlcRequest: VLCRequest);
}
export declare enum VLCPlaylistStatus {
    stopped = "stopped",
    playing = "playing",
    paused = "paused",
    unknown = "unknown"
}
export interface AudioFilters {
    filter_0: string;
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
    filename: string;
}
export interface VideoEffects {
    hue: number;
    saturation: number;
    contrast: number;
    brightness: number;
    gamma: number;
}
//# sourceMappingURL=VLCStatus.d.ts.map