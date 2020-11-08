import { v4 } from 'uuid';

import Join from '../../infra/typeorm/entities/Join';
import ICreateJoinDTO from '../../dtos/ICreateJoinDTO';
import IFindJoinByUserAndRoomDTO from '../../dtos/IFindJoinByUserAndRoomDTO';
import IJoinsRepository from '../IJoinsRepository';

class FakeJoinsRepository implements IJoinsRepository {
    private joins: Join[] = [];

    public async create(data: ICreateJoinDTO): Promise<Join> {
        const join = new Join();

        const joinData = {
            created_at: new Date(),
            id: v4(),
            room: {},
            user: {},
            ...data,
        } as Join;

        Object.assign(join, joinData);

        this.joins.push(join);

        return join;
    }

    public async findJoinByUserIDAndRoomID({
        user_id,
        room_id,
    }: IFindJoinByUserAndRoomDTO): Promise<Join | undefined> {
        return this.joins.find(
            join => join.user_id === user_id && join.room_id === room_id,
        );
    }

    public async delete(join_id: string): Promise<void> {
        this.joins.filter(join => join.id !== join_id);
    }
}

export default FakeJoinsRepository;
