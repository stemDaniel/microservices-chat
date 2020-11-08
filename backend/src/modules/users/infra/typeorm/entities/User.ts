import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Join from '@modules/joins/infra/typeorm/entities/Join';

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

    @OneToMany(() => Join, join => join.room)
    joins: Join[];
}

export default User;
