import {ClientMessage} from "./Incoming/ClientMessage";
import {InitCryptoMessageEvent} from "./Incoming/Handshake/InitCryptoMessageEvent";
import {MessageEvent} from "./Incoming/MessageEvent";
import {Socket} from "net";
import {Log} from "../Utils/Log";
import {SSOTicketMessageEvent} from "./Incoming/Handshake/SSOTicketMessageEvent";
import {Incoming} from "./Incoming/Incoming";
import {InfoRetrieveMessageEvent} from "./Incoming/Handshake/InfoRetrieveMessageEvent";
import {GetCreditsInfoMessageEvent} from "./Incoming/User/GetCreditsInfoMessageEvent";
import {Emulator} from "../Emulator";
import {GameClient} from "../GameClient/GameClient";
import {MyRoomsSearchMessageEvent} from "./Incoming/Navigator/MyRoomsSearchMessageEvent";
import {CanCreateRoomMessageEvent} from "./Incoming/Navigator/CanCreateRoomMessageEvent";
import {CreateFlatMessageEvent} from "./Incoming/Navigator/CreateFlatMessageEvent";
import {OpenFlatConnectionMessageEvent} from "./Incoming/Navigator/OpenFlatConnectionMessageEvent";
import {PopularRoomsSearchMessageEvent} from "./Incoming/Navigator/PopularRoomsSearchMessageEvent";

export class PacketManager {
    private static _instance: PacketManager;
    private _packets: Map<number, typeof MessageEvent>;

    constructor() {
        this._packets = new Map<number, typeof MessageEvent>();
        PacketManager._instance = this;
        this.RegisterPackets();
        Log.info("PacketManager - initialized");
    }

    public RegisterPackets(): void {
        this._packets.set(Incoming.InitCryptoMessageEvent, InitCryptoMessageEvent);
        this._packets.set(Incoming.SSOTicketMessageEvent, SSOTicketMessageEvent);
        this._packets.set(Incoming.InfoRetrieveMessageEvent, InfoRetrieveMessageEvent);
        this._packets.set(Incoming.GetCreditsInfoMessageEvent, GetCreditsInfoMessageEvent);
        // this._packets.set(Incoming.GetOfficialRoomsMessageEvent, GetOfficialRoomsMessageEvent);
        this._packets.set(Incoming.PopularRoomsSearchMessageEvent, PopularRoomsSearchMessageEvent);
        this._packets.set(Incoming.MyRoomsSearchMessageEvent, MyRoomsSearchMessageEvent);
        this._packets.set(Incoming.CanCreateRoomMessageEvent, CanCreateRoomMessageEvent);

        this._packets.set(Incoming.CreateFlatMessageEvent, CreateFlatMessageEvent);
        this._packets.set(Incoming.OpenFlatConnectionMessageEvent, OpenFlatConnectionMessageEvent);
        Log.info(`PacketManager - registered ${this._packets.size} packets`);
    }

    public GetPacket(header: number): typeof MessageEvent {
        return this._packets.get(header)!;
    }

    public handlePacket(socket: Socket, clientMessage: ClientMessage): void {
        // const packet: MessageEvent = this.GetPacket(clientMessage.header) as unknown as MessageEvent;
        // const user: GameClient | null = Emulator.userManager.getUserBySocket(socket);
        // if (packet) {
        //     if (user) {
        //         // @ts-ignore
        //         new packet(socket, clientMessage, user).handle();
        //     } else {
        //         Log.error("PacketManager - user not found");
        //     }
        // } else {
        //     Log.error(`PacketManager - unknown packet header: ${clientMessage.header}`);
        // }

        const packet: MessageEvent = this.GetPacket(clientMessage.header) as unknown as MessageEvent;
        const user: GameClient | null = Emulator.gameClientManager.getUserBySocket(socket);
        if (packet) {
            Log.debug(`PacketManager - received packet: ${clientMessage.header}`);
            if (user) {
                // @ts-ignore
                new packet(socket, clientMessage, user).handle();
            } else {
                Log.error("PacketManager - user not found");
            }
        } else {
            Log.error(`PacketManager - unknown packet header: ${clientMessage.header}`);
        }
    }
}