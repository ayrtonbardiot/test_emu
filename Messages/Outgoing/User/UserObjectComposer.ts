import {MessageComposer} from "../MessageComposer";
import {Socket} from "net";
import {Outgoing} from "../Outgoing";
import {GameClient} from "../../../GameClient/GameClient";

export class UserObjectComposer extends MessageComposer {

    private _gameClient: GameClient;

    constructor(socket: Socket, gameClient: GameClient) {
        super(socket, Outgoing.UserObjectComposer);
        this._gameClient = gameClient;
    }

    public compose(): void {
        this._serverMessage.AppendStringWithBreak(this._gameClient.habbo.data.id.toString());
        this._serverMessage.AppendStringWithBreak(this._gameClient.habbo.data.username);
        this._serverMessage.AppendStringWithBreak(this._gameClient.habbo.data.look);
        this._serverMessage.AppendStringWithBreak("M"); // sex
        this._serverMessage.AppendStringWithBreak("NotaEMU"); // custom data
        this._serverMessage.AppendStringWithBreak("notaryz"); // realName
        this._serverMessage.AppendInt32(0); // direct  mail
        this._serverMessage.AppendInt32(10); // respect TOTAL
        this._serverMessage.AppendInt32(10); // respect left
        this._serverMessage.AppendInt32(10); // pet respect left
        this._serverMessage.AppendBoolean(true); // stream publishing allowed
        
        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }
}