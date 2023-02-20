import {MessageComposer} from "../MessageComposer";
import {Socket} from "net";
import {Outgoing} from "../Outgoing";

export class CanCreateRoomComposer extends MessageComposer {

    constructor(socket: Socket) {
        super(socket, Outgoing.CanCreateRoomComposer);
    }

    public compose(): void {
        this._serverMessage.AppendInt32(0); // can create room? 0 = yes, 1 = no
        this._serverMessage.AppendInt32(999999); // room limit
        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }

}