import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        nickname,
        password,
    }: ICreateUserDTO): Promise<User> {
        const user = await this.usersRepository.create({
            nickname,
            password,
        });

        return user;
    }
}

export default CreateUserService;
