import * as url       from 'url';
import { VLCRequest } from './VLCRequest';

/**
 * @extends Error
 * @class VLCError
 * @description All the error details while communicating with VLCs' HTTP server is constructed
 *     here.
 */
export class VLCError {
    public readonly vlcRequest: VLCRequest;
    public readonly command: string | string[];
    public readonly message: string;

    /**
     * @constructor
     * @param {VLCRequest} vlcRequest
     */
    constructor(vlcRequest: VLCRequest) {
        const parsed = url.parse(vlcRequest.request.path, true);
        const str = vlcRequest.data.toString();
        this.message = str;
        this.vlcRequest = vlcRequest;
        this.command = parsed.query['command'];
    }
}
