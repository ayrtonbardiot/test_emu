import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('rooms')
export class Room {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    category: number

    @Column("enum", { enum: ["0", "1", "2"] })
    state: number;

    @Column()
    owner: string

    @Column()
    users_now: number;

    @Column()
    users_max: number;

    @Column()
    model: string;

    @Column()
    tags: string;

}
