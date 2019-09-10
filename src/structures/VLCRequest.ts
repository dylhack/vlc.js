import {ClientRequest, IncomingMessage} from "http";

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
