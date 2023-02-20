import {MessageEvent} from "../MessageEvent";
import {CanCreateRoomComposer} from "../../Outgoing/Navigator/CanCreateRoomComposer";

export class CanCreateRoomMessageEvent extends MessageEvent {
    handle(): void {
        new CanCreateRoomComposer(this._socket).compose();
    }
}