import { injectable, inject } from 'tsyringe';

import ClientError from '@shared/errors/ClientError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        nickname,
        password,
    }: ICreateUserDTO): Promise<User> {
        const verifyIfUserExists = await this.usersRepository.findUserByNickname(
            nickname,
        );

        if (verifyIfUserExists) {
            throw new ClientError('This nickname is already in use!');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            nickname,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
