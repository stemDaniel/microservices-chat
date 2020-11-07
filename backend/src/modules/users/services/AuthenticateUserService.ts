import 'reflect-metadata';

import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import ClientError from '@shared/errors/ClientError';
import authConfig from '@config/auth';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    nickname: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ nickname, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findUserByNickname(nickname);

        if (!user) {
            throw new ClientError('This user does not exists!');
        }

        const checkIfPasswordIsCorrrect = await this.hashProvider.compare(
            password,
            user.password,
        );

        if (!checkIfPasswordIsCorrrect) {
            throw new ClientError('Wrong password!');
        }

        const { secret, expiresIn } = authConfig;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
