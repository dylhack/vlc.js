import {VLCRequest} from "./VLCRequest";

export class VLCStatus {
    public fullscreen: boolean;
    public stats: { [key: string]: number } | undefined;
    public audiodelay: number;
    public apiversion: number;
    public currentplid: number;
    public time: number;
    public volume: number;
    public length: number;
    public random: boolean;
    public audiofilters: AudioFilters;
    public rate: number;
    public videoeffects: VideoEffects;
    public state: VLCPlaylistStatus;
    public loop: boolean;
    public version: string;
    public position: number;
    public information: Information | undefined;
    public repeat: boolean;
    public subtitledelay: number;
    public equalizer: any[];
    public request: VLCRequest;

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
        this.request = vlcRequest;
    }
}

export enum VLCPlaylistStatus {
    stopped = 'stopped',
    playing = 'playing',
    paused = 'paused',
    unknown = 'unknown'
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
