import {MessageEvent} from "../MessageEvent";
import {GuestRoomSearchResultComposer} from "../../Outgoing/Navigator/GuestRoomSearchResultComposer";
import {Emulator} from "../../../Emulator";
import {OpenConnectionMessageComposer} from "../../Outgoing/Navigator/OpenConnectionMessageComposer";

export class OpenFlatConnectionMessageEvent extends MessageEvent {
    async handle(): Promise<void> {
        const roomId = this._clientMessage.PopWiredInt32();
        const password = this._clientMessage.PopFixedString();
        const idk = this._clientMessage.PopInt32(); // what is this?

        const room = await Emulator.databaseManager.roomsRepository.findOne(
            {
                where: {
                    id: roomId
                }
            }
        );

        new OpenConnectionMessageComposer(this._socket, room).compose();
    }
}