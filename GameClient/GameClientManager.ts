import {GameClient} from "./GameClient";
import * as net from "node:net";
import {Log} from "../Utils/Log";
import {Habbo} from "./Habbo";
import {Emulator} from "../Emulator";
import {User} from "../Database/entity/User";
import {Repository} from "typeorm";

class Socket extends net.Socket {
    id?: string;
}

export class GameClientManager {

    private static _instance: GameClientManager;
    private readonly _users: Array<GameClient>;

    constructor() {
        this._users = new Array<GameClient>();
        GameClientManager._instance = this;
        Log.info("GameClientManager - initialized");
    }

    public addUser(gameClient: GameClient): void {
        this._users.push(gameClient);
    }

    public setHabbo(gameClient: GameClient, habbo: Habbo): void {
        gameClient.habbo = habbo;
    }

    public removeUser(gameClient: GameClient): void {
        this._users.splice(this._users.indexOf(gameClient), 1);
    }

    public getUserBySocket(socket: Socket): GameClient | null {
        for(const user of this._users) {
            if(user.socket.id === socket.id) {
                return user;
            }
        }
        return null;
    }
}