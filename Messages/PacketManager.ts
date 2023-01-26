import {ClientMessage} from "./Incoming/ClientMessage";
import {InitCryptoMessageEvent} from "./Incoming/Handshake/InitCryptoMessageEvent";
import { MessageEvent } from "./Incoming/MessageEvent";
import {Socket} from "net";
import {Log} from "../Utils/Log";
import {SSOTicketMessageEvent} from "./Incoming/Handshake/SSOTicketMessageEvent";
import {Incoming} from "./Incoming/Incoming";
import {InfoRetrieveMessageEvent} from "./Incoming/Handshake/InfoRetrieveMessageEvent";
import {GetCreditsInfoMessageEvent} from "./Incoming/User/GetCreditsInfoMessageEvent";

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
        Log.info(`PacketManager - registered ${this._packets.size} packets`);
    }

    public GetPacket(header: number): typeof MessageEvent {
        return this._packets.get(header)!;
    }

    public handlePacket(socket: Socket, clientMessage: ClientMessage): void {
        const packet: MessageEvent = this.GetPacket(clientMessage.header) as unknown as MessageEvent;
        if (packet) {
            // @ts-ignore
            new packet(socket, clientMessage).handle();
        } else {
            Log.error(`PacketManager - unknown packet header: ${clientMessage.header}`);
        }
    }
}