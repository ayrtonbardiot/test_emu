import {EntityManager, MikroORM} from "@mikro-orm/core";
import {MongoDriver} from "@mikro-orm/mongodb";
import {Log} from "../Utils/Log";

export class DatabaseManager {

    private _orm: MikroORM | undefined;

    constructor() {
        this.init();
    }

    private async init(): Promise<void> {
        this._orm = await MikroORM.init<MongoDriver>({
            entities: ['../dist/Database/Models/**/*.js'],
            entitiesTs: ['./Database/Models/**/*.ts'],
            dbName: 'habbo',
            clientUrl: process.env.MONGO_URL,
            type: 'mongo',
            allowGlobalContext: true,
        });
        Log.info("DatabaseManager - initialized");
    }

    public get orm(): EntityManager {
        return this._orm?.em!;
    }
}