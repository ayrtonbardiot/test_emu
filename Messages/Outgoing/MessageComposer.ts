import {Socket} from "net";
import {ServerMessage} from "./ServerMessage";

export abstract class MessageComposer {

    public _socket: Socket;
    public _serverMessage: ServerMessage;

    constructor(socket: Socket, header: number) {
        this._socket = socket;
        this._serverMessage = new ServerMessage(header);
    }

    public abstract compose(): void;
}