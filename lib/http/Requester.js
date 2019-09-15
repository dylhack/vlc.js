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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module Requester
 * @description This module handles ALL the HTTP interactions with VLCs' HTTP server. All the commands can be found
 * here.
 * @author dylhack
 */
var http = __importStar(require("http"));
var buffer_1 = require("buffer");
var VLCStatus_1 = require('./classes/VLCStatus');
var VLCRequest_1 = require('./classes/VLCRequest');
var VLCError_1 = require('./classes/VLCError');
var VLCPlaylist_1 = require('./classes/VLCPlaylist');
/**
 * @param {VLCCredentials} details
 * @param {VLCCommand} vlcCommand
 * @param {String[]} query
 * @returns {Promise<VLCStatus>}
 */
function command(details, vlcCommand, query) {
    if (query === void 0) { query = undefined; }
    return __awaiter(this, void 0, void 0, function () {
        var address, vlcRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    address = new URL("http://" + details.address + ":" + details.port + "/requests/status.json?command=" + vlcCommand);
                    if (query)
                        query.forEach(function (queue) {
                            if (queue.includes('=')) {
                                var key = queue.split('=')[0];
                                var value = queue.split('=')[1];
                                address.searchParams.append(key, value);
                            }
                            else
                                address.searchParams.append(queue, '');
                        });
                    return [4 /*yield*/, _request(address, details)];
                case 1:
                    vlcRequest = _a.sent();
                    if (vlcRequest.data.includes('<title>Error loading /requests/status.json</title>')
                        || vlcRequest.data.includes('<title>Client error</title>'))
                        throw new VLCError_1.VLCError(vlcRequest);
                    else
                        return [2 /*return*/, new VLCStatus_1.VLCStatus(vlcRequest)];
                    return [2 /*return*/];
            }
        });
    });
}
exports.command = command;
/**
 * @param {VLCCredentials} details
 * @returns {Promise<VLCStatus>}
 */
function getStatus(details) {
    return __awaiter(this, void 0, void 0, function () {
        var address, vlcRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    address = new URL("http://" + details.address + ":" + details.port + "/requests/status.json");
                    return [4 /*yield*/, _request(address, details)];
                case 1:
                    vlcRequest = _a.sent();
                    return [2 /*return*/, new VLCStatus_1.VLCStatus(vlcRequest)];
            }
        });
    });
}
exports.getStatus = getStatus;
/**
 * @param {VLCCredentials} details
 * @returns {Promise<VLCPlaylist>}
 */
function getPlaylist(details) {
    return __awaiter(this, void 0, void 0, function () {
        var address, vlcRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    address = new URL("http://" + details.address + ":" + details.port + "/requests/playlist.json");
                    return [4 /*yield*/, _request(address, details)];
                case 1:
                    vlcRequest = _a.sent();
                    return [2 /*return*/, new VLCPlaylist_1.VLCPlaylist(vlcRequest)];
            }
        });
    });
}
exports.getPlaylist = getPlaylist;
/**
 * @param {URL} address
 * @param {VLCCredentials} details
 * @returns {VLCRequest}
 * @private
 */
function _request(address, details) {
    return new Promise(function (resolve, reject) {
        var data = '';
        var basicAuth = buffer_1.Buffer.from(":" + details.password)
            .toString('base64');
        var req = http.get(address.toString(), {
            headers: {
                'Authorization': "Basic " + basicAuth
            }
        });
        req.on('response', function (res) {
            req.on('error', reject);
            res.on('data', function (chunk) { return data += chunk; });
            res.on('end', function () {
                var vlcRequest = new VLCRequest_1.VLCRequest(req, res, buffer_1.Buffer.from(data));
                resolve(vlcRequest);
            });
        });
    });
}
exports._request = _request;
