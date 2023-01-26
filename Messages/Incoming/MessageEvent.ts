import {Socket} from "net";
import {ClientMessage} from "./ClientMessage";

export abstract class MessageEvent {

    public _socket: Socket;
    public _clientMessage: ClientMessage;

    constructor(socket: Socket, _clientMessage: ClientMessage) {
        this._socket = socket;
        this._clientMessage = _clientMessage;
    }

    public abstract handle(): void;
}