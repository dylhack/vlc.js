"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module Client
 * @author dylhack
 */
var Requester_1 = require("./Requester");
var VLCStatus_1 = require("./structures/VLCStatus");
/**
 * @class VLCClient
 * @description Promise-oriented VLC HTTP endpoint Client.
 */
var VLCClient = /** @class */ (function () {
    /**
     * @constructor
     * @param {VLCCredentials} details
     */
    function VLCClient(details) {
        this.details = details;
    }
    /**
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.getStatus = function () {
        return Requester_1.getStatus(this.details);
    };
    /**
     * @return {Promise<VLCPlaylist>}
     */
    VLCClient.prototype.getPlaylist = function () {
        return Requester_1.getPlaylist(this.details);
    };
    /**
     * @description Add song based on MRL (media resource locator)
     * @link https://wiki.videolan.org/Media_resource_locator/
     * @param {String} mrl media resource locator
     * @param {Boolean|undefined} play Play the added media
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.add = function (mrl, play) {
        if (play === void 0) { play = undefined; }
        return Requester_1.command(this.details, play ? "in_play" /* in_play */ : "in_enqueue" /* in_enqueue */, ["input=" + mrl]);
    };
    /**
     * @description Clear playlist
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.empty = function () {
        return Requester_1.command(this.details, "pl_empty" /* pl_empty */);
    };
    /**
     * @description Toggle fullscreen (pretty useless)
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.fullscreen = function (isFullscreen) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatus()];
                    case 1:
                        status = _a.sent();
                        if (isFullscreen == status.fullscreen) {
                            return [2 /*return*/, status];
                        }
                        else
                            return [2 /*return*/, Requester_1.command(this.details, "fullscreen" /* fullscreen */)];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Loop playlist
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.loop = function (isLoop) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatus()];
                    case 1:
                        status = _a.sent();
                        if (status.loop == isLoop) {
                            return [2 /*return*/, status];
                        }
                        else
                            return [2 /*return*/, Requester_1.command(this.details, "pl_loop" /* pl_loop */)];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Play next song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.next = function () {
        return Requester_1.command(this.details, "pl_next" /* pl_next */);
    };
    /**
     * @description Pause current song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.pause = function (isPaused) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatus()];
                    case 1:
                        status = _a.sent();
                        if (isPaused && status.state == VLCStatus_1.VLCPlaylistStatus.paused) {
                            return [2 /*return*/, status];
                        }
                        else if (!isPaused && status.state != VLCStatus_1.VLCPlaylistStatus.paused) {
                            return [2 /*return*/, status];
                        }
                        else
                            return [2 /*return*/, Requester_1.command(this.details, "pl_pause" /* pl_pause */)];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Play song based on ID If no ID is provided it'll play current song (restart / unpause)
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.play = function (id) {
        return Requester_1.command(this.details, "pl_play" /* pl_play */, ["id=" + id]);
    };
    /**
     * @description Play previous song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.previous = function () {
        return Requester_1.command(this.details, "pl_previous" /* pl_previous */);
    };
    /**
     * @description Remove song based on ID. If an ID isn't provided it'll remove current song
     * @param {String} id
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.remove = function (id) {
        return Requester_1.command(this.details, "pl_delete" /* pl_delete */, ["id=" + id]);
    };
    /**
     * @description Repeat the current song
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.repeat = function (isRepeat) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatus()];
                    case 1:
                        status = _a.sent();
                        if (status.repeat == isRepeat) {
                            return [2 /*return*/, status];
                        }
                        else
                            return [2 /*return*/, Requester_1.command(this.details, "pl_repeat" /* pl_repeat */)];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Randomize the playlist
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.random = function (isRandom) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatus()];
                    case 1:
                        status = _a.sent();
                        if (status.random == isRandom) {
                            return [2 /*return*/, status];
                        }
                        else
                            return [2 /*return*/, Requester_1.command(this.details, "pl_random" /* pl_random */)];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Set volume
     * @param {Number|String} value
     * @returns {Promise<VLCStatus>}
     */
    VLCClient.prototype.volume = function (value) {
        return Requester_1.command(this.details, "volume" /* volume */, ["val=" + value]);
    };
    /**
     * @description Execute a VLC HTTP endpoint command
     * @param {VLCCommand} vlcCommand
     * @param {String[] | undefined} query
     */
    VLCClient.prototype.command = function (vlcCommand, query) {
        if (query === void 0) { query = undefined; }
        return Requester_1.command(this.details, vlcCommand, query);
    };
    return VLCClient;
}());
exports.VLCClient = VLCClient;