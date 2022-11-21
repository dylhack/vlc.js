import got, { OptionsInit } from 'got';
import { URL } from 'url';
import { VLCStatus, VLCPlaylist } from './types.js';

type SortMode =
  | 0
  | 1
  | 3
  | 5
  | 7;
type SortOrder = 0 | 1;

export const VALID_RATIOS = [
  '1:1',
  '4:3',
  '5:4',
  '16:9',
  '16:10',
  '221:100',
  '235:100',
  '239:100',
];
export const MAX_DB = 20;
export const MIN_DB = -20;

export default class Client {
  private server: URL;

  private advanced: OptionsInit;

  public constructor(
    address: URL | string,
    password: string,
    advanced?: OptionsInit,
  ) {
    const server = typeof address === 'string'
      ? new URL(address)
      : address;

    server.username = '';
    server.password = password;

    this.server = server;
    this.advanced = advanced || {};
  }

  /**
   * This sends commands to the HTTP server to control VLC. See the provided
   * link for all the commands. For more query options (provided in the second
   * parameter) make each property equal a value.
   * https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt
   *
   * @param {String} vlcCommand
   * @param {String[]} options
   * @returns {Promise<VLCStatus>}
   */
  public async command(
    cmd: string,
    options: string[] = [],
  ): Promise<VLCStatus> {
    const target = new URL(this.server.toString());

    target.pathname = '/requests/status.json';

    // Add query parameters
    target.searchParams.append('command', cmd);
    for (let i = 0, j = 1; j < options.length; i += 1, j += 1) {
      const key = options[0];
      const value = options[1];

      if (key && value) {
        target.searchParams.append(key, value);
      } else {
        break;
      }
    }

    return this.request(target);
  }

  /**
   * Returns status.json /requests/status.json
   * @returns {Promise<VLCStatus>}
   */
  public getStatus(): Promise<VLCStatus> {
    const target = new URL(this.server.toString());
    target.pathname = '/requests/status.json';

    return this.request(target);
  }

  /**
   * Returns the playlist.json /requests/playlist.json
   * @return {Promise<VLCPlaylist>}
   */
  public getPlaylist(): Promise<VLCPlaylist> {
    const target = new URL(this.server.toString());
    target.pathname = '/requests/playlist.json';

    return this.request(target);
  }

  /**
   * Add <uri> to playlist
   * @param {string} uri
   * @returns {Promise<VLCStatus>}
   */
  public queue(uri: string): Promise<VLCStatus> {
    return this.command('in_enqueue', ['input', uri]);
  }

  /**
   * Add subtitle to currently playing file
   * @param {string} uri
   * @returns {Promise<VLCStatus>}
   */
  public addSubtitles(uri: string): Promise<VLCStatus> {
    return this.command('addsubtitle', ['val', uri]);
  }

  /**
   * Play an item based on ID. If an ID isn't provided the last item will play.
   * @param {number|string} id
   * @returns {Promise<VLCStatus>}
   */
  public resume(id?: number | string): Promise<VLCStatus> {
    const query = id === undefined ? undefined : ['id', id.toString()];
    return this.command('pl_play', query);
  }

  /**
   * Toggle pause
   * @returns {Promise<VLCStatus>}
   */
  public pause(): Promise<VLCStatus> {
    return this.command('pl_pause');
  }

  /**
   * Resume playback
   * @returns {Promise<VLCStatus>}
   */
  public forceResume(): Promise<VLCStatus> {
    return this.command('pl_forceresume');
  }

  /**
   * Pause playback
   * @returns {Promise<VLCStatus>}
   */
  public forcePause(): Promise<VLCStatus> {
    return this.command('pl_forcepause');
  }

  /**
   * Stop playback
   * @returns {Promise<VLCStatus>}
   */
  public stop(): Promise<VLCStatus> {
    return this.command('pl_stop');
  }

  /**
   * Play next item
   * @returns {Promise<VLCStatus>}
   */
  public next(): Promise<VLCStatus> {
    return this.command('pl_next');
  }

  /**
   * Jump to previous item
   * @returns {Promise<VLCStatus>}
   */
  public previous(): Promise<VLCStatus> {
    return this.command('pl_previous');
  }

  /**
   * Remove media based on ID. If an ID isn't provided it'll remove the current item
   * @param {string} id
   * @returns {Promise<VLCStatus>}
   */
  public remove(id?: string): Promise<VLCStatus> {
    const query = id === undefined ? undefined : ['id', id];
    return this.command('pl_delete', query);
  }

  /**
   * Empty the playlist
   * @returns {Promise<VLCStatus>}
   */
  public empty(): Promise<VLCStatus> {
    return this.command('pl_empty');
  }

  /**
   * Set audio delay
   * @param {number} seconds
   * @returns {Promise<VLCStatus>}
   */
  public setDelay(seconds: number): Promise<VLCStatus> {
    return this.command('audiodelay', ['val', seconds.toString()]);
  }

  /**
   * Set subtitle delay
   * @param {number} seconds
   * @returns {Promise<VLCStatus>}
   */
  public setSubtitleDelay(seconds: number): Promise<VLCStatus> {
    return this.command('subdelay', ['val', seconds.toString()]);
  }

  /**
   * Set playback rate it must be greater than zero
   * @param {number} newRate
   * @returns {Promise<VLCStatus>}
   */
  public setRate(newRate: number): Promise<VLCStatus> {
    if (newRate > 0) {
      return this.command('rate', ['val', newRate.toString()]);
    }
    throw new Error(`Expected new playback rate to be greater than zero, got: ${newRate}`);
  }

  /**
   * Set aspect ratio, Valid ratios:
   * 1:1 , 4:3 , 5:4 , 16:9 , 16:10 , 221:100 , 235:100 , 239:100
   * @param {number} newRatio
   * @returns {Promise<VLCStatus>}
   */
  public setAspectRatio(newRatio: string): Promise<VLCStatus> {
    if (VALID_RATIOS.includes(newRatio)) {
      return this.command('aspectratio', ['val', newRatio]);
    }
    throw new Error(`Expected new aspect ratio to be one of: ${VALID_RATIOS}`);
  }

  /**
   * Sort the playlist based on mode and order
   * - 0 Id
   * - 1 Name
   * - 3 Author
   * - 5 Random
   * - 7 Track number
   * @param {number} mode
   * @param {number} order
   * @returns {Promise<VLCStatus>}
   */
  public sort(mode: SortMode, order: SortOrder): Promise<VLCStatus> {
    return this.command('pl_sort', [
      'id', mode.toString(),
      'val', order.toString()
    ]);
  }

  /**
   * Random playback
   * @returns {Promise<VLCStatus>}
   */
  public random(): Promise<VLCStatus> {
    return this.command('pl_random');
  }

  /**
   * Toggle repeat (current item)
   * @returns {Promise<VLCStatus>}
   */
  public repeat(): Promise<VLCStatus> {
    return this.command('pl_repeat');
  }

  /**
   * Toggle loop (current playlist)
   * @returns {Promise<VLCStatus>}
   */
  public loop(): Promise<VLCStatus> {
    return this.command('pl_loop');
  }

  /**
   * Toggle fullscreen
   * @returns {Promise<VLCStatus>}
   */
  public fullscreen(): Promise<VLCStatus> {
    return this.command('fullscreen');
  }

  /**
   * Enable services discovery module
   * @param {string} val
   * @returns {Promise<VLCStatus>}
   */
  public sdAdd(val: string): Promise<VLCStatus> {
    return this.command('pl_sd_add', [`val=${val}`]);
  }

  /**
   * Disable services discovery module
   * @param {string} val
   * @returns {Promise<VLCStatus>}
   */
  public sdRemove(val: string): Promise<VLCStatus> {
    return this.command('pl_sd_remove', ['val', val]);
  }

  /**
   * Seek to provided value.
   * Acceptable forms: [+ or -][<int><H or h>:][<int><M or m or '>:][<int><nothing or S or s or ">]
   * or [+ or -]<int>%
   * @param {string|number} val
   * @returns {Promise<VLCStatus>}
   */
  public seek(val: string | number): Promise<VLCStatus> {
    return this.command('seek', ['val', val.toString()]);
  }

  /**
   * Sets the preamp value, must be >=-20 and <=20
   * @param {number} dB
   * @returns {Promise<VLCStatus>}
   */
  public preamp(dB: number): Promise<VLCStatus> {
    if (dB >= MIN_DB && dB <= MAX_DB) {
      return this.command('preamp', ['val', dB.toString()]);
    }
    throw new Error(
      'Expected to new preamp value to be less than'
      + ` ${MIN_DB} and greater than ${MAX_DB}`,
    );
  }

  /**
   * set the gain for a specific band, must be >=-20 and <=20
   * @param {string} band
   * @param {number} gain
   * @returns {Promise<VLCStatus>}
   */
  public equalizer(band: string, gain: number): Promise<VLCStatus> {
    if (gain >= MIN_DB && gain <= MAX_DB) {
      return this.command('equalizer', [
        'band', band,
        'val', gain.toString(),
      ]);
    }
    throw new Error(
      'Expected gain value to be less than '
      + ` ${MIN_DB} and greater than ${MAX_DB}`,
    );
  }

  /**
   * Toggle the equalizer
   * @param {boolean} on
   * @returns {Promise<VLCStatus>}
   */
  public toggleEqualizer(on: boolean): Promise<VLCStatus> {
    const val = on ? '1' : '0';
    return this.command('enableeq', ['val', val]);
  }

  /**
   * set the equalizer preset as per the id specified
   * @param {string|number} id
   * @returns {Promise<VLCStatus>}
   */
  public setPreset(id: string | number): Promise<VLCStatus> {
    return this.command('setpreset', ['val', id.toString()]);
  }

  /**
   * Select an item based on title
   * @param {string} title
   * @returns {Promise<VLCStatus>}
   */
  public title(title: string): Promise<VLCStatus> {
    return this.command('title', ['val', title]);
  }

  /**
   * Select an item based on chapter
   * @param {string} chapter
   * @returns {Promise<VLCStatus>}
   */
  public chapter(chapter: string): Promise<VLCStatus> {
    return this.command('chapter', ['val', chapter]);
  }

  /**
   * Select the audio track (use the number from the stream)
   * @param {number} id
   * @returns {Promise<VLCStatus>}
   */
  public selAudioTrack(id: number): Promise<VLCStatus> {
    return this.command('audio_track', ['val', id.toString()]);
  }

  /**
   * Select the video track (use the number from the stream)
   * @param {number} id
   * @returns {Promise<VLCStatus>}
   */
  public selVideoTrack(id: number): Promise<VLCStatus> {
    return this.command('video_track', ['val', id.toString()]);
  }

  /**
   * Select the subtitle track (use the number from the stream)
   * @param {number} id
   * @returns {Promise<VLCStatus>}
   */
  public selSubtitleTrack(id: number): Promise<VLCStatus> {
    return this.command('subtitle_track', ['val', id.toString()]);
  }

  /**
   * Set volume
   * @param {number|string} value
   * @returns {Promise<VLCStatus>}
   */
  public setVolume(value: number | string): Promise<VLCStatus> {
    return this.command('volume', ['val', value.toString()]);
  }

  private async request<T>(
    target: URL,
  ): Promise<T> {
    const resp = got({ url: target, ...this.advanced });
    return resp.json<T>();
  }
}

export * from './types.js';
