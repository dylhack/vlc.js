import {AudioFilters, Information, VideoEffects} from "../lib";

export declare class VLCStatus {
    fullscreen: number | boolean;
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
    state: string;
    loop: boolean;
    version: string;
    position: number;
    information: Information | undefined;
    repeat: boolean;
    subtitledelay: number;
    equalizer: any[];

    constructor(data: JSON);
}

export declare enum VLCStatusState {
}

//# sourceMappingURL=VLCStatus.d.ts.map
