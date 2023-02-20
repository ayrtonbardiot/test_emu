import {MessageComposer} from "../MessageComposer";
import {Socket} from "net";
import {Outgoing} from "../Outgoing";
import {Room} from "../../../Database/entity/Room";

export class OpenConnectionMessageComposer extends MessageComposer {

    private _room: Room;

    constructor(socket: Socket, room: Room) {
        super(socket, Outgoing.OpenConnectionMessageComposer);
        this._room = room;
    }

    public compose(): void {
        this._serverMessage.AppendInt32(this._room.id); // room id
        this._serverMessage.AppendInt32(this._room.category); // room category
        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }

}