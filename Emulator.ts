import {NetworkingManager} from "./Net/NetworkingManager";
import {PacketManager} from "./Messages/PacketManager";
import {Log} from "./Utils/Log";
import {DatabaseManager} from "./Database/DatabaseManager";
import dotenv from "dotenv";

export class Emulator {

    private static _networkingManager: NetworkingManager | undefined;
    private static _packetManager: PacketManager | undefined;
    private static _databaseManager: DatabaseManager | undefined;

    constructor() {
        this.init();
    }

    private init(): void {
        Log.info("Emulator by frnota is starting...");
        dotenv.config();
        Emulator._databaseManager = new DatabaseManager();
        Emulator._networkingManager = new NetworkingManager(3000);
        Emulator._packetManager = new PacketManager();
    }

    public static get networkingManager(): NetworkingManager {
        return Emulator._networkingManager!;
    }

    public static get packetManager(): PacketManager {
        return Emulator._packetManager!;
    }

    public static get databaseManager(): DatabaseManager {
        return Emulator._databaseManager!;
    }
}