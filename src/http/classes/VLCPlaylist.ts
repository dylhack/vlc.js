import {VLCRequest} from "./VLCRequest";

/**
 * @class VLCPlaylist
 */
export class VLCPlaylist {
    public ro: string;
    public type: string;
    public name: string;
    public id: string;
    public children: VLCPlaylistChild[];
    public request: VLCRequest;

    /**
     * @constructor
     * @param {VLCRequest} request
     */
    constructor(request: VLCRequest) {
        const parsed = JSON.parse(request.data.toString());

        this.ro = parsed.ro;
        this.type = parsed.type;
        this.name = parsed.name;
        this.id = parsed.id;
        this.children = parsed.children;
        this.request = request;
    }
}

export type VLCPlaylistChild = {
    ro: string;
    type: string;
    name: string;
    id: string;
    children: ChildChild[];
}

export type ChildChild = {
    ro: string;
    type: string;
    name: string;
    id: string;
    duration: number;
    uri: string;
    current: string;
}

