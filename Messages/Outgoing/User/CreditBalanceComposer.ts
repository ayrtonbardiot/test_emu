import {MessageComposer} from "../MessageComposer";
import {Socket} from "net";
import {Outgoing} from "../Outgoing";
import {GameClient} from "../../../GameClient/GameClient";

export class CreditBalanceComposer extends MessageComposer {

    private _gameClient: GameClient;

    constructor(socket: Socket, gameClient: GameClient) {
        super(socket, Outgoing.CreditBalanceComposer);
        this._gameClient = gameClient;
    }

    public compose(): void {
        this._serverMessage.AppendStringWithBreak(this._gameClient.habbo.data.credits + ".0");

        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }
}