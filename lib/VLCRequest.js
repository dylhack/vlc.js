'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var VLCRequest = /** @class */ (function () {
  function VLCRequest(req, res, data) {
    this.data = data;
    this.request = req;
    this.response = res;
  }

  return VLCRequest;
}());
exports.VLCRequest = VLCRequest;
