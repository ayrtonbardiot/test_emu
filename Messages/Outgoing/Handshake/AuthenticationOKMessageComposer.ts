import {MessageComposer} from "../MessageComposer";
import {Socket} from "net";
import {Outgoing} from "../Outgoing";

export class AuthenticationOKMessageComposer extends MessageComposer {

    constructor(socket: Socket) {
        super(socket, Outgoing.AuthenticationOKMessageComposer);
    }

    public compose(): void {
        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }

}