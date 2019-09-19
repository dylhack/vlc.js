'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result['default'] = mod;
  return result;
};
Object.defineProperty(exports, '__esModule', { value: true });
var vlcrc_1 = require('../../src/util/vlcrc');
var path = __importStar(require('path'));
describe('vlcrc', function () {
  it('_getPath', function () {
    var x = vlcrc_1._getPath();
    expect(x)
      .toBe(path.resolve('C:\\Users\\dylha\\AppData\\Roaming\\vlc\\vlcrc'));
  });
  it('_readLine', function () {
    var x = vlcrc_1._readLine('http-password==Qwerty');
    expect(x.key)
      .toBe('http-password');
    expect(x.value)
      .toBe('=Qwerty');
    expect(x.enabled)
      .toBe(true);
  });
});
