"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var url = __importStar(require("url"));
/**
 * @extends Error
 * @class VLCError
 * @description All the error details while communicating with VLCs' HTTP server is constructed here.
 */
var VLCError = /** @class */ (function (_super) {
    __extends(VLCError, _super);
    /**
     * @constructor
     * @param {VLCRequest} vlcRequest
     */
    function VLCError(vlcRequest) {
        var _this = this;
        var parsed = url.parse(vlcRequest.request.path, true);
        var str = vlcRequest.data.toString();
        _this = _super.call(this, str) || this;
        _this.vlcRequest = vlcRequest;
        _this.command = parsed.query['command'];
        return _this;
    }
    return VLCError;
}(Error));
exports.VLCError = VLCError;
