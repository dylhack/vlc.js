/**
 * @module Client
 * @author dylhack
 * @requires CommandHandler
 * @requires DataHandler
 * @desc Promise-oriented VLC Client. This Client uses everything in src/commands & src/routes.
 * Every command resolves with VLC's status.json. All the actual communication with VLC is done in
 * src/workers
 */
const command = require('./CommandHandler.js');
const request = require('./DataHandler.js');

/**
 * @class Client
 * @constructor
 * @param {Details} details
 * @example
 * const client = new Client({
 *  password: 'rosebud',
 *  port: 9090
 * });
 * client.getStatus()
 * .then((status) => {
 *  console.log("Got the status! ", status);
 * });
 */
module.exports = class Client {
  constructor(details) {
    this.details = details;
  }

  /**
   * @method getStatus
   * @return {Promise<Status>}
   */
  getStatus() {
    return new Promise((res, rej) => {
      request(this.details, 'status.json', (err, data) => {
        if (err) rej(err);
        else res(data);
      });
    });
  }

  /**
   * @method getPlaylist
   * @return {Promise<Playlist>}
   */
  getPlaylist() {
    return new Promise((res, rej) => {
      request(this.details, 'playlist.json', (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method add
   * @param {String} mrl media resource locator
   * @returns {Promise<Status>}
   * @desc Add song based on MRL (media resource locator)
   */
  add(mrl) {
    return new Promise((res, rej) => {
      if (mrl) {
        command(this.details, 'in_enqueue', mrl, (err, data) => {
          rej(err);
          res(data);
        });
      } else rej(new Error('Did not provide a MRL'));
    });
  }

  /**
   * @method empty
   * @desc Clear playlist
   * @returns {Promise<Status>}
   */
  empty() {
    return new Promise((res, rej) => {
      command(this.details, 'pl_empty', undefined, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method fullscreen
   * @desc Toggle fullscreen (pretty useless)
   * @returns {Promise<Status>}
   */
  fullscreen() {
    return new Promise((res, rej) => {
      command(this.details, 'pl_fullscreen', undefined, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method loop
   * @desc Loop playlist
   * @returns {Promise<Status>}
   */
  loop() {
    return new Promise((res, rej) => {
      command(this.details, 'pl_loop', undefined, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method next
   * @desc Play next song
   * @returns {Promise<Status>}
   */
  next() {
    return new Promise((res, rej) => {
      command(this.details, 'pl_next', undefined, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method pause
   * @desc Pause current song.
   * If used again it will resume the current song
   * @returns {Promise<Status>}
   */
  pause() {
    return new Promise((res, rej) => {
      command(this.details, 'pl_pause', undefined, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method play
   * @desc Play song based on ID
   * If no ID is provided it'll play current song (restart / unpause)
   * @param {String} id
   * @returns {Promise<Status>}
   */
  play(id) {
    return new Promise((res, rej) => {
      command(this.details, 'pl_play', id, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method previous
   * @desc Play previous song
   * @returns {Promise<Status>}
   */
  previous() {
    return new Promise((res, rej) => {
      command(this.details, 'pl_previous', undefined, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method remove
   * @desc Remove song based on ID
     If an ID is provided it'll remove current song
   * @param {String} id
   * @returns {Promise<Status>}
   */
  remove(id) {
    return new Promise((res, rej) => {
      command(this.details, 'pl_delete', id, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method repeat
   * @desc Repeat the current song
   * @returns {Promise<Status>}
   */
  repeat() {
    return new Promise((res, rej) => {
      command(this.details, 'pl_repeat', undefined, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method shuffle
   * @desc Shuffle playlist
   * @returns {Promise<Status>}
   */
  shuffle() {
    return new Promise((res, rej) => {
      command(this.details, 'pl_random', undefined, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }

  /**
   * @method volume
   * @desc Set volume
   * @param {Number} value
   * @returns {Promise<Status>}
   */
  volume(value) {
    return new Promise((res, rej) => {
      command(this.details, 'volume', value, (err, data) => {
        rej(err);
        res(data);
      });
    });
  }
};
