import {MessageEvent} from "../MessageEvent";

export class GetOfficialRoomsMessageEvent extends MessageEvent {
    handle(): void {
        const adIndex: number = this._clientMessage.PopInt32(); // what is this?


    }
}