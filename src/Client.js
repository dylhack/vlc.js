"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('./Requester'), command = _a.command, fetch = _a.fetch;
/**
 * @class Client
 * @constructor
 * @param {Details} details
 */
var Client = /** @class */ (function () {
    function Client(details) {
        this.details = details;
    }
    /**
     * @method getStatus
     * @return {Promise<VLCStatus>}
     */
    Client.prototype.getStatus = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fetch(_this.details, 'status.json')
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method getPlaylist
     * @return {Promise<VLCPlaylist>}
     */
    Client.prototype.getPlaylist = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fetch(_this.details, 'playlist.json')
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method add
     * @param {String} mrl media resource locator
     * @returns {Promise<VLCStatus>}
     * @desc Add song based on MRL (media resource locator)
     */
    Client.prototype.add = function (mrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (mrl) {
                command(_this.details, 'in_enqueue', mrl)
                    .then(resolve)
                    .catch(reject);
            }
            else
                reject(new Error('Did not provide a MRL'));
        });
    };
    /**
     * @method empty
     * @desc Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.empty = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_empty')
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method fullscreen
     * @desc Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.fullscreen = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_fullscreen')
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method loop
     * @desc Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.loop = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_loop', undefined)
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method next
     * @desc Play next song
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.next = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_next')
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method pause
     * @desc Pause current song.
     * If used again it will resume the current song
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.pause = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_pause')
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method play
     * @desc Play song based on ID
     * If no ID is provided it'll play current song (restart / unpause)
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.play = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_play', id)
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method previous
     * @desc Play previous song
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.previous = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_previous')
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method remove
     * @desc Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.remove = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_delete', id)
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method repeat
     * @desc Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.repeat = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_repeat')
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method shuffle
     * @desc Shuffle playlist
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.shuffle = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'pl_random')
                .then(resolve)
                .catch(reject);
        });
    };
    /**
     * @method volume
     * @desc Set volume
     * @param {Number} value
     * @returns {Promise<VLCStatus>}
     */
    Client.prototype.volume = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            command(_this.details, 'volume', value)
                .then(resolve)
                .catch(reject);
        });
    };
    return Client;
}());
module.exports = Client;
