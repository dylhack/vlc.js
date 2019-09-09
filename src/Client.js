"use strict";
/**
 * @module Client
 * @author dylhack
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Requester_1 = require("./Requester");
/**
 * @class VLCClient
 * @description Promise-oriented VLC Client.
 */
var VLCClient = /** @class */ (function () {
    /**
     * @constructor
     * @param details
     */
    function VLCClient(details) {
        this.details = details;
    }
    /**
     * @returns Promise<VLCStatus>
     */
    VLCClient.prototype.getStatus = function () {
        return Requester_1.fetch(this.details, 'status.json');
    };
    /**
     * @return {Promise<VLCPlaylist>}
     */
    VLCClient.prototype.getPlaylist = function () {
        return Requester_1.fetch(this.details, 'playlist.json');
    };
    /**
     * @param {String} mrl media resource locator
     * @returns {Promise<VLCStatus>}
     * @desc Add song based on MRL (media resource locator)
     */
    VLCClient.prototype.add = function (mrl) {
        return Requester_1.command(this.details, 'in_enqueue', mrl);
    };
    /**
     * @desc Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.empty = function () {
        return Requester_1.command(this.details, 'pl_empty');
    };
    /**
     * @desc Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.fullscreen = function () {
        return Requester_1.command(this.details, 'pl_fullscreen');
    };
    /**
     * @desc Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.loop = function () {
        return Requester_1.command(this.details, 'pl_loop');
    };
    /**
     * @desc Play next song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.next = function () {
        return Requester_1.command(this.details, 'pl_next');
    };
    /**
     * @returns {Promise<VLCStatus>}
     * @desc Pause current song.
     * If used again it will resume the current song
     */
    VLCClient.prototype.pause = function () {
        return Requester_1.command(this.details, 'pl_pause');
    };
    /**
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     * @desc Play song based on ID
     * If no ID is provided it'll play current song (restart / unpause)
     */
    VLCClient.prototype.play = function (id) {
        return Requester_1.command(this.details, 'pl_play', id);
    };
    /**
     * @desc Play previous song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.previous = function () {
        return Requester_1.command(this.details, 'pl_previous');
    };
    /**
     * @desc Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.remove = function (id) {
        return Requester_1.command(this.details, 'pl_delete', id);
    };
    /**
     * @desc Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.repeat = function () {
        return Requester_1.command(this.details, 'pl_repeat');
    };
    /**
     * @desc Shuffle playlist
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.shuffle = function () {
        return Requester_1.command(this.details, 'pl_random');
    };
    /**
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
