import * as path from "path";
import * as fs from "fs";

/**
 * @link https://www.videolan.org/support/faq.html#Config
 * Last updated: September 15th, 2019
 */
export const locations = {
    unix: {
        v8: `${process.env.home}/.vlc/vlcrc`,
        v9: `${process.env.home}/.config/vlc/vlcrc`
    },
    macos: {
        v8: `${process.env.home}/Library/Preferences/org.videolan.vlc`,
        v9: `${process.env.home}/Library/Preferences/VLC`
    },
    win32: `${process.env.home}\\Application Data\\vlc\\vlcrc`,
};

export type ConfigLine = {
    key: string;
    value: string | number | boolean;
    enabled: boolean;
}

export function _readLine(line: string): ConfigLine {
    let key = line.substr(line.startsWith('#') ? 1 : 0, line.indexOf('='));
    let value = line.substr(line.indexOf('='));
    let output: [string, any] = [key, value];

    switch (value.toLowerCase()) {
        case 'true':
        case 'false':
            output[1] = (value.toLowerCase() === 'true');
            break;
    }
    if (!isNaN(Number(value))) output[1] = Number(value);

    return {
        key: output[0],
        value: output[1],
        enabled: line.startsWith('#')
    }
}

export function _getPath(): string | undefined {
    switch (process.platform) {
        case "darwin":
            if (fs.existsSync(locations.macos.v8)) return path.resolve(locations.macos.v8);
            else if (fs.existsSync(locations.macos.v9)) return path.resolve(locations.macos.v9);
            break;
        case "freebsd":
        case "linux":
        case "openbsd":
            if (fs.existsSync(locations.unix.v8)) return path.resolve(locations.unix.v8);
            else if (fs.existsSync(locations.unix.v9)) return path.resolve(locations.unix.v9);
            break;
        case "cygwin":
        case "win32":
            if (fs.existsSync(locations.win32)) return path.resolve(locations.win32);
            break;
        default:
            return undefined;
    }
}

export function editVLCRC(location?: string): VLCRC {
    const resolvable: string | undefined = location ? location : _getPath();
    if (resolvable) {
        const data: Buffer = fs.readFileSync(resolvable);
        return new VLCRC(data);
    } else {
        throw new Error('Could not find location of the vlcrc, please provide a resolvable location in the first argument.')
    }
}

export class VLCRC {
    private _map: Map<string, ConfigLine>;
    private readonly _original: Buffer;

    constructor(data: Buffer) {
        this._original = data;
        this._map = new Map();
        data.toString()
            .split('\n')
            .forEach((line: string) => {
                const configLine = _readLine(line);
                if (configLine) this._map.set(configLine.key, configLine);
            })
    }

    get(key: string): ConfigLine | undefined {
        return this._map.get(key);
    }

    set(key: string, value: boolean | number | string): ConfigLine | undefined {
        let got = this._map.get(key);
        if (got) {
            got.value = value;
            this._map.set(key, got);
            return got;
        } else throw new Error(`Could not find ${key} in configuration map.`);
    }

    disable(key: string): ConfigLine | undefined {
        let configLine = this._map.get(key);
        if (configLine) {
            configLine.enabled = false;
            this._map.set(key, configLine);
            return configLine;
        } else throw new Error(`Could not find ${key} in configuration map.`)
    }

    enable(key: string): ConfigLine | undefined {
        let configLine = this._map.get(key);
        if (configLine) {
            configLine.enabled = true;
            this._map.set(key, configLine);
            return configLine;
        } else throw new Error(`Could not find ${key} in configuration map.`)
    }

    export(): Buffer {
        let str = '';
        this._original
            .toString()
            .split('\n')
            .forEach((line: string) => {
                const configLine = _readLine(line);
                if (this._map.has(configLine.key)) {
                    str += `${configLine.enabled ? '' : '#'}${configLine.key}=${configLine.value}`;
                } else {
                    str += `${line}\n`;
                }
            });
        return Buffer.from(str);
    }

}
