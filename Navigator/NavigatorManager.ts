import {Log} from "../Utils/Log";
import {ServerMessage} from "../Messages/Outgoing/ServerMessage";
import {Room} from "../Database/entity/Room";
import {Repository} from "typeorm";
import {Emulator} from "../Emulator";

export class NavigatorManager {

    constructor() {
        this.init();
    }

    private init(): void {
        Log.info("NavigatorManager - initialized")
    }

    public async serializeRooms(serverMessage: ServerMessage, rooms: Room[], category: number): Promise<ServerMessage> {
        serverMessage.AppendInt32(1);
        serverMessage.AppendStringWithBreak("");
        serverMessage.AppendInt32(rooms.length);

        // loop with room here
        rooms.forEach((room) => {
            serverMessage.AppendInt32(room.id); // room id
            serverMessage.AppendBoolean(false); // event ?
            serverMessage.AppendStringWithBreak(room.name); // room name
            serverMessage.AppendStringWithBreak(room.owner); // room owner
            serverMessage.AppendInt32(room.state); // room state (0 = open, 1 = locked, 2 = password)
            serverMessage.AppendInt32(room.users_now); // users now
            serverMessage.AppendInt32(room.users_max); // users max
            serverMessage.AppendStringWithBreak(room.description); // description
            serverMessage.AppendInt32(0); // idk
            serverMessage.AppendBoolean(true); // trading allowed
            serverMessage.AppendInt32(1); // rating
            serverMessage.AppendInt32(room.category); // category
            serverMessage.AppendStringWithBreak(""); // event started

            // tags
            const tags = room.tags.split(";");
            serverMessage.AppendInt32(tags.length);
            tags.forEach((tag) => {
                serverMessage.AppendStringWithBreak(tag);
            });

            // thumbnail
            serverMessage.AppendInt32(13); // background image
            serverMessage.AppendInt32(3); // foreground image
            serverMessage.AppendInt32(1); // item count
            serverMessage.AppendInt32(1); // item position
            serverMessage.AppendInt32(1); // item img id

            serverMessage.AppendBoolean(true); // allow pets
            serverMessage.AppendBoolean(true); // display room entry ad
        })

        return serverMessage;
    }
}