import {VLCRequest} from './VLCRequest'
import * as url from "url";

export class VLCError extends Error {
    public vlcRequest: VLCRequest;
    public command: string | string[];

    constructor(vlcRequest: VLCRequest) {
        const parsed = url.parse(vlcRequest.request.path, true);
        const str = vlcRequest.data.toString();
        super(str);
        this.vlcRequest = vlcRequest;
        this.command = parsed.query['command'];
    }
}
