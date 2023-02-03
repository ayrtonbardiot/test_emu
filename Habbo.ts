import {Loaded} from "@mikro-orm/core";
import {Users} from "./Database/Models/Users";

export class Habbo {

    private _data: Loaded<Users>;

    constructor(data: Loaded<Users>) {
        this._data = data;
    }

    public get data(): Loaded<Users> {
        return this._data;
    }
}