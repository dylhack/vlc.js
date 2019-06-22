/**
 * @module CommandHandler
 * @author dylhack
 * @desc This module is responsible for delivering query parameters (aka "commands") to VLC's http
 * endpoint. For further details see the provided link https://wiki.videolan.org/VLC_HTTP_requests
 */
const http = require('http');
const URL = require('url');

const template = 'http://USERNAME:PASSWORD@ADDRESS:PORT/requests/status.json?command=COMMAND&QUERY';
const defaultDetails = {
  username: '',
  password: '',
  address: '127.0.0.1',
  port: '8080',
};

/**
 * @param {Details} details
 * @param {String} command
 * @param {String} query
 * @param {CommandResponse} callback
 */
module.exports = (details = defaultDetails, command, query, callback) => {
  const requested = template
    .replace(/(USERNAME)/, details.username ? encodeURIComponent(details.username) : '')
    .replace(/(PASSWORD)/, details.password ? encodeURIComponent(details.password) : '')
    .replace(/(ADDRESS)/, details.address)
    .replace(/(COMMAND)/, command)
    .replace(/(QUERY)/, query)
    .replace(/(PORT)/, details.port);
  const url = URL.parse(requested, true);
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
 * @callback CommandResponse
 * @param {Error} error [response error]
 * @param {Status} status [VLC status object]
 */
/**
 * @typedef {Object} Details
 * @prop {String} username [username=""]
 * @prop {String} password [password=""]
 * @prop {String} address [address="127.0.0.1"]
 * @prop {String|Number} port [port="8080"]
 * @desc Login details
 */
