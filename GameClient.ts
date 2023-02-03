import {Users} from "./Database/Models/Users";
import {Loaded} from "@mikro-orm/core";
import net from "node:net";
import {Habbo} from "./Habbo";

class Socket extends net.Socket {
    id?: string;
}

export class GameClient {

    private _socket: Socket;
    private _habbo: Habbo | undefined;

    constructor(socket: Socket, habbo: Habbo | null) {
        this._socket = socket;
        if(habbo) {
            this._habbo = habbo;
        }
    }

    public get socket(): Socket {
        return this._socket;
    }

    public get habbo(): Habbo {
        if(!this._habbo) throw new Error("Habbo is not defined!");
        else return this._habbo;
    }

    public set habbo(habbo: Habbo) {
        this._habbo = habbo;
    }

}