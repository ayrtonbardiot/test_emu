import {MessageComposer} from "./MessageComposer";
import {Socket} from "net";
import {Outgoing} from "./Outgoing";

export class MOTDNotificationComposer extends MessageComposer {

    private _message: string[];

    constructor(socket: Socket, message: string[]) {
        super(socket, Outgoing.MOTDNotificationComposer);
        this._message = message;
    }

    public compose(): void {
        this._serverMessage.AppendUInt(this._message.length);
        this._message.forEach((message) => {
            this._serverMessage.AppendStringWithBreak(message);
        });

        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }
}