import {MessageEvent} from "../MessageEvent";
import {GuestRoomSearchResultComposer} from "../../Outgoing/Navigator/GuestRoomSearchResultComposer";
import {Emulator} from "../../../Emulator";
import {FlatCreatedComposer} from "../../Outgoing/Navigator/FlatCreatedComposer";
import {Room} from "../../../Database/entity/Room";

export class CreateFlatMessageEvent extends MessageEvent {
    async handle(): Promise<void> {
        const name: string = this._clientMessage.PopFixedString();
        const model_name: string = this._clientMessage.PopFixedString();
        const room = new Room();
        room.name = name;
        room.model = model_name;
        room.owner = this._gameClient.habbo.data.username;
        const query = Emulator.databaseManager.roomsRepository.create(room);

        // @ts-ignore
        new FlatCreatedComposer(this._gameClient.socket, query[0].insertId, name).compose();
    }
}