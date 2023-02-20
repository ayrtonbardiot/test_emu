import {MessageComposer} from "../MessageComposer";
import {Socket} from "net";
import {Outgoing} from "../Outgoing";

export class FlatCreatedComposer extends MessageComposer {

    private _id: number;
    private _name: string;

    constructor(socket: Socket, id: number, name: string) {
        super(socket, Outgoing.FlatCreatedComposer);
        this._id = id;
        this._name = name;
    }

    public compose(): void {
        this._serverMessage.AppendInt32(this._id); // room id
        this._serverMessage.AppendStringWithBreak(this._name); // room name
        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }

}