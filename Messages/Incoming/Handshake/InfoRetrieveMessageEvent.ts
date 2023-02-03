import {MessageEvent} from "../MessageEvent";
import {Socket} from "net";
import {ClientMessage} from "../ClientMessage";
import {ServerMessage} from "../../Outgoing/ServerMessage";
import {SessionParamsMessageComposer} from "../../Outgoing/Handshake/SessionParamsMessageComposer";
import {UserObjectComposer} from "../../Outgoing/User/UserObjectComposer";

export class InfoRetrieveMessageEvent extends MessageEvent {
    handle(): void {
        const msg = new UserObjectComposer(this._socket, this._gameClient);
        msg.compose();
    }
}