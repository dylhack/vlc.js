'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result['default'] = mod;
  return result;
};
Object.defineProperty(exports, '__esModule', { value: true });
var path = __importStar(require('path'));
var fs = __importStar(require('fs'));
/**
 * @link https://www.videolan.org/support/faq.html#Config
 * Last updated: September 15th, 2019
 */
exports.locations = {
  unix: {
    v8: process.env.home + '/.vlc/vlcrc',
    v9: process.env.home + '/.config/vlc/vlcrc'
  },
  macos: {
    v8: process.env.home + '/Library/Preferences/org.videolan.vlc',
    v9: process.env.home + '/Library/Preferences/VLC'
  },
  win32: process.env.home + '\\Application Data\\vlc\\vlcrc',
};

function _getPath() {
  switch (process.platform) {
    case 'darwin':
      if (fs.existsSync(exports.locations.macos.v8)) {
        return path.resolve(exports.locations.macos.v8);
      } else if (fs.existsSync(exports.locations.macos.v9)) {
        return path.resolve(exports.locations.macos.v9);
      }
      break;
    case 'freebsd':
    case 'linux':
    case 'openbsd':
      if (fs.existsSync(exports.locations.unix.v8)) {
        return path.resolve(exports.locations.unix.v8);
      } else if (fs.existsSync(exports.locations.unix.v9)) {
        return path.resolve(exports.locations.unix.v9);
      }
      break;
    case 'cygwin':
    case 'win32':
      if (fs.existsSync(exports.locations.win32)) {
        return path.resolve(exports.locations.win32);
      }
      break;
    default:
      return undefined;
  }
}

exports._getPath = _getPath;

function editVLCRC(location) {
  var resolvable = location ? location : _getPath();
  if (resolvable) {
    var data = fs.readFileSync(resolvable);
    return new VLCRC(data);
  } else {
    throw new Error('Could not find location of the vlcrc, please provide a resolvable location in the first argument.');
  }
}

exports.editVLCRC = editVLCRC;
var VLCRC = /** @class */ (function () {
  function VLCRC(data) {
    this._vlcrc = data;
  }

  VLCRC.prototype._update = function (data) {
    this._vlcrc = data;
  };
  VLCRC.prototype._locate = function (key) {
    var split = [];
    this._vlcrc.toString()
      .split('\n')
      .forEach(function (x) {
        var keyValue = x.split('=');
        if (keyValue[0] && keyValue[1]) {
          split.push([keyValue[0], keyValue[1]]);
        }
      });
    return split.find(function (x) { return x[0].includes(key); });
  };
  VLCRC.prototype.disable = function (key) {
    var str = this._vlcrc.toString();
    var keyValue = this._locate(key);
    if (keyValue) {
      if (!keyValue[0].startsWith('#')) {
        str.replace(keyValue[0] + '=' + keyValue[1], '#' + keyValue[0] + '=' + keyValue[1]);
      }
      this._update(Buffer.from(str));
      return Buffer.from(str);
    } else {
      throw new Error('Could not locate ' + key + ' in the vlcrc buffer.');
    }
  };
  VLCRC.prototype.enable = function (key) {
    var str = this._vlcrc.toString();
    var keyValue = this._locate(key);
    if (keyValue) {
      if (keyValue[0].startsWith('#')) {
        str.replace('#' + keyValue[0] + '=' + keyValue[1], keyValue[0] + '=' + keyValue[1]);
      }
      this._update(Buffer.from(str));
      return Buffer.from(str);
    }
  };
  VLCRC.prototype.get = function (key) {
    return this._locate(key);
  };
  VLCRC.prototype.set = function (key, value) {
    var str = this._vlcrc.toString();
    var keyValue = this._locate(key);
    if (keyValue) {
      str.replace(keyValue[0] + '=' + keyValue[1], key + '=' + value);
      this._update(Buffer.from(str));
      return Buffer.from(str);
    } else {
      str += key + '=' + value;
      this._update(Buffer.from(str));
      return Buffer.from(str);
    }
  };
  VLCRC.prototype.getConfig = function () {
    return this._vlcrc;
  };
  return VLCRC;
}());
exports.VLCRC = VLCRC;
