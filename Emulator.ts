import {NetworkingManager} from "./Net/NetworkingManager";
import {PacketManager} from "./Messages/PacketManager";
import {Log} from "./Utils/Log";
import {DatabaseManager} from "./Database/DatabaseManager";
import {GameClientManager} from "./GameClient/GameClientManager";
import {NavigatorManager} from "./Navigator/NavigatorManager";
import * as dotenv from "dotenv";

export class Emulator {

    private static _networkingManager: NetworkingManager | undefined;
    private static _packetManager: PacketManager | undefined;
    private static _databaseManager: DatabaseManager | undefined;
    private static _instance: Emulator | undefined;
    private static _gameClientManager: GameClientManager | undefined;
    private static _navigatorManager: NavigatorManager | undefined;

    constructor() {
        this.init();
    }

    private init(): void {
        Log.info("Emulator by frnota is starting...");
        dotenv.config();
        Emulator._databaseManager = new DatabaseManager();
        Emulator._networkingManager = new NetworkingManager(3000);
        Emulator._packetManager = new PacketManager();
        Emulator._gameClientManager = new GameClientManager();
        Emulator._navigatorManager = new NavigatorManager();
        Emulator._instance = this;
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

    public static get gameClientManager(): GameClientManager {
        return Emulator._gameClientManager!;
    }

    public static get navigatorManager(): NavigatorManager {
        return Emulator._navigatorManager!;
    }
}