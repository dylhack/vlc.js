import {VLCRequest} from "./VLCRequest";

export declare class VLCPlaylist {
    ro: string;
    type: string;
    name: string;
    id: string;
    children: VLCPlaylistChild[];
    request: VLCRequest;

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
