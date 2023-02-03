import {EntityManager, MikroORM} from "@mikro-orm/core";
import {MongoDriver} from "@mikro-orm/mongodb";
import {Log} from "../Utils/Log";
import {throws} from "assert";

export class DatabaseManager {

    private _orm: MikroORM | undefined;

    constructor() {
        this.init().then(() => {
            Log.info("DatabaseManager - initialized");
        }).catch((reason) => {
            Log.error("DatabaseManager - failed to initialize ! Reason : " + reason)
            process.exit(1);
        });
    }

    private async init(): Promise<void> {
        this._orm = await MikroORM.init<MongoDriver>({
            entities: ['../dist/Database/Models/**/*.js'],
            entitiesTs: ['./Database/Models/**/*.ts'],
            dbName: 'habbo',
            clientUrl: process.env.MONGO_URL,
            type: 'mongo',
            allowGlobalContext: true,
        }).catch((reason) => {
            throw new Error(reason);
        });
    }

    public get orm(): EntityManager {
        return this._orm?.em!;
    }
}