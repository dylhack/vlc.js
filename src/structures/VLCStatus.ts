import {VLCRequest} from "./VLCRequest";

/**
 * @class VLCStatus
 * @description Current status about VLC.
 */
export class VLCStatus {
    public readonly fullscreen: boolean;
    public readonly stats: { [key: string]: number } | undefined;
    public readonly audiodelay: number;
    public readonly apiversion: number;
    public readonly currentplid: number;
    public readonly time: number;
    public readonly volume: number;
    public readonly length: number;
    public readonly random: boolean;
    public readonly audiofilters: AudioFilters;
    public readonly rate: number;
    public readonly videoeffects: VideoEffects;
    public readonly state: VLCPlaylistStatus;
    public readonly loop: boolean;
    public readonly version: string;
    public readonly position: number;
    public readonly information: Information | undefined;
    public readonly repeat: boolean;
    public readonly subtitledelay: number;
    public readonly equalizer: Equalizer[];

    /**
     * @constructor
     * @param {VLCRequest} vlcRequest
     */
    constructor(vlcRequest: VLCRequest) {
        const parsed = JSON.parse(vlcRequest.data.toString());

        this.fullscreen = (parsed.fullscreen === 0 ? false : parsed.fullscreen);
        this.stats = parsed.stats;
        this.audiodelay = parsed.audiodelay;
        this.apiversion = parsed.apiversion;
        this.currentplid = parsed.currentplid;
        this.time = parsed.time;
        this.volume = parsed.volume;
        this.length = parsed.length;
        this.random = parsed.random;
        this.audiofilters = parsed.audiofilters;
        this.rate = parsed.rate;
        this.videoeffects = parsed.videoeffects;
        this.state = parsed.state;
        this.loop = parsed.loop;
        this.version = parsed.version;
        this.position = parsed.position;
        this.information = parsed.information;
        this.repeat = parsed.repeat;
        this.subtitledelay = parsed.subtitledelay;
        this.equalizer = parsed.equalizer;
    }
}

export enum VLCPlaylistStatus {
    stopped = 'stopped',
    playing = 'playing',
    paused = 'paused',
    unknown = 'unknown'
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
    bands: { [key: string]: number };
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
