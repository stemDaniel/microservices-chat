import { EntityRepository, getRepository, Repository } from 'typeorm';

import IFindJoinByUserAndRoomDTO from '@modules/joins/dtos/IFindJoinByUserAndRoomDTO';
import Join from '../entities/Join';
import ICreateJoinDTO from '../../../dtos/ICreateJoinDTO';
import IJoinsRepository from '../../../repositories/IJoinsRepository';

@EntityRepository(Join)
class JoinsRepository implements IJoinsRepository {
    private ormRepository: Repository<Join>;

    constructor() {
        this.ormRepository = getRepository(Join);
    }

    public async create(data: ICreateJoinDTO): Promise<Join> {
        const join = this.ormRepository.create(data);

        await this.ormRepository.save(join);

        return join;
    }

    public async findJoinByUserIDAndRoomID({
        user_id,
        room_id,
    }: IFindJoinByUserAndRoomDTO): Promise<Join | undefined> {
        const join = await this.ormRepository.findOne({
            where: { user_id, room_id },
        });

        return join;
    }

    public async delete(join_id: string): Promise<void> {
        await this.ormRepository.delete(join_id);
    }
}

export default JoinsRepository;
