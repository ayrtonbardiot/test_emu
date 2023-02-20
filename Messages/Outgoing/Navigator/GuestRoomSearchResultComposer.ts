import {MessageComposer} from "../MessageComposer";
import {Socket} from "net";
import {Outgoing} from "../Outgoing";
import {Emulator} from "../../../Emulator";
import {GameClient} from "../../../GameClient/GameClient";
import {MoreThan} from "typeorm";
import {Room} from "../../../Database/entity/Room";

export class GuestRoomSearchResultComposer extends MessageComposer {

    private _category: number;
    private _gameClient: GameClient;

    constructor(socket: Socket, _category: number, gameClient: GameClient) {
        super(socket, Outgoing.GuestRoomSearchResultComposer);
        this._category = _category;
        this._gameClient = gameClient;
    }

    public async compose(): Promise<void> {
        let rooms: Room[];
        console.log("Category: " + this._category);
        switch (this._category) {
            case 0:
                rooms = await Emulator.databaseManager.roomsRepository.find({
                    where: {
                        users_now: MoreThan(0)
                    }
                })
                break;
            case -3:
                rooms = await Emulator.databaseManager.roomsRepository.find({
                    where: {
                        owner: this._gameClient.habbo.data.username
                    }
                });
                break;
            default:
                return;
        }

        console.log("Rooms: " + rooms.length);

        const roomsMessage = await Emulator.navigatorManager.serializeRooms(this._serverMessage, rooms, this._category);

        this._serverMessage.AppendBytes(roomsMessage.GetBytes());

        const byteArray = Uint8Array.from(this._serverMessage.GetBytes());
        this._socket.write(byteArray);
    }
}