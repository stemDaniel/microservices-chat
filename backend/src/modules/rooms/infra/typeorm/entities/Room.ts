import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('rooms')
class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    moderator_user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, moderator => moderator.rooms)
    @JoinColumn({ name: 'moderator_user_id' })
    moderator: User;
}

export default Room;
