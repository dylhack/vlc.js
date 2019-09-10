import {ClientRequest, IncomingMessage} from "http";

/**
 * @class VLCRequest
 * @description This class stores all the data about a completed request with VLCs' HTTP server.
 */
export class VLCRequest {
    public response: IncomingMessage;
    public request: ClientRequest;
    public data: Buffer;

    constructor(req: ClientRequest, res: IncomingMessage, data: Buffer) {
        this.data = data;
        this.request = req;
        this.response = res;
    }
}
