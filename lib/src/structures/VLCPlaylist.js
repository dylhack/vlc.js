"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VLCPlaylist = /** @class */ (function () {
    function VLCPlaylist(request) {
        var parsed = JSON.parse(request.data.toString());
        this.ro = parsed.ro;
        this.type = parsed.type;
        this.name = parsed.name;
        this.id = parsed.id;
        this.children = parsed.children;
        this.request = request;
    }
    return VLCPlaylist;
}());
exports.VLCPlaylist = VLCPlaylist;
