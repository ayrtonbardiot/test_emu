import {Entity, Enum, PrimaryKey, Property, Unique} from "@mikro-orm/core";
import {ObjectId} from "@mikro-orm/mongodb";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Users {

    @PrimaryKey()
    _id: ObjectId;

    @Property({ type: 'string', unique: true, nullable: false, default: "NewUsername" })
    username: string;

    @Property({ type: 'uuid', unique: true, nullable: false, default: uuidv4() })
    auth_ticket = uuidv4();

    @Property({ type: 'string', unique: true, nullable: false, default: "hr-115-42.hd-195-19.ch-3030-82.lg-275-1408.fa-1201.ca-1804-64" })
    look: string;

    @Enum(() => ["M", "F"])
    @Property({ type: 'string', unique: true, nullable: false, default: "M"})
    sex: string;

    constructor(username: string, look: string, sex: string) {
        this._id = new ObjectId();
        this.username = username;
        this.look = look;
        this.sex = sex;
    }
}