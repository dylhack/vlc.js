'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result['default'] = mod;
  return result;
};
Object.defineProperty(exports, '__esModule', { value: true });
var url = __importStar(require('url'));
var VLCError = /** @class */ (function () {
  function VLCError(vlcRequest) {
    var parsed = url.parse(vlcRequest.request.path, true);
    var str = vlcRequest.data.toString();
    this.details = vlcRequest;
    this.command = parsed.query['command'];
    this.header = str.substr(str.indexOf('<h1>'), str.indexOf('</h1>'));
    this.message = str.substr(str.indexOf('<pre>'), str.indexOf('</pre>'));
  }

  return VLCError;
}());
exports.VLCError = VLCError;
