import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Room from '@modules/rooms/infra/typeorm/entities/Room';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nickname: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Room, room => room.moderator)
    rooms: Room[];
}

export default User;
