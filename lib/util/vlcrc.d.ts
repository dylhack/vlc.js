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
export declare type ConfigLine = {
    key: string;
    value: string | number | boolean;
    enabled: boolean;
};

export declare function _readLine(line: string): ConfigLine;
export declare function _getPath(): string | undefined;
export declare function editVLCRC(location?: string): VLCRC;
export declare class VLCRC {
    private _map;
    private readonly _original;
    constructor(data: Buffer);

    get(key: string): ConfigLine | undefined;

    set(key: string, value: boolean | number | string): ConfigLine | undefined;

    disable(key: string): ConfigLine | undefined;

    enable(key: string): ConfigLine | undefined;

    export(): Buffer;
}
//# sourceMappingURL=vlcrc.d.ts.map