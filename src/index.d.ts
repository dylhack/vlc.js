/**
 * @typedef {Object} VLCPlaylist
 * @property {String} ro
 * @property {String} type
 * @property {String} name
 * @property {String} id
 * @property {VLCPlaylistChild[]} children
 */
export interface VLCPlaylist {
    ro: string;
    type: string;
    name: string;
    id: string;
    children: VLCPlaylistChild[];
}

/**
 * @typedef {Object} VLCPLaylistChild
 * @property {String} ro
 * @property {String} type
 * @property {String} name
 * @property {String} id
 * @property {ChildChild[]} children
 */
export interface VLCPlaylistChild {
    ro: string;
    type: string;
    name: string;
    id: string;
    children: ChildChild[];
}

/**
 * @typedef {Object} ChildChild
 * @property {String} ro
 * @property {String} type
 * @property {String} name
 * @property {String} id
 * @property {String} duration
 * @property {String} uri
 * @property {String} current
 */
export interface ChildChild {
    ro: string;
    type: string;
    name: string;
    id: string;
    duration: number;
    uri: string;
    current: string;
}

/**
 * @typedef {Object} Details
 * @property {String} address
 * @property {String} password
 * @property {String | Number} port
 */
export interface Details {
    address: string;
    password: string;
    port: string | number;
}

/**
 * @typedef {Object} VLCStatus
 * @property {Number} fullscreen
 * @property {Number} audiodelay
 * @property {Number} apiversion
 * @property {Number} currentplid
 * @property {Number} time
 * @property {Number} volume
 * @property {Number} length
 * @property {Boolean} random
 * @property {AudioFilters} audiofilters
 * @property {Number} rate
 * @property {VideoEffects} videoeffects
 * @property {String} state
 * @property {Boolean} loop
 * @property {String} version
 * @property {Number} position
 * @property {Boolean} repeat
 * @property {Number} subtitledelay
 * @property {any[]} equalizer
 */
export interface VLCStatus {
    fullscreen: number;
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
    repeat: boolean;
    subtitledelay: number;
    equalizer: any[];
}

/**
 * @typedef {Object} AudioFilters
 * @property {String} filter_0
 */
export interface AudioFilters {
    filter_0: string;
}

/**
 * @typedef {Object} Videoeffects
 * @property {Number} hue
 * @property {Number} saturation
 * @property {Number} contrast
 * @property {Number} brightness
 * @property {Number} gamma
 */
export interface VideoEffects {
    hue: number;
    saturation: number;
    contrast: number;
    brightness: number;
    gamma: number;
}
