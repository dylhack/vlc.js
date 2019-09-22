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
    public readonly date?: number;
    public readonly information?: Information;
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
        this.date = parsed.date
    }
}

export enum VLCPlaylistStatus {
    stopped = 'stopped',
    playing = 'playing',
    paused = 'paused',
    unknown = 'unknown'
}

export type AudioFilters = {
    filter_0?: string;
    filter_1?: string;
    filter_2?: string;
    filter_3?: string;
    filter_4?: string;
}

export type Equalizer = {
    presets: Presets;
    bands: { [key: string]: number };
    preamp: number;
}

export type Presets = {
    "preset id=\"8\""?: string;
    "preset id=\"4\""?: string;
    "preset id=\"17\""?: string;
    "preset id=\"10\""?: string;
    "preset id=\"9\""?: string;
    "preset id=\"15\""?: string;
    "preset id=\"14\""?: string;
    "preset id=\"16\""?: string;
    "preset id=\"11\""?: string;
    "preset id=\"13\""?: string;
    "preset id=\"5\""?: string;
    "preset id=\"7\""?: string;
    "preset id=\"12\""?: string;
    "preset id=\"2\""?: string;
    "preset id=\"6\""?: string;
    "preset id=\"3\""?: string;
    "preset id=\"1\""?: string;
    "preset id=\"0\""?: string;
}

export type Information = {
    chapter: number;
    chapters: any[];
    title: number;
    category: Category;
    titles: any[];
}

export type Category = {
    meta: Meta;
    "Stream 0": Stream0;
}

export type Stream0 = {
    Bitrate: string;
    Codec: string;
    Channels: string;
    Bits_per_sample: string;
    Type: string;
    Sample_rate: string;
}

export type Meta = {
    description?: string;
    date?: string;
    genre?: string;
    track_total?: string;
    album?: string;
    track_number?: string;
    filename?: string;
    now_playing?: string;
    publisher?: string;
    copyright?: string;
    artist?: string;
    language?: string;
    title?: string;
    url?: string;
    episodeNumber?: string;
    seasonNumber?: string;
    showName?: string;
}

export type VideoEffects = {
    hue: number;
    saturation: number;
    contrast: number;
    brightness: number;
    gamma: number;
}
