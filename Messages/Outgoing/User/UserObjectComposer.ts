import {MessageComposer} from "../MessageComposer";
import {Socket} from "net";
import {Outgoing} from "../Outgoing";

export class UserObjectComposer extends MessageComposer {

    constructor(socket: Socket) {
        super(socket, Outgoing.UserObjectComposer);
    }

    public compose(): void {
        this._serverMessage.AppendStringWithBreak("1");
        this._serverMessage.AppendStringWithBreak("notaryz");
        this._serverMessage.AppendStringWithBreak("hr-115-42.hd-195-19.ch-3030-82.lg-275-1408.fa-1201.ca-1804-64");
        this._serverMessage.AppendStringWithBreak("M");
        this._serverMessage.AppendStringWithBreak("NotaEMU");
        this._serverMessage.AppendStringWithBreak("notaryz");
        this._serverMessage.AppendInt32(0); // direct  mail
        this._serverMessage.AppendInt32(10); // respect TOTAL
        this._serverMessage.AppendInt32(10); // respect left
        this._serverMessage.AppendInt32(10); // pet respect left
        this._serverMessage.AppendBoolean(true); // stream publishing allowed
        
        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }
}