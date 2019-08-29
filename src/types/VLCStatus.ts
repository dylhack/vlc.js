export interface VLCStatus {
    fullscreen: number;
    audiodelay: number;
    apiversion: number;
    currentplid: number;
    time: number;
    volume: number;
    length: number;
    random: boolean;
    audiofilters: Audiofilters;
    rate: number;
    videoeffects: Videoeffects;
    state: string;
    loop: boolean;
    version: string;
    position: number;
    repeat: boolean;
    subtitledelay: number;
    equalizer: any[];
}

export interface Audiofilters {
    filter_0: string;
}

export interface Videoeffects {
    hue: number;
    saturation: number;
    contrast: number;
    brightness: number;
    gamma: number;
}
