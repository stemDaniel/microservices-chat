import { EntityRepository, getRepository, Repository } from 'typeorm';

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
}

export default JoinsRepository;
