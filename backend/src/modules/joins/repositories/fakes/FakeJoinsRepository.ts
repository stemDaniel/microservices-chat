import { v4 } from 'uuid';

import Join from '../../infra/typeorm/entities/Join';
import ICreateJoinDTO from '../../dtos/ICreateJoinDTO';
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
}

export default FakeJoinsRepository;
