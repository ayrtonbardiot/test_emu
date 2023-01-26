import {MessageEvent} from "../MessageEvent";
import {Socket} from "net";
import {ClientMessage} from "../ClientMessage";
import {ServerMessage} from "../../Outgoing/ServerMessage";
import {SessionParamsMessageComposer} from "../../Outgoing/Handshake/SessionParamsMessageComposer";

export class InitCryptoMessageEvent extends MessageEvent {
    handle(): void {
        const msg = new SessionParamsMessageComposer(this._socket);
        msg.compose();
    }
}