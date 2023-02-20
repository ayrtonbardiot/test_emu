import {User} from "../Database/entity/User";

export class Habbo {

    private readonly _data: User;

    constructor(data: User) {
        this._data = data;
    }

    public get data(): User {
        return this._data;
    }
}