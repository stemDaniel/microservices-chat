import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';

import Join from '@modules/joins/infra/typeorm/entities/Join';

@Entity('rooms')
class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Join, join => join.room)
    joins: Join[];
}

export default Room;
