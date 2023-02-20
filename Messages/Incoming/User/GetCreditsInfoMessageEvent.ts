import {MessageEvent} from "../MessageEvent";
import {Socket} from "net";
import {ClientMessage} from "../ClientMessage";
import {ServerMessage} from "../../Outgoing/ServerMessage";
import {SessionParamsMessageComposer} from "../../Outgoing/Handshake/SessionParamsMessageComposer";
import {CreditBalanceComposer} from "../../Outgoing/User/CreditBalanceComposer";

export class GetCreditsInfoMessageEvent extends MessageEvent {
    handle(): void {
        const msg = new CreditBalanceComposer(this._socket, this._gameClient);
        msg.compose();
    }
}