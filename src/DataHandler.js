/**
 * @module DataHandler
 * @author dylhack
 * @desc This module is responsible for requesting data structures that VLC provides on their HTTP
 * endpoint. These two data structures are the "status.json" and "playlist.json". For further
 * details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 */

const http = require('http');
const URL = require('url');

const template = 'http://USERNAME:PASSWORD@ADDRESS:PORT/requests/PATH';
const defaultDetails = {
  username: '',
  password: '',
  address: '127.0.0.1',
  port: '8080',
};

/**
 * @param {Details}
 * @param {String} endpoint
 * @param {Response} callback
 */
module.exports = (details = defaultDetails, endpoint, callback) => {
  const requested = template
    .replace(/(USERNAME)/, details.username ? encodeURIComponent(details.username) : '')
    .replace(/(PASSWORD)/, details.password ? encodeURIComponent(details.password) : '')
    .replace(
      /(ADDRESS)/,
      details.address ? details.address : '127.0.0.1',
    )
    .replace(/(PORT)/, details.port ? details.port : '9090')
    .replace(/(PATH)/, endpoint);

  const url = URL.parse(requested);
  let str = '';
  const req = http.get(url, (res) => {
    res.on('data', (data) => {
      str += data;
    });
    res.on('end', () => {
      if (res.statusCode === 200) {
        try {
          const data = JSON.parse(str);
          callback(undefined, data);
        } catch (e) {
          callback(e);
        }
      } else {
        callback(new Error(`Rejected request with status-code: ${res.statusCode}`));
      }
    });
  });
  req.on('error', err => callback(err));
};

/**
 * @typedef {Object} Details
 * @prop {String} username [username=""]
 * @prop {String} password [password=""]
 * @prop {String} address  [address="127.0.0.1"]
 * @prop {Number} port     [port="9090"]
 */
/**
 * @typedef {Object} Status
 * @property {Number} apiversion
 * @property {Number} audiodelay
 * @property {Object} audiofilters
 * @property {Number} currentplid
 * @property {Array} equalizer
 * @property {Number} fullscreen
 * @property {Number} length
 * @property {Boolean} loop
 * @property {Number} position
 * @property {Boolean} random
 * @property {Number} rate
 * @property {Boolean} repeat
 * @property {String} state
 * @property {Number} subtitledelay
 * @property {Number} time
 * @property {String} version
 * @property {Object} videoeffects
 * @property {Number} volume
 * @desc VLC status (values may vary)
 */
/**
 * @typedef {Object} Playlist
 * @desc Object details may vary.
 */
/**
 * @callback Response
 * @param {Error} error
 * @param {Status|Playlist}
 */
