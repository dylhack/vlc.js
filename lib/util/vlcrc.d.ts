/// <reference types="node" />
/**
 * @link https://www.videolan.org/support/faq.html#Config
 * Last updated: September 15th, 2019
 */
export declare const locations: {
    unix: {
        v8: string;
        v9: string;
    };
    macos: {
        v8: string;
        v9: string;
    };
    win32: string;
};
export declare function _getPath(): string | undefined;
export declare function editVLCRC(location?: string): VLCRC;
export declare class VLCRC {
    private _vlcrc;
    constructor(data: Buffer);
    _update(data: Buffer): void;
    _locate(key: string): [string, string] | undefined;
    disable(key: string): Buffer | void;
    enable(key: string): Buffer | void;
    get(key: string): [string, string] | undefined;
    set(key: string, value: string): Buffer;
    getConfig(): Buffer;
}
//# sourceMappingURL=vlcrc.d.ts.map