/**
 * @module VLCStatus
 * @author Dylan Hackworth <https://github.com/dylhack>
 * @LICENSE
 * Copyright 2019 Dylan Hackworth
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of
 * conditions and the following disclaimer in the documentation and/or other materials provided
 * with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * An interface representation of status.json
 * @interface VLCStatus
 */
export interface VLCStatus {
    readonly fullscreen: number | boolean;
    readonly stats: { [key: string]: number } | undefined;
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
    readonly date?: string;
    readonly information?: Information;
    readonly repeat: boolean;
    readonly subtitledelay: number;
    readonly equalizer: Equalizer[];
}

export type VLCPlaylistStatus =
    | 'stopped'
    | 'playing'
    | 'paused'
    | 'unknown';

export interface AudioFilters {
    filter_0: string;
    filter_1: string;
    filter_2: string;
    filter_3: string;
    filter_4: string;
}

export interface Equalizer {
    presets: Presets;
    bands: { [key: string]: number };
    preamp: number;
}

export interface Presets {
    "preset id=\"0\"": string;
    "preset id=\"1\"": string;
    "preset id=\"2\"": string;
    "preset id=\"3\"": string;
    "preset id=\"4\"": string;
    "preset id=\"5\"": string;
    "preset id=\"6\"": string;
    "preset id=\"7\"": string;
    "preset id=\"8\"": string;
    "preset id=\"9\"": string;
    "preset id=\"10\"": string;
    "preset id=\"11\"": string;
    "preset id=\"12\"": string;
    "preset id=\"13\"": string;
    "preset id=\"14\"": string;
    "preset id=\"15\"": string;
    "preset id=\"16\"": string;
    "preset id=\"17\"": string;
}

export interface Information {
    chapter: number;
    chapters: any[];
    title: number;
    category: Category;
    titles: any[];
}

export interface Category {
    "Stream 0": Stream0;
    "Stream 1": Stream1;
    meta: any;
}

// noinspection JSClassNamingConvention
export interface Stream0 {
    Decoded_format: string;
    Color_transfer_function: string;
    Chroma_location: string;
    Video_resolution: string;
    Frame_rate: string;
    Codec: string;
    Orientation: string;
    Color_space: string;
    Type: string;
    Color_primaries: string;
    Buffer_dimensions: string;
}

// noinspection JSClassNamingConvention
export interface Stream1 {
    Codec: string;
    Channels: string;
    Type: string;
    Bits_per_sample: string;
    Language: string;
    Sample_rate: string;
}

// This has been deprecated because the meta data of a file can be anything, but if you're
// interested in looking at the most common ones they're here.
// export interface Meta {
//     description: string;
//     date: string;
//     genre: string;
//     track_total: string;
//     album: string;
//     track_number: string;
//     filename: string;    // This will almost always be defined it's like the last resort.
//     now_playing: string; // For streams
//     publisher: string;
//     copyright: string;
//     artist: string;
//     language: string;
//     title: string;
//     url: string;
//     episodeNumber: number;
//     seasonNumber: number;
//     showName: string;
// }

export interface VideoEffects {
    hue: number;
    saturation: number;
    contrast: number;
    brightness: number;
    gamma: number;
}
