import {MessageComposer} from "../MessageComposer";
import {Socket} from "net";
import {Outgoing} from "../Outgoing";

export class CreditBalanceComposer extends MessageComposer {

    constructor(socket: Socket) {
        super(socket, Outgoing.CreditBalanceComposer);
    }

    public compose(): void {
        this._serverMessage.AppendStringWithBreak("10050.0"); // creedits

        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        console.log(byteArray);
        this._socket.write(byteArray);
    }
}