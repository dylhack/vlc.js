export interface VLCPlaylist {
    ro: string;
    type: string;
    name: string;
    id: string;
    children: VLCPlaylistChild[];
}

export interface VLCPlaylistChild {
    ro: string;
    type: string;
    name: string;
    id: string;
    children: ChildChild[];
}

export interface ChildChild {
    ro: string;
    type: string;
    name: string;
    id: string;
    duration: number;
    uri: string;
    current: string;
}

export interface Details {
    password: string;
    address: string;
    port: string | number;
}

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
