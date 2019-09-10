import { VLCRequest } from "./VLCRequest";
/**
 * @class VLCPlaylist
 */
export declare class VLCPlaylist {
    ro: string;
    type: string;
    name: string;
    id: string;
    children: VLCPlaylistChild[];
    request: VLCRequest;
    /**
     * @constructor
     * @param {VLCRequest} request
     */
    constructor(request: VLCRequest);
}
export interface VLCPlaylistChild {
    ro: string;
    type: string;
    name: string;
    id: string;
    children: ChildChild[];
}
export interface ChildChild {
    ro: string;
    type: string;
    name: string;
    id: string;
    duration: number;
    uri: string;
    current: string;
}
export interface Details {
    address: string;
    password: string;
    port: string | number;
}
//# sourceMappingURL=VLCPlaylist.d.ts.map