import {Log} from "../Utils/Log";
import {Connection, createConnection} from "mysql2/promise";
import {AppDataSource} from "./data-source";
import {DataSource, Repository} from "typeorm";
import {Room} from "./entity/Room";
import {Emulator} from "../Emulator";
import {User} from "./entity/User";

export class DatabaseManager {

    private _dataSource: DataSource;
    private _roomsRepository: Repository<Room>;
    private _userRepository: Repository<User>;

    constructor() {
        this.init().then(() => {
            Log.info("DatabaseManager - initialized");
        }).catch((reason) => {
            Log.error("DatabaseManager - failed to initialize ! Reason : " + reason)
            process.exit(1);
        });
    }

    private async init(): Promise<void> {
        this._dataSource = await AppDataSource.initialize().catch((reason) => {
            throw reason;
        });
        this._roomsRepository = this._dataSource.getRepository(Room);
        this._userRepository = this._dataSource.getRepository(User);
    }

    public get dataSource(): DataSource {
        return this._dataSource;
    }

    public get roomsRepository(): Repository<Room> {
        return this._roomsRepository;
    }

    public get userRepository(): Repository<User> {
        return this._userRepository;
    }
}