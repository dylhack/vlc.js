import {VLCRequest} from './VLCRequest'
import * as url from "url";

/**
 * @extends Error
 * @class VLCError
 * @description All the error details while communicating with VLCs' HTTP server is constructed here.
 */
export class VLCError extends Error {
    public vlcRequest: VLCRequest;
    public command: string | string[];

    /**
     * @constructor
     * @param {VLCRequest} vlcRequest
     */
    constructor(vlcRequest: VLCRequest) {
        const parsed = url.parse(vlcRequest.request.path, true);
        const str = vlcRequest.data.toString();
        super(str);
        this.vlcRequest = vlcRequest;
        this.command = parsed.query['command'];
    }
}
