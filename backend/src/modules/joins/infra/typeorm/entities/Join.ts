import Room from '@modules/rooms/infra/typeorm/entities/Room';
import User from '@modules/users/infra/typeorm/entities/User';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('joins')
class Join {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    room_id: string;

    @Column('boolean')
    is_moderator: boolean;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user => user.joins)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Room, room => room.joins)
    @JoinColumn({ name: 'room_id' })
    room: Room;
}

export default Join;
