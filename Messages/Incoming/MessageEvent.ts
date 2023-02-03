import {Socket} from "net";
import {ClientMessage} from "./ClientMessage";
import {GameClient} from "../../GameClient";

export abstract class MessageEvent {

    public _socket: Socket;
    public _clientMessage: ClientMessage;
    public _gameClient: GameClient;

    constructor(socket: Socket, clientMessage: ClientMessage, gameClient: GameClient) {
        this._socket = socket;
        this._clientMessage = clientMessage;
        this._gameClient = gameClient;
    }

    public abstract handle(): void;
}