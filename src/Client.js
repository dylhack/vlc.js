"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Requester_1 = require("./Requester");
/**
 * @class VLCClient
 * @constructor
 * @param {Details} details
 * @desc Promise-oriented VLC Client. This Client uses everything in src/commands & src/routes.
 * Every command resolves with VLC's status.json. All the actual communication with VLC is done in
 * src/workers
 */
var VLCClient = /** @class */ (function () {
    function VLCClient(details) {
        this.details = details;
    }
    /**
     * @method getStatus
     * @return {Promise<VLCStatus>}
     */
    VLCClient.prototype.getStatus = function () {
        return Requester_1.fetch(this.details, 'status.json');
    };
    /**
     * @method getPlaylist
     * @return {Promise<VLCPlaylist>}
     */
    VLCClient.prototype.getPlaylist = function () {
        return Requester_1.fetch(this.details, 'playlist.json');
    };
    /**
     * @method add
     * @param {String} mrl media resource locator
     * @returns {Promise<VLCStatus>}
     * @desc Add song based on MRL (media resource locator)
     */
    VLCClient.prototype.add = function (mrl) {
        return Requester_1.command(this.details, 'in_enqueue', mrl);
    };
    /**
     * @method empty
     * @desc Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.empty = function () {
        return Requester_1.command(this.details, 'pl_empty');
    };
    /**
     * @method fullscreen
     * @desc Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.fullscreen = function () {
        return Requester_1.command(this.details, 'pl_fullscreen');
    };
    /**
     * @method loop
     * @desc Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.loop = function () {
        return Requester_1.command(this.details, 'pl_loop');
    };
    /**
     * @method next
     * @desc Play next song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.next = function () {
        return Requester_1.command(this.details, 'pl_next');
    };
    /**
     * @method pause
     * @returns {Promise<VLCStatus>}
     * @desc Pause current song.
     * If used again it will resume the current song
     */
    VLCClient.prototype.pause = function () {
        return Requester_1.command(this.details, 'pl_pause');
    };
    /**
     * @method play
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     * @desc Play song based on ID
     * If no ID is provided it'll play current song (restart / unpause)
     */
    VLCClient.prototype.play = function (id) {
        return Requester_1.command(this.details, 'pl_play', id);
    };
    /**
     * @method previous
     * @desc Play previous song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.previous = function () {
        return Requester_1.command(this.details, 'pl_previous');
    };
    /**
     * @method remove
     * @desc Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.remove = function (id) {
        return Requester_1.command(this.details, 'pl_delete', id);
    };
    /**
     * @method repeat
     * @desc Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.repeat = function () {
        return Requester_1.command(this.details, 'pl_repeat');
    };
    /**
     * @method shuffle
     * @desc Shuffle playlist
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.shuffle = function () {
        return Requester_1.command(this.details, 'pl_random');
    };
    /**
     * @method volume
     * @desc Set volume
     * @param {Number} value
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.volume = function (value) {
        return Requester_1.command(this.details, 'volume', value.toString());
    };
    return VLCClient;
}());
exports.VLCClient = VLCClient;
