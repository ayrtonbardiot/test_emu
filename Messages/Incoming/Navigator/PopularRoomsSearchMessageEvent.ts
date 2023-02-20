import {MessageEvent} from "../MessageEvent";
import {GuestRoomSearchResultComposer} from "../../Outgoing/Navigator/GuestRoomSearchResultComposer";

export class PopularRoomsSearchMessageEvent extends MessageEvent {
    handle(): void {
        const lmao = this._clientMessage.PopFixedString(); // what is this?
        const category: number = this._clientMessage.PopFixedInt32(); // think this is the category

        new GuestRoomSearchResultComposer(this._socket, category, this._gameClient).compose();
    }
}