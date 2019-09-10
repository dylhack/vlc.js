import { VLCRequest } from './VLCRequest';
/**
 * @extends Error
 * @class VLCError
 * @description All the error details while communicating with VLCs' HTTP server is constructed here.
 */
export declare class VLCError extends Error {
    vlcRequest: VLCRequest;
    command: string | string[];
    /**
     * @constructor
     * @param {VLCRequest} vlcRequest
     */
    constructor(vlcRequest: VLCRequest);
}
//# sourceMappingURL=VLCError.d.ts.map