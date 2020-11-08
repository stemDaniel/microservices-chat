import 'reflect-metadata';

import ClientError from '@shared/errors/ClientError';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let authenticateUser: AuthenticateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate a user', async () => {
        const createUser = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        const response = await authenticateUser.execute({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(createUser);
    });

    it('should not be able to authenticate a user that does not exists', async () => {
        await expect(
            authenticateUser.execute({
                nickname: 'User that does not exist',
                password: 'verysecretpassword',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to authenticate a user with wrong password', async () => {
        await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        await expect(
            authenticateUser.execute({
                nickname: 'Happy user',
                password: 'Wrong password',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });
});
