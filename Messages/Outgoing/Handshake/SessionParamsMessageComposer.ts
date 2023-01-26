import {Socket} from "net";
import {Outgoing} from "../Outgoing";
import {MessageComposer} from "../MessageComposer";

export class SessionParamsMessageComposer extends MessageComposer {

    constructor(socket: Socket) {
        super(socket, Outgoing.SessionParamsMessageComposer);
    }

    public compose(): void {
        this._serverMessage.AppendInt32(9);
        this._serverMessage.AppendInt32(0);
        this._serverMessage.AppendInt32(0);
        this._serverMessage.AppendInt32(1);
        this._serverMessage.AppendInt32(1);
        this._serverMessage.AppendInt32(3);
        this._serverMessage.AppendInt32(0);
        this._serverMessage.AppendInt32(2);
        this._serverMessage.AppendInt32(1);
        this._serverMessage.AppendInt32(4);
        this._serverMessage.AppendInt32(1);
        this._serverMessage.AppendInt32(5);
        this._serverMessage.AppendStringWithBreak("dd-MM-yyyy");
        this._serverMessage.AppendInt32(7);
        this._serverMessage.AppendBoolean(false);
        this._serverMessage.AppendInt32(8);
        this._serverMessage.AppendStringWithBreak("/client");
        this._serverMessage.AppendInt32(9);
        this._serverMessage.AppendBoolean(false);

        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }
}