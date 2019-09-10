/// <reference types="node" />
import {ClientRequest, IncomingMessage} from "http";

export declare class VLCRequest {
    response: IncomingMessage;
    request: ClientRequest;
    data: Buffer;

    constructor(req: ClientRequest, res: IncomingMessage, data: Buffer);
}

//# sourceMappingURL=VLCRequest.d.ts.map
