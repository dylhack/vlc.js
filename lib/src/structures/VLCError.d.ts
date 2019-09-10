import { VLCRequest } from './VLCRequest';
export declare class VLCError extends Error {
    vlcRequest: VLCRequest;
    command: string | string[];
    constructor(vlcRequest: VLCRequest);
}
//# sourceMappingURL=VLCError.d.ts.map