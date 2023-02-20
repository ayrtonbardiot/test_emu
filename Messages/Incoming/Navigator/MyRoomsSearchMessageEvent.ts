import {MessageEvent} from "../MessageEvent";
import {GuestRoomSearchResultComposer} from "../../Outgoing/Navigator/GuestRoomSearchResultComposer";

export class MyRoomsSearchMessageEvent extends MessageEvent {
    handle(): void {
        const category: number = -3;
        new GuestRoomSearchResultComposer(this._socket, category, this._gameClient).compose();
    }
}