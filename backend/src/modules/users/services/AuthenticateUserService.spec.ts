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

    it('should be able to authenticate a user given nickname and password', async () => {
        const createUser = await fakeUsersRepository.create({
            nickname: 'John Doe',
            password: 'somethinverysecretly',
        });

        const response = await authenticateUser.execute({
            nickname: 'John Doe',
            password: 'somethinverysecretly',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(createUser);
    });

    it('should not be able to authenticate a user that does not exists', async () => {
        await expect(
            authenticateUser.execute({
                nickname: 'non-existing-user',
                password: 'somethinverysecretly',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to authenticate a user with wrong password', async () => {
        await fakeUsersRepository.create({
            nickname: 'John Doe',
            password: 'somethinverysecretly',
        });

        await expect(
            authenticateUser.execute({
                nickname: 'John Doe',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });
});
