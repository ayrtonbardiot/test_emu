import {Socket} from "net";
import {Outgoing} from "../Outgoing";
import {MessageComposer} from "../MessageComposer";

export class UserRightsMessageComposer extends MessageComposer {

    constructor(socket: Socket) {
        super(socket, Outgoing.UserRightsMessageComposer);
    }

    public compose(): void {
        this._serverMessage.AppendInt32(2); // if active club = 2 else 0
        this._serverMessage.AppendInt32(7); // RANK LEVEL

        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }

}