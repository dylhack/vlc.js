export type VLCPlaylistStatus =
  | 'stopped'
  | 'playing'
  | 'paused'
  | 'unknown';

export type AudioFilters = {
  [key: string]: string;
}

export interface Presets {
  [key: string]: string
}

export interface Equalizer {
  presets: Presets;
  bands: {
    [key: string]: number;
  };
  preamp: number;
}

export interface Stream {
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

export type Category = {
  meta: Meta;
  "Stream 0"?: Stream;
  "Stream 1"?: Stream;
  "Stream 2"?: Stream;
  "Stream 3"?: Stream;
  "Stream 4"?: Stream;
  "Stream 5"?: Stream;
  "Stream 6"?: Stream;
  "Stream 7"?: Stream;
  "Stream 8"?: Stream;
  "Stream 9"?: Stream;
}

export interface Information {
  chapter: number;
  chapters: any[];
  title: number;
  category: Category;
  titles: any[];
}

export type Meta = {
  description: string;
  date: string;
  genre: string;
  track_total: string;
  album: string;
  track_number: string;
  filename: string;
  now_playing: string;
  publisher: string;
  copyright: string;
  artist: string;
  language: string;
  title: string;
  url: string;
  episodeNumber: number;
  seasonNumber: number;
  showName: string;
  [key: string]: any;
}

export interface VideoEffects {
  hue: number;
  saturation: number;
  contrast: number;
  brightness: number;
  gamma: number;
}

/**
 * An interface representation of status.json
 */
export type VLCStatus = {
  readonly fullscreen: number | boolean;
  readonly stats?: {
    [key: string]: number
  };
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

export type Track = {
  ro: string;
  type: string;
  name: string;
  id: string;
  duration: number;
  uri: string;
  current: string;
}

export type VLCPlaylistChild = {
  ro: string;
  type: string;
  name: string;
  id: string;
  children: Track[];
}

/**
 * An interface representation of playlist.json
 * @interface VLCPlaylist
 */
export type VLCPlaylist = {
  ro: string;
  type: string;
  name: string;
  id: string;
  children: VLCPlaylistChild[];
}
