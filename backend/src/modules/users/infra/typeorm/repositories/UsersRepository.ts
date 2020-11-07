import { EntityRepository, getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        await this.ormRepository.save(user);

        return user;
    }
}

export default UsersRepository;
