import * as path from "path";
import * as fs from "fs";
import * as os from "os";

/**
 * @link https://wiki.videolan.org/Preferences/
 * Last updated: September 15th, 2019
 */
export const locations = {
    unix: {
        v8: `${os.homedir()}/.vlc/vlcrc`,
        v9: `${os.homedir()}/.config/vlc/vlcrc`
    },
    macos: {
        v8: `${os.homedir()}/Library/Preferences/org.videolan.vlc`,
        v9: `${os.homedir()}/Library/Preferences/VLC`
    },
    win32: `${os.homedir()}\\AppData\\Roaming\\vlc\\vlcrc`,
};

export type ConfigItem = {
    key: string;
    value: string;
    enabled: boolean;
}

export function _readLine(line: string): ConfigItem | undefined {
    let commented = line.startsWith('#');
    let key = line.substr((commented ? 1 : 0), line.indexOf('=') - (commented ? 1 : 0));
    let value = line.substr(line.indexOf('=') + 1);
    let output: [string, string] = [key, value];
    if (key.includes(' ') || !line.includes('=')) return undefined;

    return {
        key: output[0],
        value: output[1],
        enabled: !line.startsWith('#')
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

/**
 * If no location is provided it will get the default install location
 * @param location
 * @returns {VLCRCModifier}
 */
export function editVLCRC(location?: string): VLCRCModifier {
    const resolvable: string | undefined = location ? location : _getPath();
    if (resolvable) {
        const data: Buffer = fs.readFileSync(resolvable);
        return new VLCRCModifier(data);
    } else {
        throw new Error('Could not find location of the vlcrc, please provide a resolvable location in the first argument.')
    }
}

export class VLCRCModifier {
    private _map: Map<string, ConfigItem>;
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

    get(key: string): ConfigItem | undefined {
        return this._map.get(key);
    }

    set(key: string, value: boolean | number | string): ConfigItem | undefined {
        let got = this._map.get(key);
        if (got) {
            got.value = value.toString();
            this._map.set(key, got);
            return got;
        } else throw new Error(`Could not find ${key} in configuration map.`);
    }

    disable(key: string): ConfigItem | undefined {
        let configLine = this._map.get(key);
        if (configLine) {
            configLine.enabled = false;
            this._map.set(key, configLine);
            return configLine;
        } else throw new Error(`Could not find ${key} in configuration map.`)
    }

    enable(key: string): ConfigItem | undefined {
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
                if (configLine && this._map.has(configLine.key)) {
                    str += `${configLine.enabled ? '' : '#'}${configLine.key}=${configLine.value}\n`;
                } else str += `${line}\n`;
            });
        return Buffer.from(str);
    }

}
