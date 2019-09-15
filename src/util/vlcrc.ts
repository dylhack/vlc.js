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
    private _vlcrc: Buffer;

    constructor(data: Buffer) {
        this._vlcrc = data;
    }

    _update(data: Buffer): void {
        this._vlcrc = data;
    }

    _locate(key: string): [string, string] | undefined {
        let split: [string, string][] = [];
        this._vlcrc.toString()
            .split('\n')
            .forEach(x => {
                let keyValue = x.split('=');
                if (keyValue[0] && keyValue[1]) split.push([keyValue[0], keyValue[1]])
            });
        return split.find(x => x[0].includes(key));
    }

    disable(key: string): Buffer | void {
        let str = this._vlcrc.toString();
        const keyValue = this._locate(key);
        if (keyValue) {
            if (!keyValue[0].startsWith('#')) str.replace(`${keyValue[0]}=${keyValue[1]}`, `#${keyValue[0]}=${keyValue[1]}`);
            this._update(Buffer.from(str));
            return Buffer.from(str);
        } else throw new Error(`Could not locate ${key} in the vlcrc buffer.`);
    }

    enable(key: string): Buffer | void {
        let str = this._vlcrc.toString();
        const keyValue = this._locate(key);
        if (keyValue) {
            if (keyValue[0].startsWith('#')) str.replace(`#${keyValue[0]}=${keyValue[1]}`, `${keyValue[0]}=${keyValue[1]}`);
            this._update(Buffer.from(str));
            return Buffer.from(str);
        }
    }

    get(key: string): [string, string] | undefined {
        return this._locate(key);
    }

    set(key: string, value: string): Buffer {
        let str = this._vlcrc.toString();
        const keyValue = this._locate(key);
        if (keyValue) {
            str.replace(`${keyValue[0]}=${keyValue[1]}`, `${key}=${value}`);
            this._update(Buffer.from(str));
            return Buffer.from(str);
        } else {
            str += `${key}=${value}`;
            this._update(Buffer.from(str));
            return Buffer.from(str);
        }
    }

    getConfig(): Buffer {
        return this._vlcrc;
    }
}
