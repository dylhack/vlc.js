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
var os = __importStar(require('os'));
/**
 * @link https://www.videolan.org/support/faq.html#Config
 * Last updated: September 15th, 2019
 */
exports.locations = {
  unix: {
    v8: os.homedir() + '/.vlc/vlcrc',
    v9: os.homedir() + '/.config/vlc/vlcrc'
  },
  macos: {
    v8: os.homedir() + '/Library/Preferences/org.videolan.vlc',
    v9: os.homedir() + '/Library/Preferences/VLC'
  },
  win32: os.homedir() + '\\AppData\\Roaming\\vlc\\vlcrc',
};

function _readLine(line) {
  var key = line.substr(line.startsWith('#') ? 1 : 0, line.indexOf('='));
  var value = line.substr(line.indexOf('='));
  var output = [key, value];
  switch (value.toLowerCase()) {
    case 'true':
    case 'false':
      output[1] = (value.toLowerCase() === 'true');
      break;
  }
  if (!isNaN(Number(value))) {
    output[1] = Number(value);
  }
  return {
    key: output[0],
    value: output[1],
    enabled: line.startsWith('#')
  };
}

exports._readLine = _readLine;

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
    var _this = this;
    this._original = data;
    this._map = new Map();
    data.toString()
      .split('\n')
      .forEach(function (line) {
        var configLine = _readLine(line);
        if (configLine) {
          _this._map.set(configLine.key, configLine);
        }
      });
  }

  VLCRC.prototype.get = function (key) {
    return this._map.get(key);
  };
  VLCRC.prototype.set = function (key, value) {
    var got = this._map.get(key);
    if (got) {
      got.value = value;
      this._map.set(key, got);
      return got;
    } else {
      throw new Error('Could not find ' + key + ' in configuration map.');
    }
  };
  VLCRC.prototype.disable = function (key) {
    var configLine = this._map.get(key);
    if (configLine) {
      configLine.enabled = false;
      this._map.set(key, configLine);
      return configLine;
    } else {
      throw new Error('Could not find ' + key + ' in configuration map.');
    }
  };
  VLCRC.prototype.enable = function (key) {
    var configLine = this._map.get(key);
    if (configLine) {
      configLine.enabled = true;
      this._map.set(key, configLine);
      return configLine;
    } else {
      throw new Error('Could not find ' + key + ' in configuration map.');
    }
  };
  VLCRC.prototype.export = function () {
    var _this = this;
    var str = '';
    this._original
      .toString()
      .split('\n')
      .forEach(function (line) {
        var configLine = _readLine(line);
        if (_this._map.has(configLine.key)) {
          str += '' + (configLine.enabled ? '' : '#') + configLine.key + '=' + configLine.value;
        } else {
          str += line + "\n";
        }
      });
    return Buffer.from(str);
  };
  return VLCRC;
}());
exports.VLCRC = VLCRC;
