import { v4 } from 'uuid';

import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = new User();

        const assignData = {
            ...data,
            id: v4(),
            created_at: new Date(),
        } as User;

        Object.assign(user, assignData);

        this.users.push(user);

        return user;
    }

    public async findUserByNickname(
        nickname: string,
    ): Promise<User | undefined> {
        return this.users.find(user => user.nickname === nickname);
    }
}

export default FakeUsersRepository;
