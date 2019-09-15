import {VLCRequest} from "./VLCRequest";

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
export declare type VLCPlaylistChild = {
    ro: string;
    type: string;
    name: string;
    id: string;
    children: ChildChild[];
};
export declare type ChildChild = {
    ro: string;
    type: string;
    name: string;
    id: string;
    duration: number;
    uri: string;
    current: string;
};
//# sourceMappingURL=VLCPlaylist.d.ts.map
